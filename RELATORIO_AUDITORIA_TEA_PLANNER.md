# Relatório de Auditoria Técnica — TEA PLANNER (`index.html`)

> **Contexto:** Auditoria de código solicitada por Gui. O arquivo é uma SPA (single-page app) de um único arquivo `index.html` com **8.843 linhas** — ~1.900 de HTML/CSS e **~6.700 de JavaScript** inline, dentro de um único `window.addEventListener('load', ...)`. Usa **Firebase** (Auth Google + Realtime Database) para sync, `localStorage` como cache local e integração opcional com IA (Gemini/OpenAI).
>
> **Importante para a outra IA que receber este relatório:** *nenhuma alteração foi feita no código.* Este documento é diagnóstico. Os números de linha referem-se ao `index.html` original. Onde digo "verificar", é porque depende de algo que não está no arquivo (ex.: regras do Firebase no console).

---

## Veredito rápido

O app **funciona e tem boa cobertura de funcionalidades** (Kanban + matriz de prioridade + agenda/recorrência + timers + undo/redo + temas + IA). A sintaxe JS está **válida** (`node --check` passou, sem erro). Os problemas não são de "não roda", são de **robustez sob uso real, risco de perda de dados e dívida técnica de manutenção**.

Classifiquei os achados por severidade. Há **2 bugs concretos e visíveis** que recomendo tratar primeiro.

---

## 1. Estabilidade — bugs encontrados

### 🔴 BUG-1 — Corrupção de encoding (texto e ícones quebrados) — **CONFIRMADO, visível ao usuário**
O arquivo é UTF-8 válido, mas **30 caracteres já estão corrompidos** (vira `�`) e **3 ícones viram literalmente `??`**. Tudo concentrado no bloco da agenda/recorrência (≈ linhas **7659–8744**), o que indica que essa seção foi colada/editada com encoding errado (Latin-1/Windows-1252) em algum momento.

Exemplos reais do que o usuário **vê na tela**:
- `Recorr�ncia` (deveria ser "Recorrência") — linhas 7686, 8088
- `hor�rio` ("horário") — linhas 7877, 8487, 8519, e tooltips dos botões 8708/8731/8744
- `Conclu�do` ("Concluído") — 7869, 8044
- `Notifica��o`, `Dura��o`, `descri��o`, `t�tulo` — 8370, 8201, 8394, 8100
- `Ter�a` / `S�bado` (dias da semana) — 7731–7732, 7851–7852
- `Ap�s`, `ocorr�ncias`, `m�s(es)` — 7811, 7815, 7711
- Botões de alternar relógio/teclado mostram `??` em vez do ícone — linhas 6583, 6606, 6619

**Por que dá pra alterar com segurança:** é só substituição de string literal. Risco zero de quebrar lógica. **Não exige refatoração.**

---

### 🔴 BUG-2 — Perda silenciosa de dados (catch vazio + sem tratamento de cota do localStorage) — **risco alto**
Há **12 blocos `catch` vazios** que engolem erros sem avisar. O mais grave está na função de gravação principal:

- `saveImmediately()` (≈ linha **6023**) termina com `} catch (e) { }` — se a gravação falhar, **ninguém fica sabendo**.
- **Nenhuma das 43 chamadas `localStorage.setItem`** trata `QuotaExceededError`. Não existe nenhuma referência a "quota" no código.

Cenário de falha real: o `localStorage` tem limite de ~5–10 MB. Este app guarda todos os quadros + agenda + histórico de cada card. Conforme cresce, em algum momento `setItem` lança `QuotaExceededError`, o `catch` vazio engole, e o usuário **acha que salvou mas perdeu** a alteração — sem nenhuma mensagem.

**Por que provavelmente dá pra alterar:** adicionar tratamento de erro + aviso ao usuário é localizado, não muda arquitetura. **Cautela:** os `catch` vazios em parsing de `JSON` (ex.: linhas 783, 1064) são propositais (fallback) — esses podem ficar; o problema são os de *escrita*.

---

### 🟠 BUG-3 — Sync "last-write-wins": edição simultânea em 2 aparelhos perde dados
O sync grava o **quadro inteiro** com `.set()` (sobrescreve tudo), não com transação nem merge campo-a-campo (visto em `setupFirebaseSync`, `subscribeToCurrentBoard`, `saveImmediately` — ≈ linhas 2299–2360, 5994). 

Se você editar no celular e no PC ao mesmo tempo (ou um deles estiver offline e voltar), **a última gravação apaga a anterior por completo**. Não há resolução de conflito. Para uso de uma pessoa só, num aparelho por vez, é tolerável; para a "holding Azevedo" com várias pessoas, **não é**.

