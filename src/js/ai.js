// ===== Gemini API Integration =====
// DEFINIDAS AQUI EM CIMA PARA EVITAR ERRO DE REFERENCE ERROR
function showLoader(message) {
    var existing = document.getElementById('loader-wrap');
    if (existing) existing.remove();
    var wrap = el('div', 'modal-wrap');
    wrap.id = 'loader-wrap';
    wrap.style.display = 'flex'; wrap.style.justifyContent = 'center'; wrap.style.alignItems = 'center';
    var box = el('div', 'modal');
    box.style.padding = '20px'; box.style.textAlign = 'center';
    var spinner = el('div');
    spinner.innerHTML = `<svg width="24" height="24" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg"><g class="spinner_V8m1"><circle cx="12" cy="12" r="9.5" fill="none" stroke="#fff" stroke-width="3"></circle></g></svg>`;
    spinner.style.marginBottom = '12px';
    var msgEl = el('div');
    msgEl.textContent = message || 'Processando...';
    box.appendChild(spinner); box.appendChild(msgEl);
    wrap.appendChild(box);
    document.body.appendChild(wrap);
}

function hideLoader() {
    var wrap = document.getElementById('loader-wrap');
    if (wrap) wrap.remove();
}

async function callAI(contentsOrPrompt, retries = 3, delay = 1000) {
    const provider = localStorage.getItem('ai-provider') || 'gemini';

    if (provider === 'gemini') {
        const hardcodedKey = ""; // <--- INSIRA SUA API KEY AQUI
        const apiKey = localStorage.getItem('gemini-api-key') || hardcodedKey;
        if (!apiKey) {
            alert("Chave API do Gemini não configurada. Por favor, clique na chave 🔑 na barra de prompt para configurá-la.");
            throw new Error("No API Key");
        }

        const modelSetting = localStorage.getItem('gemini-model') || 'auto';
        const models = modelSetting === 'auto' ? ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro'] : [modelSetting];
        let lastError = null;

        for (const model of models) {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
            
            let contents;
            if (typeof contentsOrPrompt === 'string') {
                contents = [{ parts: [{ text: contentsOrPrompt }] }];
            } else {
                contents = contentsOrPrompt;
            }
            const payload = { contents };

            let currentDelay = delay;
            let is404 = false;

            for (let i = 0; i < retries; i++) {
                try {
                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.status === 404) {
                        console.warn(`Modelo ${model} indisponível (404). Tentando próximo modelo da lista...`);
                        is404 = true;
                        break;
                    }

                    if (!response.ok) {
                        let errorMsg = `HTTP error! status: ${response.status}`;
                        try {
                            const errJson = await response.json();
                            if (errJson.error && errJson.error.message) {
                                errorMsg = errJson.error.message;
                            }
                        } catch (_) {}
                        throw new Error(errorMsg);
                    }
                    const result = await response.json();
                    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) return text;
                    else throw new Error('Resposta da API inválida ou vazia.');
                } catch (error) {
                    lastError = error;
                    if (i === retries - 1) {
                        console.error(`Erro final ao chamar o modelo ${model}:`, error);
                    } else {
                        await new Promise(res => setTimeout(res, currentDelay));
                        currentDelay *= 2;
                    }
                }
            }

            if (!is404 && lastError) {
                throw lastError;
            }
        }

        throw lastError || new Error("Nenhum modelo da lista está disponível para esta chave API.");
    } else if (provider === 'openai') {
        const apiKey = localStorage.getItem('openai-api-key') || '';
        if (!apiKey) {
            alert("Chave API da OpenAI não configurada. Por favor, clique na chave 🔑 na barra de prompt para configurá-la.");
            throw new Error("No API Key");
        }

        const model = localStorage.getItem('openai-model') || 'gpt-4o-mini';
        const customUrl = localStorage.getItem('openai-custom-url') || '';
        
        let apiUrl = 'https://api.openai.com/v1/chat/completions';
        if (customUrl) {
            if (customUrl.includes('chat/completions')) {
                apiUrl = customUrl;
            } else {
                apiUrl = customUrl.endsWith('/') ? customUrl + 'chat/completions' : customUrl + '/chat/completions';
            }
        }

        let messages = [];
        if (typeof contentsOrPrompt === 'string') {
            messages = [{ role: 'user', content: contentsOrPrompt }];
        } else if (Array.isArray(contentsOrPrompt)) {
            if (contentsOrPrompt.length > 0) {
                const sysText = contentsOrPrompt[0].parts?.[0]?.text || "";
                messages.push({ role: 'system', content: sysText });
                for (let i = 1; i < contentsOrPrompt.length; i++) {
                    const turn = contentsOrPrompt[i];
                    const role = turn.role === 'model' ? 'assistant' : 'user';
                    const text = turn.parts?.[0]?.text || "";
                    messages.push({ role: role, content: text });
                }
            }
        }

        const payload = {
            model: model,
            messages: messages
        };

        let lastError = null;
        let currentDelay = delay;

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    let errorMsg = `HTTP error! status: ${response.status}`;
                    try {
                        const errJson = await response.json();
                        if (errJson.error && errJson.error.message) {
                            errorMsg = errJson.error.message;
                        }
                    } catch (_) {}
                    throw new Error(errorMsg);
                }
                const result = await response.json();
                const text = result.choices?.[0]?.message?.content;
                if (text) return text;
                else throw new Error('Resposta da API inválida ou vazia.');
            } catch (error) {
                lastError = error;
                if (i === retries - 1) {
                    console.error(`Erro final ao chamar OpenAI (${model}):`, error);
                } else {
                    await new Promise(res => setTimeout(res, currentDelay));
                    currentDelay *= 2;
                }
            }
        }
        throw lastError || new Error("Erro ao chamar a API da OpenAI.");
    } else if (provider === 'anthropic') {
        const apiKey = localStorage.getItem('anthropic-api-key') || '';
        if (!apiKey) {
            alert("Chave API da Anthropic não configurada. Por favor, clique na chave 🔑 na barra de prompt para configurá-la.");
            throw new Error("No API Key");
        }

        const model = localStorage.getItem('anthropic-model') || 'claude-3-5-sonnet-latest';
        const customUrl = localStorage.getItem('anthropic-custom-url') || '';

        let apiUrl = 'https://api.anthropic.com/v1/messages';
        if (customUrl) {
            if (customUrl.includes('v1/messages')) {
                apiUrl = customUrl;
            } else {
                apiUrl = customUrl.endsWith('/') ? customUrl + 'v1/messages' : customUrl + '/v1/messages';
            }
        }

        let systemPrompt = "";
        let messages = [];
        if (typeof contentsOrPrompt === 'string') {
            messages = [{ role: 'user', content: contentsOrPrompt }];
        } else if (Array.isArray(contentsOrPrompt)) {
            if (contentsOrPrompt.length > 0) {
                systemPrompt = contentsOrPrompt[0].parts?.[0]?.text || "";
                for (let i = 1; i < contentsOrPrompt.length; i++) {
                    const turn = contentsOrPrompt[i];
                    const role = turn.role === 'model' ? 'assistant' : 'user';
                    const text = turn.parts?.[0]?.text || "";
                    messages.push({ role: role, content: text });
                }
            }
        }

        const payload = {
            model: model,
            max_tokens: 4096,
            messages: messages
        };
        if (systemPrompt) {
            payload.system = systemPrompt;
        }

        let lastError = null;
        let currentDelay = delay;

        for (let i = 0; i < retries; i++) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': apiKey,
                        'anthropic-version': '2023-06-01'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    let errorMsg = `HTTP error! status: ${response.status}`;
                    try {
                        const errJson = await response.json();
                        if (errJson.error && errJson.error.message) {
                            errorMsg = errJson.error.message;
                        }
                    } catch (_) {}
                    throw new Error(errorMsg);
                }
                const result = await response.json();
                const text = result.content?.[0]?.text;
                if (text) return text;
                else throw new Error('Resposta da API inválida ou vazia.');
            } catch (error) {
                lastError = error;
                if (i === retries - 1) {
                    console.error(`Erro final ao chamar Anthropic (${model}):`, error);
                } else {
                    await new Promise(res => setTimeout(res, currentDelay));
                    currentDelay *= 2;
                }
            }
        }
        throw lastError || new Error("Erro ao chamar a API da Anthropic.");
    }
}

const callGemini = callAI;

async function generateSubtasks(block) {
    if (!block || !block.length) return;
    showLoader('✨ Gerando subtarefas com a IA...');
    try {
        for (const card of block) {
            const originalText = card.querySelector('.text').textContent;
            const prompt = `Aja como um assistente de produtividade. Quebre a seguinte tarefa em 3 a 5 subtarefas menores e acionáveis. Responda com uma lista de subtarefas, uma por linha. Não adicione nenhum outro texto, cabeçalhos, marcadores ou formatação. Tarefa: "${originalText}"`;
            const resultText = await callGemini(prompt);
            const subtasks = resultText.split('\n').map(s => s.trim()).filter(Boolean);
            if (subtasks.length > 0) {
                let lastCard = card;
                subtasks.forEach(taskText => {
                    const newCard = createCard({ text: "・ " + taskText, color: card.dataset.color, labelColor: card.dataset.labelColor || '', due: card.dataset.due, boardId: card.dataset.boardId });
                    if (!card.closest('#agenda-sidebar')) {
                        lastCard.parentElement.insertBefore(newCard, lastCard.nextSibling);
                        lastCard = newCard;
                    }
                });
            } else { throw new Error('Nenhuma subtarefa foi gerada.'); }
        }
        updateSlotsHasItems();
        persist();
        updateTotalTimerDisplay();
    } catch (error) {
        // Erro já tratado no catch do callGemini se for falta de key
    } finally {
        hideLoader();
    }
}

async function organizeCardWithGemini(block) {
    if (!block || !block.length || !matrixEl) return;
    showLoader('✨ Analisando tarefa com IA...');
    const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' };
    try {
        for (const card of block) {
            const originalText = card.querySelector('.text').textContent;
            const prompt = `Aja como um especialista em produtividade usando a Matriz de Eisenhower. Analise a seguinte tarefa e decida em qual quadrante ela se encaixa: Q1 (Urgente e Importante), Q2 (Não Urgente e Importante), Q3 (Urgente e Não Importante), ou Q4 (Não Urgente e Não Importante). Responda APENAS com "Q1", "Q2", "Q3", ou "Q4". Tarefa: "${originalText}"`;
            const resultQuad = (await callGemini(prompt)).trim().toUpperCase();
            if (EISENHOWER_COLORS[resultQuad]) {
                const dest = matrixEl.querySelector('.list[data-quad="' + resultQuad + '"] .cards');
                if (dest) {
                    const cardInCache = allCards.find(c => c === card);
                    if (cardInCache) cardInCache.dataset.when = '';
                    card.dataset.when = '';

                    dest.appendChild(card);
                    card.dataset.labelColor = EISENHOWER_COLORS[resultQuad];
                    paintCard(card);
                }
            } else { console.warn('Resposta inesperada da IA:', resultQuad); }
        }
        updateSlotsHasItems();
        persist();
        updateTotalTimerDisplay();
    } catch (error) {
        // Erro já tratado
    } finally {
        hideLoader();
    }
}

// EVENTO DE SINCRONIZAÇÃO ENTRE ABAS (LOCAL)
window.addEventListener('storage', function (e) {
    if (e.key === LS_BOARD_PREFIX + currentBoardId || e.key === LS_GLOBAL_AGENDA) {
        // Se mudou o quadro atual OU a agenda global
        console.log("Sync: Aba local atualizada via localStorage");
        isRemoteUpdate = true;
        loadAndRenderAll();
        isRemoteUpdate = false;
    }
    else if (e.key === LS_BOARDS_META) {
        loadBoardsMetadata();
        updateBoardSelectUI();
    }
    else if (e.key === LS_CURRENT_BOARD) {
        const newId = e.newValue;
        if (newId && newId !== currentBoardId) {
            switchBoard(newId);
        }
    }
});

document.addEventListener('mousemove', (e) => {
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    updateMarquee(e);
});


// ===== AI ASSISTANT MOTOR / CONTROLLER =====
let aiConversationHistory = [];
let recognition = null;
let isRecording = false;

