// ============================================================
// MÓDULO: gamification.js — Add-ons de Gamificação (Ciclo 4)
// v1: Propósito Visual (foto + frase por quadro, check-in matinal)
// Princípios: opt-in total, celebrativo, nunca punitivo, zero culpa.
// Dados do propósito vivem em boardsMeta[i].proposito e pegam
// carona no sync existente (saveBoardsMetadata -> Firebase /meta).
// ============================================================

var LS_ADDONS_KEY = 'tea-planner-addons';
var LS_CHECKIN_LAST_KEY = 'tea-planner-checkin-last';
var LS_CHECKIN_ROTATION_KEY = 'tea-planner-checkin-rotation';
var GAMIFICATION_MAX_FOTOS = 3;
var CHECKIN_DUR_MIN = 5;
var CHECKIN_DUR_MAX = 30;
var CHECKIN_DUR_PADRAO = 8;

var addonsState = { propositoVisual: false, checkinDuracao: CHECKIN_DUR_PADRAO };
var checkinAutoCloseTimer = null;

// ---------- Estado dos add-ons ----------
function loadAddonsState() {
    try {
        var raw = localStorage.getItem(LS_ADDONS_KEY);
        if (raw) {
            var parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                for (var k in parsed) {
                    if (!parsed.hasOwnProperty(k)) continue;
                    if (k === 'checkinDuracao') {
                        addonsState.checkinDuracao = clampCheckinDuracao(parsed.checkinDuracao);
                    } else {
                        addonsState[k] = parsed[k];
                    }
                }
            }
        }
    } catch (e) { /* estado padrão: tudo OFF */ }
}

function saveAddonsState() {
    try {
        localStorage.setItem(LS_ADDONS_KEY, JSON.stringify(addonsState));
    } catch (e) { console.error('Erro ao salvar estado dos add-ons:', e); }
}

// ============================================================
// FUNDAÇÃO (Part 0) — infraestrutura compartilhada dos módulos M1..M6
// ============================================================

// ---- Barramento de eventos: módulos conversam sem se conhecer ----
var TEAEvents = window.TEAEvents || (function () {
    var listeners = {};
    return {
        on: function (evt, fn) {
            if (!listeners[evt]) listeners[evt] = [];
            listeners[evt].push(fn);
        },
        emit: function (evt, payload) {
            (listeners[evt] || []).forEach(function (fn) {
                try { fn(payload); } catch (e) { console.error('TEAEvents', evt, e); }
            });
        }
    };
})();
window.TEAEvents = TEAEvents;

// ---- Registro genérico de add-ons (cada módulo M1..M6 se registra) ----
var ADDON_REGISTRY = [];

function isAddonOn(id) { return addonsState[id] === true; }

function setAddonOn(id, on) {
    addonsState[id] = !!on;
    saveAddonsState();
    var def = ADDON_REGISTRY.find(function (d) { return d.id === id; });
    if (def) {
        if (on) { if (def.onEnable) def.onEnable(); }
        else { if (def.onDisable) def.onDisable(); }
    }
}

function registerAddon(def) {
    // def: { id, nome, descricao, onEnable, onDisable }
    ADDON_REGISTRY.push(def);
    renderAddonRow(def);
    if (isAddonOn(def.id) && def.onEnable) { def.onEnable(); }
}

function renderAddonRow(def) {
    var container = document.querySelector('.addons-dropdown-content');
    if (!container) return;
    var anchor = document.getElementById('addonVerPropositoBtn');
    var row = document.createElement('div');
    row.className = 'addon-row';
    if (def.descricao) row.title = def.descricao;

    var name = document.createElement('span');
    name.className = 'addon-name';
    name.textContent = def.nome;

    var lbl = document.createElement('label');
    lbl.className = 'toggle-switch addon-toggle';
    var inp = document.createElement('input');
    inp.type = 'checkbox';
    inp.className = 'toggle-switch-input';
    inp.id = 'addon_' + def.id + '_toggle';
    inp.checked = isAddonOn(def.id);
    var sp1 = document.createElement('span');
    sp1.className = 'toggle-switch-label';
    var sp2 = document.createElement('span');
    sp2.className = 'toggle-switch-button';
    sp2.textContent = inp.checked ? 'ON' : 'OFF';
    inp.addEventListener('change', function () {
        setAddonOn(def.id, inp.checked);
        sp2.textContent = inp.checked ? 'ON' : 'OFF';
    });
    lbl.appendChild(inp); lbl.appendChild(sp1); lbl.appendChild(sp2);
    row.appendChild(name); row.appendChild(lbl);

    if (anchor && anchor.parentNode) { anchor.parentNode.insertBefore(row, anchor); }
    else { container.appendChild(row); }
}

