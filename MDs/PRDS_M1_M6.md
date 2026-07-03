# PRDs COMPLETOS — MÓDULOS M1 a M6 (Handover Fable → Opus 4.8)

> **Gerado pelo Fable (arquiteto). Executor: Opus 4.8.**
> Objetivo: o executor implementa cada módulo **sem tomar decisões de arquitetura** — tudo já está decidido aqui.
> Referência de estilo/padrão de código: `src/js/gamification.js` (M0, já implementado e em produção).

---

# PARTE 0 — FUNDAÇÃO TÉCNICA (implementar ANTES do M1)

## 0.1 Regras absolutas (herdadas do Plano Mestre — reler sempre)

1. Fonte da verdade = `src/`. O `index.html` da raiz é **gerado** pelo `build.ps1`. NUNCA editá-lo.
2. Cada módulo novo = **um arquivo novo** em `src/js/`, adicionado ao `$jsFiles` do `build.ps1` na posição indicada.
3. **Um módulo por vez**: implementar → `build.ps1` → `node --check` no bundle → testes → só então o próximo.
4. UTF-8 sem BOM. Sem acentos em mensagens de console.
5. Edições cirúrgicas. Retrocompatibilidade total: dados antigos sem os campos novos NÃO podem quebrar.
6. Estilo de código: **ES5-friendly como o gamification.js** (var, function declarations, sem arrow functions, sem async/await, sem classes). Motivo: consistência com o bundle existente e zero risco de transpilação.
7. Todo elemento que aparece sozinho tem **tempo de tela configurável** com fechamento automático (padrão do check-in: 5–30s).

## 0.2 Ordem final do build (`build.ps1` → `$jsFiles`)

```
core.js, auth.js, database.js, timers.js, kanban.js, agenda.js, ai.js,
gamification.js,   <- M0 (existe) + vira o REGISTRO de add-ons (0.4)
economy.js,        <- M1
streaks.js,        <- M2
wellbeing.js,      <- M3
rituals.js,        <- M4
centralbank.js,    <- M5
companion.js,      <- M6
init.js
```
Em `init.js` → `initApp()`, após `initGamification()`, adicionar NA ORDEM:
```js
if (typeof initEconomy === 'function') { initEconomy(); }
if (typeof initStreaks === 'function') { initStreaks(); }
if (typeof initWellbeing === 'function') { initWellbeing(); }
if (typeof initRituals === 'function') { initRituals(); }
if (typeof initCentralBank === 'function') { initCentralBank(); }
if (typeof initCompanion === 'function') { initCompanion(); }
```

## 0.3 Barramento de eventos `TEAEvents` (INOVAÇÃO-CHAVE: desacoplamento total)

Colocar no TOPO de `economy.js` (primeiro módulo novo a ser buildado):

```js
// Barramento de eventos global - modulos conversam sem se conhecer.
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
```

**Eventos canônicos** (nomes exatos, não inventar outros):
| Evento | Payload | Emitido por |
|---|---|---|
| `task:completed` | `{cardId, boardId, quadrant, isRecurring, timerSeconds}` | hook no kanban (0.5) |
| `task:uncompleted` | `{cardId, boardId}` | hook no kanban |
| `coins:earned` | `{tipo:'ouro'|'diamante', valor, motivo}` | economy.js |
| `streak:milestone` | `{recurrenceId, dias}` | streaks.js |
| `wellbeing:changed` | `{score, fatores}` | wellbeing.js |
| `ritual:checkin` | `{data}` | rituals.js/gamification.js |
| `ritual:shutdown` | `{data}` | rituals.js |
| `absence:detected` | `{dias}` | companion.js |

## 0.4 Refatoração do registro de add-ons (em `gamification.js`)

O dropdown "Add-ons" vira genérico. Adicionar a `gamification.js`:

```js
// Registro generico de add-ons. Cada modulo se registra.
var ADDON_REGISTRY = [];
function registerAddon(def) {
    // def: { id:'economy', nome:'💰 Carteira & Moedas', descricao:'...',
    //        onEnable:function(){}, onDisable:function(){} }
    ADDON_REGISTRY.push(def);
    renderAddonRow(def); // cria a linha com .toggle-switch no dropdown
}
function isAddonOn(id) { return addonsState[id] === true; }
function setAddonOn(id, on) {
    addonsState[id] = !!on; saveAddonsState();
    var def = ADDON_REGISTRY.find(function (d) { return d.id === id; });
    if (def) { on ? def.onEnable() : def.onDisable(); }
}
```
`renderAddonRow(def)`: cria `div.addon-row` (mesmo markup do Propósito Visual: span.addon-name + label.toggle-switch com input id=`addon_<id>_toggle`) dentro de `.addons-dropdown-content`, ANTES do botão `addonVerPropositoBtn`. O toggle do Propósito Visual existente permanece como está (não migrar M0 — estabilidade acima de pureza).

`addonsState` passa a aceitar chaves dinâmicas: `{ propositoVisual, checkinDuracao, economy, streaks, wellbeing, rituals, centralbank, companion }`. `loadAddonsState()` deve copiar TODAS as chaves de `parsed` (loop `for..in` com filtro de tipo), preservando a validação especial de `checkinDuracao`.

## 0.5 Hook de conclusão de tarefa (ponte kanban → gamificação)

O executor deve LOCALIZAR em `src/js/kanban.js` a função que marca card como concluído (procurar por: `completed`, `done`, `check`, toggle de checkbox do card). **NÃO reescrever a função.** Apenas acrescentar ao FINAL do fluxo de conclusão:

```js
if (window.TEAEvents) {
    TEAEvents.emit('task:completed', {
        cardId: card.id,
        boardId: currentBoardId,
        quadrant: detectQuadrant(card),   // implementar em economy.js (M1, 1.4)
        isRecurring: !!card.recurrence,   // usar o campo real de recorrencia do app
        timerSeconds: getCardTimerSeconds(card) // do TEA Timer; 0 se nao houver
    });
}
```
Se desmarcar conclusão → emitir `task:uncompleted`. Se os campos reais tiverem outros nomes (verificar no código), adaptar SEM alterar a interface do evento.

## 0.6 Versionamento de schema (estabilidade + expansão)

Toda estrutura persistida nova carrega `v: 1`. Ao carregar, se `v` ausente → tratar como v1. Migrações futuras: função `migrate<Modulo>(data)` por módulo. Nunca apagar dados não reconhecidos (forward-compatible).

---

# M1 — ECONOMY.JS: Carteira + Moedas (Ouro/Diamante)

## 1.1 Objetivo
Motor econômico. Concluir tarefa → ganha **Ouro** (recompensa diária). Marcos de vida → **Diamante** (longo prazo). Lógica Eisenhower **invertida**: Q2 vale mais. Carteira oculta por padrão; nada é subtraído, nunca.

## 1.2 Chaves de armazenamento (exatas)
- `tea-planner-wallet` (localStorage) → espelhado em Firebase `users/<uid>/gamification/wallet` (usar o mesmo padrão de sync do `boardsMeta`; se não houver helper genérico, salvar junto com o fluxo de `saveBoardsMetadata` em nó irmão).
```json
{ "v": 1, "ouro": 0, "diamante": 0, "historico": [
    { "ts": 1735800000000, "tipo": "ouro", "valor": 12, "motivo": "task:Q2",
      "cardId": "...", "boardId": "..." }
] }
```
- `historico` é **append-only**. Máx 500 entradas (ao passar, remover as mais antigas — o saldo NUNCA muda por isso).

## 1.3 Tabela de valores (Temporada 0 — provisória, o M5 recalibra depois)
| Quadrante | Ouro por conclusão |
|---|---|
| Q2 (importante, não urgente) | **12** |
| Q1 (importante, urgente) | 8 |
| Q3 (não importante, urgente) | 4 |
| Q4 (não importante, não urgente) | 2 |
| Sem quadrante definido | 3 |
| Tarefa recorrente | **0** (regra do M2 — nunca dá Ouro) |