**Por que alterar é mais delicado:** mexe na arquitetura de sync. Não é troca trivial de string. Recomendo planejar antes (ver seção 3).

---

### 🟠 BUG-4 — Atualização remota destrói edição em andamento
Quando chega uma mudança do Firebase, o código faz `loadAndRenderAll()`, que executa `boardEl.innerHTML = ''` / `matrixEl.innerHTML = ''` (linhas ≈ 3273–3275, 4687) e **reconstrói todo o DOM**. Se nesse instante o usuário estiver digitando dentro de um card (inline edit) ou no meio de um arrastar, o nó some e **o texto não salvo é perdido**, além de resetar foco/scroll/seleção.

A flag `isRemoteUpdate` evita o eco de volta para o Firebase, mas **não protege a edição local em andamento**.

---

### 🟡 BUG-5 — `window.location.reload()` no logout
No clique de "Sair" (≈ linha 2183) o app dá `auth.signOut()` seguido de `window.location.reload()`. É abrupto e pode recarregar **antes** do signOut concluir. Melhor deixar o `onAuthStateChanged` cuidar da limpeza da UI (que já existe).

### 🟡 BUG-6 — Fallback de login por redirect possivelmente incompleto
No login (≈ 2185–2189) há `signInWithPopup(...).catch(... signInWithRedirect)`. Não localizei tratamento de `getRedirectResult()` no load. Se o popup for bloqueado e cair no redirect, **verificar** se a sessão é capturada ao voltar.

### 🟡 BUG-7 — `allCards`: cache de DOM mantido à mão
Existe um array global `allCards` (linha 298) que espelha os cards do DOM e é reconciliado manualmente (linhas 793–794, 2188–2189, 5435). Esse tipo de "estado paralelo ao DOM" é uma fonte clássica de bugs sutis (card removido da tela mas não do array, ou vice-versa). Não achei vazamento óbvio, mas é frágil.

---

## 2. Qualidade do código

**Pontos fortes**
- Sintaxe limpa, sem `eval`/`new Function`, sem dependências quebradas.
- Texto dos cards é renderizado com `textContent` (linha 2016) → **protegido contra XSS** no conteúdo principal.
- Timer é baseado em *wall-clock* (`timerEnd` timestamp, linha ≈ 4399), então **não dessincroniza** quando a aba fica em segundo plano. Bom design.
- Histórico de undo limitado a 120 estados (`HIST_LIMIT`, linha 3124) → não cresce infinito em memória.
- Retry com backoff exponencial na chamada de IA (linha ≈ 2455). Boa prática.

**Pontos fracos (dívida técnica)**
- **Monólito de 1 arquivo / 1 closure gigante.** ~6.700 linhas de JS, **279 funções** e **235 `var`** dentro de um único `window.load`. Difícil de navegar, testar e manter. Sem módulos, sem build, sem testes automatizados.
- **CSP totalmente aberta** (`default-src *` com `unsafe-inline` e `unsafe-eval`, linha 10). Na prática **anula** a proteção que uma Content-Security-Policy deveria dar. O comentário diz "CORREÇÃO DE SEGURANÇA" mas faz o oposto.
- **Lógica de gravação no Firebase duplicada** em ~8 lugares (`.set(...)` repetido em saveImmediately, distributeAndSaveTodos, saveBoardsMetadata, mover card etc.). Mudar a regra de sync exige editar vários pontos.
- **`innerHTML` com dados do usuário** em alguns pontos (nome de quadro na linha ≈ 2861/2985, histórico na 3081/3205). Risco é **self-XSS** (só atinge a própria conta), severidade baixa, mas é uma porta aberta — preferir `textContent`.
- **Chave de API exposta no código** (`firebaseConfig.apiKey`, linha 2130). Para Firebase Web isso é **normal e esperado** (a chave é pública); **mas** isso significa que toda a segurança depende das **Regras do Realtime Database**. ⚠️ **Verificar no console do Firebase** se as regras restringem leitura/escrita a `auth.uid === $uid`. Se estiverem abertas, qualquer um lê/escreve seus dados.
- **Comentários "CORREÇÃO/FIX/REINSERIDO" por todo lado** → sinal de que o arquivo foi remendado iterativamente, acumulando camadas. Funciona, mas dificulta evolução.
- Idiomas misturados em nomes e comentários; `console.log` de debug deixados em produção (43 ocorrências).

---

## 3. Sugestões de melhoria (priorizadas)

