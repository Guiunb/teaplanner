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

// ============================================================
// EVENT BUS GLOBAL (TEAEvents) - Desacoplamento de Módulos
// ============================================================
window.TEAEvents = {
    _listeners: {},
    on: function (event, callback) {
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(callback);
    },
    emit: function (event, payload) {
        if (!this._listeners[event]) return;
        this._listeners[event].forEach(function (cb) { cb(payload); });
    }
};

// ============================================================
// REGISTRO GENÉRICO DE ADD-ONS
// ============================================================
var ADDON_REGISTRY = [];
window.registerAddon = function(def) {
    // def: { id, nome, descricao, onEnable, onDisable }
    ADDON_REGISTRY.push(def);
    renderAddonRow(def);
};
window.isAddonOn = function(id) { return addonsState[id] === true; };
window.setAddonOn = function(id, on) {
    addonsState[id] = !!on; 
    saveAddonsState();
    var def = ADDON_REGISTRY.find(function (d) { return d.id === id; });
    if (def) { on ? def.onEnable() : def.onDisable(); }
};

function renderAddonRow(def) {
    var container = document.querySelector('.addons-dropdown-content');
    if (!container) return;
    
    var row = document.createElement('div');
    row.className = 'addon-row';
    
    var nameSpan = document.createElement('span');
    nameSpan.className = 'addon-name';
    nameSpan.textContent = def.nome;
    if (def.descricao) nameSpan.title = def.descricao;
    
    var toggleLabel = document.createElement('label');
    toggleLabel.className = 'toggle-switch addon-toggle';
    
    var input = document.createElement('input');
    input.type = 'checkbox';
    input.id = 'addon_' + def.id + '_toggle';
    input.checked = isAddonOn(def.id);
    input.addEventListener('change', function() {
        var btnLabel = toggleLabel.querySelector('.toggle-switch-button');
        if (btnLabel) btnLabel.textContent = input.checked ? 'ON' : 'OFF';
        setAddonOn(def.id, input.checked);
    });
    
    var btnSpan = document.createElement('span');
    btnSpan.className = 'toggle-switch-button';
    btnSpan.textContent = input.checked ? 'ON' : 'OFF';
    
    toggleLabel.appendChild(input);
    toggleLabel.appendChild(btnSpan);
    
    row.appendChild(nameSpan);
    row.appendChild(toggleLabel);
    
    var checkinBtn = document.getElementById('addonVerPropositoBtn');
    if (checkinBtn) {
        container.insertBefore(row, checkinBtn);
    } else {
        container.appendChild(row);
    }
}

// ---------- Estado dos add-ons ----------
function loadAddonsState() {
    try {
        var raw = localStorage.getItem(LS_ADDONS_KEY);
        if (raw) {
            var parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object') {
                for (var key in parsed) {
                    if (parsed.hasOwnProperty(key)) {
                        if (key === 'checkinDuracao') {
                            if (typeof parsed[key] === 'number') {
                                addonsState[key] = clampCheckinDuracao(parsed[key]);
                            }
                        } else {
                            addonsState[key] = !!parsed[key];
                        }
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