Bônus âncora TEA Timer: se `timerSeconds >= 600` (10min de foco real), multiplicar por **1.5** (arredondar para cima). INOVAÇÃO: recompensa proporcional a esforço REAL medido, não a cliques.

## 1.4 Funções (esqueletos — implementar exatamente estas assinaturas)
```js
var LS_WALLET_KEY = 'tea-planner-wallet';
var ECONOMY_VALORES = { Q1: 8, Q2: 12, Q3: 4, Q4: 2, none: 3 };

function loadWallet() { /* le LS, valida shape, default {v:1,ouro:0,diamante:0,historico:[]} */ }
function saveWallet() { /* grava LS + dispara sync Firebase (mesmo padrao do meta) */ }
function detectQuadrant(card) {
    // O app tem matriz Eisenhower (board especial 'matrix'). Detectar pelo
    // posicionamento/flags do card (procurar campos importante/urgente ou coluna).
    // Retornar 'Q1'|'Q2'|'Q3'|'Q4'|'none'. Se impossivel determinar: 'none'.
}
function grantOuro(valor, motivo, extra) { /* incrementa, push historico, saveWallet, TEAEvents.emit('coins:earned',...), toast curto */ }
function grantDiamante(valor, motivo, extra) { /* idem */ }
function onTaskCompleted(payload) {
    if (!isAddonOn('economy')) return;
    if (payload.isRecurring) return;           // regra M2
    var base = ECONOMY_VALORES[payload.quadrant] || ECONOMY_VALORES.none;
    if (payload.timerSeconds >= 600) base = Math.ceil(base * 1.5);
    grantOuro(getPrecoAtual(payload.quadrant, base), 'task:' + payload.quadrant, payload);
}
function getPrecoAtual(quadrant, base) { return base; } // M5 sobrescreve isto
function onTaskUncompleted(payload) {
    // NAO subtrair (principio). Apenas registrar no historico com valor 0
    // e motivo 'desfeito' para o M5 analisar padroes de abuso.
}
function abrirCarteira() { /* mostra overlay walletOverlay com saldos + ultimos 20 do historico */ }
function initEconomy() {
    loadWallet();
    registerAddon({ id: 'economy', nome: '💰 Carteira & Moedas',
        onEnable: function () { updateWalletButtonVisibility(); },
        onDisable: function () { updateWalletButtonVisibility(); fecharCarteira(); } });
    TEAEvents.on('task:completed', onTaskCompleted);
    TEAEvents.on('task:uncompleted', onTaskUncompleted);
    initWalletUI();
}
```

## 1.5 UI (ids exatos; markup em `src/index.html`, estilos em `src/style.css`)
- Botão `#walletBtn` ("💰") no header, perto do dropdown Add-ons; `display:none` quando add-on OFF.
- Overlay `#walletOverlay` (classe `proposito-overlay`, reutilizar) com card `#walletCard`: saldo Ouro `#walletOuro`, Diamante `#walletDiamante`, lista `#walletHistorico`, botão fechar `#walletFecharBtn`.
- Toast de ganho `#coinToast`: aparece 2.5s ("+12 🪙 Ouro — tarefa Q2 concluída"), animação suave, canto inferior direito. NUNCA modal, NUNCA bloqueia.

## 1.6 Edge cases
1. Concluir/desfazer/concluir a mesma tarefa: 2º concluir NÃO paga de novo no mesmo dia (guardar `cardId+data` em `tea-planner-paid-today`, limpo na virada do dia). Anti-farming básico local.
2. Add-on OFF no momento da conclusão → não ganha, não acumula retroativo (simplicidade > justiça retroativa; documentar no toast de ativação: "Ganhos valem a partir de agora").
3. localStorage cheio (QuotaExceeded) → try/catch, avisar 1x via console, seguir sem histórico.
4. Firebase offline → carteira funciona local; sync quando voltar (mesmo comportamento do resto do app).

