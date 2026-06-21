$filePath = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$encoding = New-Object System.Text.UTF8Encoding($false) # UTF-8 without BOM

# Load file content using UTF-8
$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# 1. Update THEMES (Azul Padrão rename & Branco-Gelo add)
$oldThemesPattern = "'#1976d2':\s*\{\s*name:\s*'Azul\s*\(Padr[ãa]o\)',\s*brand:\s*'#1976d2',\s*bg:\s*'#0f1a2a',\s*panel:\s*'#0f223d',\s*card:\s*'#112b4a',\s*text:\s*'#e9f1ff'\s*\},"
$newThemesReplacement = "'#1976d2': { name: 'Azul Padrão', brand: '#1976d2', bg: '#0f1a2a', panel: '#0f223d', card: '#112b4a', text: '#e9f1ff' },`r`n                '#e2e8f0': { name: 'Branco-Gelo', brand: '#e2e8f0', bg: '#0b0f19', panel: '#151e2c', card: '#1d273a', text: '#f1f5f9' },"
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldThemesPattern, $newThemesReplacement)
Write-Output "Applied themes replace."

# 2. Context Menu HTML for list
$oldListHtmlPattern = "(?s)<div id=""ctx-list"" class=""ctx"">.*?</div>"
$newListHtml = @'
    <div id="ctx-list" class="ctx">
        <button data-action="list-del">🗑️ Excluir lista</button>
        <button data-action="list-del-all">🗑️ Excluir TODOS desta Lista</button>
        <button data-action="list-move-all">➡️ Mover TODOS desta Lista</button>
        <div class="ctx-sub" id="ctx-list-move-sub"></div>
        <button data-action="list-move-board">➡️ Mover LISTA para outro quadro</button>
        <div class="ctx-sub" id="ctx-list-move-board-sub"></div>
    </div>
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldListHtmlPattern, $newListHtml)
Write-Output "Applied list context menu HTML replace."

# 3. Context menu variables & isInitialized global variables
$oldVarsPattern = "var listCtxTarget = null;\s*var listCtx = document\.getElementById\('ctx-list'\);\s*var listMoveSub = document\.getElementById\('ctx-list-move-sub'\);"
$newVars = "var listCtxTarget = null; var listCtx = document.getElementById('ctx-list'); var listMoveSub = document.getElementById('ctx-list-move-sub');`r`n            var listMoveBoardSub = document.getElementById('ctx-list-move-board-sub');`r`n            var isInitialized = false;`r`n            var __isRendering = false;"
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldVarsPattern, $newVars)
Write-Output "Applied list context menu variables replace."