**Rápidas, baixo risco (fazer já):**
1. Corrigir o encoding do bloco 7659–8744 e os `??` (BUG-1). Salvar o arquivo como **UTF-8 sem BOM**.
2. Trocar os `catch` vazios de *escrita* por tratamento real: detectar `QuotaExceededError` e **avisar o usuário** ("não foi possível salvar — armazenamento cheio"). (BUG-2)
3. Remover/condicionar os `console.log` de produção.

**Médio prazo (melhora robustez):**
4. Proteger a edição em andamento: antes de `loadAndRenderAll()` por atualização remota, **não re-renderizar** o card que está em edição (ou adiar o render). (BUG-4)
5. Substituir o `reload()` do logout pela limpeza via `onAuthStateChanged`. (BUG-5)
6. Centralizar a gravação no Firebase em **uma única função** (`saveToCloud(path, data)`) e chamá-la em todos os pontos — reduz duplicação e bugs.
7. Fechar a CSP de verdade (remover `unsafe-eval`, restringir `connect-src` ao Firebase + APIs de IA, etc.).

**Estratégico (antes de levar para a holding):**
8. **Resolver o conflito de sync** (BUG-3): migrar de `.set()` do quadro inteiro para escrita granular por card/lista (`update()` em caminhos específicos) ou usar `transaction()`/timestamps por item. Isso é pré-requisito para uso multiusuário.
9. **Confirmar e endurecer as Regras do Firebase** (segurança real dos dados).
10. **Quebrar o monólito**: extrair o JS para arquivos/módulos separados e introduzir um mínimo de teste automatizado. Não muda comportamento, mas viabiliza manutenção por mais de uma pessoa.

---

## 4. Auditoria de Segurança COMPLETA

> Foco pedido: (A) chaves de API client-side, (B) Regras do Firebase, (C) validação/sanitização de inputs (XSS). Analisei os três e mais alguns vetores. **Nenhuma correção foi aplicada** — abaixo está o diagnóstico e a correção recomendada; aguardo seu OK para mexer no código.

### 🔴 SEC-1 — XSS PERSISTENTE confirmado (vetor real, não teórico)
A IA anterior suspeitou; **confirmei**. Há pelo menos um ponto onde **texto controlável pelo usuário é injetado via `innerHTML` dentro de um atributo, sem escape**:

- **Linha ≈ 8100** (modal de agendar): o título do card é injetado assim:
  ```js
  titleRow.innerHTML = `<input ... value="${card.querySelector('.text').textContent...}" ...>`;
  ```
  Um card chamado `"><img src=x onerror=alert(document.cookie)>` **quebra o atributo e executa script**.
- **Linha ≈ 2861**: `btn.innerHTML = \`${b.name} ...\`` — **nome do quadro** injetado cru.
- **Linha ≈ 3081**: `li.innerHTML = \`<strong>${h.action}</strong>...\`` — texto do histórico injetado cru.

**Por que é grave aqui especificamente:** o texto dos cards/quadros é **sincronizado via Firebase entre todos os dispositivos** e pode até ser **gerado pela IA**. Ou seja, é **XSS persistente/armazenado**, não self-XSS efêmero. 

**Cadeia de ataque completa (SEC-1 + SEC-2):** um script injetado roda no domínio → lê o `localStorage` → **exfiltra as chaves de API da Gemini/OpenAI/Anthropic** e o token do Firebase. Esse é exatamente o risco que a IA anterior apontou no item 1, e ele **está aberto**.

**Correção recomendada:** criar uma função `escapeHtml(str)` e aplicá-la em **todo** valor dinâmico interpolado em `innerHTML` (os ~5 pontos com `${...}` listados na seção 2 + os da seção 4). Onde for possível, preferir criar o elemento e usar `.value`/`.textContent` em vez de `innerHTML`. **Risco da correção:** baixo e localizado — não muda arquitetura.

### 🔴 SEC-2 — Chaves de API expostas no `localStorage`
As chaves de Gemini, OpenAI e Anthropic ficam em `localStorage` (linhas 336, 406, 485) e são enviadas direto do navegador para os endpoints oficiais (`Authorization: Bearer`, `x-api-key` — linhas 454, 537). 

Isso é **inevitável** numa arquitetura 100% frontend (não há servidor para guardar segredo) — então **não é um bug em si**, mas vira **crítico quando combinado com SEC-1**: qualquer XSS rouba as chaves. Pontos:
- O `localStorage` **não é criptografado** e é acessível a qualquer script do domínio.
- A chave da Anthropic chamada direto do browser exige cabeçalho/CORS especiais e **expõe a chave a qualquer um com acesso ao dispositivo/console**.