function configureApiKeyDialog() {
    showModal('Configurar Inteligência Artificial', function() {
        const div = el('div');
        div.style.padding = '8px 0';
        div.style.minWidth = '320px';
        div.style.maxWidth = '450px';
        div.style.fontFamily = 'sans-serif';
        div.style.color = '#fff';
        div.innerHTML = `
            <div style="margin-bottom: 15px;">
                <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Provedor de IA</label>
                <select id="dialogAiProvider" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">
                    <option value="gemini">Google Gemini</option>
                    <option value="openai">OpenAI (ChatGPT / Compatível)</option>
                    <option value="anthropic">Anthropic (Claude)</option>
                </select>
            </div>

            <!-- Painel Gemini -->
            <div id="settings-gemini" class="provider-settings-panel" style="display: none;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Chave API do Gemini</label>
                    <input type="password" id="dialogGeminiApiKeyInput" placeholder="Cole sua API Key do Gemini (ex: AIzaSy...)" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Modelo do Gemini</label>
                    <select id="dialogGeminiModelSelect" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">
                        <option value="auto">Auto (Flash/Pro Sequencial)</option>
                        <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
                        <option value="gemini-2.0-flash">Gemini 2.0 Flash</option>
                        <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                        <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
                        <option value="gemini-2.0-pro-exp">Gemini 2.0 Pro Exp</option>
                        <option value="custom">Outro Modelo Personalizado...</option>
                    </select>
                </div>
                <div id="geminiCustomModelRow" style="margin-bottom: 12px; display: none;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>
                    <input type="text" id="dialogGeminiCustomModelInput" placeholder="ex: gemini-2.0-pro-exp-02-05" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                </div>
            </div>

            <!-- Painel OpenAI -->
            <div id="settings-openai" class="provider-settings-panel" style="display: none;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Chave API da OpenAI (sk-...)</label>
                    <input type="password" id="dialogOpenaiApiKeyInput" placeholder="Cole sua API Key (sk-...)" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Modelo da OpenAI</label>
                    <select id="dialogOpenaiModelSelect" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">
                        <option value="gpt-4o-mini">GPT-4o Mini (Recomendado)</option>
                        <option value="gpt-4o">GPT-4o</option>
                        <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                        <option value="custom">Outro Modelo Personalizado...</option>
                    </select>
                </div>
                <div id="openaiCustomModelRow" style="margin-bottom: 12px; display: none;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>
                    <input type="text" id="dialogOpenaiCustomModelInput" placeholder="ex: gpt-4-turbo" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">URL Base da API (Opcional)</label>
                    <input type="text" id="dialogOpenaiCustomUrlInput" placeholder="Padrão: https://api.openai.com/v1" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                    <span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; line-height: 1.3;">Para usar OpenRouter, LM Studio, Ollama ou proxies de CORS.</span>
                </div>
            </div>

            <!-- Painel Anthropic -->
            <div id="settings-anthropic" class="provider-settings-panel" style="display: none;">
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Chave API da Anthropic (sk-ant-...)</label>
                    <input type="password" id="dialogAnthropicApiKeyInput" placeholder="Cole sua API Key (sk-ant-...)" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Modelo da Anthropic</label>
                    <select id="dialogAnthropicModelSelect" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-size: 14px; font-family: inherit;">
                        <option value="claude-3-5-sonnet-latest">Claude 3.5 Sonnet</option>
                        <option value="claude-3-5-haiku-latest">Claude 3.5 Haiku</option>
                        <option value="claude-3-opus-latest">Claude 3 Opus</option>
                        <option value="custom">Outro Modelo Personalizado...</option>
                    </select>
                </div>
                <div id="anthropicCustomModelRow" style="margin-bottom: 12px; display: none;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">Nome do Modelo Personalizado</label>
                    <input type="text" id="dialogAnthropicCustomModelInput" placeholder="ex: claude-3-haiku-20240307" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                </div>
                <div style="margin-bottom: 12px;">
                    <label style="display: block; font-weight: bold; margin-bottom: 6px; font-size: 13px; color: #9fb3d2;">URL Base da API (Opcional)</label>
                    <input type="text" id="dialogAnthropicCustomUrlInput" placeholder="Padrão: https://api.anthropic.com/v1" style="width:100%; padding:10px; background:#0b2240; border:1px solid #2a4e78; border-radius:8px; color:#fff; box-sizing:border-box; outline:none; font-family: inherit;">
                    <span style="font-size: 11px; color: #88a3c7; display: block; margin-top: 4px; line-height: 1.3;">Requer um proxy de CORS para uso direto do navegador.</span>
                </div>
            </div>

            <div style="margin-top: 15px; font-size: 11px; color: #ffa726; line-height: 1.4; border-top: 1px solid #24314a; padding-top: 10px;">
                <span>⚠️ Suas credenciais são salvas <strong>localmente</strong> no seu navegador (localStorage) com segurança.</span>
            </div>
        `;

        // Setup events and load values
        const providerSelect = div.querySelector('#dialogAiProvider');
        const geminiModelSelect = div.querySelector('#dialogGeminiModelSelect');
        const openaiModelSelect = div.querySelector('#dialogOpenaiModelSelect');
        const anthropicModelSelect = div.querySelector('#dialogAnthropicModelSelect');

        function updatePanelVisibility() {
            const provider = providerSelect.value;
            div.querySelectorAll('.provider-settings-panel').forEach(p => p.style.display = 'none');
            div.querySelector('#settings-' + provider).style.display = 'block';
        }

        geminiModelSelect.addEventListener('change', () => {
            div.querySelector('#geminiCustomModelRow').style.display = geminiModelSelect.value === 'custom' ? 'block' : 'none';
        });
        openaiModelSelect.addEventListener('change', () => {
            div.querySelector('#openaiCustomModelRow').style.display = openaiModelSelect.value === 'custom' ? 'block' : 'none';
        });
        anthropicModelSelect.addEventListener('change', () => {
            div.querySelector('#anthropicCustomModelRow').style.display = anthropicModelSelect.value === 'custom' ? 'block' : 'none';
        });

        providerSelect.addEventListener('change', updatePanelVisibility);

        // Load saved values
        const savedProvider = localStorage.getItem('ai-provider') || 'gemini';
        providerSelect.value = savedProvider;

        // Load Gemini
        div.querySelector('#dialogGeminiApiKeyInput').value = localStorage.getItem('gemini-api-key') || '';
        const savedGeminiModel = localStorage.getItem('gemini-model') || 'auto';
        if (['auto', 'gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash', 'gemini-1.5-pro', 'gemini-2.0-pro-exp'].includes(savedGeminiModel)) {
            geminiModelSelect.value = savedGeminiModel;
        } else {
            geminiModelSelect.value = 'custom';
            div.querySelector('#dialogGeminiCustomModelInput').value = savedGeminiModel;
            div.querySelector('#geminiCustomModelRow').style.display = 'block';
        }

        // Load OpenAI
        div.querySelector('#dialogOpenaiApiKeyInput').value = localStorage.getItem('openai-api-key') || '';
        const savedOpenaiModel = localStorage.getItem('openai-model') || 'gpt-4o-mini';
        if (['gpt-4o-mini', 'gpt-4o', 'gpt-3.5-turbo'].includes(savedOpenaiModel)) {
            openaiModelSelect.value = savedOpenaiModel;
        } else {
            openaiModelSelect.value = 'custom';
            div.querySelector('#dialogOpenaiCustomModelInput').value = savedOpenaiModel;
            div.querySelector('#openaiCustomModelRow').style.display = 'block';
        }
        div.querySelector('#dialogOpenaiCustomUrlInput').value = localStorage.getItem('openai-custom-url') || '';

        // Load Anthropic
        div.querySelector('#dialogAnthropicApiKeyInput').value = localStorage.getItem('anthropic-api-key') || '';
        const savedAnthropicModel = localStorage.getItem('anthropic-model') || 'claude-3-5-sonnet-latest';
        if (['claude-3-5-sonnet-latest', 'claude-3-5-haiku-latest', 'claude-3-opus-latest'].includes(savedAnthropicModel)) {
            anthropicModelSelect.value = savedAnthropicModel;
        } else {
            anthropicModelSelect.value = 'custom';
            div.querySelector('#dialogAnthropicCustomModelInput').value = savedAnthropicModel;
            div.querySelector('#anthropicCustomModelRow').style.display = 'block';
        }
        div.querySelector('#dialogAnthropicCustomUrlInput').value = localStorage.getItem('anthropic-custom-url') || '';

        updatePanelVisibility();
        return div;
    }, function(body) {
        const provider = body.querySelector('#dialogAiProvider').value;
        localStorage.setItem('ai-provider', provider);

        // Save Gemini
        const geminiKey = body.querySelector('#dialogGeminiApiKeyInput').value.trim();
        if (geminiKey) localStorage.setItem('gemini-api-key', geminiKey);
        else localStorage.removeItem('gemini-api-key');

        const geminiSel = body.querySelector('#dialogGeminiModelSelect').value;
        const geminiModel = geminiSel === 'custom' ? body.querySelector('#dialogGeminiCustomModelInput').value.trim() : geminiSel;
        localStorage.setItem('gemini-model', geminiModel || 'auto');

        // Save OpenAI
        const openaiKey = body.querySelector('#dialogOpenaiApiKeyInput').value.trim();
        if (openaiKey) localStorage.setItem('openai-api-key', openaiKey);
        else localStorage.removeItem('openai-api-key');

        const openaiSel = body.querySelector('#dialogOpenaiModelSelect').value;
        const openaiModel = openaiSel === 'custom' ? body.querySelector('#dialogOpenaiCustomModelInput').value.trim() : openaiSel;
        localStorage.setItem('openai-model', openaiModel || 'gpt-4o-mini');

        const openaiUrl = body.querySelector('#dialogOpenaiCustomUrlInput').value.trim();
        if (openaiUrl) localStorage.setItem('openai-custom-url', openaiUrl);
        else localStorage.removeItem('openai-custom-url');

        // Save Anthropic
        const anthropicKey = body.querySelector('#dialogAnthropicApiKeyInput').value.trim();
        if (anthropicKey) localStorage.setItem('anthropic-api-key', anthropicKey);
        else localStorage.removeItem('anthropic-api-key');

        const anthropicSel = body.querySelector('#dialogAnthropicModelSelect').value;
        const anthropicModel = anthropicSel === 'custom' ? body.querySelector('#dialogAnthropicCustomModelInput').value.trim() : anthropicSel;
        localStorage.setItem('anthropic-model', anthropicModel || 'claude-3-5-sonnet-latest');

        const anthropicUrl = body.querySelector('#dialogAnthropicCustomUrlInput').value.trim();
        if (anthropicUrl) localStorage.setItem('anthropic-custom-url', anthropicUrl);
        else localStorage.removeItem('anthropic-custom-url');

        alert("Configurações de IA salvas com sucesso!");
    });
}

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log("Speech recognition not supported in this browser.");
        const micBtn = document.getElementById('aiMicBtn');
        if (micBtn) micBtn.style.display = 'none';
        return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
        isRecording = true;
        const micBtn = document.getElementById('aiMicBtn');
        if (micBtn) {
            micBtn.classList.add('recording');
            micBtn.textContent = '🛑';
        }
        const sw = document.getElementById('aiSoundwave');
        if (sw) sw.classList.add('active');
        showAiResponseBubble("Ouvindo... Fale agora.", false, false);
    };

    recognition.onend = function() {
        isRecording = false;
        const micBtn = document.getElementById('aiMicBtn');
        if (micBtn) {
            micBtn.classList.remove('recording');
            micBtn.textContent = '🎙️';
        }
        const sw = document.getElementById('aiSoundwave');
        if (sw) sw.classList.remove('active');
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error", event.error);
        showAiResponseBubble("Erro na gravação de voz: " + event.error, false, true);
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        const inputEl = document.getElementById('aiInput');
        if (inputEl) {
            inputEl.value = transcript;
            submitAiCommand();
        }
    };
}

