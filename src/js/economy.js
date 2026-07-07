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
function markPaidToday(cardId, valor) {
    var m = paidTodayMap(); m.ids[cardId] = valor || 1;
    try { localStorage.setItem(LS_PAID_TODAY_KEY, JSON.stringify(m)); } catch (e) { }
}
function unmarkPaidToday(cardId) {
    var m = paidTodayMap();
    var valor = m.ids[cardId] || 0;
    delete m.ids[cardId];
    try { localStorage.setItem(LS_PAID_TODAY_KEY, JSON.stringify(m)); } catch (e) { }
    return valor;
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
// [REVIEW v8] ATENCAO - OVERRIDE INTENCIONAL: esta e a versao FALLBACK.
// O centralbank.js (M5, carregado DEPOIS) REDEFINE getPrecoAtual com precos
// dinamicos. Nao renomear, nao remover, nao mudar a ordem do build.
function getPrecoAtual(quadrant, base) { return base; }

function onTaskCompleted(payload) {
    if (!isAddonOn('economy')) return;
    if (payload.isRecurring) return;                        // regra M2: recorrente não dá Ouro
    if (payload.cardId && alreadyPaidToday(payload.cardId)) return;

    var base = getPrecoAtual(payload.quadrant, ECONOMY_VALORES[payload.quadrant] || ECONOMY_VALORES.none);
    var timerBonus = (payload.timerSeconds >= 600);
    if (timerBonus) base = Math.ceil(base * 1.5);
    var valor = base;
    // Anti-cheat do Banco Central (M5): tarefa importante SEM lastro de tempo paga 50%
    if (isAddonOn('centralbank') && (payload.quadrant === 'Q1' || payload.quadrant === 'Q2') && (!payload.timerSeconds || payload.timerSeconds === 0)) {
        valor = Math.max(1, Math.ceil(valor * 0.5));
        if (typeof cbDicaTimerUmaVez === 'function') cbDicaTimerUmaVez();
    }

    grantOuro(valor, 'task:' + payload.quadrant + (timerBonus ? '+timer' : ''), payload);
    if (payload.cardId) markPaidToday(payload.cardId, valor);

    // Feedback dia a dia: brilho proporcional ao quadrante (sem número).
    flashCardReward(payload.cardId, payload.quadrant);
    // Som (opt-in): toca em TODA conclusão, escalando com o valor da tarefa.
    if (isAddonOn('economySom')) {
        var f = (payload.quadrant === 'Q2' || timerBonus) ? 1.3 : (payload.quadrant === 'Q1' ? 1.0 : 0.85);
        playRewardSound(f);
    }
}

function onTaskUncompleted(payload) {
    // Desmarcar = CORREÇÃO de engano (não punição): estorna o que foi pago hoje.
    if (!isAddonOn('economy') || !payload.cardId) return;
    var pago = unmarkPaidToday(payload.cardId);
    if (pago > 0) {
        wallet.ouro = Math.max(0, wallet.ouro - pago);
        pushHistorico({ ts: Date.now(), tipo: 'ouro', valor: -pago,
            motivo: 'correcao:desmarcado', cardId: payload.cardId, boardId: payload.boardId });
        saveWallet();
        updateWalletUI();
    }
}

// ---------- Zerar e Gastar ----------
function zerarCarteira() {
    if (!confirm('Zerar a carteira? Ouro e Diamante voltam a 0. O histórico é mantido.')) return;
    pushHistorico({ ts: Date.now(), tipo: 'ouro', valor: -wallet.ouro, motivo: 'zerada' });
    wallet.ouro = 0;
    wallet.diamante = 0;
    saveWallet();
    updateWalletUI();
}

function resgatarRecompensa() {
    var descEl = document.getElementById('walletResgateDesc');
    var custoEl = document.getElementById('walletResgateCusto');
    if (!descEl || !custoEl) return;
    var desc = (descEl.value || '').trim();
    var custo = parseInt(custoEl.value, 10);
    if (!desc) { alert('Descreva a recompensa (ex.: 1h de videogame).'); return; }
    if (isNaN(custo) || custo <= 0) { alert('Informe um custo em Ouro (número positivo).'); return; }
    if (custo > wallet.ouro) { alert('Ouro insuficiente. Você tem ' + wallet.ouro + ' 🪙.'); return; }
    wallet.ouro -= custo;
    pushHistorico({ ts: Date.now(), tipo: 'ouro', valor: -custo, motivo: 'resgate:' + desc });
    saveWallet();
    updateWalletUI();
    descEl.value = ''; custoEl.value = '';
    if (isAddonOn('economySom')) playRewardSound(1.15); // celebrar o resgate também
}


// ---------- Catálogo de Recompensas (várias, salvas, com preço por IA) ----------
var LS_REWARDS_KEY = 'tea-planner-rewards';
var rewardsCat = { v: 1, itens: [], lastUpdate: 0 };

function loadRewards() {
    try {
        var raw = localStorage.getItem(LS_REWARDS_KEY);
        var r = raw ? JSON.parse(raw) : null;
        if (r && Array.isArray(r.itens)) rewardsCat = r;
    } catch (e) { }
}
function saveRewards() {
    rewardsCat.lastUpdate = Date.now();
    try { localStorage.setItem(LS_REWARDS_KEY, JSON.stringify(rewardsCat)); } catch (e) { }
    if (typeof gamRef === 'function') {
        var ref = gamRef('rewards');
        if (ref) { try { ref.set(rewardsCat); } catch (e) { } }
    }
}

function ouroMedioPorDia() {
    // média de ganho diário (últimos 14 dias de histórico positivo)
    var corte = Date.now() - 14 * 86400000;
    var porDia = {};
    wallet.historico.forEach(function (h) {
        if (h.ts >= corte && h.tipo === 'ouro' && h.valor > 0 && String(h.motivo).indexOf('task:') === 0) {
            var d = new Date(h.ts); var k = d.toISOString().slice(0, 10);
            porDia[k] = (porDia[k] || 0) + h.valor;
        }
    });
    var dias = Object.keys(porDia);
    if (!dias.length) return 30; // estimativa neutra sem histórico
    var soma = 0; dias.forEach(function (k) { soma += porDia[k]; });
    return Math.max(5, Math.round(soma / dias.length));
}

function precoHeuristico(desc) {
    // Sem IA: recompensa média custa ~1 dia de ganho; palavras de peso ajustam
    var base = ouroMedioPorDia();
    var d = (desc || '').toLowerCase();
    var fator = 1;
    if (/(viagem|compra|jantar fora|show|presente)/.test(d)) fator = 3;
    else if (/(filme|serie|episodio|sobremesa|doce|cafe|pausa)/.test(d)) fator = 0.5;
    return Math.max(3, Math.round(base * fator));
}

function sugerirPrecoIA(desc, callback) {
    var contexto = 'Ganho medio diario do usuario: ' + ouroMedioPorDia() + ' Ouro. ' +
        'Referencia de valores por tarefa: Q2=12, Q1=8, Q3=4, Q4=2.';
    var prompt = 'Voce e o Banco Central de um app de produtividade gamificado. ' + contexto +
        ' Precifique em Ouro a recompensa pessoal: "' + desc + '". ' +
        'Regras: recompensa pequena (pausa, cafe, 1 episodio) = ~meio dia de ganho; ' +
        'media (1h de lazer, sobremesa especial) = ~1 dia; grande (compra, jantar fora, passeio) = 2 a 4 dias. ' +
        'Responda APENAS JSON: {"custo": <inteiro>, "razao": "<1 frase curta pt-BR>"}';
    if (typeof callAI !== 'function') { callback({ custo: precoHeuristico(desc), razao: 'Estimativa local (IA indisponível).' }); return; }
    callAI(prompt).then(function (resp) {
        try {
            var txt = String(resp).replace(/```json|```/g, '').trim();
            var j = JSON.parse(txt.slice(txt.indexOf('{'), txt.lastIndexOf('}') + 1));
            var c = parseInt(j.custo, 10);
            if (isNaN(c) || c <= 0) throw new Error('custo invalido');
            callback({ custo: Math.min(9999, c), razao: j.razao || '' });
        } catch (e) { callback({ custo: precoHeuristico(desc), razao: 'Estimativa local (resposta da IA inválida).' }); }
    }).catch(function () {
        callback({ custo: precoHeuristico(desc), razao: 'Estimativa local (IA indisponível ou sem chave).' });
    });
}

function renderRewardsList() {
    var list = document.getElementById('walletRewardsList');
    if (!list) return;
    list.innerHTML = '';
    if (!rewardsCat.itens.length) {
        var v = document.createElement('div'); v.className = 'wallet-vazio';
        v.textContent = 'Cadastre recompensas suas (ex.: 1h de videogame) e resgate com Ouro.';
        list.appendChild(v); return;
    }
    rewardsCat.itens.forEach(function (item) {
        var row = document.createElement('div'); row.className = 'reward-item';
        var nome = document.createElement('span'); nome.className = 'reward-nome';
        nome.textContent = item.desc;
        var custo = document.createElement('span'); custo.className = 'reward-custo';
        custo.textContent = item.custo + ' 🪙';
        var btn = document.createElement('button'); btn.type = 'button'; btn.textContent = 'Resgatar';
        btn.onclick = function () { resgatarItem(item.id); };
        var del = document.createElement('button'); del.type = 'button'; del.className = 'reward-del';
        del.textContent = '✕'; del.title = 'Remover recompensa';
        del.onclick = function () {
            rewardsCat.itens = rewardsCat.itens.filter(function (x) { return x.id !== item.id; });
            saveRewards(); renderRewardsList();
        };
        row.appendChild(nome); row.appendChild(custo); row.appendChild(btn); row.appendChild(del);
        list.appendChild(row);
    });
}

function resgatarItem(id) {
    var item = rewardsCat.itens.find(function (x) { return x.id === id; });
    if (!item) return;
    if (item.custo > wallet.ouro) { alert('Ouro insuficiente. Você tem ' + wallet.ouro + ' 🪙 e precisa de ' + item.custo + '.'); return; }
    wallet.ouro -= item.custo;
    pushHistorico({ ts: Date.now(), tipo: 'ouro', valor: -item.custo, motivo: 'resgate:' + item.desc });
    saveWallet(); updateWalletUI();
    if (isAddonOn('economySom')) playRewardSound(1.15);
}

function salvarNovaRecompensa() {
    var descEl = document.getElementById('walletResgateDesc');
    var custoEl = document.getElementById('walletResgateCusto');
    var desc = (descEl.value || '').trim();
    var custo = parseInt(custoEl.value, 10);
    if (!desc) { alert('Descreva a recompensa.'); return; }
    if (isNaN(custo) || custo <= 0) { alert('Defina um custo (ou use ✨ para a IA sugerir).'); return; }
    rewardsCat.itens.push({ id: 'rw_' + Date.now(), desc: desc, custo: custo });
    saveRewards(); renderRewardsList();
    descEl.value = ''; custoEl.value = '';
}

function acionarSugestaoIA() {
    var descEl = document.getElementById('walletResgateDesc');
    var custoEl = document.getElementById('walletResgateCusto');
    var hint = document.getElementById('walletPrecoHint');
    var desc = (descEl.value || '').trim();
    if (!desc) { alert('Escreva a recompensa primeiro, aí a IA sugere o preço.'); return; }
    if (hint) hint.textContent = '✨ Avaliando...';
    sugerirPrecoIA(desc, function (r) {
        custoEl.value = r.custo;
        if (hint) hint.textContent = '✨ ' + r.custo + ' 🪙 — ' + r.razao;
    });
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
    if (m.indexOf('correcao:') === 0) return 'Correção (tarefa desmarcada)';
    if (m.indexOf('resgate:') === 0) return '🎁 ' + m.slice(8);
    if (m.indexOf('streak:') === 0) return 'Marco de sequência (' + m.slice(7) + ')';
    if (m === 'zerada') return 'Carteira zerada';
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
        var sinal = h.valor >= 0 ? '+' : '';
        var q = new Date(h.ts);
        row.textContent = icon + ' ' + sinal + h.valor + '  ·  ' + descreveMotivo(h.motivo) + '  ·  ' +
            String(q.getHours()).padStart(2, '0') + ':' + String(q.getMinutes()).padStart(2, '0');
        list.appendChild(row);
    });
}
function abrirCarteira() {
    if (!isAddonOn('economy')) return;
    updateWalletUI();
    renderRewardsList();
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
    var zerar = document.getElementById('walletZerarBtn');
    if (zerar) zerar.onclick = zerarCarteira;
    var resg = document.getElementById('walletSalvarRecompensaBtn');
    if (resg) resg.onclick = salvarNovaRecompensa;
    var ia = document.getElementById('walletSugerirPrecoBtn');
    if (ia) ia.onclick = acionarSugestaoIA;
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
    loadRewards();
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
    renderRewardsList();
    try {
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged(function (user) { if (user) subscribeWalletRemote(); });
        }
    } catch (e) { }
}
