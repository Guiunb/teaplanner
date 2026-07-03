# Registro de Aprendizados — Gamificação (TEA Planner)

> Documento consultado no início de cada ciclo para não repetir erros.

---

## Ciclo 4 — Implementação do Propósito Visual (v1)

### ✅ Decisões implementadas
- Add-on opt-in via dropdown "Add-ons" no cabeçalho (liga/desliga).
- Propósito por quadro (frase + até 3 fotos comprimidas ~720px/JPEG 0.7).
- Fotos pegam carona no sync do Firebase (`boardsMeta[i].proposito`); o app só lê.
- Check-in matinal 1x/dia; regra: quadro ativo, senão rotação entre os que têm.
- Arquitetura: módulo isolado `gamification.js`, buildado via `build.ps1`.

### ❌ Erro cometido e corrigido
- **O quê:** O check-in matinal foi implementado **sem fechamento automático** — a foto ficava na tela indefinidamente. No teste real, passou de 10 segundos e **virou distração**.
- **Princípio violado:** Já estava documentado (parecer do especialista em Gestão de Tempo) que a foto do check-in **não pode virar ruído visual/distração** — deveria ser um contato breve, não uma tela parada.
- **Causa raiz:** Ao codar, tratei o fechamento só pelo botão "Começar o dia", ignorando o cenário em que o usuário não clica e a tela fica aberta.
- **Correção:** Fechamento automático **configurável de 5 a 30 segundos** (padrão 8s), com barra de progresso calma (não pisca). O botão "Começar o dia" continua fechando na hora.

### 📌 Lição para os próximos ciclos
- Todo elemento visual de gamificação que aparece "sozinho" (check-in, celebração, companion) **precisa nascer com regra de saída/tempo de tela definida no PRD** — nunca deixar tela aberta dependendo só de ação do usuário.
- Revisar cada feature nova contra os princípios já documentados **antes** de fechar o build, não só depois do teste.

---

## Ciclo 4 — Decisões de feedback (economia M1)

Debate do time (neurocientista, gamificação, teoria dos jogos, gestão de tempo) sobre o que aparece ao ganhar Ouro. Convergência:

- **Brilho sutil e periférico** a cada conclusão, **proporcional ao quadrante** (Q2 forte, Q4 discreto) — feedback imediato sem virar ruído. Nunca bloqueia o foco.
- **Número só na Carteira** (fiel ao princípio "moedas ocultas, calmo"). Nada de "+12" repetido a cada tarefa (habituação + ansiedade em perfil perfeccionista).
- **Som opt-in, OFF por padrão**, só em ganho especial (Q2 / bônus de timer). Motivo do time: som é o reforço mais forte e o mais fácil de desalinhar/cansar; escassez preserva o poder. Ambiente compartilhado exige opt-in.
- **Inovação:** áudio procedural via Web Audio (sem arquivo, sem licença, latência zero, offline). O som **escala com o valor da tarefa** — vira sinalização de valor, não enfeite. Som escolhido: **"Cristal"** (duas notas ascendentes tipo sino).

**Lição:** feedback não é decoração — é sinalização de estratégia. Deve ser imediato, sutil, periférico e proporcional ao valor, com número e som guardados para carteira/momentos especiais.

---

## Incidente: edição externa (Gemini) + cópia em conflito do Dropbox (03/07/2026)

- **O quê:** Uma IA externa (Gemini) reescreveu `src/js/gamification.js` e **removeu 5 funções vitais** da Fundação (`registerAddon`, `isAddonOn`, `setAddonOn`, `detectCardQuadrant`, `getCardFocusSeconds`). Resultado: `initGamification`/`initEconomy` quebravam em cadeia e o M1 nunca aparecia, sem erro óbvio para o usuário. O Dropbox ainda gerou "Cópia em conflito", deixando ambíguo qual arquivo valia.
- **Como foi detectado:** auditoria por diff contra as versões homologadas + inventário de funções (comm) revelou exatamente o que foi apagado.
- **Correção:** restauração da versão homologada; hook do kanban corrigido (filhas de recorrência via `recurrenceParent` agora contam como recorrentes e carregam `seriesId`); monolito buildado e validado pelo coordenador e entregue pronto (ZIP com estrutura de pastas).
- **Lições:**
  1. Toda mudança de código passa pelo coordenador (diff + homologação) — IA sem o contexto do projeto quebra contratos entre módulos.
  2. "Cópia em conflito" do Dropbox = sinal de alerta: parar e auditar qual versão vale antes de buildar.
  3. Entregar pacote ZIP com estrutura de pastas + monolito pronto elimina a classe inteira de erros de "arquivo no lugar errado".

## M2 — Sequências (Streaks): CONCLUÍDO (03/07/2026)
- `streaks.js`: bend-not-break (falha 1 dia com flex segura; sem flex, dobra para 75%, nunca zera), 1 conclusão/dia por série, recarga de flex a cada 7, marcos 7/30/365 → 💎 1/5/60 via `grantDiamante` (pendências pagas quando M1 liga), badge 🔥 nos cards, sugestão calma de pausa para adormecidas (1/dia, configurável 3–30 dias), sync isolado com merge generoso (maior streak vence).