function toggleVoiceRecord() {
    if (!recognition) {
        alert("O reconhecimento de voz não é suportado pelo seu navegador.");
        return;
    }
    if (isRecording) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

function showAiResponseBubble(message, isQuestion = false, isError = false) {
    const bubble = document.getElementById('aiResponseBubble');
    if (!bubble) return;
    
    bubble.innerHTML = '';
    if (isError) {
        const errDiv = el('div', 'ai-error');
        errDiv.textContent = message;
        bubble.appendChild(errDiv);
    } else if (isQuestion) {
        const qDiv = el('div', 'ai-question');
        qDiv.textContent = message;
        bubble.appendChild(qDiv);
    } else {
        const expDiv = el('div', 'ai-explanation');
        expDiv.textContent = message;
        bubble.appendChild(expDiv);
    }
    
    bubble.classList.add('active');
    
    if (!isQuestion && !isError && message !== 'Processando...') {
        setTimeout(() => {
            if (bubble.textContent === message) {
                bubble.classList.remove('active');
            }
        }, 8000);
    }
}

async function submitAiCommand() {
    const inputEl = document.getElementById('aiInput');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = '';
    showAiResponseBubble('Processando...', false, false);

    aiConversationHistory.push({ role: 'user', parts: [{ text: text }] });

    const activeBoardMeta = boardsMeta.find(b => b.id === currentBoardId);
    const activeBoardName = activeBoardMeta ? activeBoardMeta.name : 'Principal';
    const existingBoards = boardsMeta.map(b => b.name);
    const activeBoardLists = $$('.list[data-type="kanban"]', boardEl).map(l => l.querySelector('.title').value);

    const sysPrompt = `Você é a inteligência artificial de controle do TEA Planner, um aplicativo de produtividade que mistura Kanban, Matriz de Eisenhower (Q1, Q2, Q3, Q4) e Agenda com compromissos diários.

Seu objetivo é analisar o comando em linguagem natural do usuário (em português) e retornar um JSON contendo uma lista de ações estruturadas para o aplicativo executar.

A data de hoje no sistema é: ${getActiveDay()}.
O quadro ativo atualmente é: "${activeBoardName}".
Os quadros existentes no sistema são: ${JSON.stringify(existingBoards)}.
As listas no quadro ativo atualmente são: ${JSON.stringify(activeBoardLists)}.

Você deve analisar o comando e responder estritamente com um JSON no seguinte formato, sem formatação markdown (como blocos de código \`\`\`json), sem textos adicionais antes ou depois.

Formato de Resposta Esperado:
{
  "explanation": "Uma frase amigável explicando o que você entendeu e vai fazer.",
  "question": "Se o comando for ambíguo ou necessitar de esclarecimento (por exemplo, criar uma lista mas existem múltiplos quadros e o usuário não especificou qual, ou criar uma lista de compras mas não disse o nome da lista), faça a pergunta aqui. Se 'question' estiver preenchido, o array 'actions' DEVE estar vazio.",
  "actions": [
    // Array de ações a serem executadas em ordem. Pode ser vazio.
    {
      "type": "SWITCH_BOARD",
      "boardName": "Nome exato do quadro para o qual mudar"
    },
    {
      "type": "CREATE_LIST",
      "boardName": "Nome do quadro", // Opcional (assume o atual se omitido)
      "listTitle": "Nome da Lista"
    },
    {
      "type": "CREATE_CARDS",
      "boardName": "Nome do quadro", // Opcional (assume o atual se omitido)
      "listTitle": "Nome da Lista",  // Opcional se for para Matriz ou Agenda
      "quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (só preencha se for para a Matriz de Eisenhower)
      "time": "HH:MM", // Opcional (só preencha se for para a Agenda, ex: "10:00")
      "goal": true | false, // Opcional (se for o Objetivo do Dia na agenda)
      "cards": [
        {
          "text": "Texto do cartão",
          "color": "#hex_opcional",
          "due": "YYYY-MM-DD" // Opcional (prazo final, formato YYYY-MM-DD)
        }
      ]
    },
    {
      "type": "COMPLETE_CARDS",
      "timeRange": "morning" | "afternoon" | "evening" | "night" | "all", // Opcional (para completar compromissos do período da manhã/tarde/noite/tudo)
      "time": "HH:MM", // Opcional (completar compromisso de um horário específico)
      "listTitle": "Nome da Lista", // Opcional (completar todos os cartões desta lista no kanban)
      "quadrant": "Q1" | "Q2" | "Q3" | "Q4", // Opcional (completar todos os cartões deste quadrante)
      "all": true | false // Opcional
    },
    {
      "type": "COPY_PASTE_AGENDA",
      "fromDay": "YYYY-MM-DD",
      "toDay": "YYYY-MM-DD"
    }
  ]
}

Regras Importantes:
1. Sempre responda em formato JSON válido e parseável pelo JSON.parse(). Não retorne explicações fora do JSON.
2. Identifique datas relativas baseadas no dia de hoje: "hoje" é ${getActiveDay()}, "amanhã" é o dia seguinte, "ontem" é o dia anterior, etc.
3. Se o usuário quiser criar cartões na agenda, use "time" ou "goal". Exemplo: "Consulta médica 10h" -> type: CREATE_CARDS com time: "10:00".
4. Se o usuário quiser criar uma lista e cartões (ex: "lista de feira com batata e brocolis"), e houver múltiplos quadros no sistema, mas ele não disser em qual quadro: pergunte em qual quadro ele deseja criar preenchendo o campo "question".
5. Se houver apenas 1 quadro cadastrado no sistema além da Lixeira, crie a lista diretamente nele sem perguntar.
6. Se o usuário disser para copiar a agenda de ontem para hoje, retorne uma ação do tipo COPY_PASTE_AGENDA com fromDay = ontem e toDay = hoje.
7. Se o usuário disser "marcar como feito as atividades da manhã", retorne complete_cards com timeRange = "morning". A manhã corresponde a qualquer horário de 06:00 a 11:30.
8. Mantenha os nomes de quadros e listas consistentes com os já existentes, se houver similaridade semântica (ex: "pessoal" e "Pessoal").
`;

    const contents = [
        { role: 'user', parts: [{ text: sysPrompt + "\n\nAgora processe o seguinte diálogo com o usuário:\n" }] }
    ];
    
    aiConversationHistory.forEach(turn => {
        contents.push(turn);
    });

    try {
        const responseText = await callGemini(contents);
        
        let responseJson;
        try {
            let cleanedText = responseText.trim();
            if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
            }
            responseJson = JSON.parse(cleanedText);
        } catch (parseErr) {
            console.error("Gemini did not return valid JSON. Raw response: ", responseText);
            showAiResponseBubble("Desculpe, não consegui entender o comando estruturado. Por favor tente reescrever.", false, true);
            aiConversationHistory.pop();
            return;
        }

        aiConversationHistory.push({ role: 'model', parts: [{ text: JSON.stringify(responseJson) }] });

        if (responseJson.question) {
            showAiResponseBubble(responseJson.question, true, false);
        } else {
            if (responseJson.actions && responseJson.actions.length > 0) {
                executeAiActions(responseJson.actions);
            }
            showAiResponseBubble(responseJson.explanation || 'Comando executado com sucesso!', false, false);
            aiConversationHistory = [];
        }
    } catch (apiErr) {
        console.error("Gemini API call failed: ", apiErr);
        const errorMsg = apiErr.message || "Erro desconhecido. Verifique sua chave API e conexão.";
        showAiResponseBubble(`Erro da API: ${errorMsg}`, false, true);
        aiConversationHistory.pop();
    }
}

function executeAiActions(actions) {
    actions.forEach(action => {
        try {
            switch (action.type) {
                case 'SWITCH_BOARD':
                    if (action.boardName) {
                        const board = boardsMeta.find(b => b.name.toLowerCase().trim() === action.boardName.toLowerCase().trim());
                        if (board) {
                            switchBoard(board.id);
                        }
                    }
                    break;

                case 'CREATE_LIST':
                    {
                        let boardId = currentBoardId;
                        if (action.boardName) {
                            const board = boardsMeta.find(b => b.name.toLowerCase().trim() === action.boardName.toLowerCase().trim());
                            if (board) {
                                boardId = board.id;
                                if (boardId !== currentBoardId) {
                                    switchBoard(boardId);
                                }
                            }
                        }
                        let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());
                        if (!listEl) {
                            createList(action.listTitle);
                            persist();
                        }
                    }
                    break;

                case 'CREATE_CARDS':
                    {
                        let boardId = currentBoardId;
                        if (action.boardName) {
                            const board = boardsMeta.find(b => b.name.toLowerCase().trim() === action.boardName.toLowerCase().trim());
                            if (board) {
                                boardId = board.id;
                                if (boardId !== currentBoardId) {
                                    switchBoard(boardId);
                                }
                            }
                        }

                        let container = null;
                        let whenVal = "";

                        if (action.time) {
                            whenVal = getActiveDay() + 'T' + action.time;
                            const slot = slotsRoot.querySelector(`.list.slot[data-time="${action.time}"]`);
                            if (slot) container = slot.querySelector('.cards');
                        } else if (action.goal) {
                            whenVal = getActiveDay() + 'TGOAL';
                            const goalSlot = slotsRoot.querySelector('.list.goal-slot');
                            if (goalSlot) container = goalSlot.querySelector('.cards');
                        } else if (action.quadrant) {
                            const quadList = matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);
                            if (quadList) container = quadList.querySelector('.cards');
                        } else {
                            let listTitle = action.listTitle || "Para Fazer";
                            let listEl = $$('.list[data-type="kanban"]', boardEl).find(l => l.querySelector('.title').value.toLowerCase().trim() === listTitle.toLowerCase().trim());
                            if (!listEl) {
                                listEl = createList(listTitle);
                            }
                            container = listEl.querySelector('.cards');
                        }

                        if (container && action.cards) {
                            action.cards.forEach(cData => {
                                const cardData = {
                                    text: cData.text,
                                    color: cData.color || (action.quadrant ? MATRIX_COLORS[action.quadrant] : ""),
                                    due: cData.due || "",
                                    when: whenVal,
                                    timerTotal: cData.timerTotal ? String(cData.timerTotal) : ""
                                };
                                const newCard = createCard(cardData);
                                container.appendChild(newCard);
                            });
                            persist();
                            updateSlotsHasItems();
                            updateTotalTimerDisplay();
                        }
                    }
                    break;

                case 'COMPLETE_CARDS':
                    {
                        let targetCards = [];
                        if (action.timeRange) {
                            allCards.forEach(c => {
                                if (c.dataset.when && /T\d{2}:\d{2}$/.test(c.dataset.when)) {
                                    const timeStr = c.dataset.when.split('T')[1];
                                    const hour = parseInt(timeStr.split(':')[0], 10);
                                    let match = false;
                                    if (action.timeRange === 'morning' && hour >= 6 && hour < 12) match = true;
                                    else if (action.timeRange === 'afternoon' && hour >= 12 && hour < 18) match = true;
                                    else if ((action.timeRange === 'evening' || action.timeRange === 'night') && hour >= 18 && hour <= 23) match = true;
                                    else if (action.timeRange === 'all') match = true;

                                    if (match && c.dataset.completed !== 'true') {
                                        targetCards.push(c);
                                    }
                                }
                            });
                        } else if (action.time) {
                            const whenVal = getActiveDay() + 'T' + action.time;
                            allCards.forEach(c => {
                                if (c.dataset.when === whenVal && c.dataset.completed !== 'true') {
                                    targetCards.push(c);
                                }
                            });
                        } else if (action.quadrant) {
                            const quadList = matrixEl.querySelector(`.list[data-quad="${action.quadrant}"]`);
                            if (quadList) {
                                $$( '.card', quadList).forEach(c => {
                                    const cardInCache = allCards.find(cacheCard => cacheCard === c);
                                    if (cardInCache && cardInCache.dataset.completed !== 'true') {
                                        targetCards.push(cardInCache);
                                    }
                                });
                            }
                        } else if (action.listTitle) {
                            const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());
                            if (listEl) {
                                $$( '.card', listEl).forEach(c => {
                                    const cardInCache = allCards.find(cacheCard => cacheCard === c);
                                    if (cardInCache && cardInCache.dataset.completed !== 'true') {
                                        targetCards.push(cardInCache);
                                    }
                                });
                            }
                        } else if (action.all) {
                            allCards.forEach(c => {
                                if (c.dataset.completed !== 'true') {
                                    targetCards.push(c);
                                }
                            });
                        }

                        if (targetCards.length > 0) {
                            const executeCompletion = () => {
                                targetCards.forEach(card => {
                                    card.dataset.completed = 'true';
                                    card.classList.remove('timer-finished');
                                    if (card.dataset.timerState === 'finished') {
                                        card.dataset.timerState = 'stopped';
                                    }
                                    updateTimerDisplay(card);
                                });
                                persist();
                                updateSlotsHasItems();
                            };

                            if (action.all) {
                                showConfirm(`A IA deseja marcar TODOS os cartões como concluídos. Permitir?`, executeCompletion);
                            } else {
                                executeCompletion();
                            }
                        }
                    }
                    break;

                case 'DELETE_LIST':
                    if (action.listTitle) {
                        const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());
                        if (listEl) {
                            showConfirm(`A IA deseja excluir a lista "${action.listTitle}". Permitir?`, function() {
                                listEl.remove();
                                persist();
                            });
                        }
                    }
                    break;

                case 'DELETE_CARD':
                    if (action.cardText) {
                        const c = allCards.find(card => {
                            const txt = card.querySelector('.text');
                            return txt && txt.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());
                        });
                        if (c) {
                            showConfirm(`A IA deseja excluir o cartão "${action.cardText}". Permitir?`, function() {
                                removeCard(c, true);
                            });
                        }
                    }
                    break;

                case 'DUPLICATE_CARD':
                    if (action.cardText) {
                        const c = allCards.find(card => {
                            const txt = card.querySelector('.text');
                            return txt && txt.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());
                        });
                        if (c) {
                            const dupData = cardToData(c);
                            const newCard = createCard(dupData);
                            if (c.parentNode) {
                                c.parentNode.insertBefore(newCard, c.nextSibling);
                            }
                            persist();
                            if (typeof renderWeeklyView === 'function') {
                                renderWeeklyView();
                            }
                        }
                    }
                    break;

                case 'MOVE_CARD':
                    if (action.cardText) {
                        const c = allCards.find(card => {
                            const txt = card.querySelector('.text');
                            return txt && txt.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());
                        });
                        if (c) {
                            if (action.targetBoardId || action.targetBoardName) {
                                let board = null;
                                if (action.targetBoardId) {
                                    board = boardsMeta.find(b => b.id === action.targetBoardId);
                                } else {
                                    board = boardsMeta.find(b => b.name.toLowerCase().trim() === action.targetBoardName.toLowerCase().trim());
                                }
                                if (board) {
                                    moveCardToBoard(c, board.id, action.targetListTitle || 'Inbox');
                                }
                            } else if (action.targetListTitle) {
                                const listEl = $$('.list').find(l => {
                                    const titleInput = l.querySelector('.title');
                                    const title = titleInput ? titleInput.value : (l.dataset.quad || l.dataset.time || '');
                                    return title.toLowerCase().trim() === action.targetListTitle.toLowerCase().trim();
                                });
                                if (listEl) {
                                    const dest = listEl.querySelector('.cards');
                                    if (dest) {
                                        dest.appendChild(c);
                                        persist();
                                    }
                                }
                            }
                        }
                    }
                    break;

                case 'MOVE_LIST':
                    if (action.listTitle && (action.targetBoardId || action.targetBoardName)) {
                        const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());
                        let board = null;
                        if (action.targetBoardId) {
                            board = boardsMeta.find(b => b.id === action.targetBoardId);
                        } else {
                            board = boardsMeta.find(b => b.name.toLowerCase().trim() === action.targetBoardName.toLowerCase().trim());
                        }
                        if (listEl && board) {
                            var cardsData = $$('.card', listEl).map(c => {
                                var cardData = cardToData(c);
                                cardData.boardId = board.id;
                                return cardData;
                            });

                            var targetData = [];
                            var targetLocalStr = localStorage.getItem(LS_BOARD_PREFIX + board.id);
                            if (targetLocalStr) {
                                try { targetData = JSON.parse(targetLocalStr); } catch (e) { targetData = []; }
                            }

                            var targetList = targetData.find(l => l.type === 'kanban' && l.title === action.listTitle);
                            if (targetList) {
                                if (!targetList.cards) targetList.cards = [];
                                targetList.cards = targetList.cards.concat(cardsData);
                            } else {
                                targetData.push({
                                    type: 'kanban',
                                    title: action.listTitle,
                                    cards: cardsData,
                                    boardId: board.id
                                });
                            }

                            localStorage.setItem(LS_BOARD_PREFIX + board.id, JSON.stringify(targetData));
                            if (isFirebaseReady && auth && auth.currentUser) {
                                db.ref('users/' + auth.currentUser.uid + '/boards/' + board.id).set(targetData);
                            }

                            listEl.remove();
                            persist();

                            board.lastModified = Date.now();
                            saveBoardsMetadata();

                            showToast(`Lista "${action.listTitle}" movida para o quadro "${board.name}"`);
                        }
                    }
                    break;

                case 'CHANGE_THEME':
                    if (action.color || action.themeName) {
                        let color = action.color;
                        if (action.themeName) {
                            const themeKey = Object.keys(THEMES).find(key => THEMES[key].name.toLowerCase().trim().includes(action.themeName.toLowerCase().trim()));
                            if (themeKey) color = themeKey;
                        }
                        if (color && THEMES[color]) {
                            const board = boardsMeta.find(b => b.id === currentBoardId);
                            if (board) {
                                board.color = color;
                                board.lastModified = Date.now();
                                saveBoardsMetadata();
                                setBoardTheme(color);
                                persist();
                            }
                        }
                    }
                    break;

                case 'START_TIMER':
                    if (action.cardText) {
                        const c = allCards.find(card => {
                            const txt = card.querySelector('.text');
                            return txt && txt.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());
                        });
                        if (c) {
                            if (!c.dataset.timerTotal || parseInt(c.dataset.timerTotal, 10) <= 0) {
                                c.dataset.timerTotal = action.minutes ? (action.minutes * 60) : 1800;
                                c.dataset.timerLeft = c.dataset.timerTotal;
                            }
                            startCardTimer(c);
                        }
                    }
                    break;

                case 'PAUSE_TIMER':
                    if (action.cardText) {
                        const c = allCards.find(card => {
                            const txt = card.querySelector('.text');
                            return txt && txt.textContent.toLowerCase().trim().includes(action.cardText.toLowerCase().trim());
                        });
                        if (c) {
                            pauseCardTimer(c);
                        }
                    } else {
                        allCards.forEach(c => {
                            if (c.dataset.timerState === 'running') {
                                pauseCardTimer(c);
                            }
                        });
                    }
                    break;

                case 'TOGGLE_PANEL':
                    if (action.panel) {
                        const panel = action.panel.toLowerCase().trim();
                        if (panel === 'kanban' || panel === 'quadro') {
                            document.getElementById('toggleBoardBtn').click();
                        } else if (panel === 'matrix' || panel === 'matriz') {
                            document.getElementById('toggleMatrixBtn').click();
                        } else if (panel === 'agenda') {
                            document.getElementById('toggleAgendaBtn').click();
                        } else if (panel === 'weekly' || panel === 'semana') {
                            document.getElementById('toggleWeeklyBtn').click();
                        }
                    }
                    break;

                case 'COPY_PASTE_AGENDA':
                    if (action.fromDay && action.toDay) {
                        copyAgendaFromTo(action.fromDay, action.toDay);
                    }
                    break;
            }
        } catch (err) {
            console.error("Erro executando ação da IA:", action, err);
        }
    });
}

