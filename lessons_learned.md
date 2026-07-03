# Relatório de Lições Aprendidas (Post-Mortem & Prevenção de Regressões)

Este documento registra o histórico das regressões de código detectadas no desenvolvimento do **TEA PLANNER 2.0** e define os padrões operacionais obrigatórios para fusão de novos recursos e preservação de funcionalidades existentes.

---

## 1. O Histórico de Regressões (O que aconteceu?)

Durante as sucessivas iterações de modificação do arquivo monolítico `index.html` (que possui mais de 8.800 linhas), o sistema sofreu dois tipos críticos de regressão induzidos por assistentes automatizados:

### Incidente A: Substituição Cega de Texto (Regex Global e Sem Contexto)
* **Causa Raiz**: Foi executado um comando de substituição automática de strings em lote (PowerShell `-replace` ou similar) para traduzir ou alterar caracteres. No entanto, a substituição foi aplicada sem considerar os limites de palavras da linguagem (`\b`) ou o escopo do código fonte:
  * A palavra reservada CSS/JS **`none`** virou **`nãone`** ou `nǜone`.
  * O operador lógico/termo **`not`** virou **`nãot`**.
  * Variáveis locais de controle como **`noEdit`** viraram **`nãoEdit`**.
  * Opções de temas de cores como **`Ciano`** e **`Oceano`** viraram **`Cianão`** e **`Oceanão`**.
* **Impacto**: O interpretador do navegador lançou um erro fatal de sintaxe (`Uncaught SyntaxError: Invalid or unexpected token`), impedindo o carregamento completo do aplicativo para o usuário.

### Incidente B: Corrupção de Encoding & Sobrescritas em Fusões
* **Causa Raiz**: Ao tentar adicionar novas funcionalidades robustas de uma só vez (como a sincronização em tempo real do Firebase ou o módulo de Agenda Semanal com Recorrências), os agentes utilizaram editores que não preservaram o charset correto ou sobrescreveram trechos adjacentes sem validação de escopo:
  * **Corrupção de Caracteres (Charset UTF-8 vs Latin-1)**: Cerca de 30 termos da interface e tooltips na seção de agenda e recorrência foram corrompidos, exibindo símbolos ilegíveis (como `Recorrncia` e `horrio`). Botões cruciais da UI começaram a renderizar `??` no lugar de seus respectivos ícones.
  * **Perda de Funcionalidades Existentes**: Módulos de conexão com Inteligência Artificial (Gemini/OpenAI) e trechos de rotinas de histórico (`Undo/Redo`) foram acidentalmente apagados ou comentados de maneira incorreta durante a colagem de blocos monolíticos de código alternativos, devido à incapacidade da IA de gerenciar o contexto completo de 8.800 linhas simultaneamente.

---

## 2. Como Evitar no Futuro (Novas Diretrizes)

### Diretriz 1: Proibição Absoluta de Substituições Globais Cegas
* **Nunca** rodar comandos de substituição em lote em arquivos de código sem testar expressões regulares estritas com limites de palavras (`\bno\b`).
* O método recomendado para edição de arquivos é o uso de ferramentas seguras como `replace_file_content` or `multi_replace_file_content`, mapeando linhas exatas e garantindo que o termo alterado está estritamente localizado no bloco alvo.

### Diretriz 2: Fusão Cirúrgica e Preservação de Código Adjacente
Ao mesclar novos recursos (como Agenda, Premium, Timers) no arquivo único:
1. **Preservar Assinaturas**: Não altere nem apague funções antigas a menos que haja uma requisição explícita.
2. **Mesclagem por Pequenos Blocos**: Evite fazer modificações massivas substituindo milhares de linhas de código de uma vez. Faça a injeção em pequenos blocos de até 100 linhas, validando a sintaxe em cada etapa.
3. **Não misturar idiomas**: Manter o padrão do código (variáveis em inglês/camelCase, strings de tela do usuário em português).

### Diretriz 3: Preservação de Codificação UTF-8 sem BOM
* O arquivo `index.html` deve sempre ser mantido e salvo sob a codificação **UTF-8 sem BOM**.
* Atenção especial a scripts automáticos ou editores de linha de comando: ferramentas como o `Out-File` do PowerShell geram codificações como UTF-16LE ou ANSI por padrão, o que corrompe acentos e ícones na interface. Sempre especifique explicitamente a codificação UTF-8 (`-Encoding utf8`) ao persistir alterações.