// ---- Utilitário: quadrante Eisenhower de um card (ancorado no DOM real) ----
// Regra: coluna .list[data-quad] onde o card está; senão o espelho na matriz;
// senão 'none'. (Matriz usa .list[data-quad="Q1".."Q4"], vide core.js.)
function detectCardQuadrant(cardEl) {
    if (!cardEl) return 'none';
    var own = cardEl.closest ? cardEl.closest('.list[data-quad]') : null;
    if (own && own.dataset && own.dataset.quad) return own.dataset.quad;
    var id = cardEl.dataset ? cardEl.dataset.id : null;
    if (id) {
        var matrix = document.getElementById('matrix');
        if (matrix) {
            var mirror = matrix.querySelector('.card[data-id="' + id + '"]');
            if (mirror) {
                var ql = mirror.closest('.list[data-quad]');
                if (ql && ql.dataset && ql.dataset.quad) return ql.dataset.quad;
            }
        }
    }
    return 'none';
}

// ---- Utilitário: segundos de foco real registrados no TEA Timer ----
function getCardFocusSeconds(cardEl) {
    if (!cardEl || !cardEl.dataset) return 0;
    var total = parseInt(cardEl.dataset.timerTotal, 10);
    var left = parseInt(cardEl.dataset.timerLeft, 10);
    if (!isNaN(total) && !isNaN(left) && total >= left) return total - left;
    return 0;
}

function isPropositoVisualOn() {
    return addonsState.propositoVisual === true;
}

function clampCheckinDuracao(v) {
    v = parseInt(v, 10);
    if (isNaN(v)) return CHECKIN_DUR_PADRAO;
    if (v < CHECKIN_DUR_MIN) return CHECKIN_DUR_MIN;
    if (v > CHECKIN_DUR_MAX) return CHECKIN_DUR_MAX;
    return v;
}

function getCheckinDuracao() {
    return clampCheckinDuracao(addonsState.checkinDuracao);
}

// ---------- Helpers de propósito ----------
function getBoardMetaById(boardId) {
    if (!boardsMeta || !Array.isArray(boardsMeta)) return null;
    return boardsMeta.find(function (b) { return b.id === boardId; }) || null;
}

function boardHasProposito(meta) {
    return !!(meta && meta.proposito && meta.proposito.fotos &&
        meta.proposito.fotos.length > 0);
}

function getBoardsComProposito() {
    if (!boardsMeta || !Array.isArray(boardsMeta)) return [];
    return boardsMeta.filter(function (b) {
        return b.id !== 'board-trash' && boardHasProposito(b);
    });
}

// ---------- Compressão de foto (máx ~720px, JPEG 0.7) ----------
function comprimirFotoProposito(file, callback) {
    var reader = new FileReader();
    reader.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
            var MAX = 720;
            var w = img.width, h = img.height;
            if (w > MAX || h > MAX) {
                if (w >= h) { h = Math.round(h * (MAX / w)); w = MAX; }
                else { w = Math.round(w * (MAX / h)); h = MAX; }
            }
            var canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            canvas.getContext('2d').drawImage(img, 0, 0, w, h);
            var dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            callback(dataUrl);
        };
        img.onerror = function () { callback(null); };
        img.src = ev.target.result;
    };
    reader.onerror = function () { callback(null); };
    reader.readAsDataURL(file);
}

// ---------- UI: visibilidade do item de menu ----------
function updatePropositoMenuVisibility() {
    var btn = document.getElementById('menuBoardProposito');
    if (btn) btn.style.display = isPropositoVisualOn() ? '' : 'none';
}

// ---------- UI: toggle do add-on ----------
function initAddonToggle() {
    var toggle = document.getElementById('addonPropositoToggle');
    if (!toggle) return;
    var btnLabel = toggle.parentElement.querySelector('.toggle-switch-button');

    toggle.checked = isPropositoVisualOn();
    if (btnLabel) btnLabel.textContent = toggle.checked ? 'ON' : 'OFF';

    toggle.addEventListener('change', function () {
        addonsState.propositoVisual = toggle.checked;
        if (btnLabel) btnLabel.textContent = toggle.checked ? 'ON' : 'OFF';
        saveAddonsState();
        updatePropositoMenuVisibility();
        if (toggle.checked) {
            // Liga: se ainda não houve check-in hoje e existe propósito, mostra
            maybeShowCheckinMatinal();
        } else {
            fecharCheckinMatinal();
            fecharEditorProposito();
        }
    });
}