function copyAgendaFromTo(fromDay, toDay) {
    if (fromDay === toDay) return;
    const cardsToCopy = allCards.filter(c => (c.dataset.when || '').startsWith(fromDay + 'T')).map(c => ({
        ...cardToData(c),
        timeOrGoal: (c.dataset.when || '').substring(11)
    }));
    cardsToCopy.forEach(cardData => {
        const newData = { ...cardData };
        newData.when = toDay + 'T' + newData.timeOrGoal;
        const existsInCache = allCards.some(c => c.dataset.when === newData.when && c.querySelector('.text').textContent.trim() === newData.text.trim());
        if (!existsInCache) {
            createCard(newData);
        }
    });
    updateSlotsHasItems();
    persist();
}

function initAiControls() {
    const sendBtn = document.getElementById('aiSendBtn');
    if (sendBtn) sendBtn.addEventListener('click', submitAiCommand);
    
    const inputEl = document.getElementById('aiInput');
    if (inputEl) {
        inputEl.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitAiCommand();
            }
        });
    }
    
    const configBtn = document.getElementById('aiConfigBtn');
    if (configBtn) configBtn.addEventListener('click', configureApiKeyDialog);
    
    const micBtn = document.getElementById('aiMicBtn');
    if (micBtn) micBtn.addEventListener('click', toggleVoiceRecord);

    initSpeechRecognition();
}


let alertCheckInterval = null;
function startAlertCheck() {
if (alertCheckInterval) return;
// Set up styles for toast if not exists
if (!document.getElementById('toast-styles')) {
const style = document.createElement('style');
style.id = 'toast-styles';
style.textContent = `
@keyframes slideInRight {
from { transform: translateX(120%); opacity: 0; }
to { transform: translateX(0); opacity: 1; }
}
`;
document.head.appendChild(style);
}
alertCheckInterval = setInterval(function () {
const now = Date.now();
let anyFired = false;
allCards.forEach(c => {
if (c.dataset.alertEnabled === 'true' && c.dataset.alertFired !== 'true') {
const whenVal = c.dataset.when || '';
if (whenVal.includes('T')) {
const parts = whenVal.split('T');
const cardDate = parts[0];
const cardTime = parts[1] || '';
if (cardTime && cardTime !== 'GOAL' && /^\d{2}:\d{2}$/.test(cardTime)) {
const eventDate = new Date(cardDate + 'T' + cardTime + ':00');
if (!isNaN(eventDate.getTime())) {
const val = parseInt(c.dataset.alertValue || '15', 10);
const unit = c.dataset.alertUnit || 'minutos';
let factor = 60 * 1000;
if (unit === 'horas') factor = 60 * 60 * 1000;
else if (unit === 'dias') factor = 24 * 60 * 60 * 1000;
else if (unit === 'semanas') factor = 7 * 24 * 60 * 60 * 1000;
const alertTime = eventDate.getTime() - (val * factor);
if (now >= alertTime && now < eventDate.getTime() + 10 * 60 * 1000) {
c.dataset.alertFired = 'true';
anyFired = true;
playBeep();
setTimeout(playBeep, 200);
showNotificationToast((c.querySelector('.text') ? 
       c.querySelector('.text').textContent : '').trim(), cardTime);
}
}
}
}
}
});
if (anyFired) {
persist();
}
}, 10000); // Check every 10 seconds for responsive alerting
}
function showNotificationToast(taskTitle, taskTime) {
const toast = document.createElement('div');
toast.style.position = 'fixed';
toast.style.top = '20px';
toast.style.right = '20px';
toast.style.background = 'var(--panel)';
toast.style.color = '#fff';
toast.style.borderLeft = '4px solid var(--brand)';
toast.style.padding = '12px 18px';
toast.style.borderRadius = '8px';
toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
toast.style.zIndex = '10000';
toast.style.display = 'flex';
toast.style.flexDirection = 'column';
toast.style.gap = '4px';
toast.style.minWidth = '280px';
toast.style.fontFamily = 'system-ui, -apple-system, sans-serif';
toast.style.animation = 'slideInRight 0.3s ease-out';
toast.innerHTML = `
<div style="display:flex; justify-content:space-between; align-items:center;">
<strong style="color:#ffb300; font-size:12px; letter-spacing: 0.5px;">&#128276; ALERTA DE COMPROMISSO</strong>
<button style="background:transparent; border:none; color:#9fb3d2; font-size:16px; cursor:pointer;" onclick="this.closest('.toast-container').remove()">&#10006;</button>
</div>
<div style="font-size:14px; font-weight:500; margin-top:2px;">${taskTitle || 'Tarefa sem t\u00edtulo'}</div>
<div style="font-size:12px; color:#9fb3d2; margin-top:2px;">\u00e0s ${taskTime}</div>
`;
toast.className = 'toast-container';
document.body.appendChild(toast);
setTimeout(() => {
toast.style.transition = 'opacity 0.5s, transform 0.5s';
toast.style.opacity = '0';
toast.style.transform = 'translateY(-20px)';
setTimeout(() => toast.remove(), 500);
}, 8000);
}
function promptDeleteRecurringCard(card, onDecision) {
    showModal('Excluir Recorr\u00EAncia', function () {
        var d = el('div');
        d.style.display = 'flex';
        d.style.flexDirection = 'column';
        d.style.gap = '12px';
        d.style.minWidth = '300px';
        d.style.color = '#fff';

        d.innerHTML = `
            <div style="font-size: 14px; margin-bottom: 10px; color: #9fb3d2; line-height: 1.4;">
                Este cart\u00E3o faz parte de uma recorr\u00EAncia. O que voc\u00EA gostaria de fazer?
            </div>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
                <input type="radio" name="delRecurOption" value="instance" checked />
                <span>Deletar apenas esta ocorr\u00EAncia</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
                <input type="radio" name="delRecurOption" value="all" />
                <span>Deletar toda a s\u00E9rie (todas as ocorr\u00EAncias)</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px;">
                <input type="radio" name="delRecurOption" value="future" />
                <span>Deletar esta ocorr\u00EAncia e todas as futuras</span>
            </label>
        `;
        return d;
    }, function (body, wrap) {
        var val = body.querySelector('input[name="delRecurOption"]:checked').value;
        onDecision(val);
    });
}

function parseRecurrenceRule(recurrenceVal) {
    if (!recurrenceVal || recurrenceVal === 'none') return null;
    let rule = null;
    if (recurrenceVal.startsWith('{')) {
        try {
            rule = JSON.parse(recurrenceVal);
        } catch (e) {
            console.error("Error parsing recurrence JSON", e);
        }
    } else {
        if (recurrenceVal === 'daily') {
            rule = { freq: 'daily', interval: 1, endType: 'never' };
        } else if (recurrenceVal === 'weekdays') {
            rule = { freq: 'weekly', interval: 1, days: [1, 2, 3, 4, 5], endType: 'never' };
        } else if (recurrenceVal === 'weekly') {
            rule = { freq: 'weekly', interval: 1, endType: 'never' };
        } else if (recurrenceVal === 'monthly') {
            rule = { freq: 'monthly', interval: 1, endType: 'never' };
        }
    }
    return rule;
}

function getNextRecurrenceDate(parentDateStr, rule) {
    const startDate = new Date(parentDateStr + 'T12:00:00');
    let currentDate = new Date(startDate);
    
    if (rule.freq === 'daily') {
        currentDate.setDate(currentDate.getDate() + rule.interval);
    } else if (rule.freq === 'weekly') {
        let found = false;
        for (let attempt = 0; attempt < 365; attempt++) {
            currentDate.setDate(currentDate.getDate() + 1);
            const startTemp = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 12, 0, 0);
            const currentTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0, 0);
            const startSun = new Date(startTemp);
            startSun.setDate(startSun.getDate() - startSun.getDay());
            const currentSun = new Date(currentTemp);
            currentSun.setDate(currentSun.getDate() - currentSun.getDay());
            const msDiff = currentSun.getTime() - startSun.getTime();
            const weeksDiff = Math.round(msDiff / (7 * 24 * 60 * 60 * 1000));
            if (weeksDiff % rule.interval === 0) {
                const dayOfWeek = currentDate.getDay();
                if (!rule.days || rule.days.length === 0 || rule.days.includes(dayOfWeek)) {
                    found = true;
                    break;
                }
            }
        }
        if (!found) return null;
    } else if (rule.freq === 'monthly') {
        currentDate.setMonth(currentDate.getMonth() + rule.interval);
    } else if (rule.freq === 'yearly') {
        currentDate.setFullYear(currentDate.getFullYear() + rule.interval);
    } else {
        return null;
    }
    
    return currentDate.toISOString().split('T')[0];
}

