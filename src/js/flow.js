// ============================================================
// MÓDULO: flow.js — Limite gentil de WIP (Ciclo 4, camada 4 do
// fix do "cemitério do inbox").
// Filosofia do projeto: o sistema DESENCORAJA, nunca bloqueia.
// Quando uma lista passa do limite, um selo âmbar calmo aparece
// no cabeçalho sugerindo uma Revisão. Nada pisca, nada trava,
// nada impede de adicionar cartões.
// Opt-in via Add-ons. ES5 puro. UTF-8 sem BOM. Console em ASCII.
// ============================================================
(function () {
    'use strict';

    var FLOW_LS_KEY = 'tea-planner-flow';
    var FLOW_ADDON_ID = 'flow';
    var FLOW_LIMITE_PADRAO = 7;
    var FLOW_INTERVALO_MS = 10000;

    var flowCfg = null;
    var flowTimer = null;
    var flowObserver = null;
    var flowBooted = false;

    function flowLoad() {
        if (flowCfg) return flowCfg;
        flowCfg = { v: 1, limite: FLOW_LIMITE_PADRAO };
        try {
            var raw = localStorage.getItem(FLOW_LS_KEY);
            if (raw) {
                var p = JSON.parse(raw);
                if (p && typeof p.limite === 'number' && p.limite >= 3 && p.limite <= 30) flowCfg.limite = p.limite;
            }
        } catch (e) { }
        return flowCfg;
    }
    function flowSave() {
        try { localStorage.setItem(FLOW_LS_KEY, JSON.stringify(flowCfg)); } catch (e) { }
    }
    function flowOn() {
        return (typeof isAddonOn === 'function') ? isAddonOn(FLOW_ADDON_ID) : false;
    }

    function flowStyles() {
        if (document.getElementById('flow-styles')) return;
        var css = '' +
            '.flow-badge{display:inline-flex;align-items:center;gap:4px;margin-left:6px;padding:2px 8px;' +
            'border-radius:10px;font-size:11px;font-weight:600;background:rgba(232,161,61,.16);' +
            'color:#e8a13d;border:1px solid rgba(232,161,61,.4);cursor:help;white-space:nowrap;' +
            'transition:opacity .3s ease;}' +
            '@media (prefers-reduced-motion: reduce){.flow-badge{transition:none;}}';
        var st = document.createElement('style');
        st.id = 'flow-styles';
        st.textContent = css;
        document.head.appendChild(st);
    }

    // Conta cartoes NAO concluidos de uma lista (concluido nao e mais "em progresso")
    function flowCountList(list) {
        var cards = list.querySelectorAll('.card');
        var n = 0;
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].dataset && cards[i].dataset.completed === 'true') continue;
            n++;
        }
        return n;
    }

    function flowRefresh() {
        if (!flowOn()) { flowClearBadges(); return; }
        flowStyles();
        var limite = flowLoad().limite;
        var lists = document.querySelectorAll('.list');
        for (var i = 0; i < lists.length; i++) {
            var list = lists[i];
            var header = list.querySelector('header');
            if (!header) continue;
            var n = flowCountList(list);
            var badge = header.querySelector('.flow-badge');
            if (n > limite) {
                if (!badge) {
                    badge = document.createElement('span');
                    badge.className = 'flow-badge';
                    header.appendChild(badge);
                }
                badge.textContent = '\uD83D\uDEA6 ' + n + '/' + limite;
                badge.title = 'Lista cheia (' + n + ' de ' + limite + ' sugeridos). Nada bloqueado - ' +
                    'mas que tal uma Revisao (botao da vassoura) pra dar respiro?';
            } else if (badge && badge.parentNode) {
                badge.parentNode.removeChild(badge);
            }
        }
    }
    function flowClearBadges() {
        var badges = document.querySelectorAll('.flow-badge');
        for (var i = 0; i < badges.length; i++) {
            if (badges[i].parentNode) badges[i].parentNode.removeChild(badges[i]);
        }
    }

    function flowEnable() {
        flowStyles();
        flowRefresh();
        // Observa mudancas no quadro (adicao/remocao/movimento de cartoes)
        var board = document.getElementById('board');
        if (board && !flowObserver && window.MutationObserver) {
            var pending = null;
            flowObserver = new MutationObserver(function () {
                if (pending) return;
                pending = setTimeout(function () { pending = null; flowRefresh(); }, 800);
            });
            flowObserver.observe(board, { childList: true, subtree: true });
        }
        if (!flowTimer) flowTimer = setInterval(flowRefresh, FLOW_INTERVALO_MS);
        try {
            if (window.TEAEvents && !flowEnable.wired) {
                flowEnable.wired = true;
                TEAEvents.on('board:switched', function () { setTimeout(flowRefresh, 400); });
            }
        } catch (e) { }
    }
    function flowDisable() {
        flowClearBadges();
        if (flowTimer) { clearInterval(flowTimer); flowTimer = null; }
        if (flowObserver) { flowObserver.disconnect(); flowObserver = null; }
    }

    function initFlow() {
        if (flowBooted) return;
        flowBooted = true;
        if (typeof registerAddon === 'function') {
            registerAddon({
                id: FLOW_ADDON_ID,
                nome: '\uD83D\uDEA6 Fluxo gentil (limite de WIP)',
                descricao: 'Sinaliza listas cheias com um selo calmo. Sugere, nunca bloqueia.',
                onEnable: flowEnable,
                onDisable: flowDisable
            });
        }
        if (flowOn()) flowEnable();
        console.log('[TEA Planner] Flow (WIP gentil) carregado.');
    }

    function flowBoot() { try { initFlow(); } catch (e) { console.error('flow init:', e); } }
    if (document.readyState === 'complete') { setTimeout(flowBoot, 0); }
    else { window.addEventListener('load', function () { setTimeout(flowBoot, 0); }); }

    window.FlowTEA = {
        refresh: flowRefresh,
        setLimite: function (n) {
            if (typeof n === 'number' && n >= 3 && n <= 30) { flowLoad().limite = n; flowSave(); flowRefresh(); }
        }
    };
})();