// ---------- Editor de Propósito (por quadro) ----------
function abrirEditorProposito() {
    if (!isPropositoVisualOn()) return;
    var meta = getBoardMetaById(currentBoardId);
    if (!meta) { alert('Selecione um quadro primeiro.'); return; }
    if (meta.id === 'board-trash') { alert('A lixeira não pode ter propósito.'); return; }

    var overlay = document.getElementById('propositoEditorOverlay');
    if (!overlay) return;

    document.getElementById('propositoEditorBoardName').textContent = meta.name || '';
    document.getElementById('propositoFraseInput').value =
        (meta.proposito && meta.proposito.frase) ? meta.proposito.frase : '';
    renderPropositoThumbs(meta);
    overlay.style.display = 'flex';
}

function fecharEditorProposito() {
    var overlay = document.getElementById('propositoEditorOverlay');
    if (overlay) overlay.style.display = 'none';
}

function renderPropositoThumbs(meta) {
    var wrap = document.getElementById('propositoThumbs');
    if (!wrap) return;
    wrap.innerHTML = '';
    var fotos = (meta.proposito && meta.proposito.fotos) ? meta.proposito.fotos : [];
    fotos.forEach(function (b64, idx) {
        var item = document.createElement('div');
        item.className = 'proposito-thumb';
        var img = document.createElement('img');
        img.src = b64;
        img.alt = 'Foto do propósito ' + (idx + 1);
        var del = document.createElement('button');
        del.type = 'button';
        del.className = 'proposito-thumb-del';
        del.textContent = '✕';
        del.title = 'Remover esta foto';
        del.onclick = function () {
            meta.proposito.fotos.splice(idx, 1);
            renderPropositoThumbs(meta);
        };
        item.appendChild(img);
        item.appendChild(del);
        wrap.appendChild(item);
    });
    var addBtn = document.getElementById('propositoAddFotoBtn');
    if (addBtn) addBtn.disabled = fotos.length >= GAMIFICATION_MAX_FOTOS;
}

function salvarProposito() {
    var meta = getBoardMetaById(currentBoardId);
    if (!meta) return;
    var frase = document.getElementById('propositoFraseInput').value.trim();
    if (!meta.proposito) meta.proposito = { frase: '', fotos: [], indiceRotacao: 0 };
    meta.proposito.frase = frase;
    // Se ficou sem frase e sem fotos, remove o campo (retrocompatível)
    if (!frase && meta.proposito.fotos.length === 0) {
        delete meta.proposito;
    }
    saveBoardsMetadata(true); // persiste + sync Firebase (carona no fluxo existente)
    fecharEditorProposito();
}

function initEditorProposito() {
    var addBtn = document.getElementById('propositoAddFotoBtn');
    var fileInput = document.getElementById('propositoFotoInput');
    var saveBtn = document.getElementById('propositoSalvarBtn');
    var cancelBtn = document.getElementById('propositoCancelarBtn');
    if (!addBtn || !fileInput || !saveBtn || !cancelBtn) return;

    addBtn.onclick = function () { fileInput.click(); };
    fileInput.onchange = function () {
        var file = fileInput.files && fileInput.files[0];
        fileInput.value = '';
        if (!file) return;
        var meta = getBoardMetaById(currentBoardId);
        if (!meta) return;
        if (!meta.proposito) meta.proposito = { frase: '', fotos: [], indiceRotacao: 0 };
        if (meta.proposito.fotos.length >= GAMIFICATION_MAX_FOTOS) {
            alert('Máximo de ' + GAMIFICATION_MAX_FOTOS + ' fotos por quadro (para manter a sincronização leve).');
            return;
        }
        comprimirFotoProposito(file, function (b64) {
            if (!b64) { alert('Não foi possível processar a imagem.'); return; }
            meta.proposito.fotos.push(b64);
            renderPropositoThumbs(meta);
        });
    };
    saveBtn.onclick = salvarProposito;
    cancelBtn.onclick = fecharEditorProposito;
}

// ---------- Check-in Matinal ----------
function getTodayStr() {
    var d = new Date();
    return d.getFullYear() + '-' +
        String(d.getMonth() + 1).padStart(2, '0') + '-' +
        String(d.getDate()).padStart(2, '0');
}

// Regra travada no PRD §8: quadro ativo; senão, rotação entre os que têm.
function escolherPropositoParaCheckin() {
    var ativo = getBoardMetaById(currentBoardId);
    if (boardHasProposito(ativo)) return ativo;
    var candidatos = getBoardsComProposito();
    if (candidatos.length === 0) return null;
    var rot = parseInt(localStorage.getItem(LS_CHECKIN_ROTATION_KEY) || '0', 10);
    var escolhido = candidatos[rot % candidatos.length];
    localStorage.setItem(LS_CHECKIN_ROTATION_KEY, String((rot + 1) % candidatos.length));
    return escolhido;
}

