# AI Audit Handover — TEA PLANNER 2.0

Este documento atua como o manual técnico de arquitetura, ciclo de vida, segurança e diretrizes preventivas para o desenvolvimento contínuo do **TEA PLANNER 2.0**. Ele descreve como o sistema funciona sob o capô e estabelece salvaguardas essenciais para futuras inteligências artificiais que forem editar o código do aplicativo.

---

## 1. Arquitetura do Sistema (Single-File SPA)

O **TEA PLANNER 2.0** é uma Single-Page Application (SPA) empacotada inteiramente dentro de um único arquivo monolítico: `index.html`. Esta escolha de design exige cuidados extremos na manutenção, pois todas as camadas do sistema residem no mesmo espaço de escopo e no mesmo documento.

### Componentes de Arquitetura:
* **HTML/CSS Inline**: ~1.900 linhas contendo a estrutura de telas (Kanban, Matriz de Prioridades, Agenda Semanal, Histórico de Logs) e regras CSS sob a tag `<style>` no cabeçalho.
* **JavaScript Inline (Monólito)**: ~6.700 linhas de lógica inseridas sob um único bloco `<script>` no final do `<body>`.
* **Closure de Inicialização**: Praticamente 100% da lógica JS do cliente é encapsulada em um único escopo gigante disparado pelo evento `'load'`:
  ```javascript
  window.addEventListener('load', () => {
      // Todo o estado do aplicativo, variáveis de controle e funções residem aqui
  });
  ```
* **Armazenamento e Sincronização Local**:
  * O app usa `localStorage` como cache imediato.
  * O array global de quadros e agendas é lido no início da execução e renderizado instantaneamente na tela para suportar funcionamento offline.
  * Chamadas à API `localStorage.setItem` registram o estado a cada modificação local relevante.
* **Sincronização na Nuvem (Firebase)**:
  * Utiliza o Firebase SDK na versão legada/compat (`firebase-app-compat.js`, `firebase-auth-compat.js`, `firebase-database-compat.js`).
  * Autenticação via Google Auth (`signInWithPopup` e fallback para `signInWithRedirect`).
  * Banco de dados em tempo real (Firebase Realtime Database) utilizando caminhos estruturados por usuário:
    * Dados dos quadros: `users/{uid}/boards`
    * Dados da agenda global: `users/{uid}/agenda`
* **Histórico de Alterações (Undo/Redo)**:
  * Histórico local mantido em memória via pilha de estados anteriores.
  * Limite rígido controlado por `HIST_LIMIT = 120` para evitar estouro de memória no navegador.

---

## 2. Ciclo de Vida do DOM & Concorrência de Sync

A manipulação da interface no TEA PLANNER baseia-se em renderizações completas do DOM a partir do estado do modelo, o que gera vantagens de simplicidade lógica, mas cria gargalos de concorrência e estabilidade visual.

### Ciclo de Renderização
Quando uma atualização ocorre localmente ou é recebida da nuvem, o aplicativo aciona a função central `loadAndRenderAll()`. Esta rotina executa as seguintes operações destrutivas e reconstrutivas:
1. Limpa contêineres principais no DOM definindo `innerHTML = ''` (ex: `boardEl.innerHTML = ''`, `matrixEl.innerHTML = ''`).
2. Itera sobre a estrutura de dados recuperada do cache local ou nuvem.
3. Recria dinamicamente do zero os nós de listas, cards e metadados de quadros.
4. Vincula novamente os event listeners a cada nó criado.

### O Bug da Edição Remota (BUG-4)
O ciclo reconstrutivo gera um problema clássico de disputa concorrente durante atualizações do Firebase:
* Se o Firebase Database registrar uma mudança feita por outro dispositivo e disparar o evento `'value'`, o callback `on('value', ...)` grava no `localStorage` e invoca `loadAndRenderAll()`.
* Se o usuário local estiver **digitando ativamente em um card** (modo `inline edit` com `contenteditable`) ou **arrastando um card** no Kanban, a limpeza do DOM (`innerHTML = ''`) destrói instantaneamente o elemento que continha o foco.
* **Resultado**: O rascunho de texto que estava sendo digitado é descartado de forma silenciosa e o usuário perde o foco e o scroll da tela.