# 4. List movement helper functions in JS
$oldListMoveFuncsPattern = "(?s)function showListCtx\(x, y, list\)\s*\{\s*listCtxTarget = list;.*?function buildListMoveSub\(\)\s*\{"
$newListMoveFuncs = @'
            function showListCtx(x, y, list) { listCtxTarget = list; buildListMoveSub(); buildListMoveBoardSub(); listMoveSub.style.display = 'none'; listMoveBoardSub.style.display = 'none'; listCtx.style.display = 'block'; var r = listCtx.getBoundingClientRect(); listCtx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px'; listCtx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px'; }
            function buildListMoveBoardSub() {
                listMoveBoardSub.innerHTML = '';
                if (!listCtxTarget) return;
                boardsMeta.forEach(function (board) {
                    if (board.id === 'board-todos' || board.id === 'board-trash' || board.id === currentBoardId) return;
                    var btn = document.createElement('button');
                    btn.textContent = board.name;
                    btn.style.width = '100%';
                    btn.style.textAlign = 'left';
                    btn.style.display = 'block';
                    btn.style.background = 'transparent';
                    btn.style.border = 'none';
                    btn.style.color = 'white';
                    btn.style.padding = '8px 12px';
                    btn.style.cursor = 'pointer';
                    btn.addEventListener('click', function () {
                        moveListToBoard(listCtxTarget, board.id);
                        listCtx.style.display = 'none';
                    });
                    listMoveBoardSub.appendChild(btn);
                });
            }
            function moveListToBoard(listElement, targetBoardId) {
                if (!listElement) return;
                var listTitle = listElement.querySelector('.title').value;
                var targetBoard = boardsMeta.find(b => b.id === targetBoardId);
                var targetBoardName = targetBoard ? targetBoard.name : targetBoardId;

                showConfirm(`Deseja mover a lista "${listTitle}" e todos os seus cartões para o quadro "${targetBoardName}"?`, function() {
                    var cardsData = $$('.card', listElement).map(c => {
                        var cardData = cardToData(c);
                        cardData.boardId = targetBoardId;
                        return cardData;
                    });

                    var targetData = [];
                    var targetLocalStr = localStorage.getItem(LS_BOARD_PREFIX + targetBoardId);
                    if (targetLocalStr) {
                        try { targetData = JSON.parse(targetLocalStr); } catch (e) { targetData = []; }
                    }

                    var targetList = targetData.find(l => l.type === 'kanban' && l.title === listTitle);
                    if (targetList) {
                        if (!targetList.cards) targetList.cards = [];
                        targetList.cards = targetList.cards.concat(cardsData);
                    } else {
                        targetData.push({
                            type: 'kanban',
                            title: listTitle,
                            cards: cardsData,
                            boardId: targetBoardId
                        });
                    }

                    localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetData));
                    if (isFirebaseReady && auth && auth.currentUser) {
                        db.ref('users/' + auth.currentUser.uid + '/boards/' + targetBoardId).set(targetData);
                    }

                    listElement.remove();
                    persist();

                    if (targetBoard) {
                        targetBoard.lastModified = Date.now();
                        saveBoardsMetadata();
                    }

                    showToast(`Lista "${listTitle}" movida para o quadro "${targetBoardName}"`);
                });
            }
            function buildListMoveSub() {
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldListMoveFuncsPattern, $newListMoveFuncs)
Write-Output "Applied list movement functions replace."

# 5. ListCtx click listener
$oldListCtxListenerPattern = "(?s)listCtx\.addEventListener\('click',\s*function\s*\(e\)\s*\{\s*var b = e\.target\.closest\('button'\);.*?listCtx\.style\.display = 'none';\s*\}\);"
$newListCtxListener = @'
            listCtx.addEventListener('click', function (e) {
                var b = e.target.closest('button');
                if (!b) return;
                var action = b.dataset.action;
                if (action === 'list-move-all') {
                    listMoveSub.style.display = (listMoveSub.style.display === 'block' ? 'none' : 'block');
                    listMoveBoardSub.style.display = 'none';
                    return;
                }
                if (action === 'list-move-board') {
                    listMoveBoardSub.style.display = (listMoveBoardSub.style.display === 'block' ? 'none' : 'block');
                    listMoveSub.style.display = 'none';
                    return;
                }
                if (action === 'list-del' && listCtxTarget) {
                    showConfirm('Excluir a lista inteira?', function () {
                        listCtxTarget.remove();
                        persist();
                    });
                }
                if (action === 'list-del-all' && listCtxTarget) {
                    showConfirm('Deseja excluir TODOS os cartões desta lista?', function () {
                        var cs = listCtxTarget.querySelector('.cards');
                        if (cs) {
                            cs.innerHTML = '';
                            persist();
                        }
                    });
                }
                listCtx.style.display = 'none';
            });
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldListCtxListenerPattern, $newListCtxListener)
Write-Output "Applied listCtx click listener replace."

# 6. Card Tooltips inside paintCard
$oldPaintTooltipPattern = "(?s)updateTimerDisplay\(c\);\s*\}\s*function createCard\(data\) \{"
$newPaintTooltip = @'
                // Card Tooltips inside board-todos
                if (currentBoardId === 'board-todos' && c.dataset.boardId) {
                    const originBoard = boardsMeta.find(b => b.id === c.dataset.boardId);
                    if (originBoard) {
                        c.setAttribute('title', 'Quadro: ' + originBoard.name);
                    } else {
                        c.removeAttribute('title');
                    }
                } else {
                    c.removeAttribute('title');
                }
                updateTimerDisplay(c);
            }

            function createCard(data) {
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldPaintTooltipPattern, $newPaintTooltip)
Write-Output "Applied card tooltip replace."