---

## 3. Guia de Verificação para Homologação de Alterações

Antes de consolidar qualquer alteração crítica no `index.html`, o desenvolvedor ou a IA deve passar pela seguinte lista de checagem:

1. **Validação de Sintaxe (Brackets & Closes)**:
   * Executar o script rápido de análise de colchetes e aspas para garantir que o monólito de JS não possui chaves órfãs:
     `PowerShell -ExecutionPolicy Bypass -File "scratch/fast_parse_js.ps1" "index.html"`
2. **Inspeção de Encoding**:
   * Verificar se as alterações introduziram strings ou caracteres especiais corrompidos (como `` ou `??`).
3. **Comparação com Backups de Estabilidade**:
   * Executar uma ferramenta de diff local contra a última versão funcional conhecida (ex: `index - STABLE - 20260605.html` ou backups marcados como funcionais) para monitorar modificações não autorizadas ou acidentais em áreas adjacentes do código:
     `PowerShell -ExecutionPolicy Bypass -File "scratch/diff.ps1"`

---

## 4. Lições da Modularização e Testes Automatizados (Junho 2026)

### A. Política de Mesma Origem (CORS) em Iframe Local
* **O Problema**: Navegadores bloqueiam o acesso a scripts e DOM entre iframes carregados usando o protocolo `file:///` (exibindo `SecurityError: Blocked a frame with origin "null" from accessing a cross-origin frame`).
* **A Solução**: Implementamos um servidor de desenvolvimento HTTP nativo em PowerShell (`iniciar_servidor_testes.ps1` e o atalho `iniciar_servidor.bat`). O runner e o planner devem sempre ser acessados via `http://localhost:8080/test-runner.html` para unificar a origem de rede e liberar as APIs.

### B. Leitura no PowerShell e Corrupção de Emojis/Acentos
* **O Problema**: Comandos tradicionais como `$c = Get-Content index.html` no PowerShell do Windows lêem arquivos usando codificação ANSI/Windows-1252 por padrão. Escrever isso de volta corrompe acentos e substitui emojis por strings como `ðŸ–±ï¸` e `â˜°`.
* **A Solução**: Em scripts de build ou leitura, utilize sempre APIs do .NET como `[System.IO.File]::ReadAllLines($path, [System.Text.Encoding]::UTF8)` e salve com `[System.IO.File]::WriteAllLines` especificando `(New-Object System.Text.UTF8Encoding $false)` para evitar BOM e corrupções.

### C. Isolamento de Estado no Test Runner (LocalStorage Compartilhado)
* **O Problema**: O iframe e a página principal rodam sob o mesmo host local (`localhost:8080`), logo eles compartilham a mesma partição de `localStorage`. Estados do usuário (ex: abas colapsadas ou quadro ativo "TODOS" vazio) podem quebrar as asserções dos testes automatizados.
* **A Solução**: No início do Test Runner, criamos uma etapa de **Sandbox Initialization** que muda programaticamente para um quadro temporário (`board-test`), popula dados de demo (`initDemo()`) e expande os painéis do Kanban, Matriz e Agenda para garantir que os testes rodem sempre em ambiente controlado e limpo.

### D. Validação de Scripts em PowerShell (`$LASTEXITCODE` vs `$P?)`)
* **O Problema**: No PowerShell, rodar scripts internos com o operador de chamada `&` não atualiza o código global `$LASTEXITCODE`, o que pode fazer checagens de erro usarem o código de execução de ferramentas antigas da sessão.
* **A Solução**: Para scripts nativos PowerShell, valide o sucesso usando `-not $?` (que verifica se o último comando emitiu erros) em vez de `$LASTEXITCODE -ne 0`.