> [!WARNING]
> **Mitigação do BUG-4**: Antes de acionar a renderização total por eventos remotos (`isRemoteUpdate === true`), o sistema deve verificar se existe um card em modo de edição ativa (ex: `document.activeElement.classList.contains('text')` dentro de um card). Em caso afirmativo, o render remoto deve ser **adiado** ou o card sob foco deve ser **preservado e excluído** da limpeza do DOM até que o usuário conclua a edição (evento `blur` ou perda de foco).

---

## 3. Lógica de Alertas, Cronômetros e Recorrências

A integridade do gerenciamento de tempo no TEA PLANNER depende de padrões de persistência e cálculo resilientes a abas em segundo plano e fechamento abrupto do navegador.

### Cronômetros (Timers) — Design Baseado em Wall-Clock

Navegadores modernos reduzem drasticamente a prioridade de loops baseados em `setInterval` ou `setTimeout` quando uma aba fica em segundo plano ou o dispositivo entra em suspensão. Para evitar atrasos nos cronômetros das tarefas:
* O cronômetro do TEA PLANNER **não** se baseia em contadores incrementais dinâmicos.
* Em vez disso, ele salva um timestamp absoluto no futuro (`timerEnd` em milissegundos).
* A UI apenas exibe a diferença matemática entre `timerEnd` e o relógio local do sistema (`Date.now()`). Se a aba for suspensa e reativada, o tempo restante exibido estará correto.

### Lógica de Agendamento e Recorrências
O gerenciador de agenda calcula e distribui eventos baseando-se em regras de recorrência (Diária, Semanal, Mensal):
1. **Regras de Repetição**: As tarefas contêm metadados descrevendo seu padrão de repetição e limites (ex: repetir a cada X dias, repetir em dias específicos da semana como Terça e Sábado, ou após X ocorrências).
2. **Resiliência do Agendador**: Ao marcar uma tarefa recorrente como concluída, o sistema calcula dinamicamente o próximo evento futuro correspondente e insere uma nova cópia não concluída na agenda, arquivando o histórico da ocorrência anterior.
3. **Encoding Seguro**: O bloco de código que controla a agenda semanal e seus popups (linhas ≈ 7659-8744) é sensível à codificação. Históricos de edição revelaram que caracteres acentuados ou ícones (como os botões de relógio e alternância de teclado) podem se corromper se editores de texto interpretarem o arquivo como Latin-1/ANSI.

> [!IMPORTANT]
> **Aviso de Limites de Cota de Disco (BUG-2)**:
> Toda vez que o estado do aplicativo ou da agenda muda, a escrita é feita no `localStorage`. Como nenhuma chamada trata o estouro de limite (`QuotaExceededError`), se o usuário ultrapassar a cota (~5-10MB por conta do histórico acumulado no `HIST_LIMIT`), o JavaScript falhará silenciosamente no bloco `catch` vazio, fingindo que salvou enquanto o usuário perde seus dados locais. Deve-se interceptar `QuotaExceededError` nas chamadas de escrita e alertar o usuário para arquivar dados antigos.

---

## 4. Checklist de Qualidade e Segurança (Auditoria & Prevenção)

A segurança técnica do aplicativo baseia-se na eliminação de brechas para injeção de scripts (XSS) e no endurecimento de políticas de comunicação do navegador.

### Checklist de Implementação:

- [ ] **Sanitização de Interpoladores (XSS Persistente - SEC-1)**:
  * **Problema**: Existem pontos do JS que injetam dados de cards e logs de forma direta usando `innerHTML` em templates literais (ex: modal de agendamento interpolando título do card, log do histórico, nome de quadro). Se um card ou quadro receber código JavaScript no título (ex: `"><script>...</script>`), esse código rodará nos computadores de todos os usuários que tiverem acesso a esse quadro sincronizado.
  * **Solução**: Utilizar a função `escapeHtml(str)` ao fazer qualquer interpolação em `innerHTML`:
    ```javascript
    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }
    ```
    Melhor ainda: evitar strings HTML com injeção direta e atribuir dados dinâmicos exclusivamente via propriedades `.textContent` ou `.value`.