## 1.7 Aceite
✓ Q2 paga mais que Q1>Q3>Q4 ✓ recorrente paga 0 ✓ timer ≥10min dá 1.5x ✓ desfazer não subtrai ✓ re-concluir no dia não paga 2x ✓ carteira oculta até clicar ✓ OFF esconde tudo ✓ dados antigos intactos.

---

# M2 — STREAKS.JS: Streaks + Economia de Recorrentes

## 2.1 Objetivo
Recorrentes NÃO dão Ouro. Dão **consistência visível** (streak bend-not-break) e **Diamante em marcos** (7/30/365). Configurável; sistema sugere, usuário decide.

## 2.2 Dados
`tea-planner-streaks` (LS + sync espelhado como a wallet):
```json
{ "v":1, "porRecorrencia": { "<recurrenceId>": {
    "streakAtual": 5, "melhorStreak": 12, "ultimaConclusao": "2026-07-02",
    "flexRestantes": 2, "marcosPagos": [7] } },
  "config": { "diasParaAlertaDesistencia": 7, "maxRecorrentesAviso": 6 } }
```
- `recurrenceId`: usar o id real da recorrência do app (verificar em `kanban.js`/`core.js` como recorrências geradas referenciam a origem — campo tipo `recurrenceOrigin`/`seriesId`; usar o existente).

## 2.3 Regra bend-not-break (exata)
- Concluiu no dia → `streakAtual++`, `ultimaConclusao=hoje`, `flexRestantes` recarrega para 2 a cada 7 conclusões.
- Pulou 1 dia com `flexRestantes>0` → consome 1 flex, streak **mantém** (não incrementa).
- Pulou 1 dia sem flex → streak = `Math.max(1, Math.floor(streakAtual*0.75))` (dobra, não quebra).
- Pulou ≥ `diasParaAlertaDesistencia` → status "adormecida": mostrar sugestão calma de arquivar ("Quer pausar esta recorrência? Sem culpa."). Usuário decide. NUNCA arquivar sozinho.

## 2.4 Marcos → Diamante
7 dias = 1 💎, 30 = 5 💎, 365 = 60 💎. Pagar 1x por marco (`marcosPagos`). Emitir `streak:milestone`. Chamar `grantDiamante()` do M1 (se M1 OFF, guardar pendente em `marcosPendentes` e pagar quando ligar — exceção justa à regra 1.6.2 porque Diamante é de longo prazo).

## 2.5 UI
- Badge de streak no card recorrente: `🔥 <n>` (span `.streak-badge`), tooltip "Sequência: N dias (M flex restantes)".
- Ao completar recorrente: toast "🔥 Dia N! " (2s). Em marco: celebração 4s `#milestoneToast` com 💎.
- Configurações dentro do dropdown Add-ons (sub-row como a do check-in): slider `#streakAlertaRange` (3–30 dias) e `#streakMaxAviso` (3–15).

## 2.6 Edge cases
1. Duas conclusões da mesma recorrência no mesmo dia → conta 1.
2. Fuso/virada de dia: usar `getTodayStr()` local (mesmo padrão do M0).
3. Recorrência excluída → manter dados 30 dias (campo `orfaDesde`), depois limpar.
4. Streak importado de outro aparelho com conflito → prevalece o MAIOR `streakAtual` (generosidade > rigor).

## 2.7 Aceite
✓ recorrente nunca dá Ouro ✓ 1 falha não zera ✓ marcos pagam Diamante 1x ✓ sugestão de desistência só sugere ✓ config persiste ✓ badge aparece só com add-on ON.

---

# M3 — WELLBEING.JS: Medidor de Bem-estar

## 3.1 Objetivo
Medidor **visível por padrão, calmo**. Mistura dados **observados** (uso real) + **declarados** (1 pergunta). Desencoraja excesso, **nunca bloqueia**. Descanso recebe reconhecimento visível (sem moeda).

