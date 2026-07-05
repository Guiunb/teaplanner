// ============================================================
// MÓDULO: centralbank.js — M5 Banco Central de IA
// PRD §5: recalibra os preços por quadrante a cada 14 dias com
// teto de ±20%. O ALGORITMO decide o preço (estabilidade);
// a IA apenas ESCREVE a Carta de Reajuste (transparência).
// Q2 >= Q1 é INVIOLÁVEL (Eisenhower invertido). Piso 1.
// Anti-cheat ancorado no TEA Timer. Ausência longa: 1 recalibração só.
// ============================================================

var LS_CB_KEY = 'tea-planner-centralbank';
var LS_CB_TOGGLES_KEY = 'tea-planner-cb-toggles-today';
var CB_CICLO_DIAS = 14;
var CB_TETO = 0.20; // ±20%

var cbData = {
    v: 1, temporada: 0,
    precos: { Q1: 8, Q2: 12, Q3: 4, Q4: 2, none: 3 },
    proximaRecalibracao: '',
    cartas: [],
    metricas: { conclusoes: { Q1: 0, Q2: 0, Q3: 0, Q4: 0, none: 0 }, somaTimerSeg: 0, nTimer: 0, desfeitosSuspeitos: 0, quadranteAbusado: '' },
    dicaTimerMostrada: false,
    lastUpdate: 0
};

// ---------- Persistência (padrão isolado) ----------
function cbDefault() {
    return JSON.parse(JSON.stringify({
        v: 1, temporada: 0, precos: { Q1: 8, Q2: 12, Q3: 4, Q4: 2, none: 3 },
        proximaRecalibracao: '', cartas: [],
        metricas: { conclusoes: { Q1: 0, Q2: 0, Q3: 0, Q4: 0, none: 0 }, somaTimerSeg: 0, nTimer: 0, desfeitosSuspeitos: 0, quadranteAbusado: '' },
        dicaTimerMostrada: false, lastUpdate: 0
    }));
}
function loadCB() {
    try {
        var raw = localStorage.getItem(LS_CB_KEY);
        var d = raw ? JSON.parse(raw) : null;
        if (d && d.precos) { cbData = d; }
        else { cbData = cbDefault(); }
        if (!cbData.metricas) cbData.metricas = cbDefault().metricas;
        if (!Array.isArray(cbData.cartas)) cbData.cartas = [];
    } catch (e) { cbData = cbDefault(); }
}
function saveCB() {
    cbData.lastUpdate = Date.now();
    try { localStorage.setItem(LS_CB_KEY, JSON.stringify(cbData)); } catch (e) { }
    if (typeof gamRef === 'function') {
        var ref = gamRef('centralbank');
        if (ref) { try { ref.set(cbData); } catch (e) { } }
    }
}

// ---------- Datas ----------
function cbAddDias(dataStr, dias) {
    var d = dataStr ? new Date(dataStr + 'T12:00:00') : new Date();
    d = new Date(d.getTime() + dias * 86400000);
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// ---------- Preço vigente (SOBRESCREVE a versão do economy.js no bundle) ----------
function getPrecoAtual(quadrant, base) {
    if (typeof isAddonOn === 'function' && isAddonOn('centralbank') && cbData && cbData.precos) {
        var p = cbData.precos[quadrant];
        if (typeof p === 'number' && p >= 1) return p;
    }
    return base;
}

// ---------- Coleta de métricas do ciclo ----------
function cbOnCompleted(payload) {
    if (!isAddonOn('centralbank')) return;
    var q = payload.quadrant || 'none';
    if (cbData.metricas.conclusoes[q] === undefined) q = 'none';
    cbData.metricas.conclusoes[q] += 1;
    if (payload.timerSeconds > 0) { cbData.metricas.somaTimerSeg += payload.timerSeconds; cbData.metricas.nTimer += 1; }
    // detector de farm concluir->desfazer->concluir (>3 idas no dia no mesmo card)
    var t = cbTogglesToday();
    t.ids[payload.cardId] = (t.ids[payload.cardId] || 0) + 1;
    if (t.ids[payload.cardId] > 3) {
        cbData.metricas.desfeitosSuspeitos += 1;
        cbData.metricas.quadranteAbusado = q;
    }
    cbSaveToggles(t);
    saveCB();
}
function cbTogglesToday() {
    try {
        var raw = localStorage.getItem(LS_CB_TOGGLES_KEY);
        var t = raw ? JSON.parse(raw) : null;
        if (!t || t.data !== getTodayStr()) t = { data: getTodayStr(), ids: {} };
        return t;
    } catch (e) { return { data: getTodayStr(), ids: {} }; }
}
function cbSaveToggles(t) {
    try { localStorage.setItem(LS_CB_TOGGLES_KEY, JSON.stringify(t)); } catch (e) { }
}

// ---------- Dica de timer (anti-cheat pedagógico, 1x) ----------
function cbDicaTimerUmaVez() {
    if (cbData.dicaTimerMostrada) return;
    cbData.dicaTimerMostrada = true;
    saveCB();
    var t = document.createElement('div');
    t.className = 'milestone-toast';
    t.textContent = '🏦 Dica do Banco Central: use o TEA Timer (Alt+T) em tarefas importantes para ganho cheio.';
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 30);
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 6000);
}