### E. Modo Foco com Múltiplos Cronômetros e Gerenciamento de Estado Ativo
* **O Problema**: O design inicial do Modo Foco assumia apenas um timer ativo na tela e usava seletores DOM genéricos para buscar o cartão "running". Isso impedia que o usuário visualizasse outros cronômetros ou alternasse o foco entre tarefas.
* **A Solução**: Criamos uma variável de controle de estado (`focusActiveCard`) para rastrear qual cartão está atualmente no foco principal e renderizamos uma lista dinâmica lateral de todos os cartões com timers configurados. Implementamos filtros de visualização ("Todos" vs "Apenas Ativos") e permitimos a troca do cartão em foco com um clique direto, além de adicionar botões para ajustar o tempo (+/-1m, +/-5m) e concluir o cartão (pausando o timer e riscando a tarefa com persistência e sincronização de espelhos).
* **Segurança na Coleta de Elementos**: Depender da variável global `allCards` para o Modo Foco causava falha na exibição de múltiplos cronômetros caso ela estivesse desatualizada. A solução foi consultar diretamente o DOM com `document.querySelectorAll('.card:not(.mirror-card)')` garantindo integridade e consistência.
* **Isolamento de Ações de Clique e Edição**: Cliques rápidos ou cliques duplos na área do relógio (`timer-display` ou `timer-progress-container`) acionavam por engano o evento de duplo clique do card pai (abrindo a edição inline). Adicionamos um stop propagation explícito e filtragem de target no tratador de duplo clique do cartão.
* **Cores Dinâmicas e Customizadas de Quadros**: Usamos propriedades CSS customizadas (`--focus-border-color` e `--focus-glow-color`) no seletor do clone do Foco para aplicar a cor do quadro correspondente da tarefa ativa dinamicamente via JS.

### F. Incident C: Deleção Indesejada via Comando de Voz e Race Condition na Sincronização Inicial (Junho 2026)
* **O Problema**: O usuário executou um comando de voz ("hostinger") no Android que resultou na limpeza de todos os cartões de todos os quadros. Investigamos duas falhas combinadas que causaram isso:
  1. **Race Condition na Inicialização**: Se o usuário interagir ou disparar um salvamento (`persist()`) antes que a carga inicial do Firebase tenha terminado (ou se o Firebase retornar vazio temporariamente em uma nova sessão), o aplicativo serializava o DOM parcial/vazio e realizava um `.set()` no Firebase, limpando o banco na nuvem.
  2. **Execução Autônoma de Ações Destrutivas da IA**: Comandos de voz/texto interpretados pela IA (Gemini/OpenAI) como `DELETE_LIST`, `DELETE_CARD` ou `COMPLETE_CARDS` com `all: true` eram executados imediatamente no DOM sem qualquer validação ou confirmação do usuário. Se o reconhecimento de voz falhasse ou a IA alucinasse, listas inteiras de tarefas eram excluídas silenciosamente e a deleção era propagada para o servidor.
* **A Solução**:
  1. **Gate de Carga Inicial (`isInitialLoadComplete`)**: Criamos uma trava que impede qualquer gravação no Firebase até que o carregamento inicial dos metadados e do quadro ativo tenha sido totalmente concluído e renderizado.
  2. **Confirmação para Ações Destrutivas da IA**: Alteramos o motor de execução da IA (`executeAiActions`) para que ações de exclusão (`DELETE_LIST`, `DELETE_CARD`) ou conclusão em lote (`COMPLETE_CARDS` com `all: true`) solicitem confirmação explícita do usuário (`showConfirm`) antes de rodar.
  3. **Backups Automáticos na Nuvem (10 Minutos)**: Adicionamos um sistema de backups na nuvem que roda a cada 10 minutos (throttled) quando há alterações, guardando o histórico do banco de dados por 7 dias com opção de restauração rápida no menu de Dados.

### G. Gerenciamento de Tarefas em Segundo Plano e Evitar Alarme Falso de Pendência (Junho 2026)
* **O Problema**: Manter servidores de teste locais (como o listener do `iniciar_servidor_testes.ps1`) ou scripts auxiliares rodando em segundo plano após a conclusão e publicação do deploy faz com que o usuário veja tarefas ativas no painel de controle do agente. Isso gera a falsa impressão de que ainda existem processos pendentes de execução ou de autorização no sistema local.
* **A Solução**: Sempre monitorar e encerrar (`kill`) tarefas auxiliares locais e servidores de homologação/desenvolvimento em segundo plano assim que a compilação, verificação e deploy forem finalizados, garantindo que o console do chat fique limpo e sem falsos alertas de atividades ativas.

