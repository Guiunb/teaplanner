# TEA Planner 3.0 — Módulo de Gamificação · Ciclo 2 (Precificação por IA + Equilíbrio / Teoria dos Jogos)

> **Pré-requisito:** ler `TEA_PLANNER_3_GAMIFICACAO_CICLO1.md` ANTES deste. Este ciclo assume a economia do Ciclo 1 fechada.
> **Escopo:** ainda só IDEIA/design. Nenhuma linha de código.
> **Novidade:** entra o especialista em TEORIA DOS JOGOS.

---

## 0. O problema central deste ciclo
O jogador **define o valor das recompensas E executa as tarefas que imprimem moeda** — controla a Casa e o caça-níquel. Equilíbrio natural de um sistema auto-arbitrado = **inflação infinita OU desistência**. Objetivo do Ciclo 2: ancorar a economia em sinais que o jogador NÃO controla sozinho, sem depender da honestidade momento-a-momento (crítico p/ TDAH: o "eu de agora" rouba do "eu do futuro").

## 1. Separação dos dois lados da economia (FECHADA)
- **Lado do GASTO (preço das recompensas):** ancorado ao **custo real em dinheiro**. Recompensa cara (viagem R$8.000) custa MUITO em moeda; nenhuma quantidade de tarefas barateia. Mata inflação do lado do gasto. → IA precifica a partir de **dados externos (preços reais) + histórico do dono**; dono ajusta **dentro de limites**.
- **Lado do GANHO (valor da tarefa):** ancorado em sinais difíceis de fraudar (ver seção 2). É onde mora o risco de trapaça.
- Princípio-guia: "planilha não dá viagem internacional, mas planilha feita cansado dá um chocolate" — ganho ajustável por esforço, gasto preso à realidade.

## 2. Blindagem do GANHO (FECHADA — combina Caminhos B + C)
- **Caminho B — âncora objetiva:** valor da tarefa é CALCULADO de Eisenhower + esforço/tempo estimado + previsão (planejada antes) + **TEMPO REAL CRONOMETRADO** (o app já tem timer everywhere). Trapacear exige fingir o cronômetro → mais trabalho que fazer a tarefa. O timer existente vira o anti-trapaça.
- **Caminho C — IA como "Banco Central":** IA observa histórico real de conclusão e calibra o ritmo para alcance satisfatório-mas-não-trivial das recompensas. EXIGE transparência (não pode parecer injusto/opaco).
- **Caminho A (confiança pura) — DESCARTADO** (colapsa em inflação).
- Filosofia anti-trapaça: o sistema não PROÍBE trapaça; torna **ser honesto o caminho de menor esforço**.

## 3. Bônus de esforço / cansaço (FECHADA — dirigido pelo Medidor)
- "Mesma tarefa vale mais num dia cansado" → NÃO por auto-declaração (abusável), e SIM **automático, puxado pelo Medidor de Bem-Estar**: medidor baixo → IA concede bônus de esforço. Auto-limitante (não dá pra estar depletado todo dia; o medidor se recupera).
- **Teto inegociável:** bônus por empurrão vale com depleção LEVE; no **vermelho profundo**, o app para de pagar por insistir e oferece DESCANSO. Nunca pagar pra ter burnout.
- Ajuste manual do dono existe, mas **um toque e limitado** — nunca negociação obrigatória por tarefa (evita fricção).
- Dono quer o sistema **AI-ready desde já** ("acredito que é o futuro"): IA dá a base, dono ajusta limites.

## 4. Cold-start / Temporada 0 (FECHADA)
- Dono escolheu: **IA observa antes de cravar** os valores finais. PORÉM não se observa o vácuo → economia precisa rodar desde o dia 1.
- **Solução:** valores PROVISÓRIOS desde o dia 1 (rotulados "calibrando" / beta da sua economia) p/ motivação imediata. IA observa por trás e, após janela (~2 semanas), propõe valores ajustados de forma TRANSPARENTE, dono APROVA.
- **Armadilha de dados (inegociável):** NÃO calibrar pela 1ª semana (pico de lua-de-mel some → régua alta demais → falha na semana 3 → abandono). IA mira o **ritmo SUSTENTÁVEL** (mediana, descontando surto inicial), não o pico.
- Janela ~2 semanas faz dupla função: calibra economia + aprende capacidade real diária (alimenta a meta-faixa do Ciclo 1).

## 5. Taxa de câmbio por TEMPO-ATÉ-RECOMPENSA (FECHADA — framework)
- NÃO pensar em número arbitrário ("tarefa = 50 ouro"). Pensar em **RITMO**: define-se quão frequente cada recompensa deve ser alcançável; os números saem de trás pra frente (a partir do ritmo + capacidade observada).
- Alvos iniciais propostos: recompensa **pequena (Ouro)** alcançável a cada **~3 dias bons**; recompensa **grande (Diamante)** a cada **~1–3 meses**.
- **Diamante exige BARRA DE PROGRESSO visível** subindo sempre (TDAH desconta futuro distante; sem progresso à vista, recompensa de meses não move hoje).

## 7. Valores provisórios da Temporada 0 (FECHADA — provisórios, IA recalibra)
> Capacidade base do dono: ~5–10 tarefas/dia (~7 típico). AJUSTÁVEL em walkthrough, config e check-in. Tudo abaixo é PROVISÓRIO; IA recalibra após ~2 semanas pelo ritmo sustentável.