## 3.2 Dados
`tea-planner-wellbeing` (LS + sync):
```json
{ "v":1, "score": 72, "historico7d": [ {"data":"2026-07-02","score":72,
    "observado":{"tarefasConcluidas":6,"minutosFoco":95,"horaUltimaAtividade":"22:40","diasSeguidosUso":12},
    "declarado":{"energia":4}} ],
  "fontesExternas": [] }
```
`fontesExternas`: array reservado (INOVAÇÃO: arquitetura plugável — futuro: sono/passos via import). Cada fonte futura = `{id, nome, peso, getScore:function}` registrada por `registerWellbeingSource(def)` (implementar a função de registro JÁ, mesmo sem fontes).

## 3.3 Cálculo do score (0–100, determinístico)
```
base 50
+ min(20, tarefasConcluidasHoje * 3)        // produtividade saudavel
+ min(15, minutosFocoHoje / 10)             // foco real (TEA Timer)
+ (energiaDeclarada - 3) * 5                // -10..+10 (escala 1..5)
- (horaUltimaAtividade > 23h ? 10 : 0)      // madrugada desconta
- (diasSeguidosUso > 13 ? 8 : 0)            // sem descanso ha 2 semanas
clamp 0..100
```
Descanso: dia SEM uso do app NÃO reduz score; no retorno, mostrar selo "🌿 Você descansou — isso conta" (reconhecimento, zero moeda).

## 3.4 Declarado: 1 pergunta, 1 toque
No check-in matinal (M0/M4), acrescentar linha `#energiaRow`: "Como está sua energia?" com 5 botões `1..5` (`.energia-btn`). Opcional — pular não penaliza (usa 3 como neutro). Salvar em `declarado.energia`.

## 3.5 UI
- Pílula `#wellbeingPill` no header: círculo + número, cor por faixa (≥70 verde `--ok`, 40–69 âmbar, <40 azul-calmo — NUNCA vermelho, vermelho = alarme = ansiedade). Sem animação pulsante. Clique → popover `#wellbeingPopover` com os 3 fatores principais em linguagem humana ("Você focou 95min hoje 👏 / Última atividade tarde da noite").
- Add-on ON por padrão? NÃO — padrão OFF como todos (opt-in é lei), mas ao ligar fica visível permanentemente (é o único elemento persistente, decisão dos Ciclos 1–3).

## 3.6 Funções
```js
function initWellbeing() { /* registerAddon({id:'wellbeing',...}); TEAEvents.on('task:completed', recalc); TEAEvents.on('ritual:checkin', capturarEnergia); agendar recalc na abertura */ }
function recalcWellbeing() { /* coleta observados do dia (contar via TEAEvents acumulados em LS diario), aplica formula, salva, emit('wellbeing:changed') */ }
function registerWellbeingSource(def) { /* push em fontesExternas runtime */ }
```
Acumulador diário observado: `tea-planner-wellbeing-today` `{data, tarefas, minutosFoco}` — `minutosFoco` somado de `payload.timerSeconds`.

## 3.7 Edge cases
1. Sem dados do dia → score = média dos últimos 3 dias (ou 50).
2. Score não pode variar >15 pontos por recálculo (suavização — evita sustos).
3. Madrugada (0h–4h): atividade conta para o dia ANTERIOR (quem vira a noite não "zera").

## 3.8 Aceite
✓ pílula calma, sem piscar, sem vermelho ✓ nunca bloqueia nada ✓ descanso reconhecido sem moeda ✓ pergunta de energia opcional ✓ fórmula determinística testável ✓ OFF remove tudo.

---

# M4 — RITUALS.JS: Rituais (check-in+, shutdown, retorno, Sua Semana)

## 4.1 Objetivo
Momentos de transição: abrir o dia, fechar o dia, voltar de ausência, rever a semana. Todos opcionais, curtos, com tempo de tela, tom celebrativo.