// ---------- Recalibração (ALGORÍTMICA e determinística) ----------
function cbCalcularNovosPrecos(precos, conclusoes, quadranteAbusado) {
    var qs = ['Q1', 'Q2', 'Q3', 'Q4'];
    var total = 0;
    qs.forEach(function (q) { total += (conclusoes[q] || 0); });
    var novos = { Q1: precos.Q1, Q2: precos.Q2, Q3: precos.Q3, Q4: precos.Q4, none: precos.none };
    if (total < 8) return novos; // amostra pequena demais: não mexe (estabilidade)

    var menosFeito = qs[0], maisFeito = qs[0];
    qs.forEach(function (q) {
        if ((conclusoes[q] || 0) < (conclusoes[menosFeito] || 0)) menosFeito = q;
        if ((conclusoes[q] || 0) > (conclusoes[maisFeito] || 0)) maisFeito = q;
    });
    if (menosFeito !== maisFeito) {
        // sobe o negligenciado (incentivo), desce o farmado — dentro do teto
        var tetoSubida = (menosFeito === quadranteAbusado) ? 0 : CB_TETO; // abuso zera a subida
        novos[menosFeito] = Math.max(1, Math.round(precos[menosFeito] * (1 + tetoSubida)));
        novos[maisFeito] = Math.max(1, Math.round(precos[maisFeito] * (1 - CB_TETO)));
    }
    // INVIOLÁVEL: Q2 >= Q1 (Eisenhower invertido)
    if (novos.Q2 < novos.Q1) novos.Q2 = novos.Q1;
    return novos;
}

