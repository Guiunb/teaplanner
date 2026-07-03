// ============================================================
// MÓDULO: economy.js — M1 Carteira + Moedas (Ouro/Diamante)
// Depende da Fundação (gamification.js): TEAEvents, registerAddon,
// isAddonOn, addonsState, saveAddonsState, getTodayStr.
// Sync ISOLADO: users/<uid>/gamification/wallet (nunca toca boards/meta).
// Feedback: brilho proporcional ao quadrante + som "Cristal" opt-in.
// ============================================================

var LS_WALLET_KEY = 'tea-planner-wallet';
var LS_PAID_TODAY_KEY = 'tea-planner-paid-today';
var ECONOMY_VALORES = { Q1: 8, Q2: 12, Q3: 4, Q4: 2, none: 3 };

var wallet = { v: 1, ouro: 0, diamante: 0, historico: [], lastUpdate: 0 };
var _walletSubscribed = false;

// ---------- Persistência local ----------
function defaultWallet() { return { v: 1, ouro: 0, diamante: 0, historico: [], lastUpdate: 0 }; }

function normalizeWallet(w) {
    var d = defaultWallet();
    if (w && typeof w === 'object') {
        if (typeof w.ouro === 'number') d.ouro = w.ouro;
        if (typeof w.diamante === 'number') d.diamante = w.diamante;
        if (Array.isArray(w.historico)) d.historico = w.historico.slice(-500);
        if (typeof w.lastUpdate === 'number') d.lastUpdate = w.lastUpdate;
    }
    return d;
}

function loadWallet() {
    try {
        var raw = localStorage.getItem(LS_WALLET_KEY);
        wallet = raw ? normalizeWallet(JSON.parse(raw)) : defaultWallet();
    } catch (e) { wallet = defaultWallet(); }
}

function saveWalletLocalOnly() {
    try { localStorage.setItem(LS_WALLET_KEY, JSON.stringify(wallet)); } catch (e) { }
}

function saveWallet() {
    wallet.lastUpdate = Date.now();
    saveWalletLocalOnly();
    var ref = gamRef('wallet');
    if (ref) { try { ref.set(wallet); } catch (e) { } }
}

// ---------- Sync isolado (Firebase compat) ----------
function gamRef(key) {
    try {
        if (window.firebase && firebase.auth && firebase.auth().currentUser) {
            return firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/gamification/' + key);
        }
    } catch (e) { }
    return null;
}

function subscribeWalletRemote() {
    if (_walletSubscribed) return;
    var ref = gamRef('wallet');
    if (!ref) return;
    _walletSubscribed = true;
    ref.on('value', function (snap) {
        var remote = snap.val();
        if (!remote || typeof remote.lastUpdate !== 'number') return;
        if (remote.lastUpdate > (wallet.lastUpdate || 0)) {
            wallet = normalizeWallet(remote);
            saveWalletLocalOnly();
            updateWalletUI();
        }
    });
}

// ---------- Anti-farming leve (não paga 2x a mesma tarefa no dia) ----------
function paidTodayMap() {
    try {
        var raw = localStorage.getItem(LS_PAID_TODAY_KEY);
        var obj = raw ? JSON.parse(raw) : null;
        if (!obj || obj.data !== getTodayStr()) { obj = { data: getTodayStr(), ids: {} }; }
        return obj;
    } catch (e) { return { data: getTodayStr(), ids: {} }; }
}
function markPaidToday(cardId) {
    var m = paidTodayMap(); m.ids[cardId] = 1;
    try { localStorage.setItem(LS_PAID_TODAY_KEY, JSON.stringify(m)); } catch (e) { }
}
function alreadyPaidToday(cardId) {
    return !!paidTodayMap().ids[cardId];
}

// ---------- Concessão ----------
function pushHistorico(entry) {
    wallet.historico.push(entry);
    if (wallet.historico.length > 500) { wallet.historico = wallet.historico.slice(-500); }
}