function generateRecurrences(parentCard) {
const parentId = parentCard.dataset.cardId;
if (!parentId) return;
const parentDateStr = parentCard.dataset.when.split('T')[0];
const parentTimeSuffix = parentCard.dataset.when.includes('T') ? 
       parentCard.dataset.when.split('T')[1] : '';
// Delete all future child cards belonging to this parent
allCards = allCards.filter(c => {
if (c.dataset.recurrenceParent === parentId) {
c.remove();
return false;
}
return true;
});
const recurrenceVal = parentCard.dataset.recurrence;
if (!recurrenceVal || recurrenceVal === 'none') {
return;
}
let rule = null;
if (recurrenceVal.startsWith('{')) {
try {
rule = JSON.parse(recurrenceVal);
} catch (e) {
console.error("Error parsing recurrence JSON", e);
}
} else {
// Fallback to simple predefined recurrence configurations
if (recurrenceVal === 'daily') {
rule = { freq: 'daily', interval: 1, endType: 'never' };
} else if (recurrenceVal === 'weekdays') {
rule = { freq: 'weekly', interval: 1, days: [1, 2, 3, 4, 5], endType: 'never' };
} else if (recurrenceVal === 'weekly') {
const sDate = new Date(parentDateStr + 'T12:00:00');
rule = { freq: 'weekly', interval: 1, days: [sDate.getDay()], endType: 'never' };
} else if (recurrenceVal === 'monthly') {
rule = { freq: 'monthly', interval: 1, endType: 'never' };
}
}
if (!rule) return;
const startDate = new Date(parentDateStr + 'T12:00:00');
let currentDate = new Date(startDate);
let count = 0;
let maxInstances = 365; // safety limit
let instancesToGenerate = 30; // default for daily/weekdays
if (rule.freq === 'weekly') instancesToGenerate = 12;
if (rule.freq === 'monthly') instancesToGenerate = 12;
if (rule.freq === 'yearly') instancesToGenerate = 5;
if (rule.endType === 'count') {
instancesToGenerate = Math.min(rule.endCount || 1, maxInstances);
}
const endLimitDate = (rule.endType === 'date' && rule.endDate) ? new Date(rule.endDate + 
       'T23:59:59') : null;
while (count < instancesToGenerate) {
if (rule.freq === 'daily') {
currentDate.setDate(currentDate.getDate() + rule.interval);
} else if (rule.freq === 'weekly') {
let found = false;
for (let attempt = 0; attempt < 365; attempt++) {
currentDate.setDate(currentDate.getDate() + 1);
const startTemp = new Date(startDate.getFullYear(), startDate.getMonth(), 
       startDate.getDate(), 12, 0, 0);
const currentTemp = new Date(currentDate.getFullYear(), currentDate.getMonth(), 
       currentDate.getDate(), 12, 0, 0);
const startSun = new Date(startTemp);
startSun.setDate(startSun.getDate() - startSun.getDay());
const currentSun = new Date(currentTemp);
currentSun.setDate(currentSun.getDate() - currentSun.getDay());
const msDiff = currentSun.getTime() - startSun.getTime();
const weeksDiff = Math.round(msDiff / (7 * 24 * 60 * 60 * 1000));
if (weeksDiff % rule.interval === 0) {
const dayOfWeek = currentDate.getDay();
if (!rule.days || rule.days.length === 0 || rule.days.includes(dayOfWeek)) {
found = true;
break;
}
}
}
if (!found) break;
} else if (rule.freq === 'monthly') {
currentDate.setMonth(currentDate.getMonth() + rule.interval);
} else if (rule.freq === 'yearly') {
currentDate.setFullYear(currentDate.getFullYear() + rule.interval);
} else {
break;
}
if (endLimitDate && currentDate > endLimitDate) {
break;
}
const dateStr = currentDate.toISOString().slice(0, 10);
const exceptions = parentCard.dataset.recurrenceExceptions || '';
const exceptionList = exceptions ? exceptions.split(',') : [];
if (exceptionList.includes(dateStr)) {
    continue;
}
const whenVal = dateStr + 'T' + parentTimeSuffix;
const childData = {
text: (parentCard.querySelector('.text') ? 
       parentCard.querySelector('.text').textContent : '').trim(),
color: parentCard.dataset.color || '',
labelColor: parentCard.dataset.labelColor || '',
due: parentCard.dataset.due || '',
when: whenVal,
timerTotal: parentCard.dataset.timerTotal || '',
timerLeft: parentCard.dataset.timerLeft || '',
timerState: 'stopped',
timerEnd: '',
completed: 'false',
history: JSON.stringify([{ action: 'Criado por recorr\u00eancia personalizada', time: 
       Date.now() }]),
boardId: parentCard.dataset.boardId || '',
description: parentCard.dataset.description || '',
duration: parentCard.dataset.duration || '',
recurrence: 'none',
cardId: 'card_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
recurrenceParent: parentId,
alertEnabled: parentCard.dataset.alertEnabled || 'false',
alertValue: parentCard.dataset.alertValue || '15',
alertUnit: parentCard.dataset.alertUnit || 'minutos',
alertFired: 'false'
};
createCard(childData);
count++;
}
}
function openCustomRecurrenceDialog(currentRule, onSave, onCancel) {
let recRule = { freq: 'weekly', interval: 1, days: [], endType: 'never', endDate: '', endCount: 
       1 };
if (currentRule) {
if (typeof currentRule === 'string' && currentRule.startsWith('{')) {
try { recRule = JSON.parse(currentRule); } catch (e) {}
} else if (typeof currentRule === 'object') {
recRule = { ...recRule, ...currentRule };
}
}
const modalElements = showModal('Recorr\u00eancia', function () {
const r = el('div');
r.style.display = 'flex';
r.style.flexDirection = 'column';
r.style.gap = '14px';
r.style.minWidth = '320px';
r.style.maxWidth = '400px';
r.style.color = '#fff';
// 1. Repete a cada Row
const intervalRow = el('div');
intervalRow.style.display = 'flex';
intervalRow.style.alignItems = 'center';
intervalRow.style.gap = '8px';
intervalRow.style.fontSize = '14px';
intervalRow.innerHTML = `
<span>Repete a cada</span>
<input type="number" id="recInterval" name="recInterval" value="${recRule.interval || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px;" />
<select id="recFreq" name="recFreq" style="border: 1px solid rgba(255, 255, 255, 0.15); 
       background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 14px; cursor: pointer;">
<option value="daily" ${recRule.freq === 'daily' ? 'selected' : ''}>dia(s)</option>
<option value="weekly" ${recRule.freq === 'weekly' ? 'selected' : 
       ''}>semana(s)</option>
<option value="monthly" ${recRule.freq === 'monthly' ? 'selected' : 
       ''}>m\u00eas(es)</option>
<option value="yearly" ${recRule.freq === 'yearly' ? 'selected' : 
       ''}>ano(s)</option>
</select>
`;
const recIntervalInp = intervalRow.querySelector('#recInterval');
const recFreqSelect = intervalRow.querySelector('#recFreq');
r.appendChild(intervalRow);
// 2. Repetir \u00e0s/aos Row (Weekdays selector)
const weekdaysRow = el('div');
weekdaysRow.style.display = recRule.freq === 'weekly' ? 'flex' : 'none';
weekdaysRow.style.flexDirection = 'column';
weekdaysRow.style.gap = '8px';
weekdaysRow.innerHTML = `<span style="font-size: 13px; color: #9fb3d2;">Repetir 
       \u00e0s/aos</span>`;
const daysGrid = el('div');
daysGrid.style.display = 'flex';
daysGrid.style.gap = '8px';
daysGrid.style.justifyContent = 'space-between';
const weekdayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const weekdayTitles = ['Domingo', 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta', 'Sexta', 
       'S\u00e1bado'];
const chosenDays = new Set(recRule.days || []);
weekdayNames.forEach((name, idx) => {
const dayBtn = el('button');
dayBtn.type = 'button';
dayBtn.className = 'weekday-btn';
if (chosenDays.has(idx)) {
dayBtn.classList.add('selected');
}
dayBtn.title = weekdayTitles[idx];
dayBtn.textContent = name;
dayBtn.onclick = function() {
if (chosenDays.has(idx)) {
chosenDays.delete(idx);
dayBtn.classList.remove('selected');
} else {
chosenDays.add(idx);
dayBtn.classList.add('selected');
}
};
daysGrid.appendChild(dayBtn);
});
weekdaysRow.appendChild(daysGrid);
r.appendChild(weekdaysRow);
recFreqSelect.addEventListener('change', function() {
if (recFreqSelect.value === 'weekly') {
weekdaysRow.style.display = 'flex';
} else {
weekdaysRow.style.display = 'none';
}
});
// 3. Termina Section
const endSection = el('div');
endSection.style.display = 'flex';
endSection.style.flexDirection = 'column';
endSection.style.gap = '8px';
endSection.style.marginTop = '6px';
endSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';
endSection.style.paddingTop = '10px';
const endTitle = el('span');
endTitle.style.fontSize = '13px';
endTitle.style.color = '#9fb3d2';
endTitle.style.fontWeight = '500';
endTitle.textContent = 'Termina';
endSection.appendChild(endTitle);
// Radio 1: Nunca
const neverLabel = el('label');
neverLabel.style.display = 'flex';
neverLabel.style.alignItems = 'center';
neverLabel.style.gap = '6px';
neverLabel.style.fontSize = '14px';
neverLabel.style.cursor = 'pointer';
neverLabel.innerHTML = `<input type="radio" id="recEndNever" name="recEndType" 
       value="never" ${recRule.endType === 'never' ? 'checked' : ''} /> Nunca`;
endSection.appendChild(neverLabel);
// Radio 2: Em
const dateLabel = el('label');
dateLabel.style.display = 'flex';
dateLabel.style.alignItems = 'center';
dateLabel.style.gap = '6px';
dateLabel.style.fontSize = '14px';
dateLabel.style.cursor = 'pointer';
dateLabel.innerHTML = `
<input type="radio" id="recEndOnDate" name="recEndType" value="date" ${recRule.endType 
       === 'date' ? 'checked' : ''} /> Em
<input type="date" id="recEndDate" name="recEndDate" value="${recRule.endDate || new 
       Date().toISOString().slice(0, 10)}" style="border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); 
       color: #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />
`;
endSection.appendChild(dateLabel);
// Radio 3: Ap\u00f3s
const countLabel = el('label');
countLabel.style.display = 'flex';
countLabel.style.alignItems = 'center';
countLabel.style.gap = '6px';
countLabel.style.fontSize = '14px';
countLabel.style.cursor = 'pointer';
countLabel.innerHTML = `
<input type="radio" id="recEndAfterCount" name="recEndType" value="count" 
       ${recRule.endType === 'count' ? 'checked' : ''} /> Ap\u00f3s
<input type="number" id="recEndCount" name="recEndCount" value="${recRule.endCount || 
       1}" min="1" style="width: 60px; border: 1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: 
       #fff; padding: 4px 6px; border-radius: 6px; font-size: 13px;" />
<span>ocorr\u00eancias</span>
`;
endSection.appendChild(countLabel);
r.appendChild(endSection);

// Button: N\u00e3o repetir (remover)
const removeBtn = el('button');
removeBtn.type = 'button';
removeBtn.textContent = 'N\u00e3o repetir (remover)';
removeBtn.style.width = '100%';
removeBtn.style.marginTop = '12px';
removeBtn.style.padding = '8px 12px';
removeBtn.style.background = '#c62828';
removeBtn.style.border = 'none';
removeBtn.style.borderRadius = '6px';
removeBtn.style.color = '#fff';
removeBtn.style.fontWeight = 'bold';
removeBtn.style.cursor = 'pointer';
removeBtn.style.transition = 'background 0.2s';
removeBtn.onmouseover = () => removeBtn.style.background = '#b71c1c';
removeBtn.onmouseout = () => removeBtn.style.background = '#c62828';
removeBtn.onclick = function() {
    const w = removeBtn.closest('.modal-wrap');
    if (w) {
        w.remove();
    }
    onSave('none');
};
r.appendChild(removeBtn);

return r;
}, function (body, wrap) {
const freq = body.querySelector('#recFreq').value;
const interval = parseInt(body.querySelector('#recInterval').value, 10) || 1;
const days = freq === 'weekly' ? 
       Array.from(body.querySelectorAll('.weekday-btn.selected')).map(btn => {
const idx = ['Domingo', 'Segunda', 'Ter\u00e7a', 'Quarta', 'Quinta', 'Sexta', 
       'S\u00e1bado'].indexOf(btn.title);
return idx !== -1 ? idx : 0;
}) : [];
const endTypeRadio = body.querySelector('input[name="recEndType"]:checked');
const endType = endTypeRadio ? endTypeRadio.value : 'never';
const endDate = body.querySelector('#recEndDate').value;
const endCount = parseInt(body.querySelector('#recEndCount').value, 10) || 1;
const newRule = {
freq: freq,
interval: interval,
days: days,
endType: endType,
endDate: endDate,
endCount: endCount
};
onSave(newRule);
});
modalElements.okButton.textContent = 'Conclu\u00eddo';
modalElements.cancelButton.onclick = function () {
document.body.removeChild(modalElements.wrap);
if (onCancel) onCancel();
};
}
function openAlertDialog(cardOrData, onSave, onCancel) {
const predefinedOptions = [
{ text: 'No hor\u00e1rio do evento', val: 0, unit: 'minutos' },
{ text: '5 minutos antes', val: 5, unit: 'minutos' },
{ text: '15 minutos antes', val: 15, unit: 'minutos' },
{ text: '30 minutos antes', val: 30, unit: 'minutos' },
{ text: '1 hora antes', val: 1, unit: 'horas' },
{ text: '2 horas antes', val: 2, unit: 'horas' },
{ text: '1 dia antes', val: 1, unit: 'dias' },
{ text: 'Personalizado...', val: -1, unit: 'custom' }
];
const dataset = cardOrData.dataset ? cardOrData.dataset : cardOrData;
const isEnabled = dataset.alertEnabled === 'true';
const currentVal = parseInt(dataset.alertValue || '15', 10);
const currentUnit = dataset.alertUnit || 'minutos';
const modalElements = showModal('Alerta', function () {
const r = el('div');
r.style.display = 'flex';
r.style.flexDirection = 'column';
r.style.gap = '12px';
r.style.minWidth = '320px';
r.style.maxWidth = '400px';
r.style.color = '#fff';
// 1. Toggle switch row
const toggleRow = el('div', 'premium-switch-container');
toggleRow.innerHTML = `
<span class="premium-switch-label">Ativado</span>
<label class="premium-switch">
<input type="checkbox" id="alertSubEnabled" name="alertSubEnabled" ${isEnabled ? 
       'checked' : ''}>
<span class="premium-slider"></span>
</label>
`;
const enabledCheckbox = toggleRow.querySelector('#alertSubEnabled');
r.appendChild(toggleRow);
// Options Container
const optionsContainer = el('div');
optionsContainer.style.display = isEnabled ? 'flex' : 'none';
optionsContainer.style.flexDirection = 'column';
optionsContainer.style.gap = '6px';
r.appendChild(optionsContainer);
// Toggling options container display
enabledCheckbox.addEventListener('change', function() {
if (enabledCheckbox.checked) {
optionsContainer.style.display = 'flex';
} else {
optionsContainer.style.display = 'none';
}
});
// Predefined options list
const predefinedOptions = [
{ text: 'No hor\u00e1rio do evento', val: 0, unit: 'minutos' },
{ text: '5 minutos antes', val: 5, unit: 'minutos' },
{ text: '15 minutos antes', val: 15, unit: 'minutos' },
{ text: '30 minutos antes', val: 30, unit: 'minutos' },
{ text: '1 hora antes', val: 1, unit: 'horas' },
{ text: '2 horas antes', val: 2, unit: 'horas' },
{ text: '1 dia antes', val: 1, unit: 'dias' },
{ text: 'Personalizado...', val: -1, unit: 'custom' }
];
let matchedIdx = -1;
predefinedOptions.forEach((opt, idx) => {
if (opt.val !== -1 && currentVal === opt.val && currentUnit === opt.unit) {
matchedIdx = idx;
}
});
if (matchedIdx === -1 && isEnabled) {
matchedIdx = predefinedOptions.length - 1; 
} else if (!isEnabled) {
matchedIdx = 2; // Default to 15m
}
// Custom fields row
const customFields = el('div');
customFields.id = 'alertCustomFieldsSub';
customFields.style.display = matchedIdx === predefinedOptions.length - 1 ? 'flex' : 'none';
customFields.style.flexDirection = 'column';
customFields.style.gap = '6px';
customFields.style.padding = '10px';
customFields.style.background = '#0a1424';
customFields.style.border = '1px solid rgba(255, 255, 255, 0.15)';
customFields.style.borderRadius = '8px';
customFields.style.marginTop = '4px';
customFields.innerHTML = `
<span style="font-size: 12px; color: #9fb3d2;">Tempo personalizado:</span>
<div style="display: flex; gap: 8px; align-items: center;">
<input type="number" id="alertCustomValSub" name="alertCustomValSub" min="1" 
       value="${matchedIdx === predefinedOptions.length - 1 ? currentVal : 15}" style="width: 70px; border: 1px solid 
       rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; font-size: 
       14px;" />
<select id="alertCustomUnitSub" name="alertCustomUnitSub" style="flex:1; border: 
       1px solid rgba(255, 255, 255, 0.15); background: var(--bg); color: #fff; padding: 6px 8px; border-radius: 6px; 
       font-size: 14px; cursor: pointer;">
<option value="minutos" ${currentUnit === 'minutos' ? 'selected' : ''}>minutos 
       antes</option>
<option value="horas" ${currentUnit === 'horas' ? 'selected' : ''}>horas 
       antes</option>
<option value="dias" ${currentUnit === 'dias' ? 'selected' : ''}>dias 
       antes</option>
<option value="semanas" ${currentUnit === 'semanas' ? 'selected' : ''}>semanas 
       antes</option>
</select>
</div>
`;
// Render list of choices
predefinedOptions.forEach((opt, idx) => {
const optDiv = el('div', 'alert-option-item');
if (idx === matchedIdx) {
optDiv.classList.add('selected');
}
// Use safe character mapping
let cleanText = opt.text;
optDiv.innerHTML = `
<span>${cleanText}</span>
<span class="check-mark">&#10004;</span>
`;
optDiv.onclick = function () {
r.querySelectorAll('.alert-option-item').forEach(item => 
       item.classList.remove('selected'));
optDiv.classList.add('selected');
if (opt.unit === 'custom') {
customFields.style.display = 'flex';
} else {
customFields.style.display = 'none';
}
};
optionsContainer.appendChild(optDiv);
});
optionsContainer.appendChild(customFields);
// 2. Tipo de alerta section
const alertTypeSection = el('div');
alertTypeSection.style.marginTop = '10px';
alertTypeSection.style.borderTop = '1px solid rgba(255, 255, 255, 0.15)';
alertTypeSection.style.paddingTop = '10px';
alertTypeSection.innerHTML = `
<span style="font-size: 13px; color: #9fb3d2; font-weight: 500; display: block; 
       margin-bottom: 6px;">Tipo de alerta</span>
<div style="display: flex; align-items: center; justify-content: space-between; 
       padding: 10px 12px; background: var(--bg); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 8px;">
<span style="font-size: 14px;">Notifica\u00e7\u00e3o (Pop-up e Som)</span>
<span style="color: #1976d2; font-weight: bold;">&#10004;</span>
</div>
`;
optionsContainer.appendChild(alertTypeSection);
return r;
}, function (body, wrap) {
const enabledCheckboxSub = body.querySelector('#alertSubEnabled');
const enabled = enabledCheckboxSub ? enabledCheckboxSub.checked : false;
let val = 15;
let unit = 'minutos';
if (enabled) {
const selectedOpt = body.querySelector('.alert-option-item.selected');
const selectedIdx = 
       Array.from(body.querySelectorAll('.alert-option-item')).indexOf(selectedOpt);
const opt = predefinedOptions[selectedIdx];
if (opt && opt.unit !== 'custom') {
val = opt.val;
unit = opt.unit;
} else {
val = parseInt(body.querySelector('#alertCustomValSub').value, 10) || 15;
unit = body.querySelector('#alertCustomUnitSub').value;
}
}
onSave({
alertEnabled: enabled,
alertValue: val,
alertUnit: unit
});
});
modalElements.okButton.textContent = 'Conclu\u00eddo';
modalElements.cancelButton.onclick = function () {
document.body.removeChild(modalElements.wrap);
if (onCancel) onCancel();
};
}
function openAgendaDialog(card) {
if (!card) return;
if (!card.dataset.cardId) {
card.dataset.cardId = 'card_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
}
const whenVal = card.dataset.when || '';
let cardDate = '';
let cardTime = '09:00';
let isGoal = false;
let isAllDay = false;
if (whenVal.includes('T')) {
const parts = whenVal.split('T');
cardDate = parts[0];
const timePart = parts[1] || '';
if (timePart === 'GOAL') {
isGoal = true;
isAllDay = true;
} else if (timePart === '') {
isAllDay = true;
} else {
cardTime = timePart;
}
}
if (!cardDate) {
cardDate = new Date().toISOString().slice(0, 10);
}
const currentRecurrence = card.dataset.recurrence || 'none';
const currentDuration = card.dataset.duration || '60';
const currentDescription = card.dataset.description || '';
const currentAlertEnabled = card.dataset.alertEnabled === 'true';
const currentAlertValue = card.dataset.alertValue || '15';
const currentAlertUnit = card.dataset.alertUnit || 'minutos';
let isCustomRecurrence = currentRecurrence.startsWith('{');
let tempAlertEnabled = currentAlertEnabled;
let tempAlertValue = parseInt(currentAlertValue, 10);
if (isNaN(tempAlertValue)) tempAlertValue = 15;
let tempAlertUnit = currentAlertUnit;
let tempRecurrenceValue = currentRecurrence;
var modalElements = showModal('Agendar / Recorr\u00eancia', function () {
var r = el('div');
r.style.display = 'flex';
r.style.flexDirection = 'column';
r.style.gap = '14px';
r.style.minWidth = '360px';
r.style.maxWidth = '460px';
r.style.color = '#fff';
r.style.fontFamily = 'inherit';
// 1. Title Input
const titleRow = el('div');
titleRow.innerHTML = `<input type="text" id="agendaTitle" name="agendaTitle" 
       placeholder="Adicionar t\u00edtulo" value="${(card.querySelector('.text') ? card.querySelector('.text').textContent 
       : '').replace(/^\?\?\s*/, '').trim()}" style="width: 100%; border: none; border-bottom: 2px solid rgba(255, 
       255, 255, 0.15); background: transparent; color: #fff; font-size: 18px; font-weight: 500; padding: 6px 0; 
       outline: none; transition: border-color 0.2s;" />`;
const titleInput = titleRow.querySelector('#agendaTitle');
titleInput.addEventListener('focus', () => titleInput.style.borderBottomColor = 
       'var(--brand)');
titleInput.addEventListener('blur', () => titleInput.style.borderBottomColor = 'rgba(255, 255, 255, 0.15)');
r.appendChild(titleRow);
// 2. Date & Time Row
const dateTimeRow = el('div');
dateTimeRow.style.display = 'flex';
dateTimeRow.style.gap = '10px';
dateTimeRow.style.alignItems = 'center';
dateTimeRow.style.flexWrap = 'wrap';
const datePicker = el('input');
datePicker.type = 'date';
datePicker.id = 'agendaDateVal';
datePicker.name = 'agendaDateVal';
datePicker.value = cardDate;
datePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';
datePicker.style.background = 'var(--bg)';
datePicker.style.color = '#fff';
datePicker.style.padding = '6px 8px';
datePicker.style.borderRadius = '6px';
datePicker.style.fontSize = '14px';
datePicker.style.cursor = 'pointer';
const timePicker = el('input');
timePicker.type = 'text';
timePicker.id = 'agendaTimeVal';
timePicker.name = 'agendaTimeVal';
timePicker.value = cardTime;
timePicker.readOnly = true;
timePicker.style.border = '1px solid rgba(255, 255, 255, 0.15)';
timePicker.style.background = 'var(--bg)';
timePicker.style.color = '#fff';
timePicker.style.padding = '6px 8px';
timePicker.style.borderRadius = '6px';
timePicker.style.fontSize = '14px';
timePicker.style.cursor = 'pointer';
timePicker.style.textAlign = 'center';
timePicker.onclick = function () {
openAnalogTimePicker(timePicker.value, function (selectedTime) {
timePicker.value = selectedTime;
});
};
if (isAllDay) {
timePicker.style.display = 'none';
}
const allDayLabel = el('label');
allDayLabel.style.display = 'flex';
allDayLabel.style.alignItems = 'center';
allDayLabel.style.gap = '4px';
allDayLabel.style.fontSize = '13px';
allDayLabel.style.color = '#9fb3d2';
allDayLabel.style.cursor = 'pointer';
allDayLabel.innerHTML = `<input type="checkbox" id="agendaAllDay" name="agendaAllDay" 
       ${isAllDay ? 'checked' : ''} /> Dia inteiro`;
const allDayCheckbox = allDayLabel.querySelector('#agendaAllDay');
const goalLabel = el('label');
goalLabel.style.display = 'flex';
goalLabel.style.alignItems = 'center';
goalLabel.style.gap = '4px';
goalLabel.style.fontSize = '13px';
goalLabel.style.color = '#9fb3d2';
goalLabel.style.cursor = 'pointer';
goalLabel.innerHTML = `<input type="checkbox" id="agendaGoal" name="agendaGoal" ${isGoal ? 
       'checked' : ''} /> Meta do dia`;
const goalCheckbox = goalLabel.querySelector('#agendaGoal');
allDayCheckbox.addEventListener('change', function () {
if (allDayCheckbox.checked) {
timePicker.style.display = 'none';
durationSelect.style.display = 'none';
durationLabel.style.display = 'none';
} else {
timePicker.style.display = '';
durationSelect.style.display = '';
durationLabel.style.display = '';
goalCheckbox.checked = false;
}
});
goalCheckbox.addEventListener('change', function () {
if (goalCheckbox.checked) {
allDayCheckbox.checked = true;
timePicker.style.display = 'none';
durationSelect.style.display = 'none';
durationLabel.style.display = 'none';
}
});
dateTimeRow.appendChild(datePicker);
dateTimeRow.appendChild(timePicker);
dateTimeRow.appendChild(allDayLabel);
dateTimeRow.appendChild(goalLabel);
r.appendChild(dateTimeRow);
// 3. Duration & Recurrence Row
const durRecRow = el('div');
durRecRow.style.display = 'flex';
durRecRow.style.gap = '10px';
durRecRow.style.alignItems = 'center';
durRecRow.style.flexWrap = 'wrap';
const durationLabel = el('span');
durationLabel.textContent = 'Dura\u00e7\u00e3o:';
durationLabel.style.fontSize = '13px';
durationLabel.style.color = '#9fb3d2';
if (isAllDay) durationLabel.style.display = 'none';
const durationSelect = el('select');
durationSelect.id = 'agendaDuration';
durationSelect.name = 'agendaDuration';
durationSelect.style.border = '1px solid rgba(255, 255, 255, 0.15)';
durationSelect.style.background = 'var(--bg)';
durationSelect.style.color = '#fff';
durationSelect.style.padding = '6px 8px';
durationSelect.style.borderRadius = '6px';
durationSelect.style.fontSize = '14px';
durationSelect.style.cursor = 'pointer';
if (isAllDay) durationSelect.style.display = 'none';
const durations = [
{ val: '15', text: '15 min' },
{ val: '30', text: '30 min' },
{ val: '60', text: '1 hora' },
{ val: '120', text: '2 horas' },
{ val: '180', text: '3 horas' },
{ val: 'custom', text: 'Personalizado...' }
];
durations.forEach(d => {
const opt = el('option');
opt.value = d.val;
opt.textContent = d.text;
durationSelect.appendChild(opt);
});
const customDurationInput = el('input');
customDurationInput.type = 'number';
customDurationInput.id = 'agendaCustomDuration';
customDurationInput.name = 'agendaCustomDuration';
customDurationInput.placeholder = 'Minutos';
customDurationInput.style.border = '1px solid rgba(255, 255, 255, 0.15)';
customDurationInput.style.background = 'var(--bg)';
customDurationInput.style.color = '#fff';
customDurationInput.style.padding = '6px 8px';
customDurationInput.style.borderRadius = '6px';
customDurationInput.style.fontSize = '14px';
customDurationInput.style.width = '80px';
customDurationInput.style.display = 'none';
if (['15', '30', '60', '120', '180'].includes(currentDuration)) {
    durationSelect.value = currentDuration;
} else if (currentDuration) {
    durationSelect.value = 'custom';
    customDurationInput.value = currentDuration;
    customDurationInput.style.display = '';
} else {
    durationSelect.value = '60';
}
durationSelect.addEventListener('change', function () {
    if (durationSelect.value === 'custom') {
        customDurationInput.style.display = '';
    } else {
        customDurationInput.style.display = 'none';
    }
});

durRecRow.appendChild(durationLabel);
durRecRow.appendChild(durationSelect);
durRecRow.appendChild(customDurationInput);
r.appendChild(durRecRow);

// 3.1 Recurrence Row (looks like alertRow)
const recRow = el('div');
recRow.id = 'agendaRecurrenceRow';
recRow.style.display = 'flex';
recRow.style.alignItems = 'center';
recRow.style.justifyContent = 'space-between';
recRow.style.padding = '10px 12px';
recRow.style.background = 'var(--bg)';
recRow.style.border = '1px solid rgba(255, 255, 255, 0.15)';
recRow.style.borderRadius = '8px';
recRow.style.cursor = 'pointer';
recRow.style.marginTop = '6px';
recRow.style.transition = 'background 0.2s';
recRow.onmouseover = () => recRow.style.background = 'color-mix(in srgb, var(--brand) 10%, var(--panel))';
recRow.onmouseout = () => recRow.style.background = 'var(--bg)';

function updateRecurrenceRowSummary() {
    const summaryEl = recRow.querySelector('#agendaRecurrenceSummary');
    if (summaryEl) {
        if (tempRecurrenceValue && tempRecurrenceValue !== 'none') {
            if (tempRecurrenceValue.startsWith('{')) {
                try {
                    const rule = JSON.parse(tempRecurrenceValue);
                    let desc = `Repete a cada ${rule.interval} ${rule.freq === 'daily' ? 'dia(s)' : (rule.freq === 'weekly' ? 'semana(s)' : (rule.freq === 'monthly' ? 'm\u00eas(es)' : 'ano(s)'))}`;
                    if (rule.freq === 'weekly' && rule.days && rule.days.length > 0) {
                        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'S\u00e1b'];
                        const daysStr = rule.days.map(d => dayNames[d]).join(', ');
                        desc += ` (as ${daysStr})`;
                    }
                    summaryEl.textContent = desc;
                } catch(e) {
                    summaryEl.textContent = 'Personalizado';
                }
            } else {
                if (tempRecurrenceValue === 'daily') summaryEl.textContent = 'Todos os dias';
                else if (tempRecurrenceValue === 'weekdays') summaryEl.textContent = 'Dias da semana (segunda a sexta)';
                else if (tempRecurrenceValue === 'weekly') summaryEl.textContent = 'Semanalmente';
                else if (tempRecurrenceValue === 'monthly') summaryEl.textContent = 'Mensalmente';
                else summaryEl.textContent = tempRecurrenceValue;
            }
        } else {
            summaryEl.textContent = 'N\u00e3o se repete';
        }
    }
}

recRow.innerHTML = `
<div style="display: flex; align-items: center; gap: 10px;">
<span style="font-size: 18px;">\ud83d\udd01</span>
<div style="display: flex; flex-direction: column; text-align: left;">
<span style="font-size: 13px; font-weight: bold; color: #fff;">Recorr\u00eancia</span>
<span id="agendaRecurrenceSummary" style="font-size: 12px; color: #9fb3d2;">N\u00e3o se repete</span>
</div>
</div>
<span style="font-size: 14px; color: #9fb3d2;">&#8250;</span>
`;

recRow.onclick = function() {
    openCustomRecurrenceDialog(tempRecurrenceValue !== 'none' ? tempRecurrenceValue : null, function(savedRule) {
        if (savedRule === 'none') {
            tempRecurrenceValue = 'none';
        } else {
            tempRecurrenceValue = JSON.stringify(savedRule);
        }
        updateRecurrenceRowSummary();
    });
};
r.appendChild(recRow);
setTimeout(updateRecurrenceRowSummary, 0);

// 4. Alert Row (Modern UX)
const alertRow = el('div');
alertRow.id = 'agendaAlertRow';
alertRow.style.display = 'flex';
alertRow.style.alignItems = 'center';
alertRow.style.justifyContent = 'space-between';
alertRow.style.padding = '10px 12px';
alertRow.style.background = 'var(--bg)';
alertRow.style.border = '1px solid rgba(255, 255, 255, 0.15)';
alertRow.style.borderRadius = '8px';
alertRow.style.cursor = 'pointer';
alertRow.style.marginTop = '6px';
alertRow.style.transition = 'background 0.2s';
alertRow.onmouseover = () => alertRow.style.background = 'color-mix(in srgb, var(--brand) 10%, var(--panel))';
alertRow.onmouseout = () => alertRow.style.background = 'var(--bg)';
function updateAlertRowSummary() {
const summaryEl = alertRow.querySelector('#agendaAlertSummary');
if (summaryEl) {
if (tempAlertEnabled) {
if (tempAlertValue === 0) {
summaryEl.textContent = 'No hor\u00e1rio do evento';
} else {
summaryEl.textContent = `${tempAlertValue} ${tempAlertUnit} antes`;
}
} else {
summaryEl.textContent = 'Desativado';
}
}
}
alertRow.innerHTML = `
<div style="display: flex; align-items: center; gap: 10px;">
<span style="font-size: 18px;">\ud83d\udd14</span>
<div style="display: flex; flex-direction: column; text-align: left;">
<span style="font-size: 13px; font-weight: bold; color: #fff;">Alerta / 
       Notifica\u00e7\u00e3o</span>
<span id="agendaAlertSummary" style="font-size: 12px; color: 
       #9fb3d2;">Desativado</span>
</div>
</div>
<span style="font-size: 14px; color: #9fb3d2;">&#8250;</span>
`;
alertRow.onclick = function() {
openAlertDialog({
alertEnabled: tempAlertEnabled ? 'true' : 'false',
alertValue: tempAlertValue,
alertUnit: tempAlertUnit
}, function(saved) {
tempAlertEnabled = saved.alertEnabled;
tempAlertValue = saved.alertValue;
tempAlertUnit = saved.alertUnit;
updateAlertRowSummary();
});
};
r.appendChild(alertRow);
setTimeout(updateAlertRowSummary, 0);
// 5. Description Textarea
const descRow = el('div');
descRow.innerHTML = `<textarea id="agendaDescription" name="agendaDescription" 
       placeholder="Adicionar descri\u00e7\u00e3o..." style="width: 100%; min-height: 80px; border: 1px solid rgba(255, 255, 
       255, 0.15); background: var(--bg); color: #fff; border-radius: 6px; padding: 8px; font-size: 14px; resize: 
       vertical; outline: none; font-family: inherit;"></textarea>`;
const descTextarea = descRow.querySelector('#agendaDescription');
descTextarea.value = currentDescription;
descTextarea.addEventListener('focus', () => descTextarea.style.borderColor = 
       'var(--brand)');
descTextarea.addEventListener('blur', () => descTextarea.style.borderColor = 'rgba(255, 255, 255, 0.15)');
r.appendChild(descRow);
return r;
}, function (body, wrap) {
const titleVal = body.querySelector('#agendaTitle').value.trim();
const dateVal = body.querySelector('#agendaDateVal').value;
const timeVal = body.querySelector('#agendaTimeVal').value;
const isAllDayChecked = body.querySelector('#agendaAllDay').checked;
const isGoalChecked = body.querySelector('#agendaGoal').checked;
const recVal = tempRecurrenceValue;
const descVal = body.querySelector('#agendaDescription').value.trim();
const durSelVal = body.querySelector('#agendaDuration').value;
let durVal = durSelVal;
if (durSelVal === 'custom') {
durVal = body.querySelector('#agendaCustomDuration').value.trim();
}
// Recurrence save string
let recurrenceSaveValue = tempRecurrenceValue;
const targetCard = card._originalReference || card;
const txtSpan = targetCard.querySelector('.text');
if (txtSpan) {
txtSpan.textContent = (isGoalChecked ? '\ud83c\udfaf ' : '') + titleVal;
}
targetCard.dataset.description = descVal;
targetCard.dataset.duration = isAllDayChecked ? '' : durVal;
targetCard.dataset.recurrence = recurrenceSaveValue;
targetCard.dataset.alertEnabled = tempAlertEnabled ? 'true' : 'false';
targetCard.dataset.alertValue = tempAlertValue;
targetCard.dataset.alertUnit = tempAlertUnit;
targetCard.dataset.alertFired = 'false'; // Reset fired status on change
if (isGoalChecked) {
targetCard.dataset.when = dateVal + 'TGOAL';
} else if (isAllDayChecked) {
targetCard.dataset.when = dateVal + 'T';
} else {
targetCard.dataset.when = dateVal + 'T' + timeVal;
}
targetCard.dataset.recurrenceParent = '';
paintCard(targetCard);
generateRecurrences(targetCard);
applyFilters();
updateSlotsHasItems();
});
}
function openTimerDialog(cards, onOkCallback) {
if (!cards.length) return;
var modalElements = showModal('Definir Timer (minutos)', function () {
var r = el('div');
var timerVal = Math.round(parseInt(cards[0].dataset.timerTotal || '0', 10) / 60) || '';
r.innerHTML = `<label style="display: block;">Tempo para o timer (em minutos):<input 
       type="number" id="timerInputValue" name="timerInputValue" class="timer-input" placeholder="Ex: 25" 
       value="${timerVal}" style="width:100%; padding:8px; background:var(--bg); border:1px solid rgba(255, 255, 255, 
       0.15); border-radius:8px; color:#fff; margin-top: 4px;"></label>`;
const input = r.querySelector('.timer-input'); if (input) { 
       input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); 
       modalElements.okButton.click(); } }); }