## 4.2 Dados
`tea-planner-rituals` (LS + sync):
```json
{ "v":1, "ultimoCheckin":"2026-07-02", "ultimoShutdown":"2026-07-01",
  "ultimaAtividade":"2026-07-02", "semanas": [
    {"iso":"2026-W27","tarefas":23,"ouro":180,"melhorDia":"ter","streaksAtivas":3} ] }
```

## 4.3 Check-in matinal EXPANDIDO (evolui o M0, não substitui)
Ordem no card `#checkinOverlay` (existente): saudação → foto+frase do propósito (M0) → `#energiaRow` (M3, se ON) → micro-preview do dia: "Você tem N tarefas hoje, M no Q2" (`#checkinPreview`, 1 linha, ler da agenda/matriz) → botão Começar → barra de tempo (existente). Emitir `ritual:checkin` ao mostrar.

## 4.4 Shutdown (fim de dia)
- Gatilho: botão `#shutdownBtn` ("🌙") no header (só com add-on ON) — NUNCA automático (fim de dia varia; automático = intromissão).
- Card `#shutdownOverlay`: "O dia rendeu: ✔ N tarefas, 🔥 streaks mantidas, 🪙 +X" → 1 pergunta opcional "Amanhã, qual é A tarefa?" (input `#shutdownTopTask`, vira card no topo do quadro ativo, Q2 por padrão) → botão "Encerrar o dia". Tempo de tela: mesmo slider do check-in. Emitir `ritual:shutdown`.

## 4.5 Retorno sem culpa
Na abertura: `hoje - ultimaAtividade >= 3 dias` E add-on ON → ANTES do check-in, card `#welcomeBackOverlay`: "Que bom te ver 🌱 (sem cobranças aqui)" + "Seus quadros estão como você deixou" + botão "Continuar". PROIBIDO: mostrar contadores de dias perdidos, tarefas atrasadas em vermelho, ou streaks quebradas nesta tela. Emitir nada (silêncio é parte do acolhimento). Atualizar `ultimaAtividade` em toda abertura.

## 4.6 Sua Semana
Domingo OU segunda na primeira abertura da semana ISO nova: card `#weekReviewOverlay` com a semana fechada: tarefas ✔, Ouro, melhor dia, streaks — SEMPRE comparativo positivo ("+3 tarefas vs semana anterior" se maior; se menor: "Semana mais leve — às vezes é isso mesmo"). Guardar resumo em `semanas` (máx 12). Botão "Fechar". INOVAÇÃO leve: 1 insight gerado por `callAI` (se IA configurada) com prompt fixo: "Resuma em 1 frase POSITIVA e específica esta semana de produtividade: <json>. Proibido culpa ou cobrança." Fallback sem IA: frase template.

## 4.7 Aceite
✓ shutdown só manual ✓ retorno sem números negativos ✓ semana sempre em tom positivo ✓ todos com tempo de tela ✓ preview do dia correto ✓ OFF desliga os 4 rituais.

---

# M5 — CENTRALBANK.JS: Banco Central de IA

## 5.1 Objetivo (INOVAÇÃO PRINCIPAL DO PRODUTO)
IA recalibra os valores de Ouro por quadrante a cada ciclo de 14 dias, com **teto de ±20%**, e explica em linguagem humana via **Carta de Reajuste**. Anti-cheat ancorado no TEA Timer. Nenhum app de produtividade faz política monetária transparente — este é o diferencial de venda.

## 5.2 Dados
`tea-planner-centralbank` (LS + sync):
```json
{ "v":1, "temporada": 0, "precos": {"Q1":8,"Q2":12,"Q3":4,"Q4":2,"none":3},
  "proximaRecalibracao": "2026-07-16",
  "cartas": [ {"data":"2026-07-16","mudancas":{"Q2":{"de":12,"para":14}},
               "justificativa":"...", "aceitaEm": null} ],
  "metricas14d": {"conclusoesPorQuadrante":{"Q1":10,"Q2":4,"Q3":22,"Q4":8},
                   "tempoMedioTimerSeg": 420, "desfeitosSuspeitos": 1 } }
```