function grantOuro(valor, motivo, extra) {
    if (valor <= 0) return;
    wallet.ouro += valor;
    pushHistorico({ ts: Date.now(), tipo: 'ouro', valor: valor, motivo: motivo,
        cardId: extra && extra.cardId, boardId: extra && extra.boardId });
    saveWallet();
    updateWalletUI();
    if (window.TEAEvents) TEAEvents.emit('coins:earned', { tipo: 'ouro', valor: valor, motivo: motivo });
}

function grantDiamante(valor, motivo, extra) {
    if (valor <= 0) return;
    wallet.diamante += valor;
    pushHistorico({ ts: Date.now(), tipo: 'diamante', valor: valor, motivo: motivo,
        cardId: extra && extra.cardId, boardId: extra && extra.boardId });
    saveWallet();
    updateWalletUI();
    if (window.TEAEvents) TEAEvents.emit('coins:earned', { tipo: 'diamante', valor: valor, motivo: motivo });
}

// O M5 (Banco Central) sobrescreve isto para aplicar preços recalibrados.
function getPrecoAtual(quadrant, base) { return base; }

function onTaskCompleted(payload) {
    if (!isAddonOn('economy')) return;
    if (payload.isRecurring) return;                        // regra M2: recorrente não dá Ouro
    if (payload.cardId && alreadyPaidToday(payload.cardId)) return;

    var base = ECONOMY_VALORES[payload.quadrant] || ECONOMY_VALORES.none;
    var timerBonus = (payload.timerSeconds >= 600);
    if (timerBonus) base = Math.ceil(base * 1.5);
    var valor = getPrecoAtual(payload.quadrant, base);

    grantOuro(valor, 'task:' + payload.quadrant + (timerBonus ? '+timer' : ''), payload);
    if (payload.cardId) markPaidToday(payload.cardId);

    // Feedback dia a dia: brilho proporcional ao quadrante (sem número).
    flashCardReward(payload.cardId, payload.quadrant);
    // Som opt-in, só em ganho especial (Q2 ou bônus de timer).
    if (isAddonOn('economySom') && (payload.quadrant === 'Q2' || timerBonus)) {
        playRewardSound(payload.quadrant === 'Q2' ? 1.3 : 1.0);
    }
}

function onTaskUncompleted(payload) {
    // Princípio: nunca subtrai valor conquistado. (Sem alteração de saldo.)
}

// ---------- Feedback visual: brilho proporcional ----------
function flashCardReward(cardId, quadrant) {
    if (!cardId) return;
    var map = {
        Q2: { cor: '#ffca4a', size: '22px' },
        Q1: { cor: '#3a8bff', size: '16px' },
        Q3: { cor: '#6ea0d0', size: '12px' },
        Q4: { cor: '#6ea0d0', size: '8px' },
        none: { cor: '#6ea0d0', size: '8px' }
    };
    var conf = map[quadrant] || map.none;
    var els = document.querySelectorAll('.card[data-id="' + cardId + '"]');
    Array.prototype.forEach.call(els, function (el) {
        el.style.setProperty('--rf-color', conf.cor);
        el.style.setProperty('--rf-size', conf.size);
        el.classList.remove('reward-flash');
        void el.offsetWidth;
        el.classList.add('reward-flash');
        setTimeout(function () { el.classList.remove('reward-flash'); }, 950);
    });
}

