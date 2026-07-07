# Registro de Erro - Crash do PACOTE v8 (build sem CSS)

Data: 07/07/2026 · Gravidade: ALTA (app inutilizavel visualmente) · Deploy: NAO ocorreu (dano contido)

## O que aconteceu
Ao reescrever o build.ps1 no Ciclo 6, repliquei apenas a etapa de JS
(BUILD_JS_START/END) e **omiti a etapa de CSS** (BUILD_STYLE_START/END ->
inline de src/style.css). O root v8 saiu com <link href="style.css">
apontando para um arquivo desatualizado/ausente na raiz. Resultado: todos
os componentes estilizados pelo CSS novo (dropdown de Add-ons, dialogo do
timer, barra superior) renderizaram expandidos e desalinhados - o "crash"
do print. Os 4 testes de fumaca falharam em cascata porque o sandbox de
teste nao se montou nesse ambiente.

## Causa raiz (processo, nao codigo)
Reescrevi um script de infraestrutura **a partir da memoria do que ele
fazia**, sem rediffar o original recurso a recurso na hora da reescrita.
O original tinha 2 responsabilidades; eu carreguei 1.

## Por que o dano foi contido
- Gui nao fez deploy no GitHub Pages (homologacao local primeiro - processo funcionou).
- Dados do usuario vivem em localStorage + Firebase, nunca em arquivos.
- Todos os artefatos anteriores estavam versionados nos pacotes (v7.2 recuperavel).
- Hipotese inicial ("dedup quebrou o Add-ons") foi verificada e descartada
  com evidencia antes de qualquer correcao: o sintoma visual apontava CSS,
  e o build original confirmou a etapa faltante.

## Correcao (PACOTE TEA_RESGATE_v8.1)
1. index_RESTAURACAO_v7.2.html - retorno imediato a versao funcional.
2. build.ps1 v8.1 - DUAS etapas (CSS + JS) com validacoes que agora
   IMPEDEM o erro de repetir: o build falha se nao houver <style> inline
   ou se sobrar <link> externo.
3. index_v8.1 para homologar em paralelo (index_v81.html) antes de promover.

## Novas regras para o caderno
1. **Nunca reescrever script de build/infra de memoria**: abrir o original
   lado a lado e transferir responsabilidade por responsabilidade.
2. Todo build passa a validar o PRODUTO, nao so o processo: style inline
   presente, zero links externos de CSS, tags balanceadas, contagem de modulos.
3. Homologacao de build novo SEMPRE em arquivo paralelo (index_vXX.html)
   antes de substituir o index.html oficial.
4. Backup da pasta antes de extrair pacote grande (o leia-me pedia; a regra
   agora e o proprio pacote nomear o root como _TESTAR_ANTES por padrao).