function escolherFotoDoProposito(meta) {
    var p = meta.proposito;
    if (!p.fotos || p.fotos.length === 0) return null;
    var idx = (typeof p.indiceRotacao === 'number') ? p.indiceRotacao : 0;
    idx = idx % p.fotos.length;
    var foto = p.fotos[idx];
    p.indiceRotacao = (idx + 1) % p.fotos.length;
    // Persiste rotação localmente sem forçar sync na nuvem (mudança cosmética)
    try { localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta)); } catch (e) { }
    return foto;
}

function maybeShowCheckinMatinal() {
    if (!isPropositoVisualOn()) return;
    var hoje = getTodayStr();
    if (localStorage.getItem(LS_CHECKIN_LAST_KEY) === hoje) return;
    mostrarCheckinMatinal(false);
}

function mostrarCheckinMatinal(sobDemanda) {
    if (!isPropositoVisualOn()) return;
    var meta = escolherPropositoParaCheckin();
    if (!meta) {
        if (sobDemanda) alert('Nenhum quadro tem propósito ainda. Use "🎯 Editar Propósito" no menu Quadros.');
        return;
    }
    var overlay = document.getElementById('checkinOverlay');
    if (!overlay) return;

    var foto = escolherFotoDoProposito(meta);
    var imgEl = document.getElementById('checkinFoto');
    if (imgEl) {
        if (foto) { imgEl.src = foto; imgEl.style.display = ''; }
        else { imgEl.style.display = 'none'; }
    }
    var fraseEl = document.getElementById('checkinFrase');
    if (fraseEl) fraseEl.textContent = (meta.proposito.frase || 'Seu propósito te espera.');
    var boardEl = document.getElementById('checkinBoardName');
    if (boardEl) boardEl.textContent = meta.name || '';

    overlay.style.display = 'flex';
    if (!sobDemanda) {
        localStorage.setItem(LS_CHECKIN_LAST_KEY, getTodayStr());
    }

    // Fechamento automático configurável (5–30s): a foto nunca vira distração.
    iniciarAutoFechamentoCheckin();
}

function iniciarAutoFechamentoCheckin() {
    var dur = getCheckinDuracao();
    // Barra de progresso calma que esvazia ao longo da duração.
    var bar = document.getElementById('checkinProgressBar');
    if (bar) {
        bar.style.transition = 'none';
        bar.style.width = '100%';
        // força reflow para a animação recomeçar do zero
        void bar.offsetWidth;
        bar.style.transition = 'width ' + dur + 's linear';
        bar.style.width = '0%';
    }
    if (checkinAutoCloseTimer) { clearTimeout(checkinAutoCloseTimer); }
    checkinAutoCloseTimer = setTimeout(fecharCheckinMatinal, dur * 1000);
}

function fecharCheckinMatinal() {
    if (checkinAutoCloseTimer) { clearTimeout(checkinAutoCloseTimer); checkinAutoCloseTimer = null; }
    var overlay = document.getElementById('checkinOverlay');
    if (overlay) overlay.style.display = 'none';
}

function initCheckin() {
    var startBtn = document.getElementById('checkinComecarBtn');
    if (startBtn) startBtn.onclick = fecharCheckinMatinal;
    var verBtn = document.getElementById('addonVerPropositoBtn');
    if (verBtn) verBtn.onclick = function () { mostrarCheckinMatinal(true); };
}

function initCheckinDuracaoControl() {
    var range = document.getElementById('checkinDuracaoRange');
    var label = document.getElementById('checkinDuracaoLabel');
    if (!range) return;
    range.min = CHECKIN_DUR_MIN;
    range.max = CHECKIN_DUR_MAX;
    range.value = getCheckinDuracao();
    if (label) label.textContent = getCheckinDuracao() + 's';
    range.addEventListener('input', function () {
        var v = clampCheckinDuracao(range.value);
        addonsState.checkinDuracao = v;
        if (label) label.textContent = v + 's';
        saveAddonsState();
    });
}

// ---------- Inicialização do módulo ----------
function initGamification() {
    loadAddonsState();
    initAddonToggle();
    initEditorProposito();
    initCheckin();
    initCheckinDuracaoControl();

    var menuBtn = document.getElementById('menuBoardProposito');
    if (menuBtn) menuBtn.onclick = abrirEditorProposito;
    updatePropositoMenuVisibility();

    // Check-in matinal: aguarda o boot (Firebase/boards) estabilizar
    setTimeout(maybeShowCheckinMatinal, 1800);
}