// ---------- Som "Cristal" (Web Audio, escala com o valor) ----------
var _audioCtx = null;
function getAudioCtx() {
    try {
        if (!_audioCtx) { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
        if (_audioCtx.state === 'suspended') { _audioCtx.resume(); }
        return _audioCtx;
    } catch (e) { return null; }
}
function playRewardSound(f) {
    var ctx = getAudioCtx();
    if (!ctx) return;
    var t = ctx.currentTime, vol = 0.28 * f;
    [[880 * f, 0], [1318.51 * f, 0.075]].forEach(function (n) {
        var freq = n[0], s = t + n[1];
        var o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
        var sh = ctx.createOscillator(); sh.type = 'sine'; sh.frequency.value = freq * 2.001;
        var g = ctx.createGain(); g.gain.setValueAtTime(0.0001, s);
        g.gain.exponentialRampToValueAtTime(vol, s + 0.006);
        g.gain.exponentialRampToValueAtTime(0.0001, s + 0.30);
        var gs = ctx.createGain(); gs.gain.setValueAtTime(0.0001, s);
        gs.gain.exponentialRampToValueAtTime(vol * 0.25, s + 0.006);
        gs.gain.exponentialRampToValueAtTime(0.0001, s + 0.18);
        o.connect(g).connect(ctx.destination); sh.connect(gs).connect(ctx.destination);
        o.start(s); sh.start(s); o.stop(s + 0.32); sh.stop(s + 0.2);
    });
}

// ---------- UI da Carteira ----------
function updateWalletButtonVisibility() {
    var btn = document.getElementById('walletBtn');
    if (btn) btn.style.display = isAddonOn('economy') ? '' : 'none';
}
function descreveMotivo(m) {
    if (!m) return '';
    if (m.indexOf('task:Q2') === 0) return 'Tarefa Q2 concluída';
    if (m.indexOf('task:Q1') === 0) return 'Tarefa Q1 concluída';
    if (m.indexOf('task:Q3') === 0) return 'Tarefa Q3 concluída';
    if (m.indexOf('task:Q4') === 0) return 'Tarefa Q4 concluída';
    if (m.indexOf('task:none') === 0) return 'Tarefa concluída';
    return m;
}
function updateWalletUI() {
    var o = document.getElementById('walletOuro'); if (o) o.textContent = wallet.ouro;
    var d = document.getElementById('walletDiamante'); if (d) d.textContent = wallet.diamante;
    var list = document.getElementById('walletHistorico');
    if (!list) return;
    list.innerHTML = '';
    var ult = wallet.historico.slice(-20).reverse();
    if (ult.length === 0) {
        var vazio = document.createElement('div'); vazio.className = 'wallet-vazio';
        vazio.textContent = 'Conclua tarefas para ganhar Ouro. Tarefas Q2 (importante, não urgente) rendem mais.';
        list.appendChild(vazio); return;
    }
    ult.forEach(function (h) {
        var row = document.createElement('div'); row.className = 'wallet-hist-row';
        var icon = h.tipo === 'diamante' ? '💎' : '🪙';
        var q = new Date(h.ts);
        row.textContent = icon + ' +' + h.valor + '  ·  ' + descreveMotivo(h.motivo) + '  ·  ' +
            String(q.getHours()).padStart(2, '0') + ':' + String(q.getMinutes()).padStart(2, '0');
        list.appendChild(row);
    });
}
function abrirCarteira() {
    if (!isAddonOn('economy')) return;
    updateWalletUI();
    var ov = document.getElementById('walletOverlay'); if (ov) ov.style.display = 'flex';
}
function fecharCarteira() {
    var ov = document.getElementById('walletOverlay'); if (ov) ov.style.display = 'none';
}
function initWalletUI() {
    var btn = document.getElementById('walletBtn');
    if (btn) btn.onclick = abrirCarteira;
    var close = document.getElementById('walletFecharBtn');
    if (close) close.onclick = fecharCarteira;
    var som = document.getElementById('walletSomToggle');
    if (som) {
        som.checked = isAddonOn('economySom');
        som.addEventListener('change', function () {
            addonsState.economySom = som.checked; saveAddonsState();
            if (som.checked) playRewardSound(1.3); // prévia ao ligar
        });
    }
    updateWalletButtonVisibility();
    updateWalletUI();
}

// ---------- Inicialização ----------
function initEconomy() {
    loadWallet();
    registerAddon({
        id: 'economy', nome: '💰 Carteira & Moedas',
        descricao: 'Ganhe Ouro concluindo tarefas (Q2 rende mais). Diamante em marcos.',
        onEnable: function () { updateWalletButtonVisibility(); },
        onDisable: function () { updateWalletButtonVisibility(); fecharCarteira(); }
    });
    if (window.TEAEvents) {
        TEAEvents.on('task:completed', onTaskCompleted);
        TEAEvents.on('task:uncompleted', onTaskUncompleted);
    }
    initWalletUI();
    try {
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged(function (user) { if (user) subscribeWalletRemote(); });
        }
    } catch (e) { }
}