## 5.3 Regras de recalibração (determinísticas + IA só para a carta)
A CADA 14 dias (verificado na abertura):
1. Coletar `metricas14d` (acumular via `TEAEvents.on('task:completed'|'task:uncompleted')`).
2. Ajuste ALGORÍTMICO (não IA — IA não decide preço, só explica; estabilidade > criatividade):
   - Quadrante com MENOS conclusões relativas sobe até +20% (incentivo); com MAIS, desce até −20% (evita farm de fáceis). Q2 nunca fica abaixo de Q1 (princípio Eisenhower invertido é inviolável).
   - Arredondar para inteiro; piso 1.
3. `getPrecoAtual(q, base)` do M1 passa a retornar `centralbank.precos[q]` quando add-on ON.
4. Gerar **Carta de Reajuste** via `callAI` com prompt fixo: "Explique em 3 frases, tom amigável pt-BR, por que estes valores mudaram: <mudancas+metricas>. Proibido jargão econômico." Fallback template. Mostrar card `#cartaOverlay` na abertura seguinte (com tempo de tela; botão "Entendi" grava `aceitaEm`).

## 5.4 Anti-cheat (TEA Timer como lastro)
- Tarefa concluída com `timerSeconds == 0` em quadrante Q1/Q2 → paga só 50% do valor (Ouro exige lastro de tempo em tarefas importantes). Toast explica na 1ª vez: "Dica: use o TEA Timer (Alt+T) para ganho cheio".
- `desfeitosSuspeitos` (concluir→desfazer→concluir >3x/dia) → sinaliza na próxima carta e reduz teto de subida do quadrante abusado para 0% no ciclo.

## 5.5 UI
- Seção "🏦 Banco Central" dentro da Carteira (`#walletCard`): temporada, preços atuais, próxima recalibração, link "ver cartas" → lista `#cartasList`.
- `#cartaOverlay`: card estilo check-in com a carta, ícone 🏦.

## 5.6 Edge cases
1. M1 OFF → M5 não faz nada (dependência dura; ao ligar M5 com M1 OFF, ligar M1 junto com aviso).
2. Sem `callAI` configurada → carta via template fixo (nunca falhar).
3. Usuário ausente 30+ dias → pular recalibrações perdidas, recalibrar 1x só (nada de cartas acumuladas — culpa zero).

## 5.7 Aceite
✓ teto ±20% respeitado ✓ Q2 ≥ Q1 sempre ✓ carta em linguagem humana ✓ timer=0 em Q1/Q2 paga 50% ✓ farm concluir/desfazer detectado ✓ ausência longa não acumula cartas.

---

# M6 — COMPANION.JS: Companheiro Conversacional

## 6.1 Objetivo
Aliado que **conversa antes de qualquer coisa**, aprende padrões, propõe soluções. Dois perfis opt-in: **Diagnóstico** (nunca sofre — TDAH/ansioso) e **Vínculo** (sofre/recupera, nunca morre). Emoção sempre PARA FORA (celebra com você), nunca dependência.

## 6.2 Dados
`tea-planner-companion` (LS + sync):
```json
{ "v":1, "perfil": "diagnostico" | "vinculo", "nome": "Téo",
  "saude": 100, "evolucao": 1, "diasCuidado": 0,
  "padroes": { "horaFalhaComum": null, "quadranteEvitado": null, "melhorHorario": null },
  "conversas": [ {"ts":0,"pergunta":"...","resposta":"...","aprendizado":"..."} ] }
```
`conversas` máx 30 (janela de memória local — privacidade: NADA de padrões vai para a IA além do necessário por conversa).