# 7. Sort Boards Select in updateBoardSelectUI
$oldSelectUiPattern = "(?s)function updateBoardSelectUI\(\)\s*\{.*?select\.appendChild\(opt\);\s*\}\);\s*\}"
$newSelectUi = @'
            function updateBoardSelectUI() {
                const select = document.getElementById('boardSelect');
                if (!select) return;

                select.innerHTML = '';
                const sorted = [...boardsMeta].sort((a, b) => {
                    if (a.id === 'board-todos') return -1;
                    if (b.id === 'board-todos') return 1;
                    if (a.id === 'board-trash') return 1;
                    if (b.id === 'board-trash') return -1;
                    return a.name.localeCompare(b.name, 'pt-BR');
                });
                sorted.forEach(b => {
                    const opt = document.createElement('option');
                    opt.value = b.id;
                    opt.textContent = b.name;
                    if (b.id === currentBoardId) opt.selected = true;
                    select.appendChild(opt);
                });
            }
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldSelectUiPattern, $newSelectUi)
Write-Output "Applied updateBoardSelectUI replace."

# 8. Voice command actions in executeAiActions
$oldAiAgendaCase = "                            case 'COPY_PASTE_AGENDA':"
$newAiAgendaCase = @'
                            case 'DELETE_LIST':
                                if (action.listTitle) {
                                    const listEl = $$('.list[data-type="kanban"]', boardEl).find(l => l.querySelector('.title').value.toLowerCase().trim() === action.listTitle.toLowerCase().trim());
                                    if (listEl) {
                                        listEl.remove();
                                        persist();
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
                                        removeCard(c, true);
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
                                        c.parentNode.insertBefore(newCard, c.nextSibling);
                                        persist();
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
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldAiAgendaCase, $newAiAgendaCase)
Write-Output "Applied executeAiActions replace."

# 9. showToast, startCardTimer, pauseCardTimer, cleanupCorruptedMetadata, and initApp replacements
$oldInitAppPattern = "(?s)function initApp\(\)\s*\{.*?switchBoard\(currentBoardId\);.*?\}\s*\}"
$newInitApp = @'
            function showToast(message, type = 'success') {
                const toast = document.createElement('div');
                toast.textContent = message;
                toast.style.position = 'fixed';
                toast.style.bottom = '20px';
                toast.style.left = '50%';
                toast.style.transform = 'translateX(-50%)';
                toast.style.background = type === 'error' ? '#ef5350' : '#28a745';
                toast.style.color = 'white';
                toast.style.padding = '10px 20px';
                toast.style.borderRadius = '8px';
                toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                toast.style.zIndex = '99999';
                toast.style.fontFamily = 'system-ui, sans-serif';
                toast.style.fontSize = '14px';
                toast.style.fontWeight = '500';
                toast.style.pointerEvents = 'none';
                toast.style.transition = 'opacity 0.3s, transform 0.3s';
                document.body.appendChild(toast);
                setTimeout(() => {
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateX(-50%) translateY(10px)';
                    setTimeout(() => toast.remove(), 300);
                }, 3000);
            }

            function startCardTimer(c) {
                var state = c.dataset.timerState || 'stopped';
                var total = parseInt(c.dataset.timerTotal || '0', 10);
                if (total === 0) return;
                c.dataset.timerState = 'running';
                var left = parseInt(c.dataset.timerLeft, 10);
                if (state === 'finished' || isNaN(left) || left <= 0) left = total;
                c.dataset.timerEnd = Date.now() + left * 1000;
                c.style.animation = '';
                startGlobalTimer();
                updateTimerDisplay(c);
                persist();
            }

            function pauseCardTimer(c) {
                var state = c.dataset.timerState || 'stopped';
                if (state !== 'running') return;
                c.dataset.timerState = 'paused';
                var now = Date.now();
                var end = parseInt(c.dataset.timerEnd, 10);
                c.dataset.timerLeft = Math.round((end - now) / 1000);
                updateTimerDisplay(c);
                persist();
            }

            function cleanupCorruptedMetadata() {
                let updated = false;
                if (Array.isArray(boardsMeta)) {
                    boardsMeta.forEach(b => {
                        const originalName = b.name;
                        const lower = originalName.toLowerCase();
                        if (lower.includes('todos')) b.name = 'TODOS 📋';
                        else if (lower.includes('bot conversa')) b.name = 'BOT CONVERSA 🤖';
                        else if (lower.includes('cekm')) b.name = 'CEKM 🥋';
                        else if (lower.includes('quadro principal')) b.name = 'Quadro principal 🛠️';
                        else if (lower.includes('casa arrumar')) b.name = 'CASA ARRUMAR 🏠';
                        else if (lower.includes('tea timmer') || lower.includes('tea timer')) b.name = 'TEA TIMMER ⏱️';
                        else if (lower.includes('tcdf')) b.name = 'TCDF 📚';
                        else if (lower.includes('semana padrao') || lower.includes('semana padrão')) b.name = 'SEMANA PADRAO 📅';
                        else if (lower.includes('lixeira')) b.name = 'Lixeira 🗑️';

                        if (b.name === originalName) {
                            b.name = b.name.replace(/[?]+/g, '').trim();
                        }
                        if (b.name !== originalName) {
                            updated = true;
                            b.lastModified = Date.now();
                        }
                    });
                }
                boardsMeta.forEach(b => {
                    const localKey = LS_BOARD_PREFIX + b.id;
                    const dataStr = localStorage.getItem(localKey);
                    if (dataStr) {
                        try {
                            let boardData = JSON.parse(dataStr);
                            let boardUpdated = false;
                            if (Array.isArray(boardData)) {
                                boardData.forEach(list => {
                                    if (list.title) {
                                        const cleanTitle = list.title.replace(/[?]+/g, '').trim();
                                        if (cleanTitle !== list.title) {
                                            list.title = cleanTitle;
                                            boardUpdated = true;
                                        }
                                    }
                                });
                            }
                            if (boardUpdated) {
                                localStorage.setItem(localKey, JSON.stringify(boardData));
                                if (isFirebaseReady && auth && auth.currentUser) {
                                    db.ref('users/' + auth.currentUser.uid + '/boards/' + b.id).set(boardData);
                                }
                                updated = true;
                            }
                        } catch (e) {
                            console.error("Error migrating lists for board " + b.id, e);
                        }
                    }
                });
                if (updated) {
                    saveBoardsMetadata(true);
                    console.log("Database metadata successfully cleaned of encoding corruption.");
                }
            }

            function initApp() {
                initResizers();
                applyDragScroll();
                loadState();
                migrateToMultiBoard();
                cleanupCorruptedMetadata();
                initAiControls();
                if (currentBoardId) { switchBoard(currentBoardId); } else { ensureMatrix(); ensureSchedule(false); initDemo(); }
                isInitialized = true;
            }
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldInitAppPattern, $newInitApp)
Write-Output "Applied initApp and helpers replace."

