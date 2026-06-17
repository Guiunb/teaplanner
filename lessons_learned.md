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