## 6.3 Máquina de estados (perfil "vinculo")
```
saude 100..70: feliz | 69..40: quieto | 39..1: adoentado | nunca 0 (piso 1)
- Degrada SOMENTE por padrao de abandono: -10/dia APOS 3 dias sem atividade
  (dias 1-3: NADA acontece — a vida acontece)
- ANTES de degradar (dia 3): conversa obrigatoria "to sentindo que voce sumiu,
  ta tudo bem?" (#companionTalkOverlay). Se usuario responde (qualquer resposta),
  degradacao PAUSA 2 dias (a conversa e o cuidado)
- Recupera: +15 por dia com >=1 tarefa concluida; +5 extra se ritual shutdown
- Evolucao: 30 dias saude>=70 -> evolucao 2; 90 -> 3 (visual muda; nunca regride)
```
Perfil "diagnostico": `saude` fixa 100, sem degradação; só conversas e insights.

## 6.4 Conversas (usa `callAI` + voz existentes)
Gatilhos (máx 1 conversa/dia, sempre em check-in ou shutdown — NUNCA durante foco):
1. Tarefa Q2 adiada 3+ dias → "Percebi que <tarefa> está esperando. O que está travando?" Opções-botão: "Muito grande" (oferece quebrar em 3 via IA) / "Sem energia" (sugere mover para `melhorHorario`) / "Não é importante" (sugere mover para Q4/someday sem culpa).
2. Padrão de falha noturna detectado (3+ recorrências falhadas após 20h) → sugerir mover para manhã.
3. `absence:detected` → conversa do 6.3.
Prompt fixo da IA: system "Você é <nome>, companheiro de produtividade gentil. NUNCA culpe. Proponha 1 solução prática. Máx 2 frases pt-BR." + contexto mínimo. Registrar `aprendizado` (1 linha) em `padroes`/`conversas`.

## 6.5 UI
- Avatar `#companionAvatar` (emoji por estado/evolução: 🐣→🐥→🦉; adoentado: 🤒) canto inferior esquerdo, 48px, estático (SEM pulos/pisca). Clique → `#companionPanel`: estado, fala curta, últimas 3 conversas, escolha de perfil `#companionPerfilSelect` e nome `#companionNomeInput`.
- Setup na 1ª ativação: mini-wizard no próprio panel: nome + perfil (explicando os dois em 1 frase cada).
- `#companionTalkOverlay`: card de conversa com botões de resposta rápida + input livre opcional (voz: reutilizar reconhecimento pt-BR existente).

## 6.6 Edge cases
1. IA não configurada → conversas com templates fixos por gatilho (funciona 100% offline).
2. Trocar perfil vinculo→diagnostico: saude congela em 100 (sem drama de "abandono").
3. `saude` nunca exibida como número — só estado visual (número = ansiedade).
4. Usuário renomeia → atualizar em todas as falas.

## 6.7 Aceite
✓ nunca morre (piso 1) ✓ 3 dias de graça antes de qualquer coisa ✓ conversa SEMPRE precede degradação ✓ responder pausa degradação ✓ perfil diagnostico nunca sofre ✓ máx 1 conversa/dia, nunca em foco ✓ evolução nunca regride ✓ funciona sem IA configurada.

---

# ORDEM DE EXECUÇÃO PARA O OPUS (imprimir e seguir)

1. **Fundação 0.3–0.6** (TEAEvents + registry + hook kanban + versionamento) → build → testar M0 intacto.
2. **M1** → build → aceite 1.7 → deploy.
3. **M2** → build → aceite 2.7 → deploy.
4. **M3** → build → aceite 3.8 → deploy.
5. **M4** → build → aceite 4.7 → deploy.
6. **M5** → build → aceite 5.7 → deploy.
7. **M6** → build → aceite 6.7 → deploy.

A cada módulo: registrar erros/lições em `APRENDIZADOS_GAMIFICACAO.md` (obrigatório).
Em dúvida de arquitetura: a resposta está NESTE documento ou no padrão do `gamification.js`. Se realmente não estiver: PARAR e perguntar ao Gui — nunca inventar.
