// ============================================================
// MÓDULO: streaks.js — M2 Streaks + Economia de Recorrentes
// Regras (PRD M2): recorrente NUNCA ganha Ouro; ganha streak
// bend-not-break e converte em Diamante nos marcos 7/30/365.
// Sistema sugere, usuário decide. Depende: Fundação + economy (M1).
// ============================================================

var LS_STREAKS_KEY = 'tea-planner-streaks';
var STREAK_MARCOS = [{ dias: 7, diamante: 1 }, { dias: 30, diamante: 5 }, { dias: 365, diamante: 60 }];

var streaksData = { v: 1, porRecorrencia: {}, marcosPendentes: [], config: { diasParaAlertaDesistencia: 7 }, lastUpdate: 0 };
var _streaksSubscribed = false;

// ---------- Persistência (mesmo padrão isolado do M1) ----------
function defaultStreaks() {
    return { v: 1, porRecorrencia: {}, marcosPendentes: [], config: { diasParaAlertaDesistencia: 7 }, lastUpdate: 0 };
}
function normalizeStreaks(s) {
    var d = defaultStreaks();
    if (s && typeof s === 'object') {
        if (s.porRecorrencia && typeof s.porRecorrencia === 'object') d.porRecorrencia = s.porRecorrencia;
        if (Array.isArray(s.marcosPendentes)) d.marcosPendentes = s.marcosPendentes;
        if (s.config && typeof s.config.diasParaAlertaDesistencia === 'number') {
            d.config.diasParaAlertaDesistencia = Math.min(30, Math.max(3, s.config.diasParaAlertaDesistencia));
        }
        if (typeof s.lastUpdate === 'number') d.lastUpdate = s.lastUpdate;
    }
    return d;
}
function loadStreaks() {
    try {
        var raw = localStorage.getItem(LS_STREAKS_KEY);
        streaksData = raw ? normalizeStreaks(JSON.parse(raw)) : defaultStreaks();
    } catch (e) { streaksData = defaultStreaks(); }
}
function saveStreaks() {
    streaksData.lastUpdate = Date.now();
    try { localStorage.setItem(LS_STREAKS_KEY, JSON.stringify(streaksData)); } catch (e) { }
    if (typeof gamRef === 'function') {
        var ref = gamRef('streaks');
        if (ref) { try { ref.set(streaksData); } catch (e) { } }
    }
}
function subscribeStreaksRemote() {
    if (_streaksSubscribed || typeof gamRef !== 'function') return;
    var ref = gamRef('streaks');
    if (!ref) return;
    _streaksSubscribed = true;
    ref.on('value', function (snap) {
        var remote = snap.val();
        if (!remote || typeof remote.lastUpdate !== 'number') return;
        if (remote.lastUpdate > (streaksData.lastUpdate || 0)) {
            // Conflito entre aparelhos: prevalece o MAIOR streak (generosidade > rigor)
            var local = streaksData.porRecorrencia || {};
            streaksData = normalizeStreaks(remote);
            for (var k in local) {
                if (!local.hasOwnProperty(k)) continue;
                var l = local[k], r = streaksData.porRecorrencia[k];
                if (!r || (l.streakAtual || 0) > (r.streakAtual || 0)) { streaksData.porRecorrencia[k] = l; }
            }
            try { localStorage.setItem(LS_STREAKS_KEY, JSON.stringify(streaksData)); } catch (e) { }
            renderStreakBadges();
        }
    });
}

// ---------- Datas ----------
function diasEntre(strA, strB) {
    // strings 'YYYY-MM-DD' -> diferença em dias inteiros (B - A)
    var a = new Date(strA + 'T12:00:00'), b = new Date(strB + 'T12:00:00');
    return Math.round((b - a) / 86400000);
}

