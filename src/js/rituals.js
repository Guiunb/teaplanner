// ============================================================
// MÓDULO: rituals.js — M4 Rituais (Ciclos 1+3)
// Check-in expandido + Shutdown (🌙) + Retorno sem culpa + Sua Semana.
// Princípios: opt-in, nunca automático onde intromete, tom celebrativo,
// tempo de tela em tudo, retorno NUNCA mostra números negativos.
// Depende (com degradação graciosa): M1 wallet, M2 streaksData,
// fundação (registerAddon/isAddonOn/TEAEvents), callAI (opcional).
// ES5 puro. UTF-8 sem BOM. Console em ASCII.
// ============================================================
(function () {
    'use strict';

    var RIT_LS_KEY = 'tea-planner-rituals';
    var RIT_RETORNO_DIAS = 3;      // ausencia >= 3 dias => boas-vindas sem culpa
    var RIT_SEMANAS_MAX = 12;      // historico de semanas guardadas
    var RIT_ADDON_ID = 'rituais';

    var ritualsData = null;
    var ritShutdownTimer = null;
    var ritOverlayBooted = false;

    // ---------- Dados ----------
    function ritDefault() {
        return { v: 1, ultimoCheckin: '', ultimoShutdown: '', ultimaAtividade: '', ultimaSemanaVista: '', semanas: [] };
    }
    function ritLoad() {
        if (ritualsData) return ritualsData;
        ritualsData = ritDefault();
        try {
            var raw = localStorage.getItem(RIT_LS_KEY);
            if (raw) {
                var p = JSON.parse(raw);
                if (p && typeof p === 'object') {
                    for (var k in ritDefault()) {
                        if (p.hasOwnProperty(k)) ritualsData[k] = p[k];
                    }
                    if (!Array.isArray(ritualsData.semanas)) ritualsData.semanas = [];
                }
            }
        } catch (e) { /* padrao */ }
        return ritualsData;
    }
    function ritSave() {
        try { localStorage.setItem(RIT_LS_KEY, JSON.stringify(ritualsData)); } catch (e) { }
        ritSync();
    }
    function ritSync() {
        // Mesmo padrao isolado da economia: users/<uid>/gamification/rituals
        try {
            if (window.firebase && firebase.auth && firebase.auth().currentUser && firebase.database) {
                firebase.database()
                    .ref('users/' + firebase.auth().currentUser.uid + '/gamification/rituals')
                    .set(ritualsData);
            }
        } catch (e) { /* offline ok */ }
    }

    // ---------- Helpers de data ----------
    function ritToday() {
        if (typeof getTodayStr === 'function') { try { return getTodayStr(); } catch (e) { } }
        var d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function ritDaysBetween(isoA, isoB) {
        var a = Date.parse(isoA + 'T12:00:00'), b = Date.parse(isoB + 'T12:00:00');
        if (isNaN(a) || isNaN(b)) return 0;
        return Math.round((b - a) / 86400000);
    }
    function ritIsoWeek(dateObj) {
        // Semana ISO 8601 (segunda como inicio)
        var d = new Date(Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()));
        var dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return d.getUTCFullYear() + '-W' + (weekNo < 10 ? '0' + weekNo : weekNo);
    }
    function ritTsInIsoWeek(ts, isoWeek) {
        return ritIsoWeek(new Date(ts)) === isoWeek;
    }
    function ritPrevIsoWeek() {
        var d = new Date(); d.setDate(d.getDate() - 7);
        return ritIsoWeek(d);
    }

    function ritFocusOn() {
        return document.body && document.body.classList.contains('focus-mode');
    }
    function ritEmit(evt, payload) {
        try { if (window.TEAEvents) TEAEvents.emit(evt, payload || {}); } catch (e) { }
    }
    function ritOn() {
        return (typeof isAddonOn === 'function') ? isAddonOn(RIT_ADDON_ID) : false;
    }
    function ritDur() {
        // Mesmo slider de duracao do check-in (5-30s); fallback 8s.
        if (typeof getCheckinDuracao === 'function') { try { return getCheckinDuracao(); } catch (e) { } }
        return 8;
    }

    // ---------- Estatísticas do dia/semana (fontes: wallet M1, streaks M2) ----------
    function ritWalletHist() {
        try {
            if (typeof wallet !== 'undefined' && wallet && Array.isArray(wallet.historico)) return wallet.historico;
        } catch (e) { }
        return null;
    }
    function ritStatsDoDia() {
        var hoje = ritToday();
        var start = Date.parse(hoje + 'T00:00:00');
        var hist = ritWalletHist();
        var tarefas = 0, ouro = 0;
        if (hist) {
            for (var i = 0; i < hist.length; i++) {
                var h = hist[i];
                if (h && h.tipo === 'ouro' && h.valor > 0 && h.ts >= start) { tarefas++; ouro += h.valor; }
            }
        }
        var streaksAtivas = ritStreaksAtivas();
        return { tarefas: tarefas, ouro: ouro, streaksAtivas: streaksAtivas, temWallet: !!hist };
    }
    function ritStreaksAtivas() {
        try {
            if (typeof streaksData !== 'undefined' && streaksData && streaksData.porRecorrencia) {
                var n = 0;
                for (var k in streaksData.porRecorrencia) {
                    if (!streaksData.porRecorrencia.hasOwnProperty(k)) continue;
                    var s = streaksData.porRecorrencia[k];
                    if (s && (s.atual > 0 || s.count > 0 || s.dias > 0)) n++;
                }
                return n;
            }
        } catch (e) { }
        return 0;
    }
    function ritStatsDaSemana(isoWeek) {
        var hist = ritWalletHist();
        var tarefas = 0, ouro = 0, porDia = [0, 0, 0, 0, 0, 0, 0];
        if (hist) {
            for (var i = 0; i < hist.length; i++) {
                var h = hist[i];
                if (h && h.tipo === 'ouro' && h.valor > 0 && ritTsInIsoWeek(h.ts, isoWeek)) {
                    tarefas++; ouro += h.valor;
                    porDia[new Date(h.ts).getDay()]++;
                }
            }
        }
        var nomes = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
        var best = 0;
        for (var d = 1; d < 7; d++) { if (porDia[d] > porDia[best]) best = d; }
        return { iso: isoWeek, tarefas: tarefas, ouro: ouro, melhorDia: (tarefas > 0 ? nomes[best] : '-'), streaksAtivas: ritStreaksAtivas() };
    }

    // ---------- Preview do dia (contagem no DOM real: quadro + matriz) ----------
    function ritPreviewDoDia() {
        var hoje = ritToday();
        var nHoje = 0, nQ2 = 0;
        var seen = {};
        var cards = document.querySelectorAll('.card');
        for (var i = 0; i < cards.length; i++) {
            var c = cards[i];
            var id = c.dataset ? c.dataset.id : null;
            if (!id || seen[id]) continue;
            if (c.dataset.completed === 'true') continue;
            var when = c.dataset.when || '';
            if (when.indexOf(hoje) === 0) { seen[id] = true; nHoje++; }
        }
        var q2 = document.querySelectorAll('.list[data-quad="Q2"] .card');
        var seenQ2 = {};
        for (var j = 0; j < q2.length; j++) {
            var cq = q2[j];
            var idq = cq.dataset ? cq.dataset.id : null;
            if (!idq || seenQ2[idq]) continue;
            if (cq.dataset.completed === 'true') continue;
            seenQ2[idq] = true; nQ2++;
        }
        return { hoje: nHoje, q2: nQ2 };
    }

    // ---------- Estilos ----------
    function ritStyles() {
        if (document.getElementById('rit-styles')) return;
        var css = '' +
            '.rit-overlay{position:fixed;inset:0;background:rgba(5,10,20,.7);backdrop-filter:blur(3px);' +
            'z-index:20000;display:none;align-items:center;justify-content:center;padding:16px;}' +
            '.rit-card{background:linear-gradient(180deg,#13253f,#0f1e33);border:1px solid rgba(255,255,255,.14);' +
            'border-radius:14px;max-width:440px;width:100%;padding:24px 22px 18px;color:#e8eef7;' +
            'box-shadow:0 18px 60px rgba(0,0,0,.55);font-size:15px;line-height:1.5;text-align:center;position:relative;}' +
            '.rit-card h3{margin:0 0 6px;font-size:20px;color:#fff;}' +
            '.rit-sub{color:#9db2cc;font-size:13.5px;margin:0 0 14px;}' +
            '.rit-lines{text-align:left;margin:0 auto 14px;max-width:320px;}' +
            '.rit-line{display:flex;justify-content:space-between;gap:10px;padding:7px 2px;' +
            'border-bottom:1px dashed rgba(255,255,255,.08);font-size:14.5px;}' +
            '.rit-line b{color:#e8a13d;}' +
            '.rit-btn{appearance:none;border:1px solid #e8a13d;background:linear-gradient(180deg,#e8a13d,#d18a26);' +
            'color:#1a1206;font-weight:700;border-radius:9px;padding:11px 18px;font-size:15px;cursor:pointer;margin-top:4px;}' +
            '.rit-btn.rit-ghost{background:transparent;border-color:rgba(255,255,255,.18);color:#9db2cc;font-weight:400;margin-left:8px;}' +
            '.rit-input{width:100%;box-sizing:border-box;background:#0d1e36;border:1px solid rgba(255,255,255,.15);' +
            'border-radius:8px;color:#e8eef7;padding:10px 12px;font-size:14.5px;margin:6px 0 12px;}' +
            '.rit-progress{height:4px;background:rgba(255,255,255,.08);border-radius:2px;margin-top:14px;overflow:hidden;}' +
            '.rit-progress i{display:block;height:100%;width:100%;background:linear-gradient(90deg,#e8a13d,#f2c078);}' +
            '.rit-insight{background:rgba(232,161,61,.08);border-radius:8px;padding:10px 12px;font-size:13.5px;' +
            'color:#f2d9ae;margin:0 0 12px;}' +
            '#checkinPreview{font-size:13.5px;color:#9db2cc;margin:8px 0 4px;}' +
            '#ritShutdownBtn{background:rgba(90,80,160,.18);border-color:rgba(150,140,220,.45);}' +
            '@media (prefers-reduced-motion: reduce){.rit-progress i{transition:none!important;}}';
        var st = document.createElement('style');
        st.id = 'rit-styles';
        st.textContent = css;
        document.head.appendChild(st);
    }

    function ritEl(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }
    function ritOverlay(id) {
        var ov = document.getElementById(id);
        if (ov) return ov;
        ov = ritEl('div', 'rit-overlay');
        ov.id = id;
        document.body.appendChild(ov);
        return ov;
    }
    function ritStartCountdown(ov, seconds, onDone) {
        var bar = ov.querySelector('.rit-progress i');
        if (bar) {
            bar.style.transition = 'none';
            bar.style.width = '100%';
            void bar.offsetWidth;
            bar.style.transition = 'width ' + seconds + 's linear';
            bar.style.width = '0%';
        }
        if (ritShutdownTimer) clearTimeout(ritShutdownTimer);
        ritShutdownTimer = setTimeout(onDone, seconds * 1000);
    }
    function ritPauseCountdown(ov) {
        // Pausa: enquanto o usuario digita, o ritual nao fecha na cara dele.
        if (ritShutdownTimer) { clearTimeout(ritShutdownTimer); ritShutdownTimer = null; }
        var bar = ov.querySelector('.rit-progress i');
        if (bar) {
            var w = getComputedStyle(bar).width;
            bar.style.transition = 'none';
            bar.style.width = w;
        }
    }

    // ============================================================
    // 4.3 CHECK-IN EXPANDIDO (evolui o M0, nao substitui)
    // ============================================================
    function ritEnsureCheckinPreview() {
        var overlay = document.getElementById('checkinOverlay');
        if (!overlay) return;
        var btn = document.getElementById('checkinComecarBtn');
        var prev = document.getElementById('checkinPreview');
        if (!prev) {
            prev = ritEl('div', '', '');
            prev.id = 'checkinPreview';
            if (btn && btn.parentNode) btn.parentNode.insertBefore(prev, btn);
            else overlay.appendChild(prev);
        }
        var p = ritPreviewDoDia();
        if (p.hoje === 0 && p.q2 === 0) {
            prev.textContent = 'Dia aberto, sem tarefas marcadas para hoje. Espaco para escolher o que importa.';
        } else {
            prev.textContent = 'Voce tem ' + p.hoje + ' tarefa' + (p.hoje === 1 ? '' : 's') + ' hoje' +
                (p.q2 > 0 ? ', ' + p.q2 + ' no Q2 (importante e nao urgente).' : '.');
        }
    }
    function ritObserveCheckin() {
        var overlay = document.getElementById('checkinOverlay');
        if (!overlay || overlay.__ritObserved) return;
        overlay.__ritObserved = true;
        var obs = new MutationObserver(function () {
            if (overlay.style.display !== 'none' && overlay.style.display !== '') {
                if (ritOn()) {
                    ritEnsureCheckinPreview();
                    ritLoad().ultimoCheckin = ritToday();
                    ritSave();
                    ritEmit('ritual:checkin', {});
                }
            }
        });
        obs.observe(overlay, { attributes: true, attributeFilter: ['style'] });
    }

    // ============================================================
    // 4.4 SHUTDOWN (fim de dia) — SEMPRE manual, nunca automatico
    // ============================================================
    function ritInjectShutdownBtn() {
        if (document.getElementById('ritShutdownBtn')) return;
        var b = document.createElement('button');
        b.id = 'ritShutdownBtn';
        b.textContent = '\uD83C\uDF19'; // lua
        b.title = 'Encerrar o dia (ritual de shutdown)';
        b.addEventListener('click', ritShowShutdown);
        var anchor = document.getElementById('rvHeaderBtn') || document.getElementById('manualFocusBtn');
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(b, anchor.nextSibling);
        else { var h = document.querySelector('header'); if (h) h.appendChild(b); }
    }
    function ritRemoveShutdownBtn() {
        var b = document.getElementById('ritShutdownBtn');
        if (b && b.parentNode) b.parentNode.removeChild(b);
    }

    function ritShowShutdown() {
        if (ritFocusOn()) return; // nunca durante o foco
        ritStyles();
        var s = ritStatsDoDia();
        var ov = ritOverlay('shutdownOverlay');
        ov.innerHTML = '';
        var card = ritEl('div', 'rit-card');
        card.appendChild(ritEl('h3', '', '\uD83C\uDF19 Encerrando o dia'));
        card.appendChild(ritEl('p', 'rit-sub', 'O dia rendeu:'));

        var lines = ritEl('div', 'rit-lines');
        function line(label, val) {
            var l = ritEl('div', 'rit-line');
            l.appendChild(ritEl('span', '', label));
            l.appendChild(ritEl('b', '', String(val)));
            lines.appendChild(l);
        }
        if (s.temWallet) {
            line('\u2714 Tarefas concluidas', s.tarefas);
            line('\uD83E\uDE99 Ouro ganho hoje', '+' + s.ouro);
        } else {
            line('\u2714 Dia registrado', 'sim');
        }
        if (s.streaksAtivas > 0) line('\uD83D\uDD25 Streaks ativas', s.streaksAtivas);
        card.appendChild(lines);

        var q = ritEl('p', 'rit-sub', 'Amanha, qual e A tarefa? (opcional)');
        q.style.marginBottom = '2px';
        card.appendChild(q);
        var inp = document.createElement('input');
        inp.className = 'rit-input';
        inp.id = 'shutdownTopTask';
        inp.type = 'text';
        inp.placeholder = 'Ex.: Fechar a proposta do cliente X';
        inp.addEventListener('focus', function () { ritPauseCountdown(ov); });
        card.appendChild(inp);

        var btn = ritEl('button', 'rit-btn', 'Encerrar o dia \u2713');
        btn.addEventListener('click', function () { ritCloseShutdown(inp.value); });
        card.appendChild(btn);

        var prog = ritEl('div', 'rit-progress'); prog.appendChild(ritEl('i', '', ''));
        card.appendChild(prog);
        ov.appendChild(card);
        ov.style.display = 'flex';
        ritStartCountdown(ov, ritDur(), function () { ritCloseShutdown(inp.value); });
        ritEmit('ritual:shutdown', s);
    }

    function ritCloseShutdown(topTask) {
        var ov = document.getElementById('shutdownOverlay');
        if (ov) ov.style.display = 'none';
        if (ritShutdownTimer) { clearTimeout(ritShutdownTimer); ritShutdownTimer = null; }
        var t = (topTask || '').trim();
        if (t) ritCreateTopTask(t);
        ritLoad().ultimoShutdown = ritToday();
        ritSave();
    }

    function ritCreateTopTask(text) {
        // Vira card no TOPO da primeira lista do quadro ativo (Q2 por padrao no espirito).
        try {
            if (typeof createCard !== 'function') return;
            var data = { text: '\u2B50 ' + text, boardId: (typeof currentBoardId !== 'undefined' ? currentBoardId : '') };
            var c = createCard(data);
            if (typeof addCardHistory === 'function') addCardHistory(c, 'Criado no ritual de encerramento (tarefa do dia seguinte)');
            var board = document.getElementById('board');
            var container = board ? board.querySelector('.list .cards') : document.querySelector('.list .cards');
            if (container) {
                container.insertBefore(c, container.firstChild);
                if (typeof persist === 'function') persist();
            }
        } catch (e) { console.error('rituals: falha ao criar tarefa de amanha', e); }
    }

    // ============================================================
    // 4.5 RETORNO SEM CULPA
    // PROIBIDO nesta tela: contadores de dias, atrasos em vermelho, streaks quebradas.
    // ============================================================
    function ritMaybeWelcomeBack() {
        var d = ritLoad();
        var hoje = ritToday();
        var gap = d.ultimaAtividade ? ritDaysBetween(d.ultimaAtividade, hoje) : 0;
        var mostrar = ritOn() && d.ultimaAtividade && gap >= RIT_RETORNO_DIAS && !ritFocusOn();
        // Atualiza a atividade em TODA abertura (depois de medir o gap)
        d.ultimaAtividade = hoje;
        ritSave();
        if (!mostrar) return false;

        ritStyles();
        var ov = ritOverlay('welcomeBackOverlay');
        ov.innerHTML = '';
        var card = ritEl('div', 'rit-card');
        card.appendChild(ritEl('h3', '', 'Que bom te ver \uD83C\uDF31'));
        card.appendChild(ritEl('p', 'rit-sub', 'Sem cobrancas aqui. Seus quadros estao exatamente como voce deixou.'));
        var btn = ritEl('button', 'rit-btn', 'Continuar');
        btn.addEventListener('click', function () { ov.style.display = 'none'; });
        card.appendChild(btn);
        var prog = ritEl('div', 'rit-progress'); prog.appendChild(ritEl('i', '', ''));
        card.appendChild(prog);
        ov.appendChild(card);
        ov.style.display = 'flex';
        ritStartCountdown(ov, Math.max(ritDur(), 10), function () { ov.style.display = 'none'; });
        // Silencio proposital: nenhum evento emitido (o acolhimento nao vira metrica).
        return true;
    }

    // ============================================================
    // 4.6 SUA SEMANA (domingo ou segunda, 1a abertura da semana nova)
    // ============================================================
    function ritMaybeWeekReview() {
        var d = ritLoad();
        var now = new Date();
        var dow = now.getDay(); // 0=dom, 1=seg
        var isoAtual = ritIsoWeek(now);
        if (!ritOn() || ritFocusOn()) return;
        if (dow !== 0 && dow !== 1) return;
        if (d.ultimaSemanaVista === isoAtual) return;

        var isoPrev = ritPrevIsoWeek();
        var resumo = ritStatsDaSemana(isoPrev);
        var anterior = d.semanas.length ? d.semanas[d.semanas.length - 1] : null;

        // Guarda e marca como vista
        d.semanas.push(resumo);
        if (d.semanas.length > RIT_SEMANAS_MAX) d.semanas = d.semanas.slice(-RIT_SEMANAS_MAX);
        d.ultimaSemanaVista = isoAtual;
        ritSave();

        ritStyles();
        var ov = ritOverlay('weekReviewOverlay');
        ov.innerHTML = '';
        var card = ritEl('div', 'rit-card');
        card.appendChild(ritEl('h3', '', '\uD83C\uDF05 Sua Semana'));
        card.appendChild(ritEl('p', 'rit-sub', 'A semana que fechou (' + resumo.iso + '):'));

        var lines = ritEl('div', 'rit-lines');
        function line(label, val) {
            var l = ritEl('div', 'rit-line');
            l.appendChild(ritEl('span', '', label));
            l.appendChild(ritEl('b', '', String(val)));
            lines.appendChild(l);
        }
        line('\u2714 Tarefas concluidas', resumo.tarefas);
        if (resumo.ouro > 0) line('\uD83E\uDE99 Ouro da semana', '+' + resumo.ouro);
        if (resumo.tarefas > 0) line('\uD83C\uDFC5 Melhor dia', resumo.melhorDia);
        if (resumo.streaksAtivas > 0) line('\uD83D\uDD25 Streaks ativas', resumo.streaksAtivas);
        card.appendChild(lines);

        // Comparativo SEMPRE positivo
        var frase;
        if (anterior && resumo.tarefas > anterior.tarefas) {
            frase = '+' + (resumo.tarefas - anterior.tarefas) + ' tarefas vs semana anterior. Voce esta acelerando!';
        } else if (anterior && resumo.tarefas < anterior.tarefas) {
            frase = 'Semana mais leve - as vezes e isso mesmo. O que importa e continuar.';
        } else if (resumo.tarefas > 0) {
            frase = 'Ritmo constante. Constancia e o que constroi.';
        } else {
            frase = 'Semana de pausa. Descanso tambem faz parte do caminho.';
        }
        var insight = ritEl('div', 'rit-insight', frase);
        insight.id = 'weekAIInsight';
        card.appendChild(insight);

        var btn = ritEl('button', 'rit-btn', 'Fechar');
        btn.addEventListener('click', function () { ov.style.display = 'none'; });
        card.appendChild(btn);
        ov.appendChild(card);
        ov.style.display = 'flex';

        // Insight de IA (opcional, substitui o template se chegar)
        ritWeekAIInsight(resumo, anterior);
    }

    function ritWeekAIInsight(resumo, anterior) {
        try {
            if (typeof callAI !== 'function') return;
            var prompt = 'Resuma em 1 frase POSITIVA e especifica (portugues do Brasil, maximo 20 palavras) ' +
                'esta semana de produtividade. PROIBIDO culpa ou cobranca. Dados: ' +
                JSON.stringify({ semana: resumo, semanaAnterior: anterior || null }) +
                ' Responda SOMENTE a frase, sem aspas.';
            callAI(prompt).then(function (resp) {
                var el = document.getElementById('weekAIInsight');
                var texto = (typeof resp === 'string') ? resp : (resp && resp.text ? resp.text : '');
                texto = (texto || '').trim();
                if (el && texto && texto.length < 200) el.textContent = texto;
            }).catch(function () { /* mantem o template */ });
        } catch (e) { /* mantem o template */ }
    }

    // ============================================================
    // Registro do add-on + boot
    // ============================================================
    function ritEnable() {
        ritStyles();
        ritInjectShutdownBtn();
        ritObserveCheckin();
    }
    function ritDisable() {
        ritRemoveShutdownBtn();
        var ids = ['shutdownOverlay', 'welcomeBackOverlay', 'weekReviewOverlay'];
        for (var i = 0; i < ids.length; i++) {
            var ov = document.getElementById(ids[i]);
            if (ov) ov.style.display = 'none';
        }
    }

    function initRituals() {
        if (ritOverlayBooted) return;
        ritOverlayBooted = true;
        if (typeof registerAddon === 'function') {
            registerAddon({
                id: RIT_ADDON_ID,
                nome: '\uD83C\uDF19 Rituais (shutdown, retorno, Sua Semana)',
                descricao: 'Momentos de transicao: fechar o dia, voltar sem culpa e rever a semana.',
                onEnable: ritEnable,
                onDisable: ritDisable
            });
        }
        if (ritOn()) {
            ritEnable();
            // Ordem de abertura: retorno > Sua Semana (um por vez, nunca empilha)
            var mostrouRetorno = ritMaybeWelcomeBack();
            if (!mostrouRetorno) ritMaybeWeekReview();
        } else {
            // Mesmo OFF, registra atividade silenciosamente (para o retorno funcionar ao ligar)
            var d = ritLoad(); d.ultimaAtividade = ritToday(); ritSave();
        }
        console.log('[TEA Planner] M4 Rituais carregado.');
    }

    function ritBoot() { try { initRituals(); } catch (e) { console.error('rituals init:', e); } }
    if (document.readyState === 'complete') { setTimeout(ritBoot, 0); }
    else { window.addEventListener('load', function () { setTimeout(ritBoot, 0); }); }

    window.RituaisTEA = { shutdown: ritShowShutdown, semana: ritMaybeWeekReview };
})();