### H. Incident D: Deleção de Listas no Quadro Kanban via Startup e Visão Consolidada "TODOS" (Junho 2026)
* **O Problema**: O usuário perdeu todas as suas listas kanban em múltiplos quadros (principalmente no quadro "TEA TIMMER"). Duas causas raiz causaram essa perda:
  1. **Gravação Prematura na Inicialização**: A função `switchBoard(id)` disparava a rotina `saveImmediately()` no início do carregamento do aplicativo. Como o DOM (`boardEl`) ainda estava completamente vazio (os dados ainda não haviam sido carregados e renderizados), isso serializava uma lista vazia e sobrescrevia os quadros locais com `[]`.
  2. **Destruição de Listas Vazias no Quadro Consolidado**: Ao salvar a partir da visão `"board-todos"`, o método `distributeAndSaveTodos()` reinicializava o mapa de cada quadro como um array vazio (`[]`) e criava listas apenas a partir do que estava no DOM. Se uma lista kanban em um quadro estivesse vazia (0 cartões no DOM), ela era completamente deletada do quadro persistido.
* **A Solução**:
  1. **Filtro de Salvamento no switchBoard**: Adicionamos uma validação em `switchBoard(id)` para só invocar `saveImmediately()` se houver elementos renderizados na tela (`boardEl.children.length > 0`), impedindo salvamentos em branco.
  2. **Preservação de Estrutura no distributeAndSaveTodos**: Ajustamos `distributeAndSaveTodos()` para pré-inicializar o mapa de quadros com a estrutura de listas existente no `localStorage` de cada quadro, limpando apenas o array interno de cartões (`cards: []`). Isso garante que listas vazias e customizadas criadas pelo usuário sejam 100% preservadas e não sofram deleção acidental.

### I. Retenção de Cor em Arrastes de Matriz e QuickCard (Julho 2026)
* **O Problema**: O sistema de drag and drop na matriz de Eisenhower não estava colorindo os cartões imediatamente ao passar (hover) sobre os quadrantes, frustrando a expectativa do usuário de que 'onde passou, pegou a cor'. Além disso, a funcionalidade do QuickCard (configuração rápida) falhava ao não salvar corretamente o timer inserido antes de abrir o seletor de cores, resultando em perda de dados.
* **A Solução**:
  1. **Update Visual Direto no DragOver**: Injetamos lógica em `handleDragOver` (quando detectado um quadrante da matriz) para definir o `labelColor` do cartão dinamicamente *antes* mesmo de soltar (drop). O cartão visualmente adquire a cor e mantém, reforçando a intuição do usuário.
  2. **Persistência Explícita em Modais de Ciclo**: Corrigimos o `openTimerDialog` para disparar `updateTimerDisplay(c)` e forçar a gravação `persist()` garantida ao confirmar o timer, prevenindo descarte de dados nas execuções em lote ou transições para modais seguintes.

### II. Erro de Refer�ncia em Fun��es de Callbacks (Julho 2026)
* **O Problema**: Um erro ReferenceError: renderWeeklyView is not defined causou o travamento completo das transi��es de quadros do sistema durante a carga do Firebase. Isso aconteceu porque o Firebase aciona assincronamente os listeners e a renderiza��o do DOM ocorria em uma ordem inesperada em certas sess�es.
* **A Solu��o**: Em vez de invocar a fun��o cegamente na raiz do script Kanban, agora amarramos a fun��o globalmente (window.renderWeeklyView = renderWeeklyView;) e colocamos verifica��es defensivas (if (typeof renderWeeklyView === function)) em chamadas cr�ticas. Al�m disso, foi alertada a import�ncia de n�o corrompermos scripts durante edi��es via Powershell, j� que isso corta o arquivo pela metade gerando bugs invis�veis.
* **Regra Dourada**: Fun��es que s�o chamadas atravessando m�dulos (ex: kanban.js chamando uma fun��o do genda.js em um callback) precisam ter fallback defensivo se a depend�ncia falhar, para que n�o derrubem as rotinas de carga de dados principais (como switchBoard).
