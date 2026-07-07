// ===== Helpers =====
function el(t, c) { var n = document.createElement(t); if (c) n.className = c; return n; }
// [REVIEW v8] Sanitizacao oficial: TODO dado que nao nasceu no codigo
// (texto de cartao, backup importado, resposta de IA) passa por aqui
// antes de entrar em innerHTML. Caminho preferido continua textContent.
function escapeHtml(v) {
    return String(v == null ? '' : v)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function $$(s, r) { if (!r) r = document; return Array.prototype.slice.call(r.querySelectorAll(s)); }
function to2(n) { return (n < 10 ? '0' + n : '' + n); }
function formatSecondsToTime(totalSeconds) {
    if (totalSeconds <= 0) return '0:00 min';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours > 0 ? hours + ':' : ''}${to2(minutes)} min`;
}

// ===== CONFIG & STATE =====
var LS_KEY = 'mini-trello-restore';
var LS_LABELS_KEY = 'tea-planner-labels';
var LS_QUICK_CONFIG_KEY = 'tea-planner-quick-config';

// New Multi-Board Keys
var LS_BOARDS_META = 'tea-planner-boards-meta';
var LS_CURRENT_BOARD = 'tea-planner-current-board-id';
var LS_BOARD_PREFIX = 'tea-planner-board-';
var LS_GLOBAL_AGENDA = 'tea-planner-global-agenda'; // NOVA CHAVE PARA AGENDA UNIFICADA

var currentBoardId = null;
var boardsMeta = [];
var DEFAULT_THEME_COLOR = '#1976d2';

var __persistTick = null, __muteHistory = 0;
function withMute(fn) { __muteHistory++; try { return fn(); } finally { __muteHistory--; } }

// FUNÇÃO DE ÁUDIO (Beep) para o Timer
function playBeep() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioCtx.currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) { console.warn("Áudio bloqueado", e); }
}

var boardEl = document.getElementById('board');
var schedule = document.getElementById('schedule');
var slotsRoot = document.getElementById('slots');
var matrixEl = document.getElementById('matrix');
var sumTimersDisplay = document.getElementById('sumTimersDisplay');
var allCards = [];
var globalTimerInterval = null;
var selected = new Set();
var isSelectionMode = false;
var lastMouseX = 0, lastMouseY = 0;
var agendaClipboard = [];
var appClipboard = []; // Para Copiar/Colar cartões


// ===== MARQUEE SELECTION LOGIC =====
let marqueeStart = null;
const marqueeEl = document.getElementById('marquee');

document.addEventListener('mousedown', (e) => {
    // Só inicia marquee se clicar no fundo (não em botões, inputs ou cards)
    if (e.target.closest('.card') || e.target.closest('button') || e.target.closest('input') || e.target.closest('.ctx') || e.target.closest('.modal')) return;
    if (e.button !== 0) return; // Só botão esquerdo

    // Se não segurar Ctrl/Shift, limpa seleção anterior
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
        clearSelection();
    }

    marqueeStart = { x: e.clientX, y: e.clientY };
});

function updateMarquee(e) {
    if (!marqueeStart) return;

    const x1 = marqueeStart.x;
    const y1 = marqueeStart.y;
    const x2 = e.clientX;
    const y2 = e.clientY;

    const left = Math.min(x1, x2);
    const top = Math.min(y1, y2);
    const width = Math.abs(x1 - x2);
    const height = Math.abs(y1 - y2);

    if (width > 5 || height > 5) { // Evita micro-movimentos
        marqueeEl.style.display = 'block';
        marqueeEl.style.left = left + 'px';
        marqueeEl.style.top = top + 'px';
        marqueeEl.style.width = width + 'px';
        marqueeEl.style.height = height + 'px';

        selectCardsInBox(left, top, width, height);
    }
}

document.addEventListener('mouseup', () => {
    marqueeStart = null;
    marqueeEl.style.display = 'none';
});

function selectCardsInBox(l, t, w, h) {
    allCards.forEach(card => {
        const r = card.getBoundingClientRect();
        // Verifica intersecção
        const inBox = !(r.left > l + w || r.right < l || r.top > t + h || r.bottom < t);
        
        if (inBox) {
            if (!selected.has(card)) addSelection(card);
        } else if (!window._tempSelection?.has(card)) {
            // Se não estava selecionado antes do início do marquee, remove
            // Mas aqui simplificamos: o marquee ADICIONA à seleção se segurar Ctrl, 
            // ou redefine se não segurar.
        }
    });
}


// FUNÇÃO IMPORTANTE: Separa o que é do Quadro do que é da Agenda Global
function syncAllCardsOrderFromDOM() {
    const domCards = Array.from(document.querySelectorAll('.card:not(.mirror-card)'));
    if (domCards.length === 0) return;
    const domCardSet = new Set(domCards);
    const nonDomCards = allCards.filter(c => !domCardSet.has(c));
    allCards = [...domCards, ...nonDomCards];
}

// FUNCAO IMPORTANTE: Separa o que e do Quadro do que e da Agenda Global
function serializeAndSeparate() {
    syncAllCardsOrderFromDOM();
    var boardData = [];
    var agendaData = [];

    // 1. Kanban Lists (Sempre do Quadro)
    $$('.list[data-type="kanban"]', boardEl).forEach(function (l) {
        const title = l.querySelector('.title').value;
        const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === c)).filter(Boolean).map(cardToData);
        boardData.push({ type: 'kanban', title: title, cards: cardsInList, boardId: l.dataset.boardId || '' });
    });

    // 2. Matrix Lists (Sempre do Quadro)
    if (matrixEl) {
        $$('.list[data-type="quad"]', matrixEl).forEach(function (l) {
            const quad = l.dataset.quad;
            const cardsInList = $$('.card', l).map(c => allCards.find(cacheCard => cacheCard === c)).filter(Boolean).map(cardToData);
            boardData.push({ type: 'quad', quad: quad, cards: cardsInList });
        });
    }

    // 3. Agenda & Objetivos & Unscheduled (Sempre Global)
    // Vamos procurar em allCards tudo que tem 'when' definido
    // Isso pega tanto o que está nos slots visuais quanto o que pode ter se perdido
    const globalCards = allCards.filter(c => c.dataset.when && c.dataset.when.length > 0);

    // Agrupar para salvar bonito, mas na real salvamos uma lista flat de "scheduled items" seria melhor.
    // Mas para manter compatibilidade com a estrutura antiga:

    // Goal
    const goalCards = globalCards.filter(c => c.dataset.when.endsWith('TGOAL')).map(cardToData);
    if (goalCards.length > 0) agendaData.push({ type: 'goal', goal: true, cards: goalCards });

    // Time Slots
    const timeCardsMap = {};
    globalCards.filter(c => /T\d{2}:\d{2}$/.test(c.dataset.when)).forEach(c => {
        const time = c.dataset.when.substring(11); // Pega HH:MM
        if (!timeCardsMap[time]) timeCardsMap[time] = [];
        timeCardsMap[time].push(cardToData(c));
    });
    for (const t in timeCardsMap) {
        agendaData.push({ type: 'time', time: t, cards: timeCardsMap[t] });
    }
    // Unscheduled (A definir)
    const unscheduledCards = globalCards.filter(c => c.dataset.when.endsWith('T')).map(cardToData);
    if (unscheduledCards.length > 0) {
        agendaData.push({ type: 'unscheduled', cards: unscheduledCards });
    }

    return { boardData, agendaData };
}

function exportBackup() {
    const backupData = {
        version: '2.0',
        boardsMeta: boardsMeta,
        globalAgenda: JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || '[]'),
        boards: {}
    };
    boardsMeta.forEach(b => {
        backupData.boards[b.id] = JSON.parse(localStorage.getItem(LS_BOARD_PREFIX + b.id) || '[]');
    });
    
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    // Get user name for backup filename (with fallback)
    let userName = 'Usuario';
    if (isFirebaseReady && auth && auth.currentUser) {
        userName = auth.currentUser.displayName || auth.currentUser.email || 'Usuario';
    }
    
    // Clean user name for filename
    const cleanName = userName.replace(/[^a-zA-Z0-9\s-_]/g, '').trim();
    const filename = `${cleanName} ${year}${month}${day}-${hours}${minutes}.json`;
    
    const a = document.createElement('a');
    a.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    a.download = filename;
    a.click();
}

function importBackup(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.version === '2.0' && data.boardsMeta && data.boards) {
                showConfirm('Isso substituirá todos os seus quadros e agenda atuais. Deseja continuar?', function() {
                    localStorage.setItem(LS_BOARDS_META, JSON.stringify(data.boardsMeta));
                    localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(data.globalAgenda || []));
                    Object.keys(data.boards).forEach(boardId => {
                        localStorage.setItem(LS_BOARD_PREFIX + boardId, JSON.stringify(data.boards[boardId]));
                    });
                    
                    let newCurrentId = localStorage.getItem(LS_CURRENT_BOARD);
                    if (!data.boardsMeta.find(b => b.id === newCurrentId)) {
                        if (data.boardsMeta.length > 0) newCurrentId = data.boardsMeta[0].id;
                    }
                    localStorage.setItem(LS_CURRENT_BOARD, newCurrentId);
                    
                    // Se o Firebase estiver pronto e o usuário logado, salva na nuvem antes de recarregar
                    if (isFirebaseReady && auth && auth.currentUser) {
                        const uid = auth.currentUser.uid;
                        const promises = [];
                        
                        promises.push(db.ref('users/' + uid + '/meta').set(data.boardsMeta));
                        promises.push(db.ref('users/' + uid + '/global/agenda').set(data.globalAgenda || []));
                        Object.keys(data.boards).forEach(boardId => {
                            promises.push(db.ref('users/' + uid + '/boards/' + boardId).set(data.boards[boardId]));
                        });
                        
                        // Adiciona um overlay visual de loading
                        const overlay = document.createElement('div');
                        overlay.style.position = 'fixed';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100vw';
                        overlay.style.height = '100vh';
                        overlay.style.background = 'rgba(0,0,0,0.7)';
                        overlay.style.color = '#fff';
                        overlay.style.display = 'flex';
                        overlay.style.alignItems = 'center';
                        overlay.style.justifyContent = 'center';
                        overlay.style.fontSize = '24px';
                        overlay.style.zIndex = '99999';
                        overlay.innerText = 'Sincronizando com a nuvem... Por favor aguarde.';
                        document.body.appendChild(overlay);
                        
                        Promise.all(promises)
                            .then(() => {
                                document.body.removeChild(overlay);
                                alert('Backup restaurado com sucesso e sincronizado na nuvem!');
                                window.location.reload();
                            })
                            .catch(err => {
                                document.body.removeChild(overlay);
                                console.error("Erro ao sincronizar backup com o Firebase:", err);
                                alert('O backup foi restaurado localmente, mas falhou ao enviar para a nuvem: ' + err.message);
                                window.location.reload();
                            });
                    } else {
                        alert('Backup restaurado com sucesso!');
                        window.location.reload();
                    }
                });
            } else {
                showConfirm('Detectado formato de backup de quadro único. Deseja mesclar com o quadro ativo?', function() {
                    const dataToRestore = Array.isArray(data.data) ? data.data : data;
                    if (!Array.isArray(dataToRestore)) {
                        throw new Error("Formato inválido.");
                    }
                    
                    const boardData = dataToRestore.filter(d => d.type === 'kanban' || d.type === 'quad');
                    const agendaData = dataToRestore.filter(d => d.type === 'time' || d.type === 'goal' || d.type === 'unscheduled');
                    
                    localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, JSON.stringify(boardData));
                    let mergedAgenda = [];
                    if (agendaData.length > 0) {
                        const currentAgenda = JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || '[]');
                        mergedAgenda = currentAgenda.concat(agendaData);
                        localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(mergedAgenda));
                    }
                    
                    // Se o Firebase estiver pronto e o usuário logado, salva na nuvem antes de recarregar
                    if (isFirebaseReady && auth && auth.currentUser) {
                        const uid = auth.currentUser.uid;
                        const promises = [];
                        
                        promises.push(db.ref('users/' + uid + '/boards/' + currentBoardId).set(boardData));
                        if (agendaData.length > 0) {
                            promises.push(db.ref('users/' + uid + '/global/agenda').set(mergedAgenda));
                        }
                        
                        Promise.all(promises)
                            .then(() => {
                                alert('Quadro importado com sucesso e sincronizado na nuvem!');
                                window.location.reload();
                            })
                            .catch(err => {
                                console.error("Erro ao sincronizar quadro único:", err);
                                alert('Quadro importado localmente, mas falhou ao enviar para a nuvem: ' + err.message);
                                window.location.reload();
                            });
                    } else {
                        alert('Quadro importado com sucesso!');
                        window.location.reload();
                    }
                });
            }
        } catch (err) {
            alert('Erro ao importar backup: ' + err.message);
        }
    };
    reader.readAsText(file);
}

var HIST_LIMIT = 120; var hist = [], cursor = -1;
function pushHistory(snap) {
    // Snap agora é um objeto { boardData, agendaData }
    hist = hist.slice(0, cursor + 1); hist.push(snap);
    if (hist.length > HIST_LIMIT) { hist.shift(); } cursor = hist.length - 1; updateUndoUi();
}
function capture() {
    if (__muteHistory > 0) return;
    try { pushHistory(serializeAndSeparate()); } catch (e) { }
}
function canUndo() { return cursor > 0; }
function canRedo() { return cursor >= 0 && cursor < hist.length - 1; }
function updateUndoUi() {
    const undoBtn = document.getElementById('undo');
    const redoBtn = document.getElementById('redo');
    if (undoBtn) undoBtn.disabled = !canUndo();
    if (redoBtn) redoBtn.disabled = !canRedo();
}
function doUndo() { if (!canUndo()) return; withMute(function () { cursor--; restore(hist[cursor]); }); updateUndoUi(); }
function doRedo() { if (!canRedo()) return; withMute(function () { cursor++; restore(hist[cursor]); }); updateUndoUi(); }

// Função unificada para carregar tudo
function loadAndRenderAll() {
    let boardData = [];
    let agendaData = [];

    if (currentBoardId === 'board-todos') {
        // Aggregate all boards except trash and board-todos itself
        let mergedKanbanLists = [];
        let mergedQuadLists = { Q1: [], Q2: [], Q3: [], Q4: [] };

        boardsMeta.forEach(b => {
            if (b.id === 'board-trash' || b.id === 'board-todos') return;
            let bData = [];
            try {
                const bStr = localStorage.getItem(LS_BOARD_PREFIX + b.id);
                if (bStr) bData = JSON.parse(bStr);
            } catch (e) { console.error("Error load board", b.id, e); }

            bData.forEach(list => {
                if (list.type === 'kanban') {
                    let targetList = mergedKanbanLists.find(l => l.title.toLowerCase().trim() === list.title.toLowerCase().trim());
                    if (!targetList) {
                        targetList = { type: 'kanban', title: list.title, cards: [], boardId: b.id };
                        mergedKanbanLists.push(targetList);
                    }
                    const cardsWithBoardId = (list.cards || []).map(c => {
                        return { ...c, boardId: c.boardId || b.id };
                    });
                    targetList.cards = targetList.cards.concat(cardsWithBoardId);
                } else if (list.type === 'quad' && mergedQuadLists[list.quad]) {
                    const cardsWithBoardId = (list.cards || []).map(c => {
                        return { ...c, boardId: c.boardId || b.id };
                    });
                    mergedQuadLists[list.quad] = mergedQuadLists[list.quad].concat(cardsWithBoardId);
                }
            });
        });

        // Add TODOS's own cards if they exist
        let todosOwnData = [];
        try {
            const todosOwnStr = localStorage.getItem(LS_BOARD_PREFIX + 'board-todos');
            if (todosOwnStr) todosOwnData = JSON.parse(todosOwnStr);
        } catch(e) {}
        todosOwnData.forEach(list => {
            if (list.type === 'kanban') {
                let targetList = mergedKanbanLists.find(l => l.title.toLowerCase().trim() === list.title.toLowerCase().trim());
                if (!targetList) {
                    targetList = { type: 'kanban', title: list.title, cards: [], boardId: 'board-todos' };
                    mergedKanbanLists.push(targetList);
                }
                const cardsWithBoardId = (list.cards || []).map(c => {
                    return { ...c, boardId: c.boardId || 'board-todos' };
                });
                targetList.cards = targetList.cards.concat(cardsWithBoardId);
            } else if (list.type === 'quad' && mergedQuadLists[list.quad]) {
                const cardsWithBoardId = (list.cards || []).map(c => {
                    return { ...c, boardId: c.boardId || 'board-todos' };
                });
                mergedQuadLists[list.quad] = mergedQuadLists[list.quad].concat(cardsWithBoardId);
            }
        });

        boardData = mergedKanbanLists;
        Object.keys(mergedQuadLists).forEach(q => {
            boardData.push({ type: 'quad', quad: q, cards: mergedQuadLists[q] });
        });
    } else {
        try {
            const bStr = localStorage.getItem(LS_BOARD_PREFIX + currentBoardId);
            if (bStr) boardData = JSON.parse(bStr);
        } catch (e) { console.error("Erro load board", e); }
    }

    try {
        const aStr = localStorage.getItem(LS_GLOBAL_AGENDA);
        if (aStr) agendaData = JSON.parse(aStr);
    } catch (e) { console.error("Erro load agenda", e); }

    // Se for a primeira vez e não tiver agenda global, tenta migrar dados da agenda que estavam no board
    // (Isso previne perda de dados ao atualizar o código)
    if (agendaData.length === 0 && boardData.some(d => d.type === 'time' || d.type === 'goal' || d.type === 'unscheduled')) {
        console.log("Migrando agenda do quadro para global...");
        agendaData = boardData.filter(d => d.type === 'time' || d.type === 'goal' || d.type === 'unscheduled');
        boardData = boardData.filter(d => d.type === 'kanban' || d.type === 'quad');
        // Salva a migração
        localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, JSON.stringify(boardData));
        localStorage.setItem(LS_GLOBAL_AGENDA, JSON.stringify(agendaData));
    }

    // Sincronizar boardId nos cartões se não tiver
    if (currentBoardId !== 'board-todos') {
        boardData.forEach(list => {
            if (list.cards) {
                list.cards.forEach(c => {
                    if (!c.boardId) c.boardId = currentBoardId;
                });
            }
        });
    }
    agendaData.forEach(list => {
        if (list.cards) {
            list.cards.forEach(c => {
                if (!c.boardId) c.boardId = currentBoardId || 'board-todos';
            });
        }
    });

    renderFromData(boardData, agendaData);
}

function renderFromData(boardData, agendaData) {
    saveSelectionState();
    // Junta os dois para renderizar, mas a lógica interna sabe que vieram de lugares diferentes
    // Na verdade, a função original renderFromData aceitava um array único.
    // Vamos concatenar para reusar a lógica de renderização, pois visualmente é tudo card.
    const allData = (boardData || []).concat(agendaData || []);

    // === PRESERVAR SCROLL ===
    const scrollMap = new Map();
    scrollMap.set(boardEl, { left: boardEl.scrollLeft, top: boardEl.scrollTop });
    const mainContent = document.getElementById('main-content');
    if (mainContent) scrollMap.set(mainContent, { left: mainContent.scrollLeft, top: mainContent.scrollTop });
    const slots = document.getElementById('slots');
    if (slots) scrollMap.set(slots, { left: slots.scrollLeft, top: slots.scrollTop });
    if (matrixEl) scrollMap.set(matrixEl, { left: matrixEl.scrollLeft, top: matrixEl.scrollTop });

    allCards = [];
    boardEl.innerHTML = '';
    matrixEl.innerHTML = '';
    slotsRoot.innerHTML = '';

    ensureMatrix();
    ensureSchedule(false);

    var quadMap = {
        Q1: matrixEl.querySelector('.list[data-quad="Q1"] .cards'),
        Q2: matrixEl.querySelector('.list[data-quad="Q2"] .cards'),
        Q3: matrixEl.querySelector('.list[data-quad="Q3"] .cards'),
        Q4: matrixEl.querySelector('.list[data-quad="Q4"] .cards')
    };

    function appendCardsToDOM(container, cardsData) {
        if (!container || !cardsData || !cardsData.length) return;
        var fragment = document.createDocumentFragment();
        cardsData.forEach(function (cd) {
            const cardEl = createCard(cd);
            fragment.appendChild(cardEl);
        });
        container.appendChild(fragment);
    }

    allData.forEach(function (entry) {
        if (entry.type === 'kanban') {
            var l = createList(entry.title || 'Lista');
            l.dataset.boardId = entry.boardId || currentBoardId;
            appendCardsToDOM(l.querySelector('.cards'), entry.cards);
        } else if (entry.type === 'quad' && quadMap[entry.quad]) {
            appendCardsToDOM(quadMap[entry.quad], entry.cards);
        } else if (entry.type === 'time' || entry.type === 'goal') {
            (entry.cards || []).forEach(cardData => {
                if (entry.goal && cardData.when && !cardData.when.endsWith('TGOAL')) {
                    cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'TGOAL';
                } else if (entry.time && cardData.when && !cardData.when.includes('T' + entry.time)) {
                    cardData.when = (cardData.when.split('T')[0] || getActiveDay()) + 'T' + entry.time;
                }
                createCard(cardData);
            });
        } else if (entry.type === 'unscheduled') {
            (entry.cards || []).forEach(cardData => {
                createCard(cardData);
            });
        }
    });

    applyFilters();
    updateSlotsHasItems();
    updateTotalTimerDisplay();

    if (globalTimerInterval) {
        clearInterval(globalTimerInterval);
        globalTimerInterval = null;
    }
    startGlobalTimer();
    updateListHeaderTooltips();

    scrollMap.forEach((pos, element) => {
        if (element) {
            element.scrollLeft = pos.left;
            element.scrollTop = pos.top;
        }
    });
    restoreSelectionState();
}

function restore(histObj) {
    // histObj tem { boardData, agendaData }
    if (histObj && histObj.boardData) {
        renderFromData(histObj.boardData, histObj.agendaData);
        persist(); // Salva o estado restaurado
    } else {
        // Fallback para formato antigo de historico se existir
        renderFromData(histObj, []);
    }
}


// ===== BOARD MANAGEMENT CORE =====
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function sortBoardsMeta() {
    if (!boardsMeta || !Array.isArray(boardsMeta)) return;
    const todosBoard = boardsMeta.find(b => b.id === 'board-todos');
    const trashBoard = boardsMeta.find(b => b.id === 'board-trash');
    const otherBoards = boardsMeta.filter(b => b.id !== 'board-todos' && b.id !== 'board-trash');
    
    otherBoards.sort((a, b) => {
        const nameA = a.name || '';
        const nameB = b.name || '';
        return nameA.localeCompare(nameB, undefined, { sensitivity: 'base', numeric: true });
    });
    
    const sorted = [];
    if (todosBoard) sorted.push(todosBoard);
    sorted.push(...otherBoards);
    if (trashBoard) sorted.push(trashBoard);
    boardsMeta = sorted;
}

function loadBoardsMetadata() {
    try {
        const raw = localStorage.getItem(LS_BOARDS_META);
        boardsMeta = raw ? JSON.parse(raw) : [];
        sortBoardsMeta();
    } catch (e) { boardsMeta = []; }
}

function saveBoardsMetadata(syncToCloud = true) {
    sortBoardsMeta();
    localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));
    updateBoardSelectUI();

    // Sync metadata to Firebase
    if (syncToCloud && isFirebaseReady && auth && auth.currentUser) {
        db.ref('users/' + auth.currentUser.uid + '/meta').set(boardsMeta)
            .catch(e => console.error("Erro ao salvar metadata na nuvem", e));
    }
}

function ensureTodosBoard() {
    if (!boardsMeta.find(b => b.id === 'board-todos')) {
        boardsMeta.unshift({ id: 'board-todos', name: 'TODOS 📋', lastModified: Date.now(), color: '#1976d2' });
        saveBoardsMetadata(true);
    }
}

function ensureTrashBoard() {
    if (!boardsMeta.find(b => b.id === 'board-trash')) {
        boardsMeta.push({ id: 'board-trash', name: 'Lixeira 🗑️', lastModified: Date.now(), color: '#5a1419' });
        localStorage.setItem(LS_BOARD_PREFIX + 'board-trash', JSON.stringify([{ type: 'kanban', title: 'Apagados', cards: [] }]));
        saveBoardsMetadata(true);
    }
}

function migrateToMultiBoard() {
    const legacyData = localStorage.getItem(LS_KEY);
    const hasMetadata = localStorage.getItem(LS_BOARDS_META);

    if (legacyData && !hasMetadata) {
        console.log("Migrando para multi-board...");
        const newId = generateId();
        const mainBoard = { id: newId, name: 'Quadro Principal', lastModified: Date.now(), color: DEFAULT_THEME_COLOR };
        boardsMeta = [mainBoard];
        ensureTodosBoard();
        ensureTrashBoard();

        // Tenta separar o que é agenda do que é quadro na migração inicial
        // (Simplificado: joga tudo no quadro primeiro, o loadAndRenderAll separa depois)
        localStorage.setItem(LS_BOARD_PREFIX + newId, legacyData);

        currentBoardId = newId;
        localStorage.setItem(LS_CURRENT_BOARD, currentBoardId);
        saveBoardsMetadata();
    } else if (!hasMetadata) {
        createNewBoard('Meu Quadro');
        ensureTodosBoard();
        ensureTrashBoard();
    } else {
        loadBoardsMetadata();
        ensureTodosBoard();
        ensureTrashBoard();
        currentBoardId = localStorage.getItem(LS_CURRENT_BOARD);
        if (!boardsMeta.find(b => b.id === currentBoardId)) {
            if (boardsMeta.length > 0) currentBoardId = boardsMeta[0].id;
            else createNewBoard('Meu Quadro');
        }
    }
}

function createNewBoard(name) {
    const id = generateId();
    const newBoard = { id: id, name: name || 'Novo Quadro', lastModified: Date.now(), color: DEFAULT_THEME_COLOR };
    boardsMeta.push(newBoard);
    saveBoardsMetadata();
    localStorage.setItem(LS_BOARD_PREFIX + id, JSON.stringify([]));
    switchBoard(id);
}

function renameBoard() {
    if (currentBoardId === 'board-todos' || currentBoardId === 'board-trash') {
        alert("Você não pode alterar ou renomear este quadro especial.");
        return;
    }
    const board = boardsMeta.find(b => b.id === currentBoardId);
    if (!board) return;
    const newName = prompt("Novo nome para o quadro:", board.name);
    if (newName && newName.trim()) {
        board.name = newName.trim();
        saveBoardsMetadata();
    }
}

function deleteBoard() {
    if (currentBoardId === 'board-todos' || currentBoardId === 'board-trash') {
        alert("Você não pode excluir este quadro especial.");
        return;
    }
    if (boardsMeta.length <= 2) { // 2 because TODOS and Lixeira are permanent
        alert("Você não tem outros quadros para excluir.");
        return;
    }
    const board = boardsMeta.find(b => b.id === currentBoardId);
    if (!board) return;

    if (confirm(`Tem certeza que deseja excluir o quadro "${board.name}"? Isso não pode ser desfeito.`)) {
        localStorage.removeItem(LS_BOARD_PREFIX + currentBoardId);
        if (isFirebaseReady && auth && auth.currentUser) {
            db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).remove();
        }
        boardsMeta = boardsMeta.filter(b => b.id !== currentBoardId);
        // Switch to first non-todos board if possible
        const nextBoard = boardsMeta.find(b => b.id !== 'board-trash') || boardsMeta[0];
        currentBoardId = nextBoard.id;
        saveBoardsMetadata();
        localStorage.setItem(LS_CURRENT_BOARD, currentBoardId);
        window.location.reload();
    }
}

function cloneBoard() {
    const board = boardsMeta.find(b => b.id === currentBoardId);
    if (!board) return;
    const newName = prompt("Nome para a cópia:", board.name + " (Cópia)");
    if (!newName) return;

    // Na cópia, pegamos APENAS os dados do quadro, não a agenda (que é global)
    const { boardData } = serializeAndSeparate();
    const newId = generateId();

    const newBoard = { id: newId, name: newName, lastModified: Date.now(), color: board.color || DEFAULT_THEME_COLOR };
    boardsMeta.push(newBoard);
    saveBoardsMetadata();

    localStorage.setItem(LS_BOARD_PREFIX + newId, JSON.stringify(boardData));
    switchBoard(newId);
}

function switchBoard(id) {
    if (id === currentBoardId && boardEl.children.length > 0) return;

    if (boardEl.children.length > 0) {
        saveImmediately();
    }

    console.log("Switching to board: " + id);
    currentBoardId = id;
    localStorage.setItem(LS_CURRENT_BOARD, id);

    const board = boardsMeta.find(b => b.id === id);
    if (board) setBoardTheme(board.color);

    loadAndRenderAll();

    // Reinicia historico de undo
    hist = []; cursor = -1;
    const { boardData, agendaData } = serializeAndSeparate();
    pushHistory({ boardData, agendaData });

    updateBoardSelectUI();

    if (isFirebaseReady && auth && auth.currentUser) {
        subscribeToCurrentBoard(auth.currentUser.uid, id);
    }

    // Ponte para gamificacao: proposito por quadro (inerte se nada escutar)
    if (window.TEAEvents) { TEAEvents.emit('board:switched', { boardId: id }); }
}

// ===== THEMES & CROSS-BOARD =====
// ... (THEMES code remains same) ...
const THEMES = {
    '#1976d2': { name: 'Azul (Padrão)', brand: '#1976d2', bg: '#0f1a2a', panel: '#0f223d', card: '#112b4a', text: '#e9f1ff' },
    '#2e7d32': { name: 'Verde Floresta', brand: '#2e7d32', bg: '#0b160b', panel: '#142517', card: '#1a321e', text: '#e8f5e9' },
    '#7b1fa2': { name: 'Roxo Profundo', brand: '#7b1fa2', bg: '#100614', panel: '#210e29', card: '#2c1236', text: '#f3e5f5' },
    '#e65100': { name: 'Laranja Queimado', brand: '#e65100', bg: '#180d00', panel: '#2e1900', card: '#3d2200', text: '#fff3e0' },
    '#c62828': { name: 'Vermelho Tijolo', brand: '#c62828', bg: '#140505', panel: '#2a0a0a', card: '#380d0d', text: '#ffebee' },
    '#37474f': { name: 'Cinza Escuro', brand: '#37474f', bg: '#101416', panel: '#1c2327', card: '#263238', text: '#eceff1' },
    '#00838f': { name: 'Ciano', brand: '#00838f', bg: '#001416', panel: '#00262b', card: '#003339', text: '#e0f7fa' },
    '#ad1457': { name: 'Rosa Choque', brand: '#ad1457', bg: '#160209', panel: '#2b0512', card: '#380617', text: '#fce4ec' },
    '#00796b': { name: 'Verde Água', brand: '#00796b', bg: '#001210', panel: '#00211f', card: '#002e2b', text: '#e0f2f1' },
    '#8d6e63': { name: 'Marrom Slate', brand: '#8d6e63', bg: '#18110f', panel: '#281e1b', card: '#352924', text: '#efebe9' },
    '#3f51b5': { name: 'Índigo', brand: '#3f51b5', bg: '#0a0b16', panel: '#13152c', card: '#1c1f40', text: '#e8eaf6' },
    '#ffb300': { name: 'Amarelo Âmbar', brand: '#ffb300', bg: '#1c1400', panel: '#332500', card: '#463300', text: '#fff8e1' },
    '#827717': { name: 'Verde Limão', brand: '#827717', bg: '#121200', panel: '#222204', card: '#313107', text: '#f9fbe7' },
    '#d81b60': { name: 'Rosa Magenta', brand: '#d81b60', bg: '#1a000a', panel: '#320015', card: '#44001d', text: '#fce4ec' },
    '#673ab7': { name: 'Roxo Lavanda', brand: '#673ab7', bg: '#0e0618', panel: '#1d0e32', card: '#281446', text: '#ede7f6' },
    '#00c853': { name: 'Esmeralda', brand: '#00c853', bg: '#001a0a', panel: '#003314', card: '#00481c', text: '#e8f5e9' },
    '#ff007f': { name: 'Cyberpunk Neon', brand: '#ff007f', bg: '#0a000d', panel: '#1b0022', card: '#270031', text: '#ffe5f2' },
    '#00e676': { name: 'Menta Neon', brand: '#00e676', bg: '#001209', panel: '#002412', card: '#00361b', text: '#e8fdf5' },
    '#00b0ff': { name: 'Oceano Profundo', brand: '#00b0ff', bg: '#000a12', panel: '#001524', card: '#00223b', text: '#e0f7ff' },
    '#ec407a': { name: 'Rose Gold', brand: '#ec407a', bg: '#1a0a0f', panel: '#2e141c', card: '#3f1b26', text: '#fce4ec' },
    '#f43f5e': { name: 'Pôr do Sol Violeta', brand: '#f43f5e', bg: '#18040d', panel: '#2d0a1b', card: '#3e0f26', text: '#ffeef2' },
    '#607d8b': { name: 'Grafite', brand: '#607d8b', bg: '#111618', panel: '#1e262a', card: '#2a353c', text: '#eceff1' },
    '#ff8f00': { name: 'Âmbar Dourado', brand: '#ff8f00', bg: '#1a0e00', panel: '#301a00', card: '#442400', text: '#fff8e1' },
    '#880e4f': { name: 'Ameixa Escura', brand: '#880e4f', bg: '#12020a', panel: '#240414', card: '#33061d', text: '#fce4ec' }
};

function getContrastYIQ(hexcolor){
    if (!hexcolor || hexcolor.length < 3) return 'dark';
    var hex = hexcolor.replace('#', '');
    if (hex.length === 3) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    var r = parseInt(hex.substr(0,2),16);
    var g = parseInt(hex.substr(2,2),16);
    var b = parseInt(hex.substr(4,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 170) ? 'light' : 'dark';
}

function setBoardTheme(color) {
    const r = document.querySelector(':root');
    const safeColor = color || DEFAULT_THEME_COLOR;
    const theme = THEMES[safeColor] || THEMES[DEFAULT_THEME_COLOR];
    const brandColor = theme ? theme.brand : safeColor;

    if (theme) {
        r.style.setProperty('--brand', theme.brand);
        r.style.setProperty('--bg', theme.bg);
        r.style.setProperty('--panel', theme.panel);
        r.style.setProperty('--card', theme.card);
        r.style.setProperty('--ink', theme.text);
    } else {
        r.style.setProperty('--brand', safeColor);
        r.style.setProperty('--bg', '#0f1a2a');
        r.style.setProperty('--panel', '#0f223d');
        r.style.setProperty('--card', '#112b4a');
        r.style.setProperty('--ink', '#e9f1ff');
    }

    // Definir --brand-rgb para opacidades em CSS
    try {
        var hex = brandColor.replace('#', '');
        if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        var rVal = parseInt(hex.substr(0,2), 16);
        var gVal = parseInt(hex.substr(2,2), 16);
        var bVal = parseInt(hex.substr(4,2), 16);
        r.style.setProperty('--brand-rgb', `${rVal}, ${gVal}, ${bVal}`);
    } catch (e) {
        r.style.setProperty('--brand-rgb', '25, 118, 210');
    }

    // Cálculo do contraste YIQ para o cabeçalho e painéis temáticos
    const contrast = getContrastYIQ(brandColor);
    if (contrast === 'light') {
        r.style.setProperty('--header-text', '#122b4a');
        r.style.setProperty('--header-btn-bg', 'rgba(0, 0, 0, 0.08)');
        r.style.setProperty('--header-btn-border', 'rgba(0, 0, 0, 0.15)');
        r.style.setProperty('--header-btn-hover', 'rgba(0, 0, 0, 0.15)');
        r.style.setProperty('--header-btn-hover-border', 'rgba(0, 0, 0, 0.25)');
    } else {
        r.style.setProperty('--header-text', '#ffffff');
        r.style.setProperty('--header-btn-bg', 'rgba(255, 255, 255, 0.12)');
        r.style.setProperty('--header-btn-border', 'rgba(255, 255, 255, 0.2)');
        r.style.setProperty('--header-btn-hover', 'rgba(255, 255, 255, 0.22)');
        r.style.setProperty('--header-btn-hover-border', 'rgba(255, 255, 255, 0.35)');
    }
}

function getBoardColor(boardId) {
    if (boardId === 'board-todos') {
        const board = boardsMeta.find(b => b.id === 'board-todos');
        return board ? board.color : DEFAULT_THEME_COLOR;
    }
    const board = boardsMeta.find(b => b.id === boardId);
    return board ? board.color : DEFAULT_THEME_COLOR;
}

function openBoardThemePicker() {
    const board = boardsMeta.find(b => b.id === currentBoardId);
    if (!board) return;

    showModal('Cor do Quadro', function () {
        const grid = el('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(130px, 1fr))';
        grid.style.gap = '10px';

        Object.values(THEMES).forEach(theme => {
            const btn = el('button');
            btn.textContent = theme.name;
            btn.style.background = theme.brand;
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.padding = '15px';
            btn.style.borderRadius = '8px';
            btn.style.cursor = 'pointer';
            btn.style.fontWeight = 'bold';

            btn.style.background = `linear-gradient(135deg, ${theme.bg} 0%, ${theme.brand} 100%)`;
            btn.style.border = `1px solid ${theme.panel}`;

            if (theme.brand.toLowerCase() === (board.color || DEFAULT_THEME_COLOR).toLowerCase()) {
                btn.style.boxShadow = '0 0 0 2px #fff, 0 0 0 4px ' + theme.brand;
            }

            btn.onclick = function () {
                board.color = theme.brand;
                setBoardTheme(theme.brand);
                saveBoardsMetadata();
                document.querySelector('.modal-wrap').remove();
            };
            grid.appendChild(btn);
        });
        return grid;
    }, function () { });
}

function getBoardData(boardId) {
    try {
        const str = localStorage.getItem(LS_BOARD_PREFIX + boardId);
        return str ? JSON.parse(str) : [];
    } catch (e) { return []; }
}

function moveCardToBoard(cardElement, targetBoardId, targetListTitle) {
    if (!cardElement) return;

    const targetBoardMeta = boardsMeta.find(b => b.id === targetBoardId);
    const boardName = targetBoardMeta ? targetBoardMeta.name : 'Outro Quadro';
    addCardHistory(cardElement, 'Movido para o quadro "' + boardName + '"');

    const cardData = cardToData(cardElement);
    cardData.when = '';
    cardData.boardId = targetBoardId;
    cardData.color = getBoardColor(targetBoardId) || '';

    const targetData = getBoardData(targetBoardId);
    let moved = false;
    let actualListTitle = targetListTitle;

    let targetList = targetData.find(l => l.type === 'kanban' && l.title === targetListTitle);

    if (!targetList && targetBoardId === 'board-trash') {
        targetList = { type: 'kanban', title: 'Apagados', cards: [] };
        targetData.push(targetList);
    }

    if (targetList) {
        if (!targetList.cards) targetList.cards = [];
        targetList.cards.push(cardData);
        moved = true;
    } else {
        if (targetData.length > 0 && targetData[0].type === 'kanban') {
            targetData[0].cards.push(cardData);
            moved = true;
            actualListTitle = targetData[0].title;
            if (targetBoardId !== 'board-trash') {
                alert(`Lista "${targetListTitle}" nÃ£o encontrada. Movido para "${targetData[0].title}".`);
            }
        } else {
            targetData.unshift({ type: 'kanban', title: 'Inbox', cards: [cardData] });
            moved = true;
            actualListTitle = 'Inbox';
        }
    }

    if (moved) {
        let shouldKeepInDOM = (currentBoardId === 'board-todos' && targetBoardId !== 'board-trash');
        
        if (shouldKeepInDOM) {
            const lists = $$('.list[data-type="kanban"]');
            const targetListEl = lists.find(l => {
                const titleInp = l.querySelector('.title');
                return titleInp && titleInp.value.toLowerCase().trim() === actualListTitle.toLowerCase().trim();
            });
            if (targetListEl) {
                const cardsContainer = targetListEl.querySelector('.cards');
                if (cardsContainer) {
                    cardElement.dataset.boardId = targetBoardId;
                    cardElement.dataset.color = getBoardColor(targetBoardId) || '';
                    cardElement.dataset.when = '';
                    paintCard(cardElement);
                    cardsContainer.appendChild(cardElement);
                    
                    saveImmediately();
                    
                    localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetData));
                    const targetBoard = boardsMeta.find(b => b.id === targetBoardId);
                    if (targetBoard) { targetBoard.lastModified = Date.now(); saveBoardsMetadata(); }
                    if (isFirebaseReady && auth && auth.currentUser) {
                        db.ref('users/' + auth.currentUser.uid + '/boards/' + targetBoardId).set(targetData);
                    }
                    
                    const btn = document.createElement('div');
                    btn.textContent = `Card movido para quadro "${targetBoard ? targetBoard.name : 'Outro'}"`;
                    btn.style.position = 'fixed'; btn.style.bottom = '20px'; btn.style.left = '50%'; btn.style.transform = 'translateX(-50%)';
                    btn.style.background = '#28a745'; btn.style.color = 'white'; btn.style.padding = '10px 20px'; btn.style.borderRadius = '5px'; btn.style.zIndex = '9999';
                    document.body.appendChild(btn);
                    setTimeout(() => btn.remove(), 3000);
                    return;
                }
            }
        }

        removeCard(cardElement, true);
        saveImmediately();

        localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetData));
        const targetBoard = boardsMeta.find(b => b.id === targetBoardId);
        if (targetBoard) { targetBoard.lastModified = Date.now(); saveBoardsMetadata(); }
        if (isFirebaseReady && auth && auth.currentUser) {
            db.ref('users/' + auth.currentUser.uid + '/boards/' + targetBoardId).set(targetData);
        }

        const btn = document.createElement('div');
        btn.textContent = `Card movido para quadro "${targetBoard ? targetBoard.name : 'Outro'}"`;
        btn.style.position = 'fixed'; btn.style.bottom = '20px'; btn.style.left = '50%'; btn.style.transform = 'translateX(-50%)';
        btn.style.background = '#28a745'; btn.style.color = 'white'; btn.style.padding = '10px 20px'; btn.style.borderRadius = '5px'; btn.style.zIndex = '9999';
        document.body.appendChild(btn);
        setTimeout(() => btn.remove(), 3000);
    }
}

function updateBoardSelectUI() {
    const select = document.getElementById('boardSelect');
    if (!select) return;

    select.innerHTML = '';
    boardsMeta.forEach(b => {
        const opt = document.createElement('option');
        opt.value = b.id;
        opt.textContent = b.name;
        if (b.id === currentBoardId) opt.selected = true;
        select.appendChild(opt);
    });
}