function cbGerarCarta(mudancas, callback) {
    var mudou = Object.keys(mudancas).length > 0;
    var fallback = mudou
        ? 'Ajustamos os valores para incentivar o que você tem deixado de lado e equilibrar o que já flui bem. Pequenos ajustes, mesmo rumo: te ajudar a focar no que importa.'
        : 'Nesta temporada os valores ficaram como estavam: seu ritmo está equilibrado entre os quadrantes. Seguimos observando com carinho.';
    if (typeof callAI !== 'function') { callback(fallback); return; }
    var resumo = Object.keys(mudancas).map(function (q) {
        return q + ': ' + mudancas[q].de + '->' + mudancas[q].para;
    }).join(', ') || 'sem mudancas';
    var prompt = 'Voce e o Banco Central gentil de um app de produtividade. Explique em ATE 3 frases, tom amigavel pt-BR, SEM jargao economico e SEM culpa, por que os valores de Ouro mudaram nesta temporada. Mudancas: ' + resumo + '. Contexto: quadrantes menos praticados valorizam para incentivar; os mais praticados ajustam para baixo; Q2 (importante/nao urgente) nunca vale menos que Q1.';
    callAI(prompt).then(function (r) {
        var txt = String(r).replace(/```/g, '').trim();
        callback(txt && txt.length > 20 ? txt.slice(0, 400) : fallback);
    }).catch(function () { callback(fallback); });
}

function cbRecalibrarSePreciso() {
    if (!isAddonOn('centralbank')) return;
    var hoje = getTodayStr();
    if (!cbData.proximaRecalibracao) { cbData.proximaRecalibracao = cbAddDias(hoje, CB_CICLO_DIAS); saveCB(); return; }
    if (hoje < cbData.proximaRecalibracao) return;

    // Ausência longa: NÃO acumula recalibrações/cartas — faz UMA e segue (culpa zero)
    var antigos = cbData.precos;
    var novos = cbCalcularNovosPrecos(antigos, cbData.metricas.conclusoes, cbData.metricas.quadranteAbusado);
    var mudancas = {};
    ['Q1', 'Q2', 'Q3', 'Q4'].forEach(function (q) {
        if (novos[q] !== antigos[q]) mudancas[q] = { de: antigos[q], para: novos[q] };
    });
    var suspeitas = cbData.metricas.desfeitosSuspeitos;

    cbGerarCarta(mudancas, function (texto) {
        if (suspeitas > 0) { texto += ' (Notamos idas e vindas em algumas conclusões — o Timer é seu aliado para ganho cheio.)'; }
        cbData.precos = novos;
        cbData.temporada += 1;
        cbData.cartas.push({ data: getTodayStr(), mudancas: mudancas, justificativa: texto, aceitaEm: null });
        if (cbData.cartas.length > 6) cbData.cartas = cbData.cartas.slice(-6);
        cbData.metricas = cbDefault().metricas;
        cbData.proximaRecalibracao = cbAddDias(getTodayStr(), CB_CICLO_DIAS);
        saveCB();
        updateCBUI();
        mostrarCartaOverlay(cbData.cartas[cbData.cartas.length - 1]);
    });
}

// ---------- UI: Carta de Reajuste ----------
function mostrarCartaOverlay(carta) {
    var ov = document.getElementById('cartaOverlay');
    if (!ov || !carta) return;
    var titulo = document.getElementById('cartaTitulo');
    var corpo = document.getElementById('cartaCorpo');
    var mud = document.getElementById('cartaMudancas');
    if (titulo) titulo.textContent = '🏦 Carta de Reajuste — Temporada ' + cbData.temporada;
    if (corpo) corpo.textContent = carta.justificativa;
    if (mud) {
        mud.innerHTML = '';
        var ks = Object.keys(carta.mudancas || {});
        if (!ks.length) { mud.textContent = 'Valores mantidos nesta temporada.'; }
        else ks.forEach(function (q) {
            var d = document.createElement('div');
            var m = carta.mudancas[q];
            d.textContent = q + ': ' + m.de + ' 🪙 → ' + m.para + ' 🪙' + (m.para > m.de ? ' ▲' : ' ▼');
            mud.appendChild(d);
        });
    }
    ov.style.display = 'flex';
    var dur = (typeof getCheckinDuracao === 'function') ? Math.max(10, getCheckinDuracao()) : 12;
    setTimeout(function () { fecharCartaOverlay(true); }, dur * 1000);
}
function fecharCartaOverlay(auto) {
    var ov = document.getElementById('cartaOverlay');
    if (ov) ov.style.display = 'none';
    if (!auto && cbData.cartas.length) {
        cbData.cartas[cbData.cartas.length - 1].aceitaEm = Date.now();
        saveCB();
    }
}

// ---------- UI: seção Banco Central na Carteira ----------
function updateCBUI() {
    var sec = document.getElementById('cbSection');
    if (!sec) return;
    sec.style.display = isAddonOn('centralbank') ? '' : 'none';
    var temp = document.getElementById('cbTemporada');
    if (temp) temp.textContent = cbData.temporada;
    var prox = document.getElementById('cbProxima');
    if (prox) prox.textContent = cbData.proximaRecalibracao || '—';
    var tab = document.getElementById('cbPrecos');
    if (tab) {
        tab.textContent = 'Q2: ' + cbData.precos.Q2 + ' · Q1: ' + cbData.precos.Q1 +
            ' · Q3: ' + cbData.precos.Q3 + ' · Q4: ' + cbData.precos.Q4;
    }
}

// ---------- Inicialização ----------
function initCentralBank() {
    loadCB();
    registerAddon({
        id: 'centralbank', nome: '🏦 Banco Central (IA)',
        descricao: 'A cada 14 dias os valores se ajustam (máx ±20%) para incentivar o que você negligencia — com uma Carta explicando tudo. Exige a Carteira ligada.',
        onEnable: function () {
            if (!isAddonOn('economy')) {
                // dependência dura do PRD: liga a Carteira junto, avisando
                setAddonOn('economy', true);
                var tg = document.getElementById('addon_economy_toggle');
                if (tg) { tg.checked = true; var b = tg.parentElement.querySelector('.toggle-switch-button'); if (b) b.textContent = 'ON'; }
                alert('O Banco Central precisa da Carteira & Moedas — liguei as duas para você.');
            }
            if (!cbData.proximaRecalibracao) { cbData.proximaRecalibracao = cbAddDias(getTodayStr(), CB_CICLO_DIAS); saveCB(); }
            updateCBUI();
        },
        onDisable: function () { updateCBUI(); fecharCartaOverlay(true); }
    });
    if (window.TEAEvents) { TEAEvents.on('task:completed', cbOnCompleted); }
    var fechar = document.getElementById('cartaFecharBtn');
    if (fechar) fechar.onclick = function () { fecharCartaOverlay(false); };
    var verCarta = document.getElementById('cbVerCartaBtn');
    if (verCarta) verCarta.onclick = function () {
        if (cbData.cartas.length) mostrarCartaOverlay(cbData.cartas[cbData.cartas.length - 1]);
        else alert('Ainda não há cartas. A primeira sai na recalibração (' + (cbData.proximaRecalibracao || 'em 14 dias') + ').');
    };
    updateCBUI();
    setTimeout(cbRecalibrarSePreciso, 3000);
}
