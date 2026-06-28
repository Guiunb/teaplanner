# TEA Planner 3.0 — Módulo de Gamificação · Ciclo 1 (Design da Economia)

> **Como usar:** ler ANTES de qualquer proposta nos próximos ciclos. Não retrabalhar nem reabrir o que está fechado. Atualizar ao fim de cada ciclo.
> **Escopo:** só IDEIA/design. Nenhuma linha de código foi escrita.

---

## 0. Contexto fixado (não reabrir)
- **TEA** = Trello + Eisenhower + Agenda. Não tem relação com autismo.
- Dono/usuário inicial tem **TDAH**; app é para ele primeiro, depois vira produto.
- Módulo de gamificação é **opt-in** (dropdown junto ao Switch de config rápidas).
- Código atual: SPA monólito `index.html` (~11k linhas), sem nada de gamificação. Tem painéis colapsáveis (Kanban/Matriz/Agenda/Semanal).

## 1. Filosofia (fechada)
- Alvo NÃO é "viciante". É **"irresistível de começar, fácil de retomar, impossível de gerar culpa"**. Sem dark patterns.

## 2. Modelo de recompensa (fechada)
- **Núcleo previsível** (valor base fixo e conhecido → permite planejar) + **surpresa só na camada de cima** (streak, hora dourada, drops, bônus).
- **Variabilidade só ADICIONA, nunca subtrai.** Nunca se perde/aposta moeda já ganha.

## 3. Moedas + Medidor (FECHADA — 2 moedas gastáveis + 1 medidor)
- Token economy AUTO-FINANCIADO: moedas compram **recompensas reais** ("Dopamine Menu").
- **Ouro** = AGIR/dia (dopamina). Recompensas pequenas. Base não expira.
- **Diamante** = CONQUISTAR/vida. Recompensas grandes. **Nunca expira.** Vem de marcos de longo prazo + consistência (ponte, não câmbio).
- **Medidor de Bem-Estar** = ESTAR BEM (serotonina/equilíbrio). NÃO é moeda (bem-estar não se gasta, se mantém). Sobe com descanso/sono/pausa; cai ao se esfolar dias seguidos. Baixo → app SEGURA o ritmo ("você está no vermelho, descansa — não farma hoje"). É o coração do módulo Detox & Saúde.
- Correção de neurociência fixada: dopamina = impulso de AGIR (não "prazer"); serotonina = CONTENTAMENTO/equilíbrio (não "recompensa de longo prazo").

## 4. Valor por cartão (fechada)
- **App sugere padrão; usuário ajusta num toque.** Recompensa própria → IA sugere preço.
- Padrão pelo **Eisenhower, INVERSO ao apelo**: Q2 = prêmio máximo + Diamante; Q1 = modesto; Q3 = baixo + "delegar?"; Q4 = ~zero + "apagar?".
- **Diferencial de venda:** recompensa a COISA CERTA (Q2), não o volume.

## 5. Metas (fechada — pesquisa jun/2026)
- **Faixas ajustáveis ("range goals")**: meta-respiro (mín) + meta-alvo (ideal). Persistência flexível > rígida.

## 6. Mecânicas detalhadas (fechadas)
1. **Pontualidade:** bônus por **INICIAR** na janela tolerante (±15–30min). Streak de pontualidade (dobra, não quebra). Nunca multa atraso.
2. **Tirar do baú:** bônus pequeno e ÚNICO por decompor+agendar, em GARANTIA — destrava de fato só na CONCLUSÃO.
3. **Excesso / overwhelm (REVISADO com o dono):** problema real = excesso VISÍVEL paralisa (resposta de ameaça → paralisia). Solução é VISUAL, não de pontos: **capturar é livre; mostrar menos.** "Hoje" mostra só o comprometido (vencível); **backlog recolhido/escondido por padrão** (gaveta); **limite de WIP** no "Hoje" (encheu → oferece mandar pro backlog, não empilha). Captura ≠ display.
   - **Planejado vs. reativo (ideia do dono, reframe):** NÃO diluir a tarefa não-prevista (seria castigo). Em vez disso, **BÔNUS DE PREVISÃO** para tarefa agendada com antecedência. Reativa = valor normal (não punir incêndio inevitável). Primo do bônus de antecipação (unificar ou não → decidir no Ciclo 2).
   - **Antecipação:** fazer o importante ANTES de virar urgente → bônus. (Nunca punir urgência.)
   - Recompensar LIMPEZA do quadro (arquivar tarefa morta).
4. **Envelhecimento:** envelhecer NÃO dá mais moeda-base. Concluir **Q2 travada** dispara **surpresa**: sorteio modesto e/ou **janela de pontos dobrados** (momentum ~20min, expiração suave). Prêmio NÃO escala com idade (zero incentivo a deixar envelhecer), só com importância. Decaimento visual da tarefa velha.
5. **Expiração:** base não expira; só bônus-surpresa pode ter validade curta. Diamante nunca expira. App empurra o GASTO.
6. **Check-in diário:** ≤30s. Manhã: moeda-base garantida + define meta-faixa + check de capacidade; streak vive aqui (exige plano real). Noite (opcional): revisão, soma, bônus, **gatilho de detox**.

## 7. Streaks (fechada — pesquisa Duolingo)
- "Dobra, não quebra." **2 streak-freezes** (3 não melhora). Não pode ser mantido com tarefa-lixo. Sem notificação culpada.

## 8. Diário de Fricção (feature anotada)
- Em tarefa/horário repetidamente adiado, perguntar **por quê** e logar para estudo/soluções nos ciclos.
- Regras: pergunta CURIOSA e SEM CULPA, UM TOQUE (motivos prontos), 100% pulável, NÃO paga moeda. Enquadre "me ajuda a te ajudar".

## 9. Em aberto p/ próximos ciclos
- [ ] OK FINAL do dono no fechamento do Ciclo 1.
- [ ] **CICLO 2 (escolhido):** Precificação por IA + equilíbrio → entra **TEORIA DOS JOGOS**. Risco: generoso demais (compra a viagem na 1ª semana) vs duro demais (nunca alcança → desiste). Decidir aqui: unificar bônus de previsão + antecipação?
- [ ] Módulo **Detox & Saúde** (Medidor de Bem-Estar): catálogo de descanso + gatilhos anti-burnout.
- [ ] Walkthrough de onboarding (metas em faixa).
- [ ] Diário de Fricção: UI e formato do log.
- [ ] UI: dropdown + toggle; "Hoje" vs backlog escondido; limite de WIP [FASE DE CÓDIGO].
- [ ] Implementação respeitando `lessons_learned.md` (monólito frágil, UTF-8 sem BOM, edição <100 linhas).

## 10. 🅿️ Estacionamento de ideias — REVISITAR, não decidir agora
> Coordenador DEVE lembrar o dono destas ideias no momento certo.

- **🔔 LEMBRETE — Medidor de Bem-Estar como "tamagotchi/companheiro":** em vez de uma barra, o medidor vira um personagem vivo que acompanha como você está, fica com você no descanso, conversa e coleta mais informações sobre você. Dono pediu para GUARDAR e ser LEMBRADO. **Decisão adiada de propósito.** Pontos a debater quando reabrir: vínculo/engajamento (a favor) vs. risco de apego emocional, privacidade dos dados conversacionais, e perigo de o personagem gerar CULPA (violaria a filosofia "impossível de gerar culpa"). Avaliar provavelmente após o Ciclo 2 ou junto do módulo Detox & Saúde.

---
*Ciclo 1 — só design. Próximo ciclo: ler este doc primeiro.*