**Mitigações realistas (sem backend):** (a) fechar o XSS (SEC-1) é a defesa nº 1; (b) avisar o usuário que a chave fica no navegador e recomendar chaves com **limite de gasto/escopo restrito**; (c) idealmente, mover as chamadas de IA para um pequeno **proxy backend** (ex.: Cloud Function) que guarda a chave — aí o cliente nunca a vê. Esta última é a única solução *de verdade* para o problema de chave client-side.

### 🔴 SEC-3 — Regras do Firebase (FORA do arquivo — precisa verificar no Console)
Não dá para auditar pelo `index.html`: a `apiKey` do Firebase ser pública é **normal**. **Toda a segurança dos dados depende das Realtime Database Rules.** É **imprescindível** confirmar no Console do Firebase que estão assim (ou equivalente):
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read":  "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```
⚠️ Se as regras estiverem em modo de teste / abertas (`".read": true`), **qualquer pessoa na internet lê e escreve todos os dados de todos os usuários**. Este é potencialmente o risco mais grave de todos — e só dá para verificar logando no Console. **Me confirme o estado das regras.**

### 🟠 SEC-4 — CSP permissiva demais
A `Content-Security-Policy` (linha 10) usa `default-src *` + `'unsafe-inline'` + `'unsafe-eval'`. Na prática **não oferece proteção** contra XSS. Uma CSP bem configurada seria uma **segunda camada** de defesa contra SEC-1 (mesmo com um bug de injeção, bloquearia execução de scripts inline maliciosos). Recomendo restringir `script-src`/`connect-src` ao Firebase + endpoints de IA e remover `unsafe-eval`. **Observação honesta:** como o app usa muito script/handler inline, fechar a CSP exige ajustes; não é trivial, mas é o "feito certo".

### 🟡 SEC-5 — Itens menores
- **Sem timeout/limite nas chamadas de IA** além do retry — uma URL custom (`openai-custom-url`, `anthropic-custom-url`, linhas 492/410) é montada com input do usuário; baixo risco (é o próprio usuário), mas vale validar o formato da URL.
- **`console.log` com dados** em produção (43 ocorrências) pode vazar informação para quem abre o DevTools.
- **Sem Subresource Integrity (SRI)** nos `<script>` do Firebase/CDN (linhas 17–19): se o CDN for comprometido, carrega código arbitrário. Adicionar `integrity=` + `crossorigin`.

### Prioridade de segurança (ordem de ataque)
1. **SEC-3** — verificar Regras do Firebase **agora** (pode ser exposição total de dados).
2. **SEC-1** — fechar o XSS com `escapeHtml` (corta a cadeia que rouba as chaves).
3. **SEC-2** — orientar sobre chaves / planejar proxy backend.
4. **SEC-4 / SEC-5** — endurecer CSP, SRI, limpar logs.

---

## Resumo para decisão

| Item | Severidade | Dá pra alterar isolado? | Esforço |
|------|-----------|-------------------------|---------|
| BUG-1 Encoding/ícones `??` | 🔴 Alta (visível) | Sim, sem risco | Baixo |
| BUG-2 Perda silenciosa de dados | 🔴 Alta | Sim, localizado | Baixo/Médio |
| BUG-3 Sync last-write-wins | 🟠 Média-Alta | Não — mexe na arquitetura | Alto |
| BUG-4 Render apaga edição | 🟠 Média | Sim, com cuidado | Médio |
| BUG-5 reload no logout | 🟡 Baixa | Sim | Baixo |
| BUG-6 redirect de login | 🟡 Baixa | Verificar antes | Baixo |
| BUG-7 cache `allCards` | 🟡 Baixa | Não isolado | Médio |
| SEC-1 XSS persistente (innerHTML) | 🔴 Alta | Sim, com `escapeHtml` | Baixo |
| SEC-2 Chaves de API no localStorage | 🔴 Alta (c/ SEC-1) | Mitigar; ideal exige backend | Médio/Alto |
| SEC-3 Regras do Firebase | 🔴 Alta se abertas | Fora do arquivo (Console) | Baixo |
| SEC-4 CSP aberta | 🟠 Média | Sim, com ajustes | Médio |
| SEC-5 SRI / logs / URLs custom | 🟡 Baixa | Sim | Baixo |
| Monólito/sem testes | 🟡 Dívida | Refatoração | Alto |

---
*Auditoria estática + leitura integral do arquivo. Nenhuma linha do `index.html` foi modificada.*
