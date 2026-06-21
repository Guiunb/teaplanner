(function () {
  // ===== 1. DEFINIÇÕES E CONFIGURAÇÕES GLOBAIS =====
  const CONFIG = {
    keys: {
      LS: 'mini-trello-restore',
      LABELS: 'tea-planner-labels',
      QUICK: 'tea-planner-quick-config',
      STATE_AGENDA: 'mini-trello-agenda-state',
      STATE_BOARD: 'mini-trello-board-state',
      STATE_MATRIX: 'mini-trello-matrix-state',
      STATE_WEEKLY: 'mini-trello-weekly-state'
    },
    histLimit: 120
  };

  // Variáveis de Estado
  var allCards = [];
  var globalTimerInterval = null;
  var selected = new Set();
  var lastMouseX = 0, lastMouseY = 0;
  var agendaClipboard = [];
  var selectedColors = new Set();
  var hist = [], cursor = -1;
  var __persistTick = null, __muteHistory = 0;
  var ctxTarget = null, listCtxTarget = null;
  var dragState = null, draggingList = null, lastAnchor = null;

  // Variáveis de Pan
  let isPanning = false, startX, startY, scrollLeft, scrollTop;

  // Referências DOM (garantidas pois o script corre no final do body)
  const boardEl = document.getElementById('board');
  const schedule = document.getElementById('schedule');
  const slotsRoot = document.getElementById('slots');
  const matrixEl = document.getElementById('matrix');
  const sumTimersDisplay = document.getElementById('sumTimersDisplay');
  const agendaSidebar = document.getElementById('agenda-sidebar');
  const mainContent = document.getElementById('main-content');
  const toggleAgendaBtn = document.getElementById('toggleAgendaBtn');
  const toggleBoardBtn = document.getElementById('toggleBoardBtn');
  const toggleMatrixBtn = document.getElementById('toggleMatrixBtn');
  const toggleWeeklyBtn = document.getElementById('toggleWeeklyBtn');
  const boardContainer = document.querySelector('.board-container');
  const matrixContainer = document.querySelector('.matrix-container');
  const weeklyContainer = document.querySelector('.weekly-container');
  const weeklyGrid = document.getElementById('weeklyGrid');
  const quickConfigToggle = document.getElementById('quickConfigToggle');
  const ctx = document.getElementById('ctx');
  const ctxMoveSub = document.getElementById('ctx-move-sub');
  const ctxMoveAllSub = document.getElementById('ctx-moveall-sub');
  const listCtx = document.getElementById('ctx-list');
  const listMoveSub = document.getElementById('ctx-list-move-sub');
  const agendaDateInput = document.getElementById('agendaDate');

  var MATRIX_COLORS = { Q1: '#104239', Q2: '#0e3155', Q3: '#5a4014', Q4: '#5a1419' };
  var customColorLabels = JSON.parse(localStorage.getItem(CONFIG.keys.LABELS)) || {
    '#5dade2': 'Azul claro (Krav Maga)', '#f9e79f': 'Amarelo claro (GDF)', '#f5b041': 'Laranja (Pessoal)',
    '#1abc9c': 'Verde-água', '#8e44ad': 'Lilás', '#1f3a93': 'Azul escuro', '#2c3e50': 'Grafite', '#48c9b0': 'Turquesa'
  };

  // ===== 2. FUNÇÕES AUXILIARES =====
  function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }
  function $$(s, r) { if (!r) r = document; return Array.prototype.slice.call(r.querySelectorAll(s)); }
  function to2(n) { return (n < 10 ? '0' + n : '' + n); }
  function withMute(fn) { __muteHistory++; try { return fn(); } finally { __muteHistory--; } }
  function formatSecondsToTime(totalSeconds) {
    if (totalSeconds <= 0) return '0:00 min';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours > 0 ? hours + ':' : ''}${to2(minutes)} min`;
  }
  function saveCustomLabels() { localStorage.setItem(CONFIG.keys.LABELS, JSON.stringify(customColorLabels)); }
  function getActiveDay() { return (agendaDateInput && agendaDateInput.value) ? agendaDateInput.value : new Date().toISOString().slice(0, 10); }

  // FUNÇÃO DE ÁUDIO (Beep)
  function playBeep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // Mi 5
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      oscillator.start(audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.warn("Áudio não disponível ou bloqueado pelo navegador", e);
    }
  }

  // ===== 3. LÓGICA CORE (Persistência, Undo, Filtros) =====
  function persist() {
    if (__muteHistory > 0) return;
    clearTimeout(__persistTick);
    __persistTick = setTimeout(function () {
      try { localStorage.setItem(CONFIG.keys.LS, JSON.stringify(serialize())); } catch (e) { }
    }, 250);
  }

  function cardToData(c) {
    var t = c.querySelector('.text');
    return { text: (t ? t.textContent : '').trim(), color: c.dataset.color || '', due: c.dataset.due || '', when: c.dataset.when || '', timerTotal: c.dataset.timerTotal || '', timerLeft: c.dataset.timerLeft || '', timerState: c.dataset.timerState || '', completed: c.dataset.completed || 'false' };
  }

  function serialize() {
    var data = [];
    $$('.list[data-type="kanban"]', boardEl).forEach(function (l) {
      const title = l.querySelector('.title').value;
      const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === c)).filter(Boolean).map(cardToData);
      data.push({ type: 'kanban', title: title, cards: cardsInList });
    });
    if (matrixEl) {
      $$('.list[data-type="quad"]', matrixEl).forEach(function (l) {
        const quad = l.dataset.quad;
        const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === c)).filter(Boolean).map(cardToData);
        data.push({ type: 'quad', quad: quad, cards: cardsInList });
      });
    }
    const agendaGoalCards = allCards.filter(c => c.dataset.when && c.dataset.when.endsWith('TGOAL')).map(cardToData);
    if (agendaGoalCards.length > 0) { data.push({ type: 'goal', goal: true, cards: agendaGoalCards }); }
    const agendaTimeCards = {};
    allCards.filter(c => c.dataset.when && /T\d{2}:\d{2}$/.test(c.dataset.when)).forEach(c => {
      const time = c.dataset.when.substring(11);
      if (!agendaTimeCards[time]) agendaTimeCards[time] = [];
      agendaTimeCards[time].push(cardToData(c));
    });
    for (const time in agendaTimeCards) { data.push({ type: 'time', time: time, cards: agendaTimeCards[time] }); }
    return data;
  }

  function updateUndoUi() { document.getElementById('undo').disabled = !canUndo(); document.getElementById('redo').disabled = !canRedo(); }
  function canUndo() { return cursor > 0; }
  function canRedo() { return cursor >= 0 && cursor < hist.length - 1; }
  function pushHistory(snap) { hist = hist.slice(0, cursor + 1); hist.push(snap); if (hist.length > CONFIG.histLimit) { hist.shift(); } cursor = hist.length - 1; updateUndoUi(); }
  function capture() { if (__muteHistory > 0) return; try { pushHistory(serialize()); } catch (e) { } }
  function doUndo() { if (!canUndo()) return; withMute(function () { cursor--; restore(hist[cursor]); }); updateUndoUi(); }
  function doRedo() { if (!canRedo()) return; withMute(function () { cursor++; restore(hist[cursor]); }); updateUndoUi(); }

  function cardPassesFilters(c) {
    var fFrom = (document.getElementById('fFrom').value) || '';
    var fTo = (document.getElementById('fTo').value) || '';
    var fTime = document.getElementById('fTime').value;
    var ok = true;
    if (selectedColors.size > 0) { ok = ok && selectedColors.has((c.dataset.color || '').toLowerCase()); }
    if (fFrom) { ok = ok && (!!c.dataset.due && c.dataset.due >= fFrom); }
    if (fTo) { ok = ok && (!!c.dataset.due && c.dataset.due <= fTo); }
    if (fTime) {
      var maxMins = 0;
      var hoursMatch = fTime.match(/(\d+)\s*h/); var minutesMatch = fTime.match(/(\d+)\s*m/);
      if (hoursMatch) maxMins += parseInt(hoursMatch[1], 10) * 60;
      if (minutesMatch) maxMins += parseInt(minutesMatch[1], 10);
      if (!hoursMatch && !minutesMatch && /^\d+$/.test(fTime)) maxMins = parseInt(fTime, 10);
      if (maxMins > 0) {
        var cardMins = Math.round(parseInt(c.dataset.timerTotal || '0', 10) / 60);
        ok = ok && (cardMins > 0 && cardMins <= maxMins);
      }
    }
    return ok;
  }

  function applyFilters() {
    allCards.forEach(function (c) {
      const passesGeneralFilters = cardPassesFilters(c);
      if (!c.dataset.when || !c.dataset.when.includes('T')) {
        c.style.display = passesGeneralFilters ? '' : 'none';
      }
    });
    updateSlotsHasItems();
    var total = allCards.length;
    var hidden = $$('.card[style*="display: none"]').length;
    var badge = document.getElementById('filtersOn');
    var header = document.getElementById('appHeader');
    if (selectedColors.size > 0 || !!document.getElementById('fFrom').value || !!document.getElementById('fTo').value || !!document.getElementById('fTime').value) {
      badge.textContent = hidden > 0 ? ('Filtros: ' + hidden + ' oculto' + (hidden > 1 ? 's' : '')) : 'Filtros ativos';
      badge.hidden = false; header.classList.add('filters-active');
    } else {
      badge.hidden = true; header.classList.remove('filters-active');
    }
  }

  // ===== 4. UI & COMPONENTES =====
  function updateTotalTimerDisplay() {
    let selectedSeconds = 0, visibleSeconds = 0, totalSecondsAll = 0;
    if (selected.size > 0) selected.forEach(c => selectedSeconds += parseInt(c.dataset.timerTotal || '0', 10));
    allCards.forEach(c => {
      const t = parseInt(c.dataset.timerTotal || '0', 10); totalSecondsAll += t;
      const style = window.getComputedStyle(c);
      if (style.display !== 'none' && style.visibility !== 'hidden') visibleSeconds += t;
    });
    const txt = selected.size > 0 ? formatSecondsToTime(selectedSeconds) : formatSecondsToTime(visibleSeconds);
    sumTimersDisplay.textContent = txt;
    sumTimersDisplay.title = `Selecionado: ${formatSecondsToTime(selectedSeconds)} / Filtrado: ${formatSecondsToTime(visibleSeconds)} / Total: ${formatSecondsToTime(totalSecondsAll)}`;
  }

  function updateSlotsHasItems() {
    const day = getActiveDay();
    const dayPrefixGoal = day + 'TGOAL';
    const dayPrefixTime = day + 'T';
    const goalSlot = slotsRoot.querySelector('.goal-slot');
    const goalContainer = goalSlot ? goalSlot.querySelector('.cards') : null;
    if (goalContainer) goalContainer.innerHTML = '';
    let goalHasVisible = false;

    allCards.forEach(card => {
      if (card.dataset.when === dayPrefixGoal && cardPassesFilters(card)) {
        if (goalContainer) goalContainer.appendChild(card);
        goalHasVisible = true;
      }
    });
    if (goalSlot) goalSlot.classList.toggle('has-items', goalHasVisible);

    $$('.list.slot', schedule).forEach(slot => {
      const time = slot.dataset.time;
      const container = slot.querySelector('.cards');
      container.innerHTML = '';
      let hasVisible = false;
      const targetWhen = dayPrefixTime + time;
      allCards.forEach(card => {
        if (card.dataset.when === targetWhen && cardPassesFilters(card)) {
          container.appendChild(card);
          hasVisible = true;
        }
      });
      slot.classList.toggle('has-items', hasVisible);
    });

    // Ensure non-agenda cards are visible in their lists if not filtered
    $$('.board .card, .matrix .card').forEach(c => {
      if (c.dataset.when && c.dataset.when.includes('T')) { c.style.display = 'none'; }
      else if (cardPassesFilters(c)) { c.style.display = ''; }
      else { c.style.display = 'none'; }
    });
    updateTotalTimerDisplay();
  }

  function updateTimerDisplay(card) {
    const disp = card.querySelector('.timer-display');
    if (!disp) return;
    const progressContainer = card.querySelector('.timer-progress-container');
    const progressBar = card.querySelector('.timer-progress-bar');

    const totalSeconds = parseInt(card.dataset.timerTotal || '0', 10);
    card.classList.remove('timer-running', 'timer-finished');

    if (totalSeconds > 0) {
      const state = card.dataset.timerState || 'stopped';
      let seconds = parseInt(card.dataset.timerLeft, 10);
      if (isNaN(seconds)) seconds = totalSeconds;

      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      disp.textContent = `⏱️ ${to2(mins)}:${to2(secs)}`;

      // Atualiza barra de progresso
      if (progressBar) {
        const perc = (seconds / totalSeconds) * 100;
        progressBar.style.width = perc + '%';
      }

      if (state === 'running') {
        disp.style.color = '#66bb6a';
        disp.style.background = 'rgba(102, 187, 106, 0.2)';
        card.classList.add('timer-running');
      } else if (state === 'paused') {
        disp.style.color = '#ffa726';
        disp.style.background = 'rgba(255, 167, 38, 0.2)';
      } else if (state === 'finished') {
        disp.style.color = '#ef5350';
        disp.style.background = 'rgba(239, 83, 80, 0.2)';
        card.classList.add('timer-finished');
        if (progressBar) progressBar.style.width = '100%';
      } else {
        const totalMins = Math.round(totalSeconds / 60);
        disp.textContent = `⏳ ${totalMins} min`;
        disp.style.color = '';
        disp.style.background = 'rgba(0,0,0,.2)';
        if (progressBar) progressBar.style.width = '0%';
      }
    } else {
      disp.textContent = '';
    }
  }

  // ... (Modal, Color, Date, Timer functions - Consolidated)
  function showModal(title, builder, onOk) {
    var wrap = el('div', 'modal-wrap'); var box = el('div', 'modal'); var h = el('h3'); h.textContent = title; box.appendChild(h); var body = builder(); box.appendChild(body); var row = el('div', 'row'); var cancel = el('button', 'cancel'); cancel.textContent = 'Cancelar'; var ok = el('button', 'ok'); ok.textContent = 'OK'; row.appendChild(cancel); row.appendChild(ok); box.appendChild(row); wrap.appendChild(box); document.body.appendChild(wrap); wrap.setAttribute('tabindex', '-1'); wrap.focus();
    const modalKeyListener = function (e) { if (e.key === 'Enter') { if (document.activeElement.tagName !== 'BUTTON' && !document.activeElement.closest('.import-options')) { e.preventDefault(); ok.click(); } } else if (e.key === 'Escape') { e.preventDefault(); cancel.click(); } };
    wrap.addEventListener('keydown', modalKeyListener);
    cancel.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); document.body.removeChild(wrap); };
    ok.onclick = function () { wrap.removeEventListener('keydown', modalKeyListener); onOk(body, wrap); if (wrap.parentNode === document.body) { document.body.removeChild(wrap); } persist(); };
    var firstInput = body.querySelector('input'); if (firstInput) firstInput.focus();
    return { wrap: wrap, okButton: ok, cancelButton: cancel };
  }

  function showConfirm(message, onYes) { showModal('Confirmação', function () { var d = el('div'); d.textContent = message; return d; }, function () { if (typeof onYes === 'function') onYes(); }); }

  function buildFullPalette() {
    var EXTRA_COLORS = [
      { id: 'krav', name: customColorLabels['#5dade2'] || 'Azul claro', hex: '#5dade2' },
      { id: 'gdf', name: customColorLabels['#f9e79f'] || 'Amarelo claro', hex: '#f9e79f' },
      { id: 'pessoal', name: customColorLabels['#f5b041'] || 'Laranja', hex: '#f5b041' },
      { id: 'teal', name: customColorLabels['#1abc9c'] || 'Verde-água', hex: '#1abc9c' },
      { id: 'lilas', name: customColorLabels['#8e44ad'] || 'Lilás', hex: '#8e44ad' },
      { id: 'navy', name: customColorLabels['#1f3a93'] || 'Azul escuro', hex: '#1f3a93' },
      { id: 'grafite', name: customColorLabels['#2c3e50'] || 'Grafite', hex: '#2c3e50' },
      { id: 'turquesa', name: customColorLabels['#48c9b0'] || 'Turquesa', hex: '#48c9b0' }
    ];
    return [{ id: 'q1', name: 'Verde (Faça agora)', hex: MATRIX_COLORS.Q1, noEdit: true }, { id: 'q2', name: 'Azul (Agende)', hex: MATRIX_COLORS.Q2, noEdit: true }, { id: 'q3', name: 'Âmbar (Delegue)', hex: MATRIX_COLORS.Q3, noEdit: true }, { id: 'q4', name: 'Vermelho (Elimine)', hex: MATRIX_COLORS.Q4, noEdit: true }].concat(EXTRA_COLORS);
  }

  function openColorDialog(cards) {
    if (!cards.length) return;
    var modalElements = showModal('Editar cor', function () {
      var wrap = el('div'); var grid = el('div', 'palette-grid'); grid.style.display = 'grid'; grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))'; grid.style.gap = '8px';
      var PALETTE = [{ id: 'none', name: 'Sem cor', hex: '' }].concat(buildFullPalette());
      PALETTE.forEach(function (p) {
        var b = el('button'); b.type = 'button'; b.style.border = '1px solid #2a4e78'; b.style.borderRadius = '8px'; b.style.padding = '10px'; b.style.cursor = 'pointer'; b.style.background = p.hex || '#0b2240'; b.style.color = '#fff'; b.textContent = p.name; b.dataset.hex = p.hex;
        b.addEventListener('click', function () {
          [].slice.call(grid.querySelectorAll('button')).forEach(function (x) { x.style.outline = ''; }); b.style.outline = '2px solid #fff'; wrap._chosen = p.hex; modalElements.okButton.click();
        });
        if (p.hex === (cards[0].dataset.color || '')) b.style.outline = '2px solid #fff';
        grid.appendChild(b);
      });
      var editor = el('div', 'palette-editor'); var extra = buildFullPalette().filter(p => !p.noEdit);
      extra.forEach(function (p) {
        var row = el('div', 'palette-editor-row'); var swatch = el('div', 'palette-editor-swatch'); swatch.style.background = p.hex; var input = el('input'); input.type = 'text'; input.value = p.name; input.dataset.hex = p.hex; row.appendChild(swatch); row.appendChild(input); editor.appendChild(row);
      });
      wrap.appendChild(grid); wrap.appendChild(editor); return wrap;
    }, function (body, wrap) {
      const editor = body.querySelector('.palette-editor');
      if (editor.classList.contains('editing')) {
        $$('.palette-editor-row input', editor).forEach(input => { customColorLabels[input.dataset.hex] = input.value; });
        saveCustomLabels(); editor.classList.remove('editing'); body.querySelector('.palette-grid').classList.remove('editing'); body.querySelector('.manage-labels-btn').textContent = 'Gerir Etiquetas 🏷️'; modalElements.okButton.textContent = 'OK'; openColorDialog(cards);
      } else {
        var v = (body._chosen === undefined) ? (cards[0].dataset.color || '') : body._chosen;
        cards.forEach(function (c) { c.dataset.color = v || ''; paintCard(c); routeByColor(c, v || ''); });
        applyFilters(); document.body.removeChild(wrap);
      }
      if (editor.classList.contains('editing')) persist();
    });
    const manageBtn = el('button'); manageBtn.textContent = 'Gerir Etiquetas 🏷️'; manageBtn.className = 'manage-labels-btn';
    const editorEl = modalElements.body.querySelector('.palette-editor'); const gridEl = modalElements.body.querySelector('.palette-grid');
    manageBtn.onclick = function (e) { e.preventDefault(); editorEl.classList.toggle('editing'); gridEl.classList.toggle('editing'); const isEditing = editorEl.classList.contains('editing'); manageBtn.textContent = isEditing ? 'Voltar à Seleção' : 'Gerir Etiquetas 🏷️'; modalElements.okButton.textContent = isEditing ? 'Guardar Nomes' : 'OK'; if (isEditing) editorEl.querySelector('input').focus(); };
    modalElements.wrap.querySelector('.row').prepend(manageBtn);
  }

  function openTimerDialog(cards, onOkCallback) {
    if (!cards.length) return;
    var modalElements = showModal('Definir Timer (minutos)', function () {
      var r = el('div'); var timerVal = Math.round(parseInt(cards[0].dataset.timerTotal || '0', 10) / 60) || ''; r.innerHTML = `<label style="display: block;">Tempo (minutos):<input type="number" class="timer-input" placeholder="Ex: 25" value="${timerVal}" style="width:100%; padding:8px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; margin-top: 4px;"></label>`;
      const input = r.querySelector('.timer-input'); if (input) { input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); modalElements.okButton.click(); } }); } return r;
    }, function (r, wrap) {
      var timerMins = r.querySelector('.timer-input').value;
      cards.forEach(function (c) { var newTotal = (parseInt(timerMins, 10) || 0) * 60; c.dataset.timerTotal = newTotal; c.dataset.timerLeft = newTotal; c.dataset.timerState = 'stopped'; c.style.animation = ''; paintCard(c); });
      applyFilters(); updateTotalTimerDisplay(); if (onOkCallback) onOkCallback();
    });
    modalElements.cancelButton.onclick = function () { modalElements.wrap.removeEventListener('keydown', modalElements.modalKeyListener); document.body.removeChild(modalElements.wrap); persist(); }
  }

  function openDateDialog(cards) { if (!cards.length) return; showModal('Editar data', function () { var r = el('div'); var i = el('input'); i.type = 'date'; if (cards[0].dataset.due) i.value = cards[0].dataset.due; r.appendChild(i); return r; }, function (r, wrap) { var v = r.querySelector('input').value; cards.forEach(function (c) { c.dataset.due = v || ''; paintCard(c); }); applyFilters(); }); }

  function openColorFilters() {
    var PALETTE = [{ name: 'Todas', hex: '*' }, { name: 'Sem cor', hex: '' }].concat(buildFullPalette().map(function (p) { return { name: p.name, hex: p.hex }; }));
    showModal('Filtrar por cor', function () {
      var wrap = el('div'); wrap.style.display = 'grid'; wrap.style.gridTemplateColumns = 'repeat(auto-fill, minmax(120px, 1fr))'; wrap.style.gap = '8px';
      PALETTE.forEach(function (p) {
        var b = el('button'); b.type = 'button'; b.textContent = p.name; b.dataset.hex = p.hex; b.style.padding = '10px'; b.style.borderRadius = '8px'; b.style.border = '1px solid #2a4e78'; b.style.background = (p.hex && p.hex !== '*' ? p.hex : '#0b2240'); b.style.color = '#fff';
        if ((p.hex === '*' && selectedColors.size === 0) || selectedColors.has(p.hex.toLowerCase())) b.style.outline = '2px solid #fff';
        b.onclick = function () {
          if (p.hex === '*') { selectedColors.clear(); } else { if (selectedColors.has(p.hex.toLowerCase())) selectedColors.delete(p.hex.toLowerCase()); else selectedColors.add(p.hex.toLowerCase()); }
          [].slice.call(wrap.querySelectorAll('button')).forEach(function (btn) { btn.style.outline = ''; const btnHex = (btn.dataset.hex || '').toLowerCase(); if ((btnHex === '*' && selectedColors.size === 0) || selectedColors.has(btn.dataset.hex)) { btn.style.outline = '2px solid #fff'; } });
        }; wrap.appendChild(b);
      }); return wrap;
    }, function (body, wrap) { applyFilters(); });
  }

  // ===== 5. FUNÇÕES DE INICIALIZAÇÃO E ESTRUTURA =====

  function createList(title) {
    var list = el('section', 'list'); list.dataset.type = 'kanban'; var h = el('header'); var t = el('input', 'title'); t.value = title || 'Nova lista'; var more = el('button', 'more'); more.type = 'button'; more.textContent = '⋯'; more.addEventListener('click', function (ev) { ev.stopPropagation(); var r = more.getBoundingClientRect(); showListCtx(r.right, r.bottom, list); }); h.appendChild(t); h.appendChild(more); list.appendChild(h); var cards = el('div', 'cards'); list.appendChild(cards); wireDropZone(cards); var add = el('div', 'add'); var form = el('form'); form.className = 'row'; form.setAttribute('autocomplete', 'off'); var input = el('input'); input.type = 'text'; input.placeholder = 'Novo cartão…'; input.setAttribute('enterkeyhint', 'go');
    function addCard() { var v = (input.value || '').trim(); if (!v) return; var card = createCard({ text: v }); cards.appendChild(card); input.value = ''; startInlineEdit(card, true); }
    form.addEventListener('submit', function (e) { e.preventDefault(); addCard(); }); form.appendChild(input); add.appendChild(form); list.appendChild(add); boardEl.appendChild(list);
    h.draggable = true; h.addEventListener('dragstart', function (ev) { draggingList = list; list.classList.add('dragging'); if (ev.dataTransfer) ev.dataTransfer.setData('text/plain', 'list'); }); h.addEventListener('dragend', function () { draggingList = null; list.classList.remove('dragging'); persist(); }); h.addEventListener('contextmenu', function (e) { e.preventDefault(); showListCtx(e.clientX, e.clientY, list); }); return list;
  }

  function ensureMatrix() {
    matrixEl.innerHTML = '';
    var corner = el('div', 'axis corner'); corner.style.gridArea = '1 / 1'; matrixEl.appendChild(corner);
    var axX1 = el('div', 'axis'); axX1.textContent = 'URGENTE'; axX1.style.gridArea = '1 / 2'; matrixEl.appendChild(axX1);
    var axX2 = el('div', 'axis'); axX2.textContent = 'NÃO URGENTE'; axX2.style.gridArea = '1 / 3'; matrixEl.appendChild(axX2);
    var axY1 = el('div', 'axis axis-y'); axY1.textContent = 'IMPORTANTE'; axY1.style.gridArea = '2 / 1'; matrixEl.appendChild(axY1);
    var axY2 = el('div', 'axis axis-y'); axY2.textContent = 'NÃO IMPORTANTE'; axY2.style.gridArea = '3 / 1'; matrixEl.appendChild(axY2);
    var specs = [{ quad: 'Q1', label: 'FAÇA AGORA', area: '2 / 2' }, { quad: 'Q2', label: 'AGENDE', area: '2 / 3' }, { quad: 'Q3', label: 'DELEGUE', area: '3 / 2' }, { quad: 'Q4', label: 'ELIMINE', area: '3 / 3' }];
    specs.forEach(function (sp) { var l = el('section', 'list'); l.dataset.type = 'quad'; l.dataset.quad = sp.quad; l.style.gridArea = sp.area; var h = el('header'); var t = el('div', 'quad-label'); t.textContent = sp.label; h.appendChild(t); var cs = el('div', 'cards'); wireDropZone(cs); l.appendChild(h); l.appendChild(cs); matrixEl.appendChild(l); });
  }

  function ensureSchedule() {
    if (slotsRoot.children.length > 0) return;
    var goalSlot = el('section', 'list goal-slot'); goalSlot.dataset.type = 'goal'; var goalHead = el('div', 'head'); var goalLabel = el('span', 'goal-label'); goalLabel.textContent = '🎯 OBJETIVO DO DIA'; goalHead.appendChild(goalLabel); goalSlot.appendChild(goalHead); var goalCards = el('div', 'cards'); goalSlot.appendChild(goalCards); wireDropZone(goalSlot); slotsRoot.appendChild(goalSlot);
    for (var h = 6; h <= 23; h++) { for (var m = 0; m <= 30; m += 30) { if (h === 23 && m === 30) break; var t = to2(h) + ':' + to2(m); var slot = el('section', 'list slot'); slot.dataset.type = 'time'; slot.dataset.time = t; var head = el('div', 'head'); var label = el('span', 'time'); label.textContent = t; head.appendChild(label); slot.appendChild(head); var cards = el('div', 'cards'); slot.appendChild(cards); wireDropZone(slot); slotsRoot.appendChild(slot); } }
    var date = document.getElementById('agendaDate'); if (date && !date.value) { date.value = new Date().toISOString().slice(0, 10); }
  }

  function copyAgendaFrom(fromDay, toDay) {
    if (fromDay === toDay) return; var toCopy = allCards.filter(function (c) { return (c.dataset.when || '').indexOf(fromDay + 'T') === 0; });
    toCopy.forEach(function (c) { var time = (c.dataset.when || '').slice(11, 16); var dest = slotsRoot.querySelector('.list[data-time="' + time + '"] .cards'); if (dest) { var clone = createCard(cardToData(c)); clone.dataset.when = toDay + 'T' + time; dest.appendChild(clone); } }); updateSlotsHasItems(); persist();
  }

  function duplicateCards(cards) {
    if (!cards || !cards.length) return;
    cards.forEach(function (c) {
      var newData = cardToData(c);
      if (!c.closest('#agenda-sidebar')) { newData.when = ''; }
      var newCard = createCard(newData); c.parentElement.insertBefore(newCard, c.nextSibling);
    });
    persist(); updateSlotsHasItems(); updateTotalTimerDisplay();
  }

  function mergeData(dataToMerge) {
    const currentKanbanLists = {}; $$('.list[data-type="kanban"]', boardEl).forEach(l => { currentKanbanLists[l.querySelector('.title').value] = l.querySelector('.cards'); });
    const quadMap = { Q1: matrixEl.querySelector('.list[data-quad="Q1"] .cards'), Q2: matrixEl.querySelector('.list[data-quad="Q2"] .cards'), Q3: matrixEl.querySelector('.list[data-quad="Q3"] .cards'), Q4: matrixEl.querySelector('.list[data-quad="Q4"] .cards') };
    dataToMerge.forEach(entry => {
      if (entry.type === 'kanban') {
        let targetContainer = currentKanbanLists[entry.title];
        if (!targetContainer) { const newList = createList(entry.title); targetContainer = newList.querySelector('.cards'); currentKanbanLists[entry.title] = targetContainer; }
        (entry.cards || []).forEach(cardData => { const exists = Array.from(targetContainer.children).some(c => c.querySelector('.text').textContent.trim() === cardData.text.trim()); if (!exists) targetContainer.appendChild(createCard(cardData)); });
      } else if (entry.type === 'quad' && quadMap[entry.quad]) {
        (entry.cards || []).forEach(cardData => { const exists = Array.from(quadMap[entry.quad].children).some(c => c.querySelector('.text').textContent.trim() === cardData.text.trim()); if (!exists) quadMap[entry.quad].appendChild(createCard(cardData)); });
      } else if (entry.type === 'time' || entry.type === 'goal') {
        (entry.cards || []).forEach(cardData => {
          if (entry.goal && cardData.when && !cardData.when.endsWith('TGOAL')) cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'TGOAL';
          else if (entry.time && cardData.when && !cardData.when.includes('T' + entry.time)) cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'T' + entry.time;
          const existsInCache = allCards.some(c => c.dataset.when === cardData.when && c.querySelector('.text').textContent.trim() === cardData.text.trim());
          if (!existsInCache) createCard(cardData);
        });
      }
    });
    applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();
  }

  function getWeekRange(dateStr) {
    const curr = new Date(dateStr + 'T12:00:00');
    const first = curr.getDate() - curr.getDay(); // Sunday
    const week = [];
    for (let i = 0; i < 7; i++) {
      const next = new Date(curr);
      next.setDate(first + i);
      week.push(next.toISOString().slice(0, 10));
    }
    return week;
  }

  function renderWeeklyView() {
    if (!weeklyGrid) return;
    weeklyGrid.innerHTML = '';
    const currentDay = getActiveDay();
    const weekDates = getWeekRange(currentDay);
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    weekDates.forEach((date, index) => {
      const col = el('div', 'day-column');
      if (date === currentDay) col.classList.add('today');

      const header = el('header');
      const dayName = daysOfWeek[index];
      const dateFormatted = date.split('-').reverse().slice(0, 2).join('/');
      header.innerHTML = `${dayName} <span class="date-label">${dateFormatted}</span>`;
      col.appendChild(header);

      const cardsContainer = el('div', 'cards');
      cardsContainer.dataset.date = date; // Para drop
      wireDropZone(cardsContainer); // Reutiliza a lógica de drag and drop existente

      // Filtrar cartões para este dia
      const dayPrefix = date + 'T';
      allCards.forEach(c => {
        if (c.dataset.when && c.dataset.when.startsWith(dayPrefix)) {
          // Clona o cartão visualmente ou move?
          // Na visão semanal, queremos ver o cartão. Se ele já está no DOM (na agenda lateral), 
          // podemos movê-lo ou cloná-lo. 
          // Para simplificar e evitar ids duplicados/conflitos, vamos apenas garantir que ele esteja aqui.
          // Mas espere, allCards contém referências aos elementos DOM.
          // Se movermos, ele sai da agenda lateral.
          // O usuário quer ver a semana *em vez* do Kanban, mas a agenda lateral continua lá?
          // Se a agenda lateral mostra UM dia, e a visão semanal mostra TODOS, 
          // então o dia atual apareceria duplicado se não cuidarmos.
          // Mas o elemento DOM é único.
          // Vamos assumir que ao entrar na visão semanal, os cartões são movidos para o grid semanal.
          // Ao sair, eles voltam para onde?
          // Melhor abordagem: Renderizar novos elementos visuais baseados nos dados, 
          // ou mover os elementos existentes.
          // Como o sistema atual usa `allCards` como cache de elementos DOM, mover é o mais seguro para manter estado.

          // Se o cartão está na agenda lateral (que mostra apenas 1 dia), ele vai sumir de lá e ir para a coluna do dia.
          // Isso é aceitável.
          cardsContainer.appendChild(c);
          c.style.display = ''; // Garante visibilidade
        }
      });

      col.appendChild(cardsContainer);
      weeklyGrid.appendChild(col);
    });
  }

  function saveState() {
    localStorage.setItem(CONFIG.keys.STATE_AGENDA, agendaSidebar.classList.contains('collapsed') ? 'collapsed' : 'open');
    localStorage.setItem(CONFIG.keys.STATE_BOARD, boardContainer.classList.contains('collapsed') ? 'collapsed' : 'open');
    localStorage.setItem(CONFIG.keys.STATE_MATRIX, matrixContainer.classList.contains('collapsed') ? 'collapsed' : 'open');
  }

  function loadState() {
    const agendaState = localStorage.getItem(CONFIG.keys.STATE_AGENDA);
    const boardState = localStorage.getItem(CONFIG.keys.STATE_BOARD);
    const matrixState = localStorage.getItem(CONFIG.keys.STATE_MATRIX);
    const quickConfigState = localStorage.getItem(CONFIG.keys.QUICK);
    if (agendaState === 'collapsed') { agendaSidebar.classList.add('collapsed'); mainContent.parentElement.classList.add('agenda-collapsed'); toggleAgendaBtn.classList.remove('active'); } else { agendaSidebar.classList.remove('collapsed'); mainContent.parentElement.classList.remove('agenda-collapsed'); toggleAgendaBtn.classList.add('active'); }
    if (boardState === 'collapsed') { boardContainer.classList.add('collapsed'); mainContent.classList.add('board-collapsed'); toggleBoardBtn.classList.remove('active'); } else { boardContainer.classList.remove('collapsed'); mainContent.classList.remove('board-collapsed'); toggleBoardBtn.classList.add('active'); }
    if (matrixState === 'collapsed') { matrixContainer.classList.add('collapsed'); mainContent.classList.add('matrix-collapsed'); toggleMatrixBtn.classList.remove('active'); } else { matrixContainer.classList.remove('collapsed'); mainContent.classList.remove('matrix-collapsed'); toggleMatrixBtn.classList.add('active'); }
    if (quickConfigState === 'true') { quickConfigToggle.checked = true; } else { quickConfigToggle.checked = false; }
  }

  function restore(data) {
    if (!data || !data.length) { return; }
    allCards = [];
    boardEl.innerHTML = ''; matrixEl.innerHTML = ''; slotsRoot.innerHTML = '';
    ensureMatrix(); ensureSchedule();
    var quadMap = { Q1: matrixEl.querySelector('.list[data-quad="Q1"] .cards'), Q2: matrixEl.querySelector('.list[data-quad="Q2"] .cards'), Q3: matrixEl.querySelector('.list[data-quad="Q3"] .cards'), Q4: matrixEl.querySelector('.list[data-quad="Q4"] .cards') };
    function appendCardsToDOM(container, cardsData) { if (!container || !cardsData || !cardsData.length) return; cardsData.forEach(function (cd) { container.appendChild(createCard(cd)); }); }
    data.forEach(function (entry) {
      if (entry.type === 'kanban') { var l = createList(entry.title || 'Lista'); appendCardsToDOM(l.querySelector('.cards'), entry.cards); }
      else if (entry.type === 'quad' && quadMap[entry.quad]) { appendCardsToDOM(quadMap[entry.quad], entry.cards); }
      else if (entry.type === 'time' || entry.type === 'goal') { (entry.cards || []).forEach(cardData => { if (entry.goal) cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'TGOAL'; else if (entry.time) cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'T' + entry.time; createCard(cardData); }); }
    });
    applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();
  }

  function initDemo() {
    withMute(function () {
      createList('Para Fazer').querySelector('.cards').appendChild(createCard({ text: 'Tarefa importante', color: '#104239', timerTotal: '1800' }));
      createList('Em Andamento');
      createList('Feito');
      if (matrixEl) matrixEl.querySelector('.list[data-quad="Q1"] .cards').appendChild(createCard({ text: 'Crise: Resolver problema!', color: '#104239', timerTotal: '7200' }));
      createCard({ text: "Definir meta principal do dia", when: `${getActiveDay()}TGOAL`, timerTotal: '900' });
    });
    applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();
  }

  // Esta função AGORA está definida antes de ser chamada.
  function initApp() {
    ensureMatrix();
    ensureSchedule();
    loadState();
    try {
      var raw = localStorage.getItem(CONFIG.keys.LS);
      if (raw) {
        var d = JSON.parse(raw);
        var dataToRestore = Array.isArray(d.data) ? d.data : d;
        if (Array.isArray(dataToRestore) && dataToRestore.length) {
          restore(dataToRestore);
          pushHistory(dataToRestore);
          updateTotalTimerDisplay();
          return;
        }
      }
    } catch (e) { console.error("Error loading data:", e); }
    initDemo();
    pushHistory(serialize());
  }

  // ===== Event Listeners Finais =====
  document.getElementById('addList').onclick = function () { createList('Nova lista'); persist(); };
  document.getElementById('filterColorsBtn').addEventListener('click', openColorFilters);
  document.getElementById('undo').onclick = doUndo; document.getElementById('redo').onclick = doRedo;
  document.getElementById('clearFilters').onclick = function () { selectedColors.clear(); document.getElementById('fFrom').value = ''; document.getElementById('fTo').value = ''; document.getElementById('fTime').value = ''; applyFilters(); };

  function changeDay(days) { let currentDate = new Date(agendaDateInput.value + 'T12:00:00'); currentDate.setDate(currentDate.getDate() + days); agendaDateInput.value = currentDate.toISOString().slice(0, 10); applyFilters(); }
  document.getElementById('prevDayBtn').addEventListener('click', () => changeDay(-1));
  document.getElementById('nextDayBtn').addEventListener('click', () => changeDay(1));
  agendaDateInput.addEventListener('change', applyFilters);

  document.getElementById('copyDayBtn').addEventListener('click', function () {
    const day = getActiveDay();
    agendaClipboard = allCards.filter(c => (c.dataset.when || '').startsWith(day + 'T')).map(c => ({ ...cardToData(c), timeOrGoal: (c.dataset.when || '').substring(11) }));
    const btn = document.getElementById('copyDayBtn'); const originalText = btn.textContent; btn.textContent = 'OK!'; setTimeout(() => { btn.textContent = originalText; }, 1000);
  });
  document.getElementById('pasteDayBtn').addEventListener('click', function () {
    if (agendaClipboard.length === 0) { const btn = document.getElementById('pasteDayBtn'); const originalText = btn.textContent; btn.textContent = 'Vazio!'; setTimeout(() => { btn.textContent = originalText; }, 1000); return; }
    const day = getActiveDay();
    agendaClipboard.forEach(cardData => { const newData = { ...cardData }; newData.when = day + 'T' + newData.timeOrGoal; const existsInCache = allCards.some(c => c.dataset.when === newData.when && c.querySelector('.text').textContent.trim() === cardData.text.trim()); if (!existsInCache) { createCard(newData); } });
    updateSlotsHasItems(); persist();
  });

  document.getElementById('exportJson').onclick = function () { const timestamp = new Date().toISOString().replace(/[:.]/g, '-'); const filename = `mini-trello-backup-${timestamp}.json`; var a = document.createElement('a'); a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(serialize(), null, 2)); a.download = filename; a.click(); };
  document.getElementById('quickSaveBtn').onclick = document.getElementById('exportJson').onclick;
  document.getElementById('reset').onclick = function () { showConfirm('Isso vai apagar TUDO. Tem certeza?', function () { localStorage.removeItem(CONFIG.keys.LS); window.location.reload(); }); };

  var importFile = document.getElementById('importFile');
  document.getElementById('importJsonBtn').onclick = function () { importFile.click(); };
  importFile.onchange = function (e) {
    var file = e.target.files[0]; if (!file) return; var reader = new FileReader();
    reader.onload = function (ev) {
      try { var content = JSON.parse(ev.target.result); var dataToRestore = Array.isArray(content.data) ? content.data : content; if (!Array.isArray(dataToRestore)) { throw new Error("Formato inválido."); } promptImportAction(dataToRestore); } catch (err) { showModal('Erro', function () { var d = el('div'); d.textContent = 'Erro: ' + err.message; return d; }, function () { }); }
    }; reader.readAsText(file); e.target.value = '';
  };

  toggleBoardBtn.addEventListener('click', () => { boardContainer.classList.toggle('collapsed'); mainContent.classList.toggle('board-collapsed'); toggleBoardBtn.classList.toggle('active'); saveState(); });
  toggleMatrixBtn.addEventListener('click', () => { matrixContainer.classList.toggle('collapsed'); mainContent.classList.toggle('matrix-collapsed'); toggleMatrixBtn.classList.toggle('active'); saveState(); });
  toggleAgendaBtn.addEventListener('click', () => { agendaSidebar.classList.toggle('collapsed'); mainContent.parentElement.classList.toggle('agenda-collapsed'); toggleAgendaBtn.classList.toggle('active'); saveState(); });
  quickConfigToggle.addEventListener('change', () => { localStorage.setItem(CONFIG.keys.QUICK, quickConfigToggle.checked); });

  // Start App
  initApp();
})();