# 10. Update saveImmediately to add initialization and rendering guards
$oldSaveImmediatelyPattern = "(?s)function saveImmediately\(\)\s*\{.*?if \(__muteHistory > 0\) return;\s*try \{"
$newSaveImmediately = @'
            function saveImmediately() {
                if (__persistTick) {
                    clearTimeout(__persistTick);
                    __persistTick = null;
                }
                if (__muteHistory > 0) return;
                if (!isInitialized) return;
                if (!currentBoardId || currentBoardId === 'undefined') return;
                if (__isRendering) return;
                try {
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldSaveImmediatelyPattern, $newSaveImmediately)
Write-Output "Applied saveImmediately lock replace."

# 11. loadAndRenderAll updates to wrap with __isRendering lock
$oldLoadAndRenderAllPattern = "(?s)function loadAndRenderAll\(\)\s*\{"
$newLoadAndRenderAll = @'
            function loadAndRenderAll() {
                if (__isRendering) return;
                __isRendering = true;
                try {
                    loadAndRenderAllInner();
                } finally {
                    __isRendering = false;
                }
            }
            function loadAndRenderAllInner() {
'@
$content = [System.Text.RegularExpressions.Regex]::Replace($content, $oldLoadAndRenderAllPattern, $newLoadAndRenderAll)
Write-Output "Applied loadAndRenderAll rendering lock replace."

# Write output file in UTF-8
[System.IO.File]::WriteAllText($filePath, $content, $encoding)
Write-Output "All modifications successfully written to index.html using robust regex replaces."