// ---------- Núcleo bend-not-break ----------
function onTaskCompletedStreak(payload) {
    if (!isAddonOn('streaks')) return;
    if (!payload.isRecurring || !payload.seriesId) return;

    var hoje = getTodayStr();
    var s = streaksData.porRecorrencia[payload.seriesId];
    if (!s) {
        s = { streakAtual: 0, melhorStreak: 0, ultimaConclusao: '', flexRestantes: 2, marcosPagos: [] };
        streaksData.porRecorrencia[payload.seriesId] = s;
    }
    if (s.ultimaConclusao === hoje) return; // conta 1 por dia

    if (!s.ultimaConclusao) {
        s.streakAtual = 1;                                  // primeira vez
    } else {
        var gap = diasEntre(s.ultimaConclusao, hoje);
        if (gap <= 1) {
            s.streakAtual += 1;                             // dia seguido
        } else if (gap === 2 && s.flexRestantes > 0) {
            s.flexRestantes -= 1;                           // pulou 1 dia: flex segura, streak mantém
        } else {
            s.streakAtual = Math.max(1, Math.floor(s.streakAtual * 0.75)); // dobra, não quebra
        }
    }
    s.ultimaConclusao = hoje;
    if (s.streakAtual > (s.melhorStreak || 0)) s.melhorStreak = s.streakAtual;
    if (s.streakAtual > 0 && s.streakAtual % 7 === 0) s.flexRestantes = 2; // recarga de flex

    verificarMarcos(payload.seriesId, s);
    saveStreaks();
    renderStreakBadges();
    if (window.TEAEvents) TEAEvents.emit('streak:updated', { seriesId: payload.seriesId, dias: s.streakAtual });
}

function verificarMarcos(seriesId, s) {
    STREAK_MARCOS.forEach(function (m) {
        if (s.streakAtual >= m.dias && s.marcosPagos.indexOf(m.dias) === -1) {
            s.marcosPagos.push(m.dias);
            pagarMarco(seriesId, m);
            if (window.TEAEvents) TEAEvents.emit('streak:milestone', { recurrenceId: seriesId, dias: m.dias });
            mostrarMilestoneToast(m.dias, m.diamante);
        }
    });
}

function pagarMarco(seriesId, marco) {
    if (typeof grantDiamante === 'function' && isAddonOn('economy')) {
        grantDiamante(marco.diamante, 'streak:' + marco.dias + 'd', { cardId: seriesId });
    } else {
        streaksData.marcosPendentes.push({ seriesId: seriesId, dias: marco.dias, diamante: marco.diamante });
    }
}

function pagarMarcosPendentes() {
    if (typeof grantDiamante !== 'function' || !isAddonOn('economy')) return;
    if (!streaksData.marcosPendentes.length) return;
    streaksData.marcosPendentes.forEach(function (p) {
        grantDiamante(p.diamante, 'streak:' + p.dias + 'd', { cardId: p.seriesId });
    });
    streaksData.marcosPendentes = [];
    saveStreaks();
}

// ---------- UI: badge 🔥 nos cards recorrentes ----------
function getSeriesIdOfCardEl(el) {
    if (!el || !el.dataset) return '';
    if (el.dataset.recurrenceParent) return el.dataset.recurrenceParent;
    if (el.dataset.recurrence && el.dataset.recurrence !== 'none') return el.dataset.id || '';
    return '';
}
function renderStreakBadges() {
    var on = isAddonOn('streaks');
    var cards = document.querySelectorAll('.card');
    Array.prototype.forEach.call(cards, function (el) {
        var old = el.querySelector('.streak-badge');
        var sid = getSeriesIdOfCardEl(el);
        if (!on || !sid) { if (old) old.remove(); return; }
        var s = streaksData.porRecorrencia[sid];
        if (!s || !s.streakAtual) { if (old) old.remove(); return; }
        if (!old) {
            old = document.createElement('span');
            old.className = 'streak-badge';
            el.appendChild(old);
        }
        old.textContent = '🔥 ' + s.streakAtual;
        old.title = 'Sequência: ' + s.streakAtual + ' dias (' + (s.flexRestantes || 0) + ' flex) · Melhor: ' + (s.melhorStreak || s.streakAtual);
    });
}

