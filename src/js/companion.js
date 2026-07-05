// ============================================================
// MÓDULO: companion.js — M6 Companion (Ciclos 3+4)
// Aliado, nao dependente. Emocao sempre pra FORA ("VOCE conseguiu!").
// Perfis opt-in: 'diagnostico' (nunca sofre) | 'vivo' (sofre/recupera).
// Regras de aco: degrada SO em padrao de abandono (varios dias),
// SEMPRE conversa antes de sofrer, NUNCA morre, recupera rapido,
// evolui com o cuidado (semente -> broto -> arvore), nunca aparece
// durante o Modo Foco. Conversas usam callAI (fallback: templates).
// ES5 puro. UTF-8 sem BOM. Console em ASCII.
// ============================================================
(function () {
    'use strict';

    var CMP_LS_KEY = 'tea-planner-companion';
    var CMP_FRICCAO_KEY = 'tea-planner-friccao'; // Diario de Friccao/Evolucao (cross-cutting Ciclo 1)
    var CMP_ADDON_ID = 'companion';
    var CMP_DIAS_CONVERSA = 4;   // ausencia >= 4 dias => estado 'conversa' (fala ANTES de sofrer)
    var CMP_DIAS_DEBILITA = 7;   // conversa ignorada + total >= 7 dias => 'debilitado' (so perfil vivo)
    var CMP_XP_NIVEL2 = 7;       // dias de cuidado p/ virar broto
    var CMP_XP_NIVEL3 = 30;      // dias de cuidado p/ virar arvore

    var cmp = null;
    var cmpBooted = false;
    var cmpBubbleTimer = null;

    // ---------- Dados ----------
    function cmpDefault() {
        return {
            v: 1, perfil: '', estado: 'feliz', nivel: 1, xp: 0,
            ultimoDiaComAtividade: '', ultimaConversaEm: '', conversaPendente: false,
            nome: 'Broto'
        };
    }
    function cmpLoad() {
        if (cmp) return cmp;
        cmp = cmpDefault();
        try {
            var raw = localStorage.getItem(CMP_LS_KEY);
            if (raw) {
                var p = JSON.parse(raw);
                if (p && typeof p === 'object') {
                    for (var k in cmpDefault()) { if (p.hasOwnProperty(k)) cmp[k] = p[k]; }
                }
            }
        } catch (e) { }
        return cmp;
    }
    function cmpSave() {
        try { localStorage.setItem(CMP_LS_KEY, JSON.stringify(cmp)); } catch (e) { }
        try {
            if (window.firebase && firebase.auth && firebase.auth().currentUser && firebase.database) {
                firebase.database()
                    .ref('users/' + firebase.auth().currentUser.uid + '/gamification/companion')
                    .set(cmp);
            }
        } catch (e) { }
    }
    function cmpDiario(entrada) {
        // Diario de Friccao/Evolucao: registro leve, append-only.
        try {
            var raw = localStorage.getItem(CMP_FRICCAO_KEY);
            var arr = raw ? JSON.parse(raw) : [];
            if (!Array.isArray(arr)) arr = [];
            arr.push(entrada);
            if (arr.length > 200) arr = arr.slice(-200);
            localStorage.setItem(CMP_FRICCAO_KEY, JSON.stringify(arr));
        } catch (e) { }
    }

    function cmpToday() {
        if (typeof getTodayStr === 'function') { try { return getTodayStr(); } catch (e) { } }
        var d = new Date();
        return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    }
    function cmpDaysBetween(a, b) {
        var ta = Date.parse(a + 'T12:00:00'), tb = Date.parse(b + 'T12:00:00');
        if (isNaN(ta) || isNaN(tb)) return 0;
        return Math.round((tb - ta) / 86400000);
    }
    function cmpOn() { return (typeof isAddonOn === 'function') ? isAddonOn(CMP_ADDON_ID) : false; }
    function cmpFocus() { return document.body && document.body.classList.contains('focus-mode'); }

    // ---------- Visual: criatura SVG procedural (sem arquivos externos) ----------
    // Nivel 1 semente, 2 broto, 3 arvore. Estado muda cor/expressao.
    function cmpSvg(nivel, estado, size) {
        var mood = { feliz: '#7fc98b', atento: '#e8a13d', conversa: '#7aa7e0', debilitado: '#8b8f99' }[estado] || '#7fc98b';
        var droop = (estado === 'debilitado');
        var s = size || 40;
        var svg = '<svg width="' + s + '" height="' + s + '" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">';
        // vaso
        svg += '<path d="M20 46 h24 l-3 12 h-18 z" fill="#a9683a"/><rect x="18" y="43" width="28" height="5" rx="2" fill="#c07b45"/>';
        if (nivel === 1) {
            svg += '<ellipse cx="32" cy="40" rx="7" ry="9" fill="' + mood + '"/>' +
                '<path d="M32 31 q4 -6 8 -7" stroke="' + mood + '" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
        } else if (nivel === 2) {
            var tilt = droop ? 'rotate(14 32 44)' : '';
            svg += '<g transform="' + tilt + '"><path d="M32 44 v-16" stroke="#5f9e63" stroke-width="3" stroke-linecap="round"/>' +
                '<ellipse cx="25" cy="26" rx="7" ry="4.5" fill="' + mood + '" transform="rotate(-28 25 26)"/>' +
                '<ellipse cx="39" cy="24" rx="7" ry="4.5" fill="' + mood + '" transform="rotate(24 39 24)"/></g>';
        } else {
            var tilt3 = droop ? 'rotate(9 32 44)' : '';
            svg += '<g transform="' + tilt3 + '"><path d="M32 44 v-18" stroke="#4c7d50" stroke-width="4" stroke-linecap="round"/>' +
                '<circle cx="32" cy="19" r="11" fill="' + mood + '"/>' +
                '<circle cx="23" cy="26" r="7" fill="' + mood + '" opacity=".9"/>' +
                '<circle cx="41" cy="26" r="7" fill="' + mood + '" opacity=".9"/></g>';
        }
        // rostinho (emocao pra fora: olhos abertos olhando pro usuario)
        var fy = nivel === 1 ? 40 : (nivel === 2 ? 34 : 22);
        if (droop) {
            svg += '<path d="M28 ' + fy + ' q2 -2 4 0" stroke="#123" stroke-width="1.6" fill="none"/>' +
                '<path d="M34 ' + fy + ' q2 -2 4 0" stroke="#123" stroke-width="1.6" fill="none"/>';
        } else {
            svg += '<circle cx="29" cy="' + fy + '" r="1.7" fill="#123"/><circle cx="36" cy="' + fy + '" r="1.7" fill="#123"/>' +
                '<path d="M29 ' + (fy + 4) + ' q3.5 3 7 0" stroke="#123" stroke-width="1.6" fill="none" stroke-linecap="round"/>';
        }
        return svg + '</svg>';
    }

    // ---------- Estilos ----------
    function cmpStyles() {
        if (document.getElementById('cmp-styles')) return;
        var css = '' +
            '#cmpHeaderBtn{display:inline-flex;align-items:center;justify-content:center;padding:2px 8px;' +
            'background:rgba(127,201,139,.1);border-color:rgba(127,201,139,.4);}' +
            '.cmp-panel{position:fixed;right:16px;bottom:16px;z-index:20500;background:linear-gradient(180deg,#13253f,#0f1e33);' +
            'border:1px solid rgba(255,255,255,.14);border-radius:14px;padding:16px;width:300px;max-width:92vw;' +
            'box-shadow:0 18px 60px rgba(0,0,0,.55);color:#e8eef7;font-size:14px;line-height:1.5;display:none;}' +
            '.cmp-head{display:flex;gap:10px;align-items:center;margin-bottom:8px;}' +
            '.cmp-head b{font-size:15px;color:#fff;}' +
            '.cmp-msg{background:rgba(255,255,255,.05);border-radius:10px;padding:10px 12px;margin:6px 0;}' +
            '.cmp-actions{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;}' +
            '.cmp-chip{appearance:none;border:1px solid rgba(255,255,255,.18);background:#152c4e;color:#e8eef7;' +
            'border-radius:16px;padding:6px 12px;font-size:12.5px;cursor:pointer;}' +
            '.cmp-chip:hover{background:#1b3760;}' +
            '.cmp-input{width:100%;box-sizing:border-box;background:#0d1e36;border:1px solid rgba(255,255,255,.15);' +
            'border-radius:8px;color:#e8eef7;padding:8px 10px;font-size:13.5px;margin-top:8px;}' +
            '.cmp-close{position:absolute;top:8px;right:10px;background:none;border:none;color:#9db2cc;font-size:16px;cursor:pointer;}' +
            '.cmp-bubble{position:fixed;right:16px;bottom:16px;z-index:20400;background:#13253f;color:#e8eef7;' +
            'border:1px solid rgba(127,201,139,.45);border-radius:12px;padding:10px 14px;font-size:13.5px;' +
            'box-shadow:0 10px 30px rgba(0,0,0,.5);display:flex;gap:8px;align-items:center;max-width:280px;}' +
            '.cmp-overlay{position:fixed;inset:0;background:rgba(5,10,20,.7);z-index:21000;display:none;' +
            'align-items:center;justify-content:center;padding:16px;}' +
            '.cmp-card{background:linear-gradient(180deg,#13253f,#0f1e33);border:1px solid rgba(255,255,255,.14);' +
            'border-radius:14px;max-width:420px;width:100%;padding:22px;color:#e8eef7;text-align:center;}' +
            '.cmp-card h3{margin:6px 0;color:#fff;font-size:19px;}' +
            '.cmp-choice{display:block;width:100%;box-sizing:border-box;text-align:left;margin:8px 0;padding:12px 14px;' +
            'background:#152c4e;border:1px solid rgba(255,255,255,.15);border-radius:10px;color:#e8eef7;cursor:pointer;font-size:14px;}' +
            '.cmp-choice:hover{background:#1b3760;}' +
            '.cmp-choice b{display:block;color:#7fc98b;margin-bottom:2px;}';
        var st = document.createElement('style');
        st.id = 'cmp-styles';
        st.textContent = css;
        document.head.appendChild(st);
    }

    function cmpEl(tag, cls, text) {
        var n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }

    // ---------- Widget no header ----------
    function cmpInjectBtn() {
        if (document.getElementById('cmpHeaderBtn')) return;
        var b = document.createElement('button');
        b.id = 'cmpHeaderBtn';
        b.title = 'Seu Companion';
        b.innerHTML = cmpSvg(cmpLoad().nivel, cmpLoad().estado, 22);
        b.addEventListener('click', function () { cmpTogglePanel(true); });
        var anchor = document.getElementById('ritShutdownBtn') || document.getElementById('rvHeaderBtn') || document.getElementById('manualFocusBtn');
        if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(b, anchor.nextSibling);
        else { var h = document.querySelector('header'); if (h) h.appendChild(b); }
    }
    function cmpRemoveBtn() {
        var b = document.getElementById('cmpHeaderBtn');
        if (b && b.parentNode) b.parentNode.removeChild(b);
        var p = document.getElementById('cmpPanel');
        if (p) p.style.display = 'none';
    }
    function cmpRefreshBtn() {
        var b = document.getElementById('cmpHeaderBtn');
        if (b) b.innerHTML = cmpSvg(cmpLoad().nivel, cmpLoad().estado, 22);
    }

    // ---------- Painel do Companion ----------
    function cmpTogglePanel(forceOpen) {
        cmpStyles();
        var p = document.getElementById('cmpPanel');
        if (!p) {
            p = cmpEl('div', 'cmp-panel');
            p.id = 'cmpPanel';
            document.body.appendChild(p);
        }
        var opening = forceOpen || p.style.display !== 'block';
        if (!opening) { p.style.display = 'none'; return; }
        cmpRenderPanel(p);
        p.style.display = 'block';
    }

    function cmpEstadoFrase() {
        var d = cmpLoad();
        if (d.estado === 'debilitado') return 'Ando meio murcho... mas um dia de cuidado seu ja me levanta. Sem pressa.';
        if (d.estado === 'conversa') return 'To sentindo que voce sumiu uns dias... ta tudo bem por ai?';
        if (d.estado === 'atento') return 'Presente e de olho. Qual e a proxima?';
        var nivel = d.nivel;
        if (nivel >= 3) return 'Olha o tamanho que a gente alcancou. Isso e obra SUA.';
        if (nivel === 2) return 'Crescendo junto com a sua constancia!';
        return 'Oi! Sou seu companion. Cada dia de cuidado seu me faz crescer.';
    }

    function cmpRenderPanel(p) {
        var d = cmpLoad();
        p.innerHTML = '';
        var close = cmpEl('button', 'cmp-close', '\u00D7');
        close.addEventListener('click', function () { p.style.display = 'none'; });
        p.appendChild(close);

        var head = cmpEl('div', 'cmp-head');
        var av = cmpEl('span', '', '');
        av.innerHTML = cmpSvg(d.nivel, d.estado, 44);
        head.appendChild(av);
        var info = cmpEl('div', '', '');
        info.appendChild(cmpEl('b', '', d.nome + ' \u00B7 nivel ' + d.nivel));
        var prox = (d.nivel === 1 ? CMP_XP_NIVEL2 : (d.nivel === 2 ? CMP_XP_NIVEL3 : null));
        info.appendChild(cmpEl('div', '', prox ? (d.xp + '/' + prox + ' dias de cuidado') : 'Forma final \uD83C\uDF33'));
        head.appendChild(info);
        p.appendChild(head);

        p.appendChild(cmpEl('div', 'cmp-msg', cmpEstadoFrase()));

        if (d.estado === 'conversa' && d.conversaPendente) {
            cmpRenderConversa(p);
        }
    }

    // ---------- Conversa (SEMPRE antes de qualquer degradacao) ----------
    function cmpRenderConversa(p) {
        var acts = cmpEl('div', 'cmp-actions');
        var opcoes = [
            { t: 'To bem, so ocupado', tag: 'ocupado' },
            { t: 'Semana dificil', tag: 'dificil' },
            { t: 'Perdi o ritmo', tag: 'ritmo' }
        ];
        function responder(tag, textoLivre) {
            var d = cmpLoad();
            d.estado = 'atento';
            d.conversaPendente = false;
            d.ultimaConversaEm = cmpToday();
            cmpSave(); cmpRefreshBtn();
            cmpDiario({ ts: Date.now(), tipo: 'conversa-retorno', tag: tag, texto: textoLivre || '' });
            var resposta = {
                ocupado: 'Entendi! Vida cheia e sinal de vida acontecendo. Quando voltar, comeca por UMA tarefa pequena.',
                dificil: 'Sinto muito pela semana pesada. Que tal a gente escolher so 1 coisa gentil pra amanha?',
                ritmo: 'Ritmo se perde e se acha - sempre. Sugestao: abre o quadro e move 1 cartao. So isso ja religa.'
            }[tag] || 'Obrigado por me contar. To aqui, do seu lado.';
            var box = cmpEl('div', 'cmp-msg', resposta);
            p.appendChild(box);
            cmpAIAcolhida(tag, textoLivre, box);
        }
        for (var i = 0; i < opcoes.length; i++) {
            (function (op) {
                var chip = cmpEl('button', 'cmp-chip', op.t);
                chip.addEventListener('click', function () { responder(op.tag, ''); acts.style.display = 'none'; inp.style.display = 'none'; });
                acts.appendChild(chip);
            })(opcoes[i]);
        }
        p.appendChild(acts);
        var inp = document.createElement('input');
        inp.className = 'cmp-input';
        inp.type = 'text';
        inp.placeholder = 'Ou me conta com suas palavras...';
        inp.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && inp.value.trim()) {
                responder('livre', inp.value.trim());
                acts.style.display = 'none'; inp.style.display = 'none';
            }
        });
        p.appendChild(inp);
    }

    function cmpAIAcolhida(tag, texto, boxEl) {
        try {
            if (typeof callAI !== 'function') return;
            var prompt = 'Voce e um companion gentil de um app de produtividade (portugues do Brasil). ' +
                'O usuario ficou dias sem usar o app e respondeu: "' + (texto || tag) + '". ' +
                'Responda em ATE 2 frases: 1 acolhimento sem culpa + 1 sugestao pratica minuscula para recomecar. ' +
                'PROIBIDO: culpa, cobranca, listas. Responda somente o texto.';
            callAI(prompt).then(function (resp) {
                var t = (typeof resp === 'string') ? resp : (resp && resp.text ? resp.text : '');
                t = (t || '').trim();
                if (t && t.length < 300 && boxEl) boxEl.textContent = t;
            }).catch(function () { });
        } catch (e) { }
    }

    // ---------- Maquina de estados (avaliada 1x por abertura) ----------
    function cmpAvaliarEstado() {
        var d = cmpLoad();
        var hoje = cmpToday();
        if (!d.ultimoDiaComAtividade) { d.ultimoDiaComAtividade = hoje; cmpSave(); return; }
        var gap = cmpDaysBetween(d.ultimoDiaComAtividade, hoje);

        if (gap >= CMP_DIAS_CONVERSA && d.estado !== 'debilitado') {
            // Fala ANTES de sofrer - sempre.
            if (d.estado !== 'conversa') {
                d.estado = 'conversa';
                d.conversaPendente = true;
                cmpSave();
            } else if (d.perfil === 'vivo' && gap >= CMP_DIAS_DEBILITA && d.conversaPendente) {
                // Conversa ficou ignorada e o abandono virou padrao: murcha (nunca morre).
                d.estado = 'debilitado';
                cmpSave();
            }
        }
        cmpRefreshBtn();
        // Se ha conversa pendente, abre o painel UMA vez (nunca em foco)
        if (d.conversaPendente && !cmpFocus()) {
            setTimeout(function () { cmpTogglePanel(true); }, 1200);
        }
    }

    function cmpRegistrarCuidado() {
        // Qualquer conquista real do dia = cuidado. Recuperacao e rapida.
        var d = cmpLoad();
        var hoje = cmpToday();
        if (d.ultimoDiaComAtividade === hoje) return; // 1 xp por dia (anti-farming)
        d.ultimoDiaComAtividade = hoje;
        d.xp++;
        var subiu = false;
        if (d.nivel === 1 && d.xp >= CMP_XP_NIVEL2) { d.nivel = 2; d.nome = 'Brotinho'; subiu = true; }
        else if (d.nivel === 2 && d.xp >= CMP_XP_NIVEL3) { d.nivel = 3; d.nome = 'Arvora'; subiu = true; }
        if (d.estado === 'debilitado' || d.estado === 'conversa' || d.estado === 'atento') {
            d.estado = 'feliz';
            d.conversaPendente = false;
        }
        cmpSave(); cmpRefreshBtn();
        if (subiu) cmpCelebrar('Evolui gracas a VOCE! Nivel ' + d.nivel + ' \uD83C\uDF31');
    }

    // ---------- Celebracao (emocao pra fora, some sozinha) ----------
    function cmpCelebrar(texto) {
        if (!cmpOn() || cmpFocus()) return;
        cmpStyles();
        var old = document.getElementById('cmpBubble');
        if (old && old.parentNode) old.parentNode.removeChild(old);
        var b = cmpEl('div', 'cmp-bubble');
        b.id = 'cmpBubble';
        var av = cmpEl('span', '', '');
        av.innerHTML = cmpSvg(cmpLoad().nivel, 'feliz', 30);
        b.appendChild(av);
        b.appendChild(cmpEl('span', '', texto));
        document.body.appendChild(b);
        if (cmpBubbleTimer) clearTimeout(cmpBubbleTimer);
        cmpBubbleTimer = setTimeout(function () {
            if (b.parentNode) b.parentNode.removeChild(b);
        }, 5000); // regra de tempo de tela: nada fica aberto dependendo de clique
    }

    // ---------- Escolha de perfil (1o uso) ----------
    function cmpEscolherPerfil() {
        cmpStyles();
        var ov = document.getElementById('cmpPerfilOverlay');
        if (!ov) {
            ov = cmpEl('div', 'cmp-overlay');
            ov.id = 'cmpPerfilOverlay';
            document.body.appendChild(ov);
        }
        ov.innerHTML = '';
        var card = cmpEl('div', 'cmp-card');
        var av = cmpEl('div', '', '');
        av.innerHTML = cmpSvg(1, 'feliz', 56);
        card.appendChild(av);
        card.appendChild(cmpEl('h3', '', 'Como voce quer que eu funcione?'));
        card.appendChild(cmpEl('p', '', 'Voce pode mudar depois. Escolha o que combina com voce:'));

        var b1 = cmpEl('button', 'cmp-choice', '');
        b1.appendChild(cmpEl('b', '', '\uD83E\uDEBA So diagnostico (recomendado p/ perfil ansioso/TDAH)'));
        b1.appendChild(document.createTextNode('Eu observo, converso e sugiro. NUNCA sofro nem murcho.'));
        b1.addEventListener('click', function () { cmpDefinirPerfil('diagnostico'); });
        card.appendChild(b1);

        var b2 = cmpEl('button', 'cmp-choice', '');
        b2.appendChild(cmpEl('b', '', '\uD83C\uDF31 Vivo (p/ quem precisa de um empurrao de urgencia)'));
        b2.appendChild(document.createTextNode('Se voce sumir por muitos dias, eu murcho - mas converso antes, recupero rapido e nunca morro.'));
        b2.addEventListener('click', function () { cmpDefinirPerfil('vivo'); });
        card.appendChild(b2);

        ov.appendChild(card);
        ov.style.display = 'flex';
    }
    function cmpDefinirPerfil(perfil) {
        var d = cmpLoad();
        d.perfil = perfil;
        if (perfil === 'diagnostico' && d.estado === 'debilitado') d.estado = 'atento';
        cmpSave();
        var ov = document.getElementById('cmpPerfilOverlay');
        if (ov) ov.style.display = 'none';
        cmpInjectBtn(); cmpRefreshBtn();
        cmpCelebrar('Prazer! Vamos crescer juntos \uD83C\uDF31');
    }

    // ---------- Integracao com os momentos certos (via TEAEvents) ----------
    function cmpWireEvents() {
        if (!window.TEAEvents || cmpWireEvents.done) return;
        cmpWireEvents.done = true;
        TEAEvents.on('coins:earned', function (p) {
            if (!cmpOn()) return;
            cmpRegistrarCuidado();
            if (p && p.tipo === 'diamante') {
                cmpCelebrar('DIAMANTE! Isso foi conquista SUA \uD83D\uDC8E');
            }
        });
        TEAEvents.on('ritual:shutdown', function (s) {
            if (!cmpOn() || cmpFocus()) return;
            // Momento certo: fim de dia. Celebra junto ou acolhe - nunca cobra.
            if (s && s.tarefas > 0) {
                cmpCelebrar('Dia fechado com ' + s.tarefas + ' conquista' + (s.tarefas === 1 ? '' : 's') + '. Orgulho de VOCE!');
            } else {
                cmpCelebrar('Dia encerrado. Descansar tambem e cuidar \uD83C\uDF19');
            }
        });
        TEAEvents.on('ritual:checkin', function () {
            if (!cmpOn()) return;
            cmpAvaliarEstado();
        });
    }

    // ---------- Registro do add-on + boot ----------
    function cmpEnable() {
        cmpStyles();
        var d = cmpLoad();
        if (!d.perfil) { cmpEscolherPerfil(); return; }
        cmpInjectBtn();
        cmpAvaliarEstado();
    }
    function cmpDisable() {
        cmpRemoveBtn();
        var ids = ['cmpBubble', 'cmpPerfilOverlay'];
        for (var i = 0; i < ids.length; i++) {
            var e = document.getElementById(ids[i]);
            if (e && e.parentNode) e.parentNode.removeChild(e);
        }
    }

    function initCompanion() {
        if (cmpBooted) return;
        cmpBooted = true;
        if (typeof registerAddon === 'function') {
            registerAddon({
                id: CMP_ADDON_ID,
                nome: '\uD83C\uDF31 Companion',
                descricao: 'Um aliado que cresce com seu cuidado. Conversa antes de qualquer coisa, nunca cobra, nunca morre.',
                onEnable: cmpEnable,
                onDisable: cmpDisable
            });
        }
        cmpWireEvents();
        if (cmpOn()) cmpEnable();
        console.log('[TEA Planner] M6 Companion carregado.');
    }

    function cmpBoot() { try { initCompanion(); } catch (e) { console.error('companion init:', e); } }
    if (document.readyState === 'complete') { setTimeout(cmpBoot, 0); }
    else { window.addEventListener('load', function () { setTimeout(cmpBoot, 0); }); }

    window.CompanionTEA = { abrir: function () { cmpTogglePanel(true); }, celebrar: cmpCelebrar };
})();
