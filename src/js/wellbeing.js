// ============================================================
// MÓDULO: wellbeing.js — M3 Medidor de Bem-estar
// PRD §3: visível quando ligado, CALMO (sem piscar, sem vermelho),
// dados mistos observados+declarados, arquitetura plugável,
// desencoraja mas NUNCA bloqueia, descanso reconhecido sem moeda.
// ============================================================

var LS_WELLBEING_KEY = 'tea-planner-wellbeing';
var LS_WELLBEING_TODAY_KEY = 'tea-planner-wellbeing-today';

var wellbeingData = { v: 1, score: 50, historico7d: [], diasSeguidosUso: 0, ultimoDiaUso: '', lastUpdate: 0 };
var wellbeingFontesExternas = []; // arquitetura plugável (futuro: sono, passos...)

// ---------- Dia "efetivo": madrugada 0h-4h conta para o dia anterior ----------
function wbDiaEfetivo() {
    var d = new Date();
    if (d.getHours() < 4) { d = new Date(d.getTime() - 86400000); }
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// ---------- Persistência ----------
function loadWellbeing() {
    try {
        var raw = localStorage.getItem(LS_WELLBEING_KEY);
        var w = raw ? JSON.parse(raw) : null;
        if (w && typeof w === 'object') {
            wellbeingData.score = (typeof w.score === 'number') ? w.score : 50;
            wellbeingData.historico7d = Array.isArray(w.historico7d) ? w.historico7d.slice(-7) : [];
            wellbeingData.diasSeguidosUso = w.diasSeguidosUso || 0;
            wellbeingData.ultimoDiaUso = w.ultimoDiaUso || '';
            wellbeingData.lastUpdate = w.lastUpdate || 0;
        }
    } catch (e) { }
}
function saveWellbeing() {
    wellbeingData.lastUpdate = Date.now();
    try { localStorage.setItem(LS_WELLBEING_KEY, JSON.stringify(wellbeingData)); } catch (e) { }
    if (typeof gamRef === 'function') {
        var ref = gamRef('wellbeing');
        if (ref) { try { ref.set(wellbeingData); } catch (e) { } }
    }
}

// ---------- Acumulador do dia (observado) ----------
function wbToday() {
    try {
        var raw = localStorage.getItem(LS_WELLBEING_TODAY_KEY);
        var t = raw ? JSON.parse(raw) : null;
        if (!t || t.data !== wbDiaEfetivo()) {
            t = { data: wbDiaEfetivo(), tarefas: 0, minutosFoco: 0, energia: 0, horaUltimaAtividade: 0, ids: {} };
        }
        if (!t.ids) t.ids = {};
        return t;
    } catch (e) { return { data: wbDiaEfetivo(), tarefas: 0, minutosFoco: 0, energia: 0, horaUltimaAtividade: 0, ids: {} }; }
}
function wbSaveToday(t) {
    try { localStorage.setItem(LS_WELLBEING_TODAY_KEY, JSON.stringify(t)); } catch (e) { }
}

function wbRegistrarAtividade(payload) {
    var t = wbToday();
    var id = payload && payload.cardId;
    if (id && t.ids[id]) return; // mesma tarefa nao conta 2x no dia (anti-farm)
    var mins = (payload && payload.timerSeconds) ? Math.round(payload.timerSeconds / 60) : 0;
    if (id) t.ids[id] = { m: mins };
    t.tarefas += 1;
    t.minutosFoco += mins;
    t.horaUltimaAtividade = new Date().getHours();
    wbSaveToday(t);
    recalcWellbeing();
}

function wbEstornarAtividade(payload) {
    // Desmarcar = correcao: o bem-estar tambem desconta (simetrico ao ganho)
    var t = wbToday();
    var id = payload && payload.cardId;
    if (!id || !t.ids[id]) return;
    t.tarefas = Math.max(0, t.tarefas - 1);
    t.minutosFoco = Math.max(0, t.minutosFoco - (t.ids[id].m || 0));
    delete t.ids[id];
    wbSaveToday(t);
    recalcWellbeing();
}

function wbRegistrarEnergia(nivel) {
    var t = wbToday();
    t.energia = Math.min(5, Math.max(1, parseInt(nivel, 10) || 3));
    wbSaveToday(t);
    recalcWellbeing();
}

// ---------- Fontes externas plugáveis (implementado já, fontes no futuro) ----------
function registerWellbeingSource(def) {
    // def: { id, nome, peso (-15..+15), getDelta: function() -> number }
    if (def && def.id && typeof def.getDelta === 'function') { wellbeingFontesExternas.push(def); }
}

// ---------- Cálculo (determinístico, PRD §3.3) ----------
function calcularScoreBruto(t, diasSeguidos) {
    var score = 50;
    score += Math.min(20, (t.tarefas || 0) * 3);
    score += Math.min(15, Math.floor((t.minutosFoco || 0) / 10));
    var energia = t.energia || 3; // pular a pergunta não penaliza (neutro)
    score += (energia - 3) * 5;
    if ((t.horaUltimaAtividade || 0) >= 23) score -= 10;
    if (diasSeguidos > 13) score -= 8;
    wellbeingFontesExternas.forEach(function (f) {
        try { score += Math.max(-15, Math.min(15, f.getDelta() || 0)); } catch (e) { }
    });
    return Math.max(0, Math.min(100, score));
}

function recalcWellbeing() {
    if (!isAddonOn('wellbeing')) return;
    var t = wbToday();
    var bruto = calcularScoreBruto(t, wellbeingData.diasSeguidosUso);
    // Suavização: nunca varia mais que 15 pontos por recálculo (sem sustos)
    var atual = wellbeingData.score;
    var novo = Math.max(atual - 15, Math.min(atual + 15, bruto));
    wellbeingData.score = novo;
    // histórico do dia
    var hoje = wbDiaEfetivo();
    var h = wellbeingData.historico7d;
    if (h.length && h[h.length - 1].data === hoje) { h[h.length - 1].score = novo; }
    else { h.push({ data: hoje, score: novo }); if (h.length > 7) h.shift(); }
    saveWellbeing();
    updateWellbeingUI(t);
    if (window.TEAEvents) TEAEvents.emit('wellbeing:changed', { score: novo });
}

// ---------- Uso/descanso ----------
function wbRegistrarDiaDeUso() {
    var hoje = wbDiaEfetivo();
    if (wellbeingData.ultimoDiaUso === hoje) return;
    var descansou = false;
    if (wellbeingData.ultimoDiaUso) {
        var gap = Math.round((new Date(hoje + 'T12:00:00') - new Date(wellbeingData.ultimoDiaUso + 'T12:00:00')) / 86400000);
        if (gap === 1) { wellbeingData.diasSeguidosUso += 1; }
        else if (gap > 1) { wellbeingData.diasSeguidosUso = 1; descansou = true; }
    } else { wellbeingData.diasSeguidosUso = 1; }
    wellbeingData.ultimoDiaUso = hoje;
    saveWellbeing();
    if (descansou) mostrarSeloDescanso();
}

function mostrarSeloDescanso() {
    // Descanso NUNCA gera moeda, mas recebe reconhecimento visível (princípio Ciclo 1/3)
    var tEl = document.createElement('div');
    tEl.className = 'milestone-toast dormant-toast';
    tEl.textContent = '🌿 Você descansou — isso conta. Bem-vindo de volta.';
    document.body.appendChild(tEl);
    setTimeout(function () { tEl.classList.add('show'); }, 30);
    setTimeout(function () { tEl.classList.remove('show'); setTimeout(function () { tEl.remove(); }, 400); }, 5000);
}

// ---------- UI: pílula calma + popover humano ----------
function corDaFaixa(score) {
    if (score >= 70) return '#3ddc84';       // verde
    if (score >= 40) return '#ffb84d';       // âmbar
    return '#6ea8dc';                        // azul-calmo (NUNCA vermelho)
}

function updateWellbeingUI(t) {
    var pill = document.getElementById('wellbeingPill');
    var num = document.getElementById('wellbeingScore');
    if (!pill || !num) return;
    var on = isAddonOn('wellbeing');
    pill.style.display = on ? '' : 'none';
    if (!on) return;
    num.textContent = wellbeingData.score;
    pill.style.borderColor = corDaFaixa(wellbeingData.score);
    num.style.color = corDaFaixa(wellbeingData.score);

    var fat = document.getElementById('wellbeingFatores');
    if (fat) {
        t = t || wbToday();
        var linhas = [];
        if (t.tarefas > 0) linhas.push('✔ ' + t.tarefas + ' tarefa' + (t.tarefas > 1 ? 's' : '') + ' concluída' + (t.tarefas > 1 ? 's' : '') + ' hoje');
        if (t.minutosFoco >= 10) linhas.push('🎯 ' + t.minutosFoco + ' min de foco real 👏');
        if (t.energia) linhas.push('⚡ Energia declarada: ' + t.energia + '/5');
        if ((t.horaUltimaAtividade || 0) >= 23) linhas.push('🌙 Atividade tarde da noite — que tal encerrar mais cedo?');
        if (wellbeingData.diasSeguidosUso > 13) linhas.push('🌿 ' + wellbeingData.diasSeguidosUso + ' dias seguidos — um descanso faria bem');
        if (!linhas.length) linhas.push('Um dia de cada vez. Conclua algo pequeno para começar.');
        fat.innerHTML = '';
        linhas.slice(0, 3).forEach(function (l) {
            var d = document.createElement('div'); d.className = 'wellbeing-fator'; d.textContent = l;
            fat.appendChild(d);
        });
    }
}

function toggleWellbeingPopover() {
    var pop = document.getElementById('wellbeingPopover');
    if (!pop) return;
    if (pop.style.display === 'none' || !pop.style.display) {
        updateWellbeingUI();
        var pill = document.getElementById('wellbeingPill');
        if (pill) {
            var r = pill.getBoundingClientRect();
            pop.style.top = (r.bottom + 8) + 'px';
            pop.style.left = Math.max(8, r.right - 260) + 'px';
        }
        pop.style.display = 'block';
    } else { pop.style.display = 'none'; }
}

function initEnergiaRow() {
    var row = document.getElementById('energiaRow');
    if (!row) return;
    row.style.display = isAddonOn('wellbeing') ? '' : 'none';
    var botoes = row.querySelectorAll('.energia-btn');
    Array.prototype.forEach.call(botoes, function (b) {
        b.onclick = function () {
            wbRegistrarEnergia(b.dataset.nivel);
            Array.prototype.forEach.call(botoes, function (x) { x.classList.remove('sel'); });
            b.classList.add('sel');
        };
    });
}

// ---------- Inicialização ----------
function initWellbeing() {
    loadWellbeing();
    registerAddon({
        id: 'wellbeing', nome: '🌿 Bem-estar',
        descricao: 'Um medidor calmo do seu dia: produtividade saudável, foco, energia e descanso. Nunca bloqueia nada.',
        onEnable: function () { updateWellbeingUI(); initEnergiaRow(); recalcWellbeing(); },
        onDisable: function () {
            var pill = document.getElementById('wellbeingPill'); if (pill) pill.style.display = 'none';
            var pop = document.getElementById('wellbeingPopover'); if (pop) pop.style.display = 'none';
            var row = document.getElementById('energiaRow'); if (row) row.style.display = 'none';
        }
    });
    var pill = document.getElementById('wellbeingPill');
    if (pill) pill.onclick = toggleWellbeingPopover;
    document.addEventListener('click', function (ev) {
        var pop = document.getElementById('wellbeingPopover');
        var p2 = document.getElementById('wellbeingPill');
        if (pop && pop.style.display === 'block' && !pop.contains(ev.target) && ev.target !== p2 && (!p2 || !p2.contains(ev.target))) {
            pop.style.display = 'none';
        }
    });
    if (window.TEAEvents) {
        TEAEvents.on('task:completed', wbRegistrarAtividade);
        TEAEvents.on('task:uncompleted', wbEstornarAtividade);
    }
    initEnergiaRow();
    setTimeout(function () {
        if (!isAddonOn('wellbeing')) return;
        wbRegistrarDiaDeUso();
        recalcWellbeing();
    }, 2200);
}