// ---------- UI: toast de marco (celebração 4s, calma) ----------
function mostrarMilestoneToast(dias, diamante) {
    var t = document.createElement('div');
    t.className = 'milestone-toast';
    t.textContent = '🔥 ' + dias + ' dias de consistência! +' + diamante + ' 💎';
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 30);
    setTimeout(function () {
        t.classList.remove('show');
        setTimeout(function () { t.remove(); }, 400);
    }, 4000);
}

// ---------- Sugestão calma para recorrência adormecida ----------
function sugerirAdormecidas() {
    if (!isAddonOn('streaks')) return;
    var alerta = streaksData.config.diasParaAlertaDesistencia;
    var hoje = getTodayStr();
    for (var sid in streaksData.porRecorrencia) {
        if (!streaksData.porRecorrencia.hasOwnProperty(sid)) continue;
        var s = streaksData.porRecorrencia[sid];
        if (!s.ultimaConclusao || s.sugerido === hoje) continue;
        if (diasEntre(s.ultimaConclusao, hoje) >= alerta) {
            s.sugerido = hoje; // 1 sugestão por dia, no máximo
            var el = document.querySelector('.card[data-id="' + sid + '"] .text');
            var nome = el ? el.textContent.trim().slice(0, 30) : 'uma recorrência';
            var t = document.createElement('div');
            t.className = 'milestone-toast dormant-toast';
            t.textContent = '🌿 "' + nome + '" está adormecida. Quer pausar? Sem culpa — você decide.';
            document.body.appendChild(t);
            setTimeout(function () { t.classList.add('show'); }, 30);
            setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 400); }, 6000);
            saveStreaks();
            break; // no máximo 1 por abertura
        }
    }
}

// ---------- Config: slider no dropdown Add-ons ----------
function initStreakConfigUI() {
    var toggle = document.getElementById('addon_streaks_toggle');
    if (!toggle) return;
    var row = toggle.closest('.addon-row');
    if (!row || document.getElementById('streakAlertaRange')) return;
    var sub = document.createElement('div');
    sub.className = 'addon-subrow';
    sub.title = 'Depois de quantos dias sem completar a recorrência o app sugere pausar (só sugere).';
    sub.innerHTML = '<label for="streakAlertaRange">🌿 Sugerir pausa após: <strong id="streakAlertaLabel">' +
        streaksData.config.diasParaAlertaDesistencia + ' dias</strong></label>' +
        '<input type="range" id="streakAlertaRange" min="3" max="30" step="1" class="addon-range" value="' +
        streaksData.config.diasParaAlertaDesistencia + '">';
    row.parentNode.insertBefore(sub, row.nextSibling);
    var range = document.getElementById('streakAlertaRange');
    var label = document.getElementById('streakAlertaLabel');
    range.addEventListener('input', function () {
        var v = Math.min(30, Math.max(3, parseInt(range.value, 10) || 7));
        streaksData.config.diasParaAlertaDesistencia = v;
        label.textContent = v + ' dias';
        saveStreaks();
    });
}

// ---------- Inicialização ----------
function initStreaks() {
    loadStreaks();
    registerAddon({
        id: 'streaks', nome: '🔥 Sequências (Streaks)',
        descricao: 'Recorrências criam sequências. Falhar um dia não zera. Marcos de 7/30/365 dias pagam Diamante.',
        onEnable: function () { renderStreakBadges(); pagarMarcosPendentes(); },
        onDisable: function () { renderStreakBadges(); }
    });
    initStreakConfigUI();
    if (window.TEAEvents) {
        TEAEvents.on('task:completed', onTaskCompletedStreak);
    }
    // Badges e sugestões após o boot estabilizar; re-render leve periódico
    setTimeout(function () { renderStreakBadges(); pagarMarcosPendentes(); sugerirAdormecidas(); }, 2500);
    setInterval(renderStreakBadges, 12000);
    try {
        if (window.firebase && firebase.auth) {
            firebase.auth().onAuthStateChanged(function (user) { if (user) subscribeStreaksRemote(); });
        }
    } catch (e) { }
}
