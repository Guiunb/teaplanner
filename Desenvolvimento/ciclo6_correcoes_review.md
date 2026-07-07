# Ciclo 6: Correcao Completa do Review - Registro de Decisoes e Aprendizados

Data: 07/07/2026 · Entregavel: PACOTE v8 (src completo de 17 modulos + build novo)

## O que foi corrigido (todos os itens do REVIEW_CODIGO_v7.2)

**V1 - Deduplicacao:** 13 copias mortas removidas (10 do agenda.js, 1 do
database.js, 2 do timers.js), sempre preservando a copia ATIVA (ultima na ordem
do build) byte a byte - zero mudanca de comportamento por construcao. agenda.js
caiu de ~2.000 para 624 linhas. Cada remocao deixou marcador [DEDUP v8]
apontando onde a versao ativa vive.

**Excecao deliberada:** getPrecoAtual NAO foi deduplicada - inspecao revelou
OVERRIDE INTENCIONAL (economy.js define fallback `return base`; centralbank.js
redefine com precos dinamicos do M5). Deduplicar quebraria o Banco Central.
Acao: documentacao em voz alta nos dois arquivos + aviso no build.ps1.

**V2 - XSS:** escapeHtml() oficial criado no core.js. ai.js: cleanText agora
faz o que o comentario prometia; 3 campos de recorrencia interpolados em
innerHTML (interval/endDate/endCount - atacaveis via backup adulterado) foram
escapados. Regra registrada no codigo: dado que nao nasceu no codigo nunca
entra em innerHTML sem escapeHtml; caminho preferido segue textContent.

**A3 - timers.js:** resolvido pela propria deduplicacao - as chamadas de
Notification eram das copias mortas; a versao ativa (ai.js) tem 17 try/catch.

**A4 - database.js:** 11 console.log de sync atras de window.TEA_DEBUG.

**A5 - Build:** build.ps1 reescrito no formato COMPROVADO (concatenacao plana
com marcadores, sem wrapper), com validacoes embutidas (modulos presentes,
tags balanceadas) e gravacao UTF-8 sem BOM. Root v8 gerado por build real, nao
mais por patch de injecao.

**A6 - </script> orfao:** removido do src/index.html; tags 4/4 balanceadas.

## Descoberta critica do ciclo

**O src local do Gui (agenda.js, ai.js) estava MAIS NOVO que o app em
producao** - o root v6 rodava versoes antigas desses modulos. Com os arquivos
reais em maos, a contagem de funcoes divergentes subiu de 3 para 8, e o
openTimerDialog tinha 3 copias com 3 versoes distintas. O v8 unifica tudo:
fonte da verdade completa no src/ + build reproduzivel.

## Aprendizados de processo

1. Reconstruir modulos a partir do root buildado funciona (3 de 5 arquivos
   foram byte-identicos), mas os arquivos REAIS do dono sao insubstituiveis -
   pedir sempre que faltarem.
2. Scanner de duplicatas precisa distinguir declaracao de nivel superior
   (colisao real) de funcao aninhada (escopo proprio, inofensiva) - a primeira
   varredura acusou falsos positivos (ex.: `line` nos rituais).
3. Asserts em scripts de edicao salvaram o ai.js duas vezes: padrao que nao
   casa -> nada e gravado -> arquivo original intacto.
4. Nem toda duplicata e bug: inspecionar antes de deduplicar (getPrecoAtual).

## Homologacao pendente (com o dono)

Teste completo pos-v8: cartao, timer Alt+T, recorrencia, alerta, arrasto no
celular, Add-ons, Revisao, Rituais, Companion, e sync em 2 dispositivos.
Atencao especial a recorrencias/alertas (codigo deduplicado) e ao fato de o
v8 ativar as versoes mais novas de agenda.js/ai.js que nao estavam em producao.