return r;
}, function (r, wrap) {
var timerMins = r.querySelector('.timer-input').value;
cards.forEach(function (c) {
var newTotal = (parseInt(timerMins, 10) || 0) * 60;
c.dataset.timerTotal = newTotal; c.dataset.timerLeft = newTotal; c.dataset.timerState = 
       'stopped';
c.style.animation = ''; c.classList.remove('timer-running', 'timer-finished'); 
       paintCard(c);
});
applyFilters(); updateTotalTimerDisplay(); if (typeof persist === 'function') persist(); if (onOkCallback) onOkCallback();
});
modalElements.cancelButton.onclick = function () { 
       modalElements.wrap.removeEventListener('keydown', modalElements.modalKeyListener); 
       document.body.removeChild(modalElements.wrap); persist(); }
}
function openAnalogTimePicker(initialTime, onSelect) {
// Parse initialTime (format "HH:MM")
let parts = (initialTime || "09:00").split(":");
let currentHour = parseInt(parts[0], 10);
let currentMinute = parseInt(parts[1], 10);
if (isNaN(currentHour) || currentHour < 0 || currentHour > 23) currentHour = 9;
if (isNaN(currentMinute) || currentMinute < 0 || currentMinute > 59) currentMinute = 0;
// State
let activeMode = 'hour'; // 'hour' or 'minute'
let inputMode = 'analog'; // 'analog' or 'keyboard'
// Create backdrop
const backdrop = el('div', 'analog-time-picker-backdrop');
const modal = el('div', 'analog-time-picker-modal');
const title = el('div', 'analog-time-picker-title');
title.textContent = 'Selecionar hor\u00e1rio';
modal.appendChild(title);
// Digital display
const displayRow = el('div', 'analog-time-picker-display');
const hourInput = el('input');
hourInput.type = 'text';
hourInput.id = 'analog-hour-input';
hourInput.value = to2(currentHour);
hourInput.readOnly = true;
hourInput.maxLength = 2;
hourInput.pattern = '[0-9]*';
hourInput.inputMode = 'numeric';
hourInput.classList.add('active');
const colon = el('span');
colon.textContent = ':';
const minuteInput = el('input');
minuteInput.type = 'text';
minuteInput.id = 'analog-minute-input';
minuteInput.value = to2(currentMinute);
minuteInput.readOnly = true;
minuteInput.maxLength = 2;
minuteInput.pattern = '[0-9]*';
minuteInput.inputMode = 'numeric';
displayRow.appendChild(hourInput);
displayRow.appendChild(colon);
displayRow.appendChild(minuteInput);
modal.appendChild(displayRow);
// Face Container
const faceContainer = el('div', 'analog-time-picker-face-container');
modal.appendChild(faceContainer);
// Keyboard input help message (hidden by default)
const keyboardMsg = el('div', 'analog-time-picker-keyboard-input-msg');
keyboardMsg.textContent = 'Digite o hor\u00e1rio desejado nos campos acima.';
keyboardMsg.style.display = 'none';
modal.appendChild(keyboardMsg);
// SVG for needle drawing
const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("class", "analog-time-picker-svg");
faceContainer.appendChild(svg);
// Helper to update SVGNeedle
function updateNeedle(value) {
// Clear existing elements in SVG
svg.innerHTML = '';
let R = 92; // Default outer radius
let angleStep = 30; // 360 / 12
if (activeMode === 'hour') {
R = value < 12 ? 92 : 62;
angleStep = 30;
} else {
R = 92;
angleStep = 6; // 360 / 60
}
const angleDeg = (value * angleStep) - 90;
const angleRad = angleDeg * Math.PI / 180;
const centerX = 115;
const centerY = 115;
const targetX = centerX + R * Math.cos(angleRad);
const targetY = centerY + R * Math.sin(angleRad);
// Create line
const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
line.setAttribute("x1", centerX);
line.setAttribute("y1", centerY);
line.setAttribute("x2", targetX);
line.setAttribute("y2", targetY);
line.setAttribute("stroke", "var(--brand)");
line.setAttribute("stroke-width", "2");
svg.appendChild(line);
// Center pivot circle
const pivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
pivot.setAttribute("cx", centerX);
pivot.setAttribute("cy", centerY);
pivot.setAttribute("r", "4");
pivot.setAttribute("fill", "var(--brand)");
svg.appendChild(pivot);
// End selection circle
const targetCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
targetCircle.setAttribute("cx", targetX);
targetCircle.setAttribute("cy", targetY);
targetCircle.setAttribute("r", "16");
targetCircle.setAttribute("fill", "var(--brand)");
targetCircle.setAttribute("opacity", "0.85");
svg.appendChild(targetCircle);
// Small center dot in target circle
const targetCenter = document.createElementNS("http://www.w3.org/2000/svg", "circle");
targetCenter.setAttribute("cx", targetX);
targetCenter.setAttribute("cy", targetY);
targetCenter.setAttribute("r", "3");
targetCenter.setAttribute("fill", "#fff");
svg.appendChild(targetCenter);
// Highlight selected number HTML element
faceContainer.querySelectorAll('.analog-time-picker-number').forEach(numEl => {
const val = parseInt(numEl.dataset.value, 10);
if (val === value) {
numEl.classList.add('selected');
} else {
numEl.classList.remove('selected');
}
});
}
// Render Clock Face Numbers
function renderFace() {
// Remove existing HTML numbers (keep SVG)
faceContainer.querySelectorAll('.analog-time-picker-number').forEach(el => el.remove());
const centerX = 115;
const centerY = 115;
if (activeMode === 'hour') {
// Outer circle (0-11)
for (let h = 0; h < 12; h++) {
const numEl = el('div', 'analog-time-picker-number');
numEl.textContent = h === 0 ? '0' : h.toString();
numEl.dataset.value = h;
const angle = (h * 30 - 90) * Math.PI / 180;
const x = centerX + 92 * Math.cos(angle) - 14;
const y = centerY + 92 * Math.sin(angle) - 14;
numEl.style.left = x + 'px';
numEl.style.top = y + 'px';
faceContainer.appendChild(numEl);
}
// Inner circle (12-23)
for (let h = 12; h < 24; h++) {
const numEl = el('div', 'analog-time-picker-number');
numEl.textContent = h.toString();
numEl.dataset.value = h;
const angle = ((h - 12) * 30 - 90) * Math.PI / 180;
const x = centerX + 62 * Math.cos(angle) - 14;
const y = centerY + 62 * Math.sin(angle) - 14;
numEl.style.left = x + 'px';
numEl.style.top = y + 'px';
faceContainer.appendChild(numEl);
}
updateNeedle(currentHour);
} else {
// Minutes (0-55, step 5)
for (let m = 0; m < 60; m += 5) {
const numEl = el('div', 'analog-time-picker-number');
numEl.textContent = m === 0 ? '0' : to2(m);
numEl.dataset.value = m;
const angle = ((m / 5) * 30 - 90) * Math.PI / 180;
const x = centerX + 92 * Math.cos(angle) - 14;
const y = centerY + 92 * Math.sin(angle) - 14;
numEl.style.left = x + 'px';
numEl.style.top = y + 'px';
faceContainer.appendChild(numEl);
}
updateNeedle(currentMinute);
}
}
// InTer\u00e7active selection handler from click/touch coordinates
function handlePointer(clientX, clientY, isEnd = false) {
const rect = faceContainer.getBoundingClientRect();
const x = clientX - rect.left - 115;
const y = clientY - rect.top - 115;
let angleRad = Math.atan2(y, x);
let angleDeg = angleRad * 180 / Math.PI + 90;
if (angleDeg < 0) angleDeg += 360;
if (activeMode === 'hour') {
// Determine outer vs inner ring
const dist = Math.sqrt(x*x + y*y);
const isInner = dist < 77; // threshold between 62px and 92px radius (midpoint is 77px)
let hourBase = Math.round(angleDeg / 30) % 12;
let val = isInner ? hourBase + 12 : hourBase;
currentHour = val;
hourInput.value = to2(currentHour);
updateNeedle(currentHour);
if (isEnd) {
// Switch to minutes mode on release
activeMode = 'minute';
hourInput.classList.remove('active');
minuteInput.classList.add('active');
renderFace();
}
} else {
let minVal = Math.round(angleDeg / 6) % 60;
currentMinute = minVal;
minuteInput.value = to2(currentMinute);
updateNeedle(currentMinute);
}
}
// Pointer Events on Face
let isDragging = false;
faceContainer.onpointerdown = (e) => {
e.preventDefault();
isDragging = true;
faceContainer.setPointerCapture(e.pointerId);
handlePointer(e.clientX, e.clientY);
};
faceContainer.onpointermove = (e) => {
if (isDragging) {
e.preventDefault();
handlePointer(e.clientX, e.clientY);
}
};
faceContainer.onpointerup = (e) => {
if (isDragging) {
isDragging = false;
faceContainer.releasePointerCapture(e.pointerId);
handlePointer(e.clientX, e.clientY, true);
}
};
// Click digital displays to toggle modes
hourInput.onclick = () => {
if (inputMode === 'analog') {
activeMode = 'hour';
hourInput.classList.add('active');
minuteInput.classList.remove('active');
renderFace();
}
};
minuteInput.onclick = () => {
if (inputMode === 'analog') {
activeMode = 'minute';
hourInput.classList.remove('active');
minuteInput.classList.add('active');
renderFace();
}
};
// Footer section with Keyboard and OK/Cancel buttons
const footer = el('div', 'analog-time-picker-footer');
const keyboardBtn = el('button', 'analog-time-picker-keyboard-btn');
keyboardBtn.type = 'button';
keyboardBtn.innerHTML = '\u2328\ufe0f'; // Keyboard icon
keyboardBtn.title = 'Digitar hor\u00e1rio';
footer.appendChild(keyboardBtn);
const buttonsDiv = el('div', 'analog-time-picker-buttons');
const cancelBtn = el('button');
cancelBtn.type = 'button';
cancelBtn.textContent = 'Cancelar';
const okBtn = el('button');
okBtn.type = 'button';
okBtn.textContent = 'OK';
buttonsDiv.appendChild(cancelBtn);
buttonsDiv.appendChild(okBtn);
footer.appendChild(buttonsDiv);
modal.appendChild(footer);
backdrop.appendChild(modal);
document.body.appendChild(backdrop);
// Initial face render
renderFace();
// Keyboard Toggle Handler
keyboardBtn.onclick = () => {
if (inputMode === 'analog') {
// Switch to keyboard mode
inputMode = 'keyboard';
                keyboardBtn.innerHTML = '\ud83d\udd52'; // Clock icon
                keyboardBtn.title = 'Usar rel\u00f3gio';
faceContainer.style.display = 'none';
keyboardMsg.style.display = 'block';
hourInput.readOnly = false;
minuteInput.readOnly = false;
hourInput.classList.add('active');
minuteInput.classList.add('active');
hourInput.focus();
hourInput.select();
} else {
// Switch to analog mode
inputMode = 'analog';
                keyboardBtn.innerHTML = '\u2328\ufe0f'; // Keyboard icon
                keyboardBtn.title = 'Digitar hor\u00e1rio';
faceContainer.style.display = 'block';
keyboardMsg.style.display = 'none';
// Parse values currently in inputs, clamp if invalid
let h = parseInt(hourInput.value, 10);
let m = parseInt(minuteInput.value, 10);
if (isNaN(h) || h < 0 || h > 23) h = 9;
if (isNaN(m) || m < 0 || m > 59) m = 0;
currentHour = h;
currentMinute = m;
hourInput.value = to2(currentHour);
minuteInput.value = to2(currentMinute);
hourInput.readOnly = true;
minuteInput.readOnly = true;
activeMode = 'hour';
hourInput.classList.add('active');
minuteInput.classList.remove('active');
renderFace();
}
};
// Limit keyboard entry logic
hourInput.oninput = () => {
hourInput.value = hourInput.value.replace(/[^0-9]/g, '');
let v = parseInt(hourInput.value, 10);
if (hourInput.value.length >= 2) {
if (!isNaN(v)) {
if (v > 23) hourInput.value = '23';
currentHour = parseInt(hourInput.value, 10);
}
minuteInput.focus();
minuteInput.select();
}
};
minuteInput.oninput = () => {
minuteInput.value = minuteInput.value.replace(/[^0-9]/g, '');
let v = parseInt(minuteInput.value, 10);
if (minuteInput.value.length >= 2) {
if (!isNaN(v) && v > 59) {
minuteInput.value = '59';
}
if (!isNaN(v)) {
currentMinute = parseInt(minuteInput.value, 10);
}
}
};
hourInput.onblur = () => {
let v = parseInt(hourInput.value, 10);
if (isNaN(v) || v < 0 || v > 23) v = 9;
currentHour = v;
hourInput.value = to2(currentHour);
};
minuteInput.onblur = () => {
let v = parseInt(minuteInput.value, 10);
if (isNaN(v) || v < 0 || v > 59) v = 0;
currentMinute = v;
minuteInput.value = to2(currentMinute);
};
// OK / Cancel Action Handlers
cancelBtn.onclick = () => {
backdrop.remove();
};
okBtn.onclick = () => {
let h = parseInt(hourInput.value, 10);
let m = parseInt(minuteInput.value, 10);
if (isNaN(h) || h < 0 || h > 23) h = currentHour;
if (isNaN(m) || m < 0 || m > 59) m = currentMinute;
h = Math.min(23, Math.max(0, h));
m = Math.min(59, Math.max(0, m));
const formattedTime = to2(h) + ':' + to2(m);
onSelect(formattedTime);
backdrop.remove();
};
// Close on pressing Escape inside picker
backdrop.addEventListener('keydown', (e) => {
if (e.key === 'Escape') {
e.preventDefault();
cancelBtn.click();
} else if (e.key === 'Enter') {
e.preventDefault();
okBtn.click();
}
});
}