- [ ] **Endurecimento de Content Security Policy (CSP - SEC-4)**:
  * **Problema**: A tag `<meta>` de CSP atual permite `*` (qualquer domínio) e as diretivas `'unsafe-inline'` / `'unsafe-eval'`. Isso anula a barreira de segurança que protege o browser contra roubos de dados através de exploits XSS.
  * **Solução**: Restringir a CSP para autorizar apenas recursos específicos:
    * `default-src 'self';`
    * `script-src 'self' https://www.gstatic.com 'unsafe-inline';` (necessário enquanto os scripts inline e SDKs legados não forem separados).
    * `connect-src 'self' https://*.firebaseio.com https://api.openai.com https://api.gemini.com https://api.anthropic.com https://api.google.com;` (limitar apenas às APIs de IA e banco de dados).
    * `style-src 'self' 'unsafe-inline';`

- [ ] **Segurança de Regras do Firebase (Console - SEC-3)**:
  * **Problema**: As chaves de API expostas no código cliente são normais no Firebase Web. No entanto, se o console do Firebase estiver configurado com regras abertas (`.read: true`, `.write: true`), qualquer pessoa poderá consultar ou deletar o banco de dados inteiro do sistema.
  * **Solução**: Validar no Console Firebase que o Realtime Database exige autenticação e restringe dados ao proprietário do nó (`users/$uid`):
    ```json
    {
      "rules": {
        "users": {
          "$uid": {
            ".read": "auth != null && auth.uid === $uid",
            ".write": "auth != null && auth.uid === $uid"
          }
        }
      }
    }
    ```

- [ ] **Integridade de Subrecursos (SRI - SEC-5)**:
  * **Problema**: Bibliotecas importadas do Google/Firebase CDN não possuem checagem de assinatura de integridade. Se o servidor de entrega do CDN for comprometido, scripts maliciosos serão carregados no aplicativo.
  * **Solução**: Adicionar os atributos `integrity="<HASH>"` e `crossorigin="anonymous"` nas tags `<script>` dos CDNs do Firebase.

- [ ] **Armazenamento Seguro de Chaves de IA (SEC-2)**:
  * **Problema**: As chaves privadas do usuário para OpenAI, Gemini e Anthropic são salvas direto em texto limpo no `localStorage`.
  * **Solução**: Alertas visuais claros instruindo os usuários a criar chaves de API descartáveis com limites baixos de consumo e escopos estritos.

---

## 5. Diretrizes para Modificações por Inteligência Artificial (Preventivas)

Para garantir que futuras modificações de IA não quebrem o aplicativo ou corrompam funcionalidades, devem ser estritamente seguidas as regras abaixo:

1. **Substituições Globais são Proibidas**:
   * Nunca use regex global ou scripts de substituição automatizada (como comandos `-replace` do PowerShell) sem limites de palavras (`\b`).
   * Substituições amplas podem corromper palavras de código reservadas do CSS ou JS (ex: mudando `none` para `nãone`, `not` para `nãot`, ou nomes de variáveis contendo `no` para `não`).
2. **Preserve a Codificação UTF-8 sem BOM**:
   * O arquivo `index.html` deve ser escrito e mantido com encoding **UTF-8 sem BOM**.
   * O uso incorreto do PowerShell `Out-File` sem a flag `-Encoding utf8` ou o uso de ferramentas ANSI corrompe caracteres do aplicativo, gerando ícones com marcas `??` e acentos ilegíveis.
3. **Validação Estática Antes de Salvar**:
   * Sempre execute análise estática de sintaxe de parênteses, colchetes e aspas abertas após modificações.
   * Em arquivos grandes (8800+ linhas), erros de fechamento quebram a inicialização completa do app no navegador.
4. **Preserve a Integridade de Blocos**:
   * Ao fazer modificações em blocos adjacentes de código, certifique-se de que variáveis globais ou funções auxiliares não foram removidas ou duplicadas.
   * Sempre mantenha backups do estado estável (ver pasta raiz) e compare as modificações com `diff` antes de finalizar.
