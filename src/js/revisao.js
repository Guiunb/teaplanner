/* =====================================================================
   TEA PLANNER 3.0 — MÓDULO DE REVISÃO SEMANAL (v1)
   ---------------------------------------------------------------------
   Módulo autônomo. Integração com o app via:
     - localStorage (mesmas chaves do TEA Planner)
     - função global persist() (flush do estado antes do scan)
   Regras do projeto respeitadas:
     - Nenhuma função existente é alterada
     - Nada é apagado de verdade (Lixeira / Talvez um Dia / Histórico)
     - Sistema SUGERE, usuário APROVA (aprendizado por exemplo)
     - Máx. 10 sugestões por grupo por revisão (anti-overwhelm)
     - UI em português, código em inglês/camelCase, UTF-8 sem BOM
   ===================================================================== */
(function () {
  'use strict';

  // ===== 1. CONSTANTES =====
  var KEYS = {
    CONFIG: 'tea-planner-revisao-config',
    REGISTRY: 'tea-planner-revisao-registry',
    LOG: 'tea-planner-revisao-log'
  };
  var LS_META = 'tea-planner-boards-meta';
  var LS_PREFIX = 'tea-planner-board-';

  var TALVEZ_ID = 'board-talvez-um-dia';
  var TALVEZ_NAME = '\uD83C\uDF19 Talvez um Dia'; // 🌙
  var HIST_ID = 'board-historico';
  var HIST_NAME = '\uD83C\uDFC6 Hist\u00F3rico';  // 🏆
  var TRASH_ID = 'board-trash';
  var TODOS_ID = 'board-todos';

  var WEEK_MS = 7 * 24 * 3600 * 1000;
  var STALE_MS = 3 * WEEK_MS;    // parado há 3+ semanas => sugerir arquivar
  var SOMEDAY_MS = 4 * WEEK_MS;  // 4+ semanas no Talvez => sugerir decidir
  var SKIP_COOLDOWN_MS = 2 * WEEK_MS; // "deixar como está" silencia por 2 semanas
  var BATCH_SIZE = 10;           // máx. de sugestões por grupo por revisão

  var DAY_NAMES = ['Domingo', 'Segunda', 'Ter\u00E7a', 'Quarta', 'Quinta', 'Sexta', 'S\u00E1bado'];

  // ===== 2. HELPERS DE ARMAZENAMENTO =====
  function lsGet(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function lsSet(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* quota */ }
  }
  function loadMeta() { return lsGet(LS_META, []); }
  function saveMeta(meta) { lsSet(LS_META, meta); }
  function loadBoard(id) { return lsGet(LS_PREFIX + id, null); }
  function saveBoard(id, data) { lsSet(LS_PREFIX + id, data); }

  function getConfig() { return lsGet(KEYS.CONFIG, null); }
  function saveConfig(cfg) { lsSet(KEYS.CONFIG, cfg); }
  function getRegistry() { return lsGet(KEYS.REGISTRY, {}); }
  function saveRegistry(reg) { lsSet(KEYS.REGISTRY, reg); }
  function getLog() { return lsGet(KEYS.LOG, []); }
  function saveLog(log) { lsSet(KEYS.LOG, log); }

  // ===== 3. LEITURA DO ESTADO DO APP =====
  function flushAppState() {
    // Garante que o quadro atual (DOM) foi salvo no localStorage antes do scan
    try { if (typeof window.persist === 'function') window.persist(); } catch (e) { }
  }

  function parseHistory(card) {
    try { return JSON.parse(card.history || '[]'); } catch (e) { return []; }
  }

  function lastTouch(card, regEntry) {
    var hist = parseHistory(card);
    var t = 0;
    for (var i = 0; i < hist.length; i++) {
      if (hist[i] && hist[i].time && hist[i].time > t) t = hist[i].time;
    }
    if (regEntry && regEntry.firstSeen && (t === 0 || regEntry.firstSeen > t)) {
      if (t === 0) t = regEntry.firstSeen;
    }
    return t; // 0 = idade desconhecida
  }

  function eachActiveBoard(meta, fn) {
    // Quadros "de trabalho": exclui agregado, lixeira, histórico e talvez
    meta.forEach(function (b) {
      if (!b || !b.id) return;
      if (b.id === TODOS_ID || b.id === TRASH_ID || b.id === HIST_ID || b.id === TALVEZ_ID) return;
      var data = loadBoard(b.id);
      if (Array.isArray(data)) fn(b, data);
    });
  }

  function eachCard(boardData, fn) {
    boardData.forEach(function (list) {
      if (list && Array.isArray(list.cards)) {
        list.cards.forEach(function (c) { if (c && c.id) fn(c, list); });
      }
    });
  }

  // ===== 4. REGISTRO DE IDADE (fica mais preciso a cada semana) =====
  function updateRegistry() {
    var now = Date.now();
    var reg = getRegistry();
    var seen = {};
    var meta = loadMeta();

    function track(card) {
      seen[card.id] = true;
      var entry = reg[card.id];
      if (!entry) { entry = { firstSeen: now }; reg[card.id] = entry; }
      var isDone = card.completed === 'true';
      if (isDone && !entry.completedAt) entry.completedAt = now;
      if (!isDone && entry.completedAt) entry.completedAt = null;
    }

    eachActiveBoard(meta, function (b, data) { eachCard(data, track); });
    var talvez = loadBoard(TALVEZ_ID);
    if (Array.isArray(talvez)) eachCard(talvez, track);

    // Remove do registro cartões que não existem mais
    Object.keys(reg).forEach(function (id) { if (!seen[id]) delete reg[id]; });
    saveRegistry(reg);
    return reg;
  }

  // ===== 5. SCAN: DIAGNÓSTICO E GRUPOS DE SUGESTÃO =====
  function scan() {
    flushAppState();
    var reg = updateRegistry();
    var meta = loadMeta();
    var now = Date.now();

    var result = {
      activeCount: 0,
      completedOnBoard: [],   // completados ainda ocupando quadros ativos
      staleCards: [],         // parados 3+ semanas (ou idade desconhecida)
      somedayOld: [],         // no Talvez um Dia há 4+ semanas
      completedThisWeek: 0,
      boardNames: {}
    };
    meta.forEach(function (b) { if (b && b.id) result.boardNames[b.id] = b.name || b.id; });

    eachActiveBoard(meta, function (b, data) {
      eachCard(data, function (card, list) {
        var entry = reg[card.id] || {};
        if (card.completed === 'true') {
          result.completedOnBoard.push(makeItem(card, b.id, list.title, 'completed', entry));
          if (entry.completedAt && (now - entry.completedAt) <= WEEK_MS) result.completedThisWeek++;
          return;
        }
        result.activeCount++;
        if (entry.skippedUntil && entry.skippedUntil > now) return; // respeita "deixar como está"
        if (card.recurrence && card.recurrence !== 'none') return; // recorrentes não são "fantasmas"
        if (hasRecentSchedule(card, now)) return; // agendado para agora/futuro => vivo
        var hist = parseHistory(card);
        var histTime = 0;
        for (var h = 0; h < hist.length; h++) {
          if (hist[h] && hist[h].time && hist[h].time > histTime) histTime = hist[h].time;
        }
        if (histTime === 0 && entry.firstSeen && (now - entry.firstSeen) < WEEK_MS) {
          // Primeiro contato com cartão sem nenhum registro de movimento: triagem
          result.staleCards.push(makeItem(card, b.id, list.title, 'unknownAge', entry));
          return;
        }
        var t = histTime || entry.firstSeen || 0;
        if (t > 0 && (now - t) > STALE_MS) {
          var it = makeItem(card, b.id, list.title, 'stale', entry);
          it.weeks = Math.floor((now - t) / WEEK_MS);
          result.staleCards.push(it);
        }
      });
    });

    var talvez = loadBoard(TALVEZ_ID);
    if (Array.isArray(talvez)) {
      eachCard(talvez, function (card, list) {
        var entry = reg[card.id] || {};
        if (entry.skippedUntil && entry.skippedUntil > now) return;
        var t = lastTouch(card, entry);
        if (t > 0 && (now - t) > SOMEDAY_MS) {
          var it = makeItem(card, TALVEZ_ID, list.title, 'somedayOld', entry);
          it.weeks = Math.floor((now - t) / WEEK_MS);
          result.somedayOld.push(it);
        }
      });
    }

    // Mais antigos primeiro (fantasmas mais velhos são resolvidos antes)
    result.staleCards.sort(function (a, b) { return (b.weeks || 99) - (a.weeks || 99); });
    return result;
  }

  function makeItem(card, boardId, listTitle, kind, regEntry) {
    return { card: card, boardId: boardId, listTitle: listTitle || '', kind: kind, reg: regEntry };
  }

  function hasRecentSchedule(card, now) {
    // Cartão com data marcada para os últimos 7 dias ou futuro está "vivo"
    var floor = now - WEEK_MS;
    var fields = [card.when, card.due];
    for (var i = 0; i < fields.length; i++) {
      var v = fields[i];
      if (!v) continue;
      var t = Date.parse(v);
      if (!isNaN(t) && t >= floor) return true;
    }
    return false;
  }

  // ===== 6. APLICAÇÃO DAS DECISÕES =====
  function ensureSpecialBoard(meta, id, name, color) {
    var exists = meta.some(function (b) { return b && b.id === id; });
    if (!exists) {
      meta.push({ id: id, name: name, lastModified: Date.now(), color: color });
    }
    var data = loadBoard(id);
    if (!Array.isArray(data) || data.length === 0) {
      data = [{ type: 'kanban', title: name, cards: [] }];
      saveBoard(id, data);
    }
    return data;
  }

  function appendCardHistory(card, actionText) {
    var hist = parseHistory(card);
    hist.push({ action: actionText, time: Date.now() });
    card.history = JSON.stringify(hist);
  }

  function removeCardById(boardData, cardId) {
    for (var i = 0; i < boardData.length; i++) {
      var list = boardData[i];
      if (!list || !Array.isArray(list.cards)) continue;
      for (var j = 0; j < list.cards.length; j++) {
        if (list.cards[j] && list.cards[j].id === cardId) {
          return list.cards.splice(j, 1)[0];
        }
      }
    }
    return null;
  }

  function applyDecisions(decisions) {
    var meta = loadMeta();
    var boardCache = {};
    var now = Date.now();
    var reg = getRegistry();

    function board(id) {
      if (!boardCache[id]) boardCache[id] = loadBoard(id) || [];
      return boardCache[id];
    }

    // Garante quadros especiais quando necessários
    var needTalvez = decisions.some(function (d) { return d.action === 'talvez'; });
    var needHist = decisions.some(function (d) { return d.action === 'historico'; });
    if (needTalvez) boardCache[TALVEZ_ID] = ensureSpecialBoard(meta, TALVEZ_ID, TALVEZ_NAME, '#3a3560');
    if (needHist) boardCache[HIST_ID] = ensureSpecialBoard(meta, HIST_ID, HIST_NAME, '#2e5339');

    var movedIds = [];

    decisions.forEach(function (d) {
      var src = board(d.boardId);
      if (d.action === 'keep') {
        var entry = reg[d.card.id] || (reg[d.card.id] = { firstSeen: now });
        entry.skippedUntil = now + SKIP_COOLDOWN_MS;
        return;
      }
      if (d.action === 'reactivate') {
        // Cartão fica onde está, mas ganha um "toque" (zera a contagem de parado)
        eachCard(src, function (c) {
          if (c.id === d.card.id) appendCardHistory(c, 'Reativado na revis\u00E3o semanal');
        });
        return;
      }
      var cardObj = removeCardById(src, d.card.id);
      if (!cardObj) return;
      movedIds.push(cardObj.id);

      var targetId, actionText;
      if (d.action === 'talvez') {
        targetId = TALVEZ_ID;
        actionText = 'Arquivado em "' + TALVEZ_NAME + '" na revis\u00E3o semanal';
      } else if (d.action === 'historico') {
        targetId = HIST_ID;
        actionText = 'Movido para "' + HIST_NAME + '" na revis\u00E3o semanal';
      } else { // trash
        targetId = TRASH_ID;
        actionText = 'Enviado para a lixeira na revis\u00E3o semanal';
      }
      var target = board(targetId);
      if (!Array.isArray(target) || target.length === 0) {
        target = [{ type: 'kanban', title: targetId === TRASH_ID ? 'Apagados' : 'Cart\u00F5es', cards: [] }];
        boardCache[targetId] = target;
      }
      appendCardHistory(cardObj, actionText);
      cardObj.boardId = targetId;
      target[0].cards.push(cardObj);
    });

    // Evita ressurreição via quadro agregado "TODOS"
    var todosData = loadBoard(TODOS_ID);
    if (Array.isArray(todosData) && movedIds.length) {
      movedIds.forEach(function (id) { removeCardById(todosData, id); });
      saveBoard(TODOS_ID, todosData);
    }

    Object.keys(boardCache).forEach(function (id) { saveBoard(id, boardCache[id]); });
    meta.forEach(function (b) {
      if (boardCache[b.id]) b.lastModified = now;
    });
    saveMeta(meta);
    saveRegistry(reg);
  }

  // ===== 7. UI — ESTILOS =====
  function injectStyles() {
    if (document.getElementById('rv-styles')) return;
    var css = '' +
      '.rv-overlay{position:fixed;inset:0;background:rgba(5,10,20,.72);backdrop-filter:blur(3px);' +
      'z-index:99999;display:flex;align-items:center;justify-content:center;padding:16px;}' +
      '.rv-panel{background:linear-gradient(180deg,#13253f 0%,#0f1e33 100%);border:1px solid rgba(232,161,61,.25);' +
      'border-radius:14px;max-width:560px;width:100%;max-height:90vh;overflow-y:auto;padding:26px 26px 22px;' +
      'box-shadow:0 18px 60px rgba(0,0,0,.55);color:#e8eef7;font-size:15px;line-height:1.5;}' +
      '.rv-eyebrow{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#e8a13d;margin:0 0 6px;}' +
      '.rv-panel h2{margin:0 0 4px;font-size:22px;font-weight:600;color:#fff;}' +
      '.rv-sub{color:#9db2cc;font-size:13.5px;margin:0 0 18px;}' +
      '.rv-diag{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:14px 0 20px;}' +
      '.rv-stat{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:12px 14px;}' +
      '.rv-stat b{display:block;font-size:26px;font-weight:700;color:#e8a13d;line-height:1.1;}' +
      '.rv-stat.rv-ok b{color:#7fc98b;}' +
      '.rv-stat span{font-size:12px;color:#9db2cc;}' +
      '.rv-progress{height:5px;background:rgba(255,255,255,.08);border-radius:3px;margin:0 0 16px;overflow:hidden;}' +
      '.rv-progress i{display:block;height:100%;background:linear-gradient(90deg,#e8a13d,#f2c078);border-radius:3px;transition:width .35s ease;}' +
      '.rv-cardbox{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-left:4px solid #e8a13d;' +
      'border-radius:10px;padding:14px 16px;margin:0 0 12px;transition:transform .3s ease,opacity .3s ease;}' +
      '.rv-cardbox.rv-out{transform:translateX(46px);opacity:0;}' +
      '.rv-cardtext{font-size:16px;font-weight:600;color:#fff;margin:0 0 4px;word-break:break-word;}' +
      '.rv-cardmeta{font-size:12px;color:#9db2cc;margin:0;}' +
      '.rv-reason{display:flex;gap:8px;align-items:flex-start;background:rgba(232,161,61,.08);border-radius:8px;' +
      'padding:10px 12px;margin:0 0 14px;font-size:13.5px;color:#f2d9ae;}' +
      '.rv-actions{display:flex;flex-direction:column;gap:8px;}' +
      '.rv-btn{appearance:none;border:1px solid rgba(255,255,255,.15);background:#152c4e;color:#e8eef7;' +
      'border-radius:9px;padding:12px 16px;font-size:14.5px;cursor:pointer;text-align:left;transition:background .15s,border-color .15s;}' +
      '.rv-btn:hover{background:#1b3760;border-color:rgba(255,255,255,.3);}' +
      '.rv-btn.rv-primary{background:linear-gradient(180deg,#e8a13d,#d18a26);border-color:#e8a13d;color:#1a1206;font-weight:700;}' +
      '.rv-btn.rv-primary:hover{filter:brightness(1.08);}' +
      '.rv-btn.rv-ghost{background:transparent;border-color:rgba(255,255,255,.12);color:#9db2cc;}' +
      '.rv-btn:disabled{opacity:.45;cursor:default;}' +
      '.rv-row{display:flex;gap:8px;flex-wrap:wrap;}' +
      '.rv-row .rv-btn{flex:1;min-width:130px;text-align:center;}' +
      '.rv-counter{font-size:12.5px;color:#9db2cc;text-align:right;margin:0 0 8px;}' +
      '.rv-counter b{color:#e8a13d;}' +
      '.rv-more{margin-top:6px;}' +
      '.rv-summary-line{display:flex;justify-content:space-between;padding:9px 2px;border-bottom:1px dashed rgba(255,255,255,.08);font-size:14px;}' +
      '.rv-summary-line b{color:#e8a13d;}' +
      '.rv-close{position:absolute;top:14px;right:16px;background:none;border:none;color:#9db2cc;font-size:20px;cursor:pointer;}' +
      '.rv-panel{position:relative;}' +
      '.rv-field{margin:0 0 14px;}' +
      '.rv-field label{display:block;font-size:12.5px;color:#9db2cc;margin:0 0 5px;}' +
      '.rv-field select,.rv-field input{width:100%;background:#0d1e36;border:1px solid rgba(255,255,255,.15);' +
      'border-radius:8px;color:#e8eef7;padding:10px 12px;font-size:14.5px;}' +
      '.rv-tip{font-size:12.5px;color:#7f95b3;margin:14px 0 0;}' +
      '#rvHeaderBtn.rv-today{border-color:rgba(232,161,61,.7)!important;box-shadow:0 0 10px rgba(232,161,61,.35);}' +
      '@media (prefers-reduced-motion: reduce){.rv-cardbox,.rv-progress i{transition:none;}}' +
      '@media (max-width:520px){.rv-diag{grid-template-columns:1fr;}.rv-panel{padding:20px 16px;}}';
    var style = document.createElement('style');
    style.id = 'rv-styles';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ===== 8. UI — COMPONENTES BÁSICOS =====
  var overlayEl = null;

  function closeOverlay() {
    if (overlayEl && overlayEl.parentNode) overlayEl.parentNode.removeChild(overlayEl);
    overlayEl = null;
    document.removeEventListener('keydown', escListener);
  }
  function escListener(e) { if (e.key === 'Escape') requestClose(); }

  var session = null; // estado da revisão em andamento

  function requestClose() {
    if (session && session.decisions.length > 0 && !session.finished) {
      var n = session.decisions.filter(function (d) { return d.action !== 'keep'; }).length;
      if (n > 0) {
        openPanel(function (panel) {
          panel.appendChild(elH('p', 'rv-eyebrow', 'Revis\u00E3o Semanal'));
          panel.appendChild(elH('h2', '', 'Sair da revis\u00E3o?'));
          panel.appendChild(elH('p', 'rv-sub', 'Voc\u00EA j\u00E1 tomou ' + n + ' decis' + (n === 1 ? '\u00E3o' : '\u00F5es') + '. Quer aplicar antes de sair?'));
          var row = elH('div', 'rv-actions');
          row.appendChild(btn('Aplicar decis\u00F5es e sair', 'rv-btn rv-primary', function () { finishReview(); }));
          row.appendChild(btn('Descartar e sair', 'rv-btn rv-ghost', function () { session = null; closeOverlay(); }));
          row.appendChild(btn('Voltar para a revis\u00E3o', 'rv-btn', function () { renderCurrentStep(); }));
          panel.appendChild(row);
        });
        return;
      }
    }
    session = null;
    closeOverlay();
  }

  function openPanel(builder) {
    injectStyles();
    if (!overlayEl) {
      overlayEl = document.createElement('div');
      overlayEl.className = 'rv-overlay';
      overlayEl.addEventListener('mousedown', function (e) { if (e.target === overlayEl) requestClose(); });
      document.body.appendChild(overlayEl);
      document.addEventListener('keydown', escListener);
    }
    overlayEl.innerHTML = '';
    var panel = document.createElement('div');
    panel.className = 'rv-panel';
    var x = btn('\u00D7', 'rv-close', requestClose);
    panel.appendChild(x);
    builder(panel);
    overlayEl.appendChild(panel);
    return panel;
  }

  function elH(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function btn(text, cls, onClick) {
    var b = elH('button', cls, text);
    b.type = 'button';
    b.addEventListener('click', onClick);
    return b;
  }

  // ===== 9. UI — CONFIGURAÇÃO DO RITUAL =====
  function renderSetup(afterSave) {
    var cfg = getConfig() || { day: 5, time: '17:00' };
    openPanel(function (panel) {
      panel.appendChild(elH('p', 'rv-eyebrow', 'Revis\u00E3o Semanal'));
      panel.appendChild(elH('h2', '', 'Quando \u00E9 o seu ritual?'));
      panel.appendChild(elH('p', 'rv-sub', 'Escolha o dia e a hora da sua revis\u00E3o. \u00C9 flex\u00EDvel: voc\u00EA pode mudar quando quiser, e pode revisar em qualquer outro momento tamb\u00E9m.'));

      var fDay = elH('div', 'rv-field');
      fDay.appendChild(elH('label', '', 'Dia da semana'));
      var sel = document.createElement('select');
      DAY_NAMES.forEach(function (name, i) {
        var opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = name + (i === 5 ? ' (fim de tarde \u2014 sua escolha atual)' : '');
        if (i === cfg.day) opt.selected = true;
        sel.appendChild(opt);
      });
      fDay.appendChild(sel);
      panel.appendChild(fDay);

      var fTime = elH('div', 'rv-field');
      fTime.appendChild(elH('label', '', 'Hor\u00E1rio'));
      var inp = document.createElement('input');
      inp.type = 'time';
      inp.value = cfg.time || '17:00';
      fTime.appendChild(inp);
      panel.appendChild(fTime);

      var row = elH('div', 'rv-actions');
      row.appendChild(btn('Salvar ritual', 'rv-btn rv-primary', function () {
        saveConfig({ day: parseInt(sel.value, 10), time: inp.value || '17:00', createdAt: cfg.createdAt || Date.now() });
        updateHeaderBadge();
        if (typeof afterSave === 'function') afterSave();
        else closeOverlay();
      }));
      panel.appendChild(row);
      panel.appendChild(elH('p', 'rv-tip', 'No dia do ritual, o bot\u00E3o \uD83E\uDDF9 Revis\u00E3o ganha um brilho suave para lembrar voc\u00EA \u2014 sem alarme, sem culpa.'));
    });
  }

  // ===== 10. UI — FLUXO DA REVISÃO =====
  function startReview() {
    var data = scan();
    session = {
      data: data,
      queue: buildQueue(data),
      queueIndex: 0,
      decisions: [],
      resolvedCount: 0,
      finished: false,
      startedAt: Date.now()
    };
    renderDiagnostics();
  }

  function buildQueue(data) {
    // Ordem pedagógica: vitórias fáceis primeiro (dopamina), depois fantasmas, depois Talvez antigo
    var q = [];
    data.completedOnBoard.slice(0, BATCH_SIZE).forEach(function (it) { q.push(it); });
    data.staleCards.slice(0, BATCH_SIZE).forEach(function (it) { q.push(it); });
    data.somedayOld.slice(0, BATCH_SIZE).forEach(function (it) { q.push(it); });
    return q;
  }

  function remainingBeyondBatch(data) {
    var extra = 0;
    extra += Math.max(0, data.completedOnBoard.length - BATCH_SIZE);
    extra += Math.max(0, data.staleCards.length - BATCH_SIZE);
    extra += Math.max(0, data.somedayOld.length - BATCH_SIZE);
    return extra;
  }

  function renderCurrentStep() {
    if (!session) return;
    if (session.queueIndex >= session.queue.length) renderSummary();
    else renderSuggestion();
  }

  function renderDiagnostics() {
    var d = session.data;
    var cfg = getConfig();
    openPanel(function (panel) {
      panel.appendChild(elH('p', 'rv-eyebrow', 'Etapa 1 \u00B7 Diagn\u00F3stico'));
      panel.appendChild(elH('h2', '', 'Como est\u00E1 o seu quadro'));
      var log = getLog();
      var subText = log.length === 0
        ? 'Sua primeira revis\u00E3o. Vamos com calma: hoje resolvemos no m\u00E1ximo ' + BATCH_SIZE + ' cart\u00F5es por grupo.'
        : 'Revis\u00E3o n\u00BA ' + (log.length + 1) + '. O sistema sugere, voc\u00EA decide.';
      panel.appendChild(elH('p', 'rv-sub', subText));

      var grid = elH('div', 'rv-diag');
      grid.appendChild(stat(d.completedThisWeek, 'conclu\u00EDdos nos \u00FAltimos 7 dias', true));
      grid.appendChild(stat(d.activeCount, 'cart\u00F5es ativos no total'));
      grid.appendChild(stat(d.completedOnBoard.length, 'vit\u00F3rias prontas pra guardar', true));
      grid.appendChild(stat(d.staleCards.length, 'aguardando uma decis\u00E3o sua'));
      if (d.somedayOld.length > 0) {
        grid.appendChild(stat(d.somedayOld.length, 'no Talvez um Dia h\u00E1 1+ m\u00EAs'));
      }
      panel.appendChild(grid);

      var row = elH('div', 'rv-actions');
      if (session.queue.length === 0) {
        panel.appendChild(elH('p', 'rv-sub', '\u2728 Tudo em ordem! Nenhum cart\u00E3o precisa de decis\u00E3o hoje.'));
        row.appendChild(btn('Ver resumo da semana', 'rv-btn rv-primary', function () { renderSummary(); }));
      } else {
        row.appendChild(btn('Come\u00E7ar a limpeza \u2192 (' + session.queue.length + ' sugest' + (session.queue.length === 1 ? '\u00E3o' : '\u00F5es') + ')', 'rv-btn rv-primary', function () { renderSuggestion(); }));
      }
      row.appendChild(btn('\u2699 Mudar dia/hora do ritual', 'rv-btn rv-ghost', function () {
        renderSetup(function () { renderDiagnostics(); });
      }));
      panel.appendChild(row);
      if (cfg) {
        panel.appendChild(elH('p', 'rv-tip', 'Seu ritual: toda ' + DAY_NAMES[cfg.day] + ' \u00E0s ' + cfg.time + '. Flex\u00EDvel \u2014 revise quando fizer sentido para voc\u00EA.'));
      }
    });

    function stat(num, label, ok) {
      var s = elH('div', 'rv-stat' + (ok ? ' rv-ok' : ''));
      s.appendChild(elH('b', '', String(num)));
      s.appendChild(elH('span', '', label));
      return s;
    }
  }

  function suggestionCopy(item) {
    var boardName = session.data.boardNames[item.boardId] || item.boardId;
    if (item.kind === 'completed') {
      return {
        reason: '\u2705 Este cart\u00E3o j\u00E1 foi conclu\u00EDdo, mas continua no quadro "' + boardName + '".',
        lesson: 'Cart\u00E3o conclu\u00EDdo a gente celebra e guarda: ele vai para o ' + HIST_NAME + ', onde sua hist\u00F3ria de vit\u00F3rias fica registrada.',
        primary: { label: '\u2713 Mover para o ' + HIST_NAME, action: 'historico' }
      };
    }
    if (item.kind === 'somedayOld') {
      return {
        reason: '\uD83C\uDF19 Este cart\u00E3o est\u00E1 no Talvez um Dia h\u00E1 ' + (item.weeks || 4) + ' semanas sem movimento.',
        lesson: 'Uma vez por m\u00EAs vale perguntar: isso ainda faz sentido? Voltar, guardar mais um pouco ou soltar \u2014 qualquer resposta \u00E9 v\u00E1lida.',
        primary: { label: '\u2713 Manter guardado por enquanto', action: 'keep' },
        extra: { label: '\u21A9 Voltar para um quadro ativo? Use "Reativar"', action: null }
      };
    }
    if (item.kind === 'unknownAge') {
      return {
        reason: '\uD83D\uDC7B N\u00E3o sei h\u00E1 quanto tempo este cart\u00E3o est\u00E1 parado em "' + boardName + '" \u2014 ele n\u00E3o tem registro de movimento.',
        lesson: 'Cart\u00E3o parado a gente arquiva: ele vai para o ' + TALVEZ_NAME + ', sem sumir. Se um dia fizer sentido, \u00E9 s\u00F3 trazer de volta.',
        primary: { label: '\u2713 Arquivar em ' + TALVEZ_NAME, action: 'talvez' }
      };
    }
    return {
      reason: '\uD83D\uDC7B Este cart\u00E3o est\u00E1 parado h\u00E1 ' + (item.weeks || 3) + ' semanas em "' + boardName + '".',
      lesson: 'Cart\u00E3o parado a gente arquiva: ele vai para o ' + TALVEZ_NAME + ', sem sumir. Quadro limpo \u00E9 quadro que anda.',
      primary: { label: '\u2713 Arquivar em ' + TALVEZ_NAME, action: 'talvez' }
    };
  }

  function renderSuggestion() {
    var item = session.queue[session.queueIndex];
    if (!item) { renderSummary(); return; }
    var copy = suggestionCopy(item);
    var total = session.queue.length;
    var pos = session.queueIndex + 1;

    openPanel(function (panel) {
      panel.appendChild(elH('p', 'rv-eyebrow', 'Etapa 2 \u00B7 Sugest\u00F5es'));
      var counter = elH('p', 'rv-counter', '');
      counter.innerHTML = 'Cart\u00E3o ' + pos + ' de ' + total + ' \u00B7 resolvidos: <b>' + session.resolvedCount + '</b>';
      panel.appendChild(counter);
      var prog = elH('div', 'rv-progress');
      var bar = elH('i', '', '');
      bar.style.width = Math.round(((pos - 1) / total) * 100) + '%';
      prog.appendChild(bar);
      panel.appendChild(prog);

      var box = elH('div', 'rv-cardbox');
      box.appendChild(elH('p', 'rv-cardtext', item.card.text || '(cart\u00E3o sem texto)'));
      var metaTxt = (session.data.boardNames[item.boardId] || item.boardId) + (item.listTitle ? ' \u00B7 lista "' + item.listTitle + '"' : '');
      box.appendChild(elH('p', 'rv-cardmeta', metaTxt));
      panel.appendChild(box);

      var reason = elH('div', 'rv-reason');
      var rTxt = elH('div', '', '');
      rTxt.appendChild(elH('div', '', copy.reason));
      var lesson = elH('div', '', copy.lesson);
      lesson.style.marginTop = '6px';
      lesson.style.opacity = '.85';
      rTxt.appendChild(lesson);
      reason.appendChild(rTxt);
      panel.appendChild(reason);

      var actions = elH('div', 'rv-actions');
      actions.appendChild(btn(copy.primary.label, 'rv-btn rv-primary', function () {
        decide(item, copy.primary.action, box);
      }));

      var row = elH('div', 'rv-row');
      row.appendChild(btn('\u23ED Deixar como est\u00E1', 'rv-btn rv-ghost', function () {
        decide(item, 'keep', box);
      }));
      row.appendChild(btn('\u21A9 Reativar (mexo essa semana)', 'rv-btn', function () {
        decide(item, 'reactivate', box);
      }));
      actions.appendChild(row);

      var row2 = elH('div', 'rv-row');
      if (item.kind !== 'completed') {
        row2.appendChild(btn('\uD83C\uDFC6 Foi conclu\u00EDdo, na verdade', 'rv-btn', function () {
          item.card.completed = 'true';
          decide(item, 'historico', box);
        }));
      }
      if (copy.primary.action !== 'talvez' && item.kind !== 'somedayOld') {
        row2.appendChild(btn('\uD83C\uDF19 Arquivar em Talvez um Dia', 'rv-btn', function () {
          decide(item, 'talvez', box);
        }));
      }
      row2.appendChild(btn('\uD83D\uDDD1 Lixeira', 'rv-btn', function () {
        decide(item, 'trash', box);
      }));
      actions.appendChild(row2);
      panel.appendChild(actions);
    });
  }

  function decide(item, action, boxEl) {
    session.decisions.push({ card: item.card, boardId: item.boardId, action: action });
    if (action !== 'keep') session.resolvedCount++;
    if (boxEl) boxEl.classList.add('rv-out');
    setTimeout(function () {
      if (!session) return;
      session.queueIndex++;
      renderCurrentStep();
    }, 240);
  }

  function renderSummary() {
    var d = session.data;
    var extra = remainingBeyondBatch(d);
    var counts = { historico: 0, talvez: 0, trash: 0, reactivate: 0, keep: 0 };
    session.decisions.forEach(function (dec) { counts[dec.action] = (counts[dec.action] || 0) + 1; });
    var activeAfter = d.activeCount - counts.talvez - counts.trash;
    var log = getLog();

    openPanel(function (panel) {
      panel.appendChild(elH('p', 'rv-eyebrow', 'Etapa 3 \u00B7 Resumo'));
      panel.appendChild(elH('h2', '', session.resolvedCount > 0 ? 'Quadro respirando de novo \uD83C\uDF05' : 'Revis\u00E3o feita \uD83C\uDF05'));
      panel.appendChild(elH('p', 'rv-sub', 'O que aconteceu nesta revis\u00E3o:'));

      addLine(panel, 'Conclu\u00EDdos nos \u00FAltimos 7 dias', d.completedThisWeek);
      if (counts.historico) addLine(panel, 'Guardados no ' + HIST_NAME, counts.historico);
      if (counts.talvez) addLine(panel, 'Arquivados no ' + TALVEZ_NAME, counts.talvez);
      if (counts.reactivate) addLine(panel, 'Reativados para esta semana', counts.reactivate);
      if (counts.trash) addLine(panel, 'Enviados \u00E0 lixeira', counts.trash);
      addLine(panel, 'Cart\u00F5es ativos: ' + d.activeCount + ' \u2192', activeAfter);
      addLine(panel, 'Total de revis\u00F5es feitas (sempre cresce)', log.length + 1);

      if (extra > 0) {
        panel.appendChild(elH('p', 'rv-tip', 'Ainda h\u00E1 ' + extra + ' cart' + (extra === 1 ? '\u00E3o' : '\u00F5es') + ' aguardando decis\u00E3o \u2014 ficam para a pr\u00F3xima revis\u00E3o. Um passo de cada vez.'));
      }

      var row = elH('div', 'rv-actions');
      row.style.marginTop = '16px';
      row.appendChild(btn('Concluir revis\u00E3o \u2713', 'rv-btn rv-primary', function () { finishReview(); }));
      if (extra > 0) {
        row.appendChild(btn('Estou no embalo: resolver mais ' + Math.min(extra, BATCH_SIZE * 3), 'rv-btn rv-more', function () {
          extendQueue();
        }));
      }
      panel.appendChild(row);
    });

    function addLine(panel, label, value) {
      var line = elH('div', 'rv-summary-line');
      line.appendChild(elH('span', '', label));
      line.appendChild(elH('b', '', String(value)));
      panel.appendChild(line);
    }
  }

  function extendQueue() {
    var d = session.data;
    var decided = {};
    session.decisions.forEach(function (dec) { decided[dec.card.id] = true; });
    var add = [];
    function pushExtra(arr) {
      arr.forEach(function (it) {
        if (!decided[it.card.id] && session.queue.indexOf(it) === -1 && add.length < BATCH_SIZE * 3) add.push(it);
      });
    }
    pushExtra(d.completedOnBoard); pushExtra(d.staleCards); pushExtra(d.somedayOld);
    session.queue = session.queue.concat(add);
    renderCurrentStep();
  }

  function finishReview() {
    if (!session) { closeOverlay(); return; }
    session.finished = true;
    var counts = { historico: 0, talvez: 0, trash: 0, reactivate: 0, keep: 0 };
    session.decisions.forEach(function (dec) { counts[dec.action] = (counts[dec.action] || 0) + 1; });

    applyDecisions(session.decisions);

    // Recompensa por sessão (camada 3 do fix do cemitério do inbox):
    // organizar o quadro É trabalho e merece Ouro. Anti-farming: 1x/dia, teto 10.
    try {
      if (session.resolvedCount > 0 &&
          typeof grantOuro === 'function' &&
          typeof isAddonOn === 'function' && isAddonOn('economy')) {
        var rewardKey = 'tea-planner-revisao-reward-day';
        var hoje = new Date();
        var hojeStr = hoje.getFullYear() + '-' + (hoje.getMonth() + 1) + '-' + hoje.getDate();
        if (localStorage.getItem(rewardKey) !== hojeStr) {
          grantOuro(Math.min(session.resolvedCount, 10), 'Sess\u00E3o de Revis\u00E3o Semanal');
          localStorage.setItem(rewardKey, hojeStr);
        }
      }
    } catch (e) { /* economia desligada ou indisponível: revisão funciona igual */ }

    var log = getLog();
    log.push({
      date: Date.now(),
      resolved: session.resolvedCount,
      historico: counts.historico,
      talvez: counts.talvez,
      trash: counts.trash,
      reactivated: counts.reactivate,
      completedThisWeek: session.data.completedThisWeek,
      activeBefore: session.data.activeCount,
      activeAfter: session.data.activeCount - counts.talvez - counts.trash
    });
    saveLog(log);

    session = null;
    closeOverlay();
    // Recarrega para o app re-renderizar tudo a partir do armazenamento
    setTimeout(function () { location.reload(); }, 60);
  }

  // ===== 11. BOTÃO NO CABEÇALHO + LEMBRETE CALMO =====
  function updateHeaderBadge() {
    var b = document.getElementById('rvHeaderBtn');
    if (!b) return;
    var cfg = getConfig();
    var isToday = cfg && new Date().getDay() === cfg.day;
    b.classList.toggle('rv-today', !!isToday);
    b.title = cfg
      ? ('Revis\u00E3o Semanal \u2014 ritual: ' + DAY_NAMES[cfg.day] + ' \u00E0s ' + cfg.time + (isToday ? ' (hoje!)' : ''))
      : 'Revis\u00E3o Semanal \u2014 clique para configurar seu ritual';
  }

  function injectButton() {
    if (document.getElementById('rvHeaderBtn')) return;
    var b = document.createElement('button');
    b.id = 'rvHeaderBtn';
    b.textContent = '\uD83E\uDDF9 Revis\u00E3o'; // 🧹
    b.style.background = 'rgba(232,161,61,.12)';
    b.style.borderColor = 'rgba(232,161,61,.4)';
    b.addEventListener('click', function () {
      if (!getConfig()) renderSetup(function () { startReview(); });
      else startReview();
    });
    var anchor = document.getElementById('manualFocusBtn');
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(b, anchor.nextSibling);
    else {
      var header = document.querySelector('header');
      if (header) header.appendChild(b); else document.body.appendChild(b);
    }
    updateHeaderBadge();
  }

  // ===== 12. INICIALIZAÇÃO =====
  function init() {
    injectStyles();
    injectButton();
    // Scan silencioso na carga: alimenta o registro de idade dos cartões
    try { updateRegistry(); } catch (e) { }
    // Atualiza o brilho do lembrete ao virar o dia (checagem leve por hora)
    setInterval(updateHeaderBadge, 3600 * 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // API pública mínima (permite integração futura com o assistente de IA do app)
  window.RevisaoSemanal = {
    open: function () { var b = document.getElementById('rvHeaderBtn'); if (b) b.click(); },
    scan: scan,
    _applyDecisions: applyDecisions // interno: testes e integração futura com a IA do app
  };
})();
