# PROGRESSO DO BUILD — Módulos de Gamificação (retomar aqui a qualquer momento)

> Documento de continuidade. Se a sessão acabar, a próxima começa lendo isto + `PRDS_M1_M6.md` + `gamification.js`.

## Estado atual: **M2 — Streaks — CONCLUÍDO** ✅ (M1 corrigido pós-incidente Gemini; monolito entregue pronto via ZIP)

(Fundação Part 0: concluída antes.)

### O que foi feito
- **`gamification.js`** ganhou a infraestrutura da Fundação:
  - `TEAEvents` (barramento de eventos global, em `window.TEAEvents`).
  - Registro genérico de add-ons: `registerAddon`, `isAddonOn`, `setAddonOn`, `renderAddonRow`.
  - `loadAddonsState` agora copia chaves dinâmicas (preservando o clamp de `checkinDuracao`).
  - Utilitários ancorados no código real: `detectCardQuadrant(cardEl)` e `getCardFocusSeconds(cardEl)`.
- **`kanban.js`** → `toggleCardCompletion` emite `task:completed` / `task:uncompleted` com payload real do DOM.
- Homologado: `node --check` módulo + bundle (10.124 linhas), M0 intacto, sem mojibake.

### Fatos do código real (descobertos — NÃO reassumir o que o PRD dizia)
- Card é **DOM** com datasets: `id`, `boardId`, `recurrence` ('none' quando não recorrente), `timerTotal`, `timerLeft`, `timerState`, `completed`.
- Quadrante = coluna `.list[data-quad="Q1..Q4"]` da matriz (`core.js`). Card fora da matriz → 'none'.
- Firebase: `users/<uid>/...` (uid em `auth.currentUser.uid`); boards em `/boards`, meta em `/meta`.
- Conclusão: `toggleCardCompletion(e)` em `kanban.js` (~linha 282).

### Decisões de arquitetura travadas nesta sessão
- **Sync dos dados de gamificação:** nó dedicado **`users/<uid>/gamification/<chave>`** (isolado — bug de gamificação nunca corrompe boards/meta). *(decisão de engenharia, coordenador)*
- **Detecção de quadrante:** coluna do próprio card → espelho na matriz por `data-id` → 'none'. *(implementado na Fundação)*
- Estilo: ES5 (var/function), como o `gamification.js`.

## Próximos passos (ordem)
1. **[AGORA] M1 — economy.js** (Carteira + Moedas). Pré-requisito: decisão de UX do feedback de moeda (ver PENDÊNCIA abaixo).
2. M2 — streaks.js
3. M3 — wellbeing.js
4. M4 — rituals.js
5. M5 — centralbank.js
6. M6 — companion.js

A cada módulo: implementar em `src/` → `build.ps1` → `node --check` bundle → aceite do PRD → deploy → registrar lição em `APRENDIZADOS_GAMIFICACAO.md`.

## M1 — concluído nesta sessão
- `economy.js` (novo): Ouro/Diamante, valores Eisenhower invertidos (Q2=12>Q1=8>Q3=4>Q4=2, none=3), bônus timer 1.5x, recorrente=0, nunca subtrai, anti-farming (não paga 2x/dia).
- Sync isolado `users/<uid>/gamification/wallet` (merge por lastUpdate).
- Feedback: brilho proporcional ao quadrante (sem número) + som "Cristal" opt-in (OFF), só em Q2/timer.
- UI: botão 💰 no header (oculto se OFF), modal Carteira com saldos+histórico+toggle de som.
- Arquivos: `economy.js` (novo, `src/js/`), `index.html`, `style.css`, `init.js`, `build.ps1`.
- Homologado: sintaxe, bundle (10.400 linhas), IDs, encoding, testes de valor.

## PRÓXIMO: **M3 — wellbeing.js** (Medidor de Bem-estar). M2 feito; ver APRENDIZADOS (incidente Gemini) (streaks bend-not-break + Diamante em marcos 7/30/365). Usa grantDiamante() do M1 (já pronto).

## (resolvido) PENDÊNCIA aberta (decisão do dono do projeto) — bloqueia início do M1
**RESOLVIDO:** brilho proporcional + número só na Carteira + som "Cristal" opt-in (Q2/timer).

## Arquivos entregues nesta sessão (colocar em `src/`)
- `gamification.js` → `src/js/gamification.js`
- `kanban.js` → `src/js/kanban.js`
(build.ps1 e init.js **não** mudaram ainda — mudam quando o economy.js/M1 for criado.)