**Ouro por tarefa** (base 10 × quadrante invertido): Q2 = **30** · Q1 = 15 · Q3 = 5 (+"delegar?") · Q4 = 1 (+"apagar?").
**Bônus Ouro:** check-in +5 (garantido) · iniciar no horário +5 · tarefa prevista +5 · bater meta-faixa +10 (± surpresa). → **Dia bom ≈ ~100 Ouro** (âncora).
**Recompensas Ouro (pequenas, ~a cada 3 dias):** café/mini 100 (~1d) · chocolate 300 (~3d) · filme 500 (~5d) · compra pequena 1.000 (~10d).

**Diamante — ganho (marcos + consistência, NÃO por moer tarefa):** meta semanal 1💎 · meta mensal +3💎 · objetivo de vida 2–10💎 (escala) · 4 semanas seguidas +2💎. → **Mês engajado ≈ ~6–8💎.**
**Recompensas Diamante (grandes, ~1–3 meses):** jantar caro 8💎 (~1m) · hotel fim de semana 15💎 (~2m) · viagem nacional 25💎 (~3–4m) · viagem internacional 40💎+ (~5–6m, ou mais rápido completando marcos de vida).

**Princípio reforçado:** viagem internacional NÃO sai de Ouro (sem câmbio) — sai de consistência + avançar a vida real. O Ciclo 1 se paga.

**Regras de equilíbrio (FECHADAS):**
- **Assimetria de segurança:** dono pode tornar recompensas mais CARAS livremente (mais disciplina); torná-las mais baratas tem **PISO** (bloqueia colapso "tudo trivial").
- Dono ajusta **RITMO + CAPACIDADE**, não os números crus (valores são derivados → mais à prova de trapaça).
- **Barra de progresso do Diamante SEMPRE visível** (TDAH não rastreia recompensa distante sem progresso à vista).

## 8. Transparência da IA — "Carta de Reajuste" (FECHADA)
- **Reframe-chave (a base da confiança):** a IA NÃO tem agenda própria. Não decide "o que é bom pra você" — só faz a conta pra manter o RITMO QUE O DONO ESCOLHEU verdadeiro conforme o comportamento real muda. É calculadora a serviço da meta do dono, não autoridade acima dele.
- **Carta de Reajuste (interface):**
  - **Rara e em lote** (fim da Temporada 0 + periódico mensal / quando desvia muito). Preços que mudam todo dia = injogável; estabilidade é parte da confiança.
  - **Linguagem simples primeiro, detalhe sob demanda** (progressive disclosure). Ex.: "Seus mimos estavam longe demais; aproximei de novo." → "ver detalhes" mostra antes→depois + motivo.
  - **Motivo ancorado no dado:** "~110 ouro/dia nas últimas 2 semanas, acima do previsto → chocolate de 300 p/ 350, pra seguir ~3 dias."
  - **NUNCA retroativo, e explícito:** "o que você já ganhou não muda — vale daqui pra frente." (Sem isso, reajuste p/ baixo = sensação de roubo → quebra regra-mãe do Ciclo 1.)
  - **Botões: Aceitar / Ajustar.** Proposta, não imposição.
- **Inflação vs. Crescimento (regra de equilíbrio FECHADA):** cancelar INFLAÇÃO (mesmo esforço, número inflado) mas RECOMPENSAR CRESCIMENTO real (esforço maior sustentado → recompensas mais rápidas ou maiores). Sem isso = ESTEIRA (corre mais, fica parado) = desmotiva.
- **Reajuste p/ cima = conquista, nunca punição:** vem embrulhado como "subiu de nível, desbloqueou recompensas maiores" (igual jogo: inimigo mais forte + você mais forte + loot melhor). Subir régua sem recompensa ensina a pessoa a NÃO melhorar.

## 9. CICLO 2 — FECHADO E APROVADO ✅
Economia precificada e equilibrada: dois lados ancorados (gasto=custo real, ganho=Eisenhower+timer+IA), Temporada 0 com valores provisórios, IA calibra pelo ritmo sustentável, bônus de esforço pelo Medidor, transparência via Carta de Reajuste. Pronto para (futura) implementação.

## 10. Transborda para o Ciclo 3
- **Detox & Saúde / Medidor de Bem-Estar** — agora central (dirige o bônus de esforço). Próximo ciclo natural.
- **🔔 LEMBRETE (do Ciclo 1, seção 10):** avaliar o Medidor como "tamagotchi/companheiro". Coordenador DEVE lembrar o dono ao entrar no Detox.
- Walkthrough de onboarding (metas em faixa + setar capacidade/ritmo).
- Diário de Fricção: UI e formato do log.
- **Itens carregados do Ciclo 2 (não resolvidos, decidir depois):** (a) unificar ou separar "bônus de previsão" + "bônus de antecipação"; (b) anti-trapaça do timer — cronômetro deve exigir presença real? como evitar "deixar rodando" sem fazer?
- [FASE DE CÓDIGO, depois]: dropdown + toggle; "Hoje" vs backlog escondido; WIP; barra de progresso do Diamante; respeitar `lessons_learned.md`.

---
*Ciclo 2 fechado. Ciclo 3 = Detox & Saúde. Ler Ciclo 1 e Ciclo 2 antes.*