// ==========================================
// AI Deduplication (Find Repeated Cards)
// ==========================================
function findDuplicatesAI() {
    const btn = document.getElementById('aiDeduplicateBtn');
    if(btn) btn.disabled = true;
    showLoading();
    
    // Gather all active cards (not in trash, not completed)
    const activeCards = allCards.filter(c => c.dataset.boardId !== 'board-trash' && c.dataset.completed !== 'true');
    if(activeCards.length < 2) {
        hideLoading();
        if(btn) btn.disabled = false;
        showModal('Sem cartões', function(){ var d=el('div'); d.textContent='Não há cartões suficientes para unificar.'; return d; }, function(){});
        return;
    }
    
    const cardDataList = activeCards.map(c => {
        const text = c.querySelector('.text');
        return { id: c.dataset.id, text: text ? text.textContent.trim() : '' };
    }).filter(c => c.text.length > 0);
    
    const systemPrompt = `Você é um assistente de organização inteligente.
Abaixo está uma lista de tarefas (cartões) em formato JSON.
Sua missão é agrupar os cartões que representam exatamente a mesma tarefa, ou a mesma anotação, feita em dias diferentes ou repetida acidentalmente.
Responda APENAS com um array JSON contendo os grupos de duplicatas.
Exemplo:
[
  { "theme": "Revisar relatório financeiro", "cardIds": ["id1", "id3"] },
  { "theme": "Comprar leite", "cardIds": ["id5", "id9", "id12"] }
]
Se não houver nenhum cartão repetido, retorne []. Não inclua grupos com apenas 1 cartão.`;
    
    const userPrompt = JSON.stringify(cardDataList);
    
    callGemini(systemPrompt, userPrompt).then(response => {
        hideLoading();
        if(btn) btn.disabled = false;
        
        let groups = [];
        try {
            const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
            groups = JSON.parse(jsonStr);
        } catch(e) {
            console.error("Failed to parse dedup JSON", e, response);
            showModal('Erro na IA', function(){ var d=el('div'); d.textContent='A IA não retornou um formato reconhecível.'; return d; }, function(){});
            return;
        }
        
        if (!groups || groups.length === 0) {
            showModal('Tudo Limpo!', function(){ var d=el('div'); d.textContent='A IA não encontrou nenhum cartão repetido! Seu quadro está limpo.'; return d; }, function(){});
            return;
        }
        
        showModal('Unificar Repetidos (IA)', function() {
            var wrap = el('div');
            wrap.style.display = 'flex';
            wrap.style.flexDirection = 'column';
            wrap.style.gap = '15px';
            wrap.style.maxHeight = '400px';
            wrap.style.overflowY = 'auto';
            wrap.style.textAlign = 'left';
            
            var intro = el('div');
            intro.innerHTML = 'A IA detectou <b>' + groups.length + '</b> temas repetidos. Selecione quais cartões você deseja <b>MANTAR</b> (os outros do grupo serão excluídos).';
            intro.style.fontSize = '14px';
            intro.style.color = 'var(--muted)';
            wrap.appendChild(intro);
            
            groups.forEach((g, gIdx) => {
                var groupCont = el('div');
                groupCont.style.background = 'var(--panel)';
                groupCont.style.border = '1px solid rgba(255,255,255,0.1)';
                groupCont.style.borderRadius = '8px';
                groupCont.style.padding = '12px';
                
                var gTitle = el('strong');
                gTitle.textContent = g.theme;
                gTitle.style.display = 'block';
                gTitle.style.marginBottom = '10px';
                groupCont.appendChild(gTitle);
                
                g.cardIds.forEach((id, idx) => {
                    const cInfo = cardDataList.find(c => c.id === id);
                    if (!cInfo) return;
                    
                    var row = el('label');
                    row.style.display = 'flex';
                    row.style.alignItems = 'center';
                    row.style.gap = '8px';
                    row.style.padding = '6px';
                    row.style.background = 'var(--card)';
                    row.style.borderRadius = '4px';
                    row.style.marginBottom = '4px';
                    row.style.cursor = 'pointer';
                    
                    var rBtn = el('input');
                    rBtn.type = 'radio';
                    rBtn.name = 'keepGroup_' + gIdx;
                    rBtn.value = id;
                    if (idx === 0) rBtn.checked = true;
                    
                    var txt = el('span');
                    txt.textContent = cInfo.text;
                    txt.style.fontSize = '13px';
                    
                    row.appendChild(rBtn);
                    row.appendChild(txt);
                    groupCont.appendChild(row);
                });
                
                // Opção para não unificar este grupo
                var rowSkip = el('label');
                rowSkip.style.display = 'flex';
                rowSkip.style.alignItems = 'center';
                rowSkip.style.gap = '8px';
                rowSkip.style.padding = '6px';
                rowSkip.style.cursor = 'pointer';
                rowSkip.style.color = 'var(--muted)';
                rowSkip.style.fontSize = '12px';
                
                var rBtnSkip = el('input');
                rBtnSkip.type = 'radio';
                rBtnSkip.name = 'keepGroup_' + gIdx;
                rBtnSkip.value = 'skip';
                
                var txtSkip = el('span');
                txtSkip.textContent = 'Manter todos (Ignorar este grupo)';
                
                rowSkip.appendChild(rBtnSkip);
                rowSkip.appendChild(txtSkip);
                groupCont.appendChild(rowSkip);
                
                wrap.appendChild(groupCont);
            });
            
            wrap._groups = groups;
            return wrap;
        }, function(body, wrap) {
            let removedCount = 0;
            body._groups.forEach((g, gIdx) => {
                const keepRadio = body.querySelector('input[name="keepGroup_' + gIdx + '"]:checked');
                if (keepRadio && keepRadio.value !== 'skip') {
                    const keepId = keepRadio.value;
                    g.cardIds.forEach(id => {
                        if (id !== keepId) {
                            const cardDOM = document.querySelector('.card[data-id="' + id + '"]');
                            if (cardDOM) {
                                removeCard(cardDOM, true);
                                removedCount++;
                            }
                        }
                    });
                }
            });
            if(removedCount > 0) persist();
        });
        
    }).catch(err => {
        hideLoading();
        if(btn) btn.disabled = false;
        console.error("AI Dedup failed", err);
    });
}

