// ==========================================
// History (from lines 2874 to 2910)
// ==========================================

function cardToData(c) {
    var t = c.querySelector('.text');
    if (!c.dataset.id) {
        c.dataset.id = generateId();
    }
    return {
        id: c.dataset.id,
        text: (t ? t.textContent : '').trim(),
        color: c.dataset.color || '',
        labelColor: c.dataset.labelColor || '',
        due: c.dataset.due || '',
        when: c.dataset.when || '',
        timerTotal: c.dataset.timerTotal || '',
        timerLeft: c.dataset.timerLeft || '',
        timerState: c.dataset.timerState || '',
        timerEnd: c.dataset.timerEnd || '',
        completed: c.dataset.completed || 'false',
        history: c.dataset.history || '[]',
        boardId: c.dataset.boardId || '',
        recurrence: c.dataset.recurrence || 'none',
        recurrenceParent: c.dataset.recurrenceParent || '',
        recurrenceExceptions: c.dataset.recurrenceExceptions || '',
        description: c.dataset.description || '',
        duration: c.dataset.duration || '',
        alertEnabled: c.dataset.alertEnabled || 'false',
        alertValue: c.dataset.alertValue || '15',
        alertUnit: c.dataset.alertUnit || 'minutos',
        alertFired: c.dataset.alertFired || 'false'
    };
}

function addCardHistory(card, actionText) {
    let hist = [];
    try { hist = JSON.parse(card.dataset.history || '[]'); } catch(e) {}
    hist.push({ action: actionText, time: Date.now() });
    card.dataset.history = JSON.stringify(hist);
}


// ==========================================
// Lists and Card Operations (from lines 3800 to 4448)
// ==========================================

function distributeAndSaveTodos(mergedBoardData, agendaData) {
    let boardsDataMap = {};
    
    // Inicializa o mapa com os dados já existentes em localStorage para cada quadro,
    // preservando todas as listas vazias e estrutura de cada um deles.
    boardsMeta.forEach(b => {
        if (b.id === 'board-trash' || b.id === 'board-todos') return;
        let bData = [];
        try {
            const bStr = localStorage.getItem(LS_BOARD_PREFIX + b.id);
            if (bStr) bData = JSON.parse(bStr);
        } catch (e) {
            console.error("Error loading board in distributeAndSaveTodos", b.id, e);
        }
        if (!Array.isArray(bData)) bData = [];
        
        boardsDataMap[b.id] = bData.map(item => {
            if (item.type === 'kanban') {
                return { type: 'kanban', title: item.title, cards: [], boardId: b.id };
            } else if (item.type === 'quad') {
                return { type: 'quad', quad: item.quad, cards: [] };
            }
            return item;
        });
    });
    
    if (!boardsDataMap['board-todos']) {
        boardsDataMap['board-todos'] = [];
    }

    // Garante que as listas e quadrantes presentes no DOM da visão agregada
    // existam em seus respectivos quadros antes da redistribuição de cartões.
    mergedBoardData.forEach(list => {
        if (list.type === 'kanban') {
            const title = list.title;
            if (list.boardId && list.boardId !== 'board-todos' && boardsDataMap[list.boardId]) {
                let targetList = boardsDataMap[list.boardId].find(l => l.type === 'kanban' && l.title.toLowerCase().trim() === title.toLowerCase().trim());
                if (!targetList) {
                    boardsDataMap[list.boardId].push({ type: 'kanban', title: title, cards: [], boardId: list.boardId });
                }
            }
        }
    });

    // Popula os cartões distribuindo-os para os quadros e listas correspondentes
    mergedBoardData.forEach(list => {
        if (list.type === 'kanban') {
            const title = list.title;
            (list.cards || []).forEach(card => {
                const bId = card.boardId || 'board-todos';
                if (bId === 'board-trash') return;
                if (!boardsDataMap[bId]) {
                    boardsDataMap[bId] = [];
                }
                let targetList = boardsDataMap[bId].find(l => l.type === 'kanban' && l.title.toLowerCase().trim() === title.toLowerCase().trim());
                if (!targetList) {
                    targetList = { type: 'kanban', title: title, cards: [], boardId: bId };
                    boardsDataMap[bId].push(targetList);
                }
                targetList.cards.push(card);
            });
        } else if (list.type === 'quad') {
            const quad = list.quad;
            (list.cards || []).forEach(card => {
                const bId = card.boardId || 'board-todos';
                if (bId === 'board-trash') return;
                if (!boardsDataMap[bId]) {
                    boardsDataMap[bId] = [];
                }
                let targetList = boardsDataMap[bId].find(l => l.type === 'quad' && l.quad === quad);
                if (!targetList) {
                    targetList = { type: 'quad', quad: quad, cards: [] };
                    boardsDataMap[bId].push(targetList);
                }
                targetList.cards.push(card);
            });
        }
    });

    Object.keys(boardsDataMap).forEach(bId => {
        const boardJson = JSON.stringify(boardsDataMap[bId]);
        localStorage.setItem(LS_BOARD_PREFIX + bId, boardJson);
        if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {
            if (typeof isInitialLoadComplete !== 'undefined' && !isInitialLoadComplete) {
                console.log("Sync: Ignorando set de board no Firebase (carga inicial incompleta).");
            } else {
                db.ref('users/' + auth.currentUser.uid + '/boards/' + bId).set(boardsDataMap[bId])
                    .catch(e => console.error("Firebase board save error for " + bId, e));
            }
        }
    });

    const agendaJson = JSON.stringify(agendaData);
    localStorage.setItem(LS_GLOBAL_AGENDA, agendaJson);
    if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {
        if (typeof isInitialLoadComplete !== 'undefined' && !isInitialLoadComplete) {
            console.log("Sync: Ignorando set de agenda no Firebase (carga inicial incompleta).");
        } else {
            db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(agendaData)
                .catch(e => console.error("Firebase agenda save error:", e));
        }
    }
}

function saveImmediately() {
    if (__persistTick) {
        clearTimeout(__persistTick);
        __persistTick = null;
    }
    if (__muteHistory > 0) return;
    try {
        const { boardData, agendaData } = serializeAndSeparate();
        if (currentBoardId === 'board-todos') {
            distributeAndSaveTodos(boardData, agendaData);
        } else {
            const boardJson = JSON.stringify(boardData);
            const agendaJson = JSON.stringify(agendaData);
            if (currentBoardId) {
                localStorage.setItem(LS_BOARD_PREFIX + currentBoardId, boardJson);
                const board = boardsMeta.find(b => b.id === currentBoardId);
                if (board) {
                    board.lastModified = Date.now();
                    saveBoardsMetadata();
                }
            }
            localStorage.setItem(LS_GLOBAL_AGENDA, agendaJson);
            if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {
                db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).set(boardData)
                    .catch(e => console.error("Firebase board save error:", e));
                db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(agendaData)
                    .catch(e => console.error("Firebase agenda save error:", e));
            }
        }
    } catch (e) { }
    capture();
}

function persist() {
    if (__muteHistory > 0) return;
    clearTimeout(__persistTick);
    __persistTick = setTimeout(saveImmediately, 250);
}

function duplicateCards(cards) {
    if (!cards || !cards.length) return;
    
    // Group selected cards by their parent list (.cards container)
    const groupedByParent = new Map();
    cards.forEach(c => {
        const parent = c.parentElement;
        if (!groupedByParent.has(parent)) groupedByParent.set(parent, []);
        groupedByParent.get(parent).push(c);
    });

    groupedByParent.forEach((cardList, parent) => {
        // Find the last selected card in this parent to insert after
        const lastOriginalCard = cardList[cardList.length - 1];
        let insertReference = lastOriginalCard ? lastOriginalCard.nextSibling : null;

        cardList.forEach(c => {
            var newData = cardToData(c);
            if (!c.closest('#agenda-sidebar') && !c.dataset.when) {
                newData.when = '';
            }
            // Ensure duplicated card gets a fresh unique ID
            newData.id = generateId();
            var newCard = createCard(newData);
            // Insert after the current reference, then update reference to the newly inserted card
            // so they are grouped together.
            if (parent) {
                parent.insertBefore(newCard, insertReference);
                insertReference = newCard.nextSibling;
            }
        });
    });

    persist();
    updateSlotsHasItems();
    updateTotalTimerDisplay();
    if (typeof renderWeeklyView === 'function') {
        if (typeof renderWeeklyView === 'function') renderWeeklyView(); else if (typeof window.renderWeeklyView === 'function') window.renderWeeklyView();
    }
}

function updateTimerDisplay(card) {
    var disp = card.querySelector('.timer-display');
    if (!disp) return;
    var progressBar = card.querySelector('.timer-progress-bar');
    var totalSeconds = parseInt(card.dataset.timerTotal || '0', 10);

    card.classList.remove('timer-running', 'timer-finished', 'timer-paused');

    if (totalSeconds > 0) {
        var state = card.dataset.timerState || 'stopped';
        var seconds = parseInt(card.dataset.timerLeft, 10);
        if (isNaN(seconds)) seconds = totalSeconds;

        var mins = Math.floor(seconds / 60);
        var secs = seconds % 60;
        disp.textContent = `⏱️ ${to2(mins)}:${to2(secs)}`;

        // Atualiza Barra de Progresso
        if (progressBar) {
            var perc = (seconds / totalSeconds) * 100;
            progressBar.style.width = perc + '%';
        }

        if (state === 'running') {
            disp.style.color = '#66bb6a';
            disp.style.background = 'rgba(102, 187, 106, 0.2)';
            card.classList.add('timer-running');
        }
        else if (state === 'paused') { 
            disp.style.color = '#ffa726'; 
            disp.style.background = 'rgba(255, 167, 38, 0.2)'; 
            card.classList.add('timer-paused');
        }
        else if (state === 'finished') {
            disp.style.color = '#ef5350';
            disp.style.background = 'rgba(239, 83, 80, 0.2)';
            card.classList.add('timer-finished');
            if (progressBar) progressBar.style.width = '100%';
        }
        else {
            var totalMins = Math.round(totalSeconds / 60);
            disp.textContent = `⏳ ${totalMins} min`;
            disp.style.color = ''; disp.style.background = 'rgba(0,0,0,.2)';
            if (progressBar) progressBar.style.width = '0%';
        }
    } else {
        disp.textContent = '';
    }
}

function toggleCardCompletion(e) {
    e.stopPropagation();
    const card = e.target.closest('.card');
    if (!card) return;
    const isCompleted = card.dataset.completed === 'true';
    card.dataset.completed = isCompleted ? 'false' : 'true';

    if (card.dataset.completed === 'true') {
        card.classList.remove('timer-finished');
        if (card.dataset.timerState === 'running') {
            card.dataset.timerState = 'paused';
            var now = Date.now();
            var end = parseInt(card.dataset.timerEnd, 10);
            if (!isNaN(end)) {
                card.dataset.timerLeft = Math.round((end - now) / 1000);
            }
        }
        if (card.dataset.timerState === 'finished') {
            card.dataset.timerState = 'stopped';
        }
    }

    syncCardTimerState(card);
    persist();
    updateTimerDisplay(card);
    syncMirrors();

    // Ponte kanban -> gamificação (Fundação 0.5). Inerte se nada escutar.
    if (window.TEAEvents) {
        var _gpayload = {
            cardId: card.dataset.id,
            boardId: card.dataset.boardId || (typeof currentBoardId !== 'undefined' ? currentBoardId : ''),
            quadrant: (typeof detectCardQuadrant === 'function') ? detectCardQuadrant(card) : 'none',
            isRecurring: (!!(card.dataset.recurrenceParent)) || (!!(card.dataset.recurrence && card.dataset.recurrence !== 'none')),
            seriesId: card.dataset.recurrenceParent ? card.dataset.recurrenceParent : ((card.dataset.recurrence && card.dataset.recurrence !== 'none') ? card.dataset.id : ''),
            timerSeconds: (typeof getCardFocusSeconds === 'function') ? getCardFocusSeconds(card) : 0
        };
        if (card.dataset.completed === 'true') { TEAEvents.emit('task:completed', _gpayload); }
        else { TEAEvents.emit('task:uncompleted', _gpayload); }
    }
}

function paintCard(c) {
    var boardColor = getBoardColor(c.dataset.boardId) || c.dataset.color;
    if (boardColor) {
        c.style.borderColor = boardColor;
        c.style.borderLeftColor = boardColor;
        c.style.setProperty('--board-color', boardColor);
    } else {
        c.style.borderColor = '#20486f';
        c.style.borderLeftColor = 'transparent';
        c.style.setProperty('--board-color', '#20486f');
    }

    // Tooltip indicando a qual quadro o cartão pertence
    const board = boardsMeta.find(b => b.id === c.dataset.boardId);
    if (board) {
        c.title = "Quadro: " + board.name;
    } else {
        c.title = '';
    }

    var labelColor = c.dataset.labelColor || '';
    var header = c.querySelector('.card-header');
    if (header) {
        if (labelColor) {
            header.style.backgroundColor = labelColor;
            header.style.setProperty('--label-color', labelColor);
            header.style.borderBottom = 'none';
        } else {
            header.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
            header.style.setProperty('--label-color', 'transparent');
            header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
    }

    var dot = c.querySelector('.dot');
    if (dot) {
        dot.style.borderColor = boardColor || '#375b86';
        if (c.dataset.completed === 'true') {
            dot.style.background = '#66bb6a';
            dot.style.borderColor = '#66bb6a';
        } else {
            dot.style.background = 'rgba(0, 0, 0, 0.2)';
        }
    }

    var dateEl = c.querySelector('.due-date');
    if (c.dataset.due) {
        if (!dateEl) {
            dateEl = el('span', 'due-date');
            if (header) {
                header.insertBefore(dateEl, header.querySelector('.kebab'));
            } else {
                c.appendChild(dateEl);
            }
        }
        try {
            const [y, m, d] = c.dataset.due.split('-');
            dateEl.textContent = `📅 ${d}/${m}`;
        } catch (e) {
            dateEl.textContent = '📅 ' + c.dataset.due;
        }
        dateEl.style.display = '';
    } else if (dateEl) {
        dateEl.style.display = 'none';
    }
    updateTimerDisplay(c);
}

function createCard(data) {
    var _d = (typeof data === 'string') ? { text: data } : (data || { text: '' });
    if (!_d.history) {
        _d.history = JSON.stringify([{ action: 'Criado', time: Date.now() }]);
    }
    var c = el('div', 'card'); c.draggable = true;
    
    c.dataset.id = _d.id || generateId();
    const cardBoardId = _d.boardId || currentBoardId || 'board-todos';
    c.dataset.boardId = cardBoardId;
    c.dataset.color = _d.color || getBoardColor(cardBoardId) || '';
    c.dataset.labelColor = _d.labelColor || '';
    c.dataset.due = _d.due || ''; c.dataset.when = _d.when || '';
    c.dataset.timerTotal = _d.timerTotal || ''; c.dataset.timerLeft = _d.timerLeft || ''; c.dataset.timerState = _d.timerState || 'stopped';
    c.dataset.timerEnd = _d.timerEnd || '';
    c.dataset.completed = _d.completed || 'false';
    c.dataset.history = _d.history || '[]';
    c.dataset.recurrence = _d.recurrence || 'none';
    c.dataset.recurrenceParent = _d.recurrenceParent || '';
    c.dataset.recurrenceExceptions = _d.recurrenceExceptions || '';
    c.dataset.description = _d.description || '';
    c.dataset.duration = _d.duration || '';
    c.dataset.alertEnabled = _d.alertEnabled || 'false';
    c.dataset.alertValue = _d.alertValue || '15';
    c.dataset.alertUnit = _d.alertUnit || 'minutos';
    c.dataset.alertFired = _d.alertFired || 'false';

    // Create Card Header
    var header = el('div', 'card-header');
    
    var chkWrap = el('span', 'card-checkbox-wrapper');
    var dot = el('span', 'dot');
    var dotCheck = el('span', 'dot-check'); dotCheck.textContent = '✓';
    dot.appendChild(dotCheck);
    chkWrap.appendChild(dot);
    
    var timerDisp = el('span', 'timer-display');
    
    header.appendChild(chkWrap);
    header.appendChild(timerDisp);

    var kb = el('button', 'kebab'); kb.type = 'button'; kb.textContent = '⋮';
    kb.addEventListener('click', function (ev) {
        ev.stopPropagation();
        clearSelection();
        addSelection(c);
        var r = kb.getBoundingClientRect();
        showCtx(r.right, r.bottom, c);
    });
    header.appendChild(kb);

    // Create Card Body
    var body = el('div', 'card-body');
    var t = el('span', 'text'); t.textContent = _d.text || '';
    body.appendChild(t);

    // Container da barra de progresso
    var progCont = el('div', 'timer-progress-container');
    var progBar = el('div', 'timer-progress-bar');
    progCont.appendChild(progBar);

    c.appendChild(header);
    c.appendChild(body);
    c.appendChild(progCont);
    
    let lastClockClick = 0;
    // Play/Pause on single click on timerDisp or progCont
    timerDisp.addEventListener('click', function (e) {
        const targetCard = c._originalReference || c;
        var total = parseInt(targetCard.dataset.timerTotal || '0', 10);
        if (total > 0) {
            e.stopPropagation();
            const now = Date.now();
            if (now - lastClockClick > 300) {
                toggleCardTimer(targetCard);
            }
            lastClockClick = now;
        }
    });
    timerDisp.addEventListener('dblclick', function (e) {
        e.stopPropagation();
    });

    let lastProgClick = 0;
    progCont.addEventListener('click', function (e) {
        const targetCard = c._originalReference || c;
        var total = parseInt(targetCard.dataset.timerTotal || '0', 10);
        if (total > 0) {
            e.stopPropagation();
            const now = Date.now();
            if (now - lastProgClick > 300) {
                toggleCardTimer(targetCard);
            }
            lastProgClick = now;
        }
    });
    progCont.addEventListener('dblclick', function (e) {
        e.stopPropagation();
    });

    paintCard(c);

    dot.addEventListener('click', toggleCardCompletion);
    dot.addEventListener('dblclick', (e) => e.stopPropagation());

    c.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return;
        if (isSelectionMode) {
            e.preventDefault();
            toggleSelection(c);
            return;
        }
        if (e.shiftKey) { rangeSelect(c); } else if (e.ctrlKey || e.metaKey) { toggleSelection(c); } else if (!selected.has(c)) { clearSelection(); addSelection(c); }
        updateTotalTimerDisplay();
    });

    c.addEventListener('dragstart', function (e) {
        e.stopPropagation();
        var block = selected.has(c) ? Array.from(selected) : [c];
        dragState = { leader: c, block: block };
        block.forEach(function (n) { n.classList.add('dragging'); });
        pushPH();
        try { e.dataTransfer.setData('text/plain', 'drag'); e.dataTransfer.effectAllowed = 'move'; } catch (_) { }
    });

    c.addEventListener('dragend', function () {
        if (dragState && dragState.block) {
            dragState.block.forEach(function (n) { n.classList.remove('dragging'); });
        }
        cleanupPH();
        dragState = null;
        persist();
        updateSlotsHasItems();
        updateTotalTimerDisplay();
    });

    c.addEventListener('dblclick', function (e) {
        if (e.target.closest('.dot') || e.target.closest('.kebab') || e.target.closest('.timer-display') || e.target.closest('.timer-progress-container') || e.target.closest('.timer-progress-bar')) {
            e.stopPropagation();
            return;
        }
        handleCardDblClick(c);
    });

    c.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!selected.has(c)) {
            clearSelection();
            addSelection(c);
        }
        showCtx(e.clientX, e.clientY, c);
    });

    if (!allCards.includes(c)) {
        allCards.push(c);
    }
    updateTotalTimerDisplay();
    return c;
}

function removeCard(c, bypassTrash = false) {
    const isChild = !!c.dataset.recurrenceParent;
    const isParent = c.dataset.recurrence && c.dataset.recurrence !== 'none';
    
    if ((isChild || isParent) && !c._deletionHandled) {
        promptDeleteRecurringCard(c, function(decision) {
            c._deletionHandled = true;
            if (decision === 'instance') {
                if (isChild) {
                    const parentId = c.dataset.recurrenceParent;
                    const parentCard = allCards.find(card => card.dataset.id === parentId || card.dataset.cardId === parentId);
                    if (parentCard) {
                        const childDate = (c.dataset.when || '').split('T')[0];
                        if (childDate) {
                            let exceptions = parentCard.dataset.recurrenceExceptions || '';
                            let exceptionList = exceptions ? exceptions.split(',') : [];
                            if (!exceptionList.includes(childDate)) {
                                exceptionList.push(childDate);
                            }
                            parentCard.dataset.recurrenceExceptions = exceptionList.join(',');
                            generateRecurrences(parentCard);
                        }
                    }
                } else {
                    const parentDateStr = (c.dataset.when || '').split('T')[0];
                    const parentTimeSuffix = c.dataset.when.includes('T') ? c.dataset.when.split('T')[1] : '';
                    const rule = parseRecurrenceRule(c.dataset.recurrence);
                    if (rule && parentDateStr) {
                        const nextDate = getNextRecurrenceDate(parentDateStr, rule);
                        if (nextDate) {
                            c.dataset.when = nextDate + 'T' + parentTimeSuffix;
                            generateRecurrences(c);
                        }
                    }
                }
                executeActualCardRemoval(c, bypassTrash);
            } else if (decision === 'all') {
                const parentId = isChild ? c.dataset.recurrenceParent : (c.dataset.id || c.dataset.cardId);
                const parentCard = allCards.find(card => card.dataset.id === parentId || card.dataset.cardId === parentId);
                
                const children = allCards.filter(card => card.dataset.recurrenceParent === parentId);
                children.forEach(child => {
                    child._deletionHandled = true;
                    executeActualCardRemoval(child, bypassTrash);
                });
                
                if (parentCard) {
                    parentCard._deletionHandled = true;
                    executeActualCardRemoval(parentCard, bypassTrash);
                }
            } else if (decision === 'future') {
                const parentId = isChild ? c.dataset.recurrenceParent : (c.dataset.id || c.dataset.cardId);
                const parentCard = allCards.find(card => card.dataset.id === parentId || card.dataset.cardId === parentId);
                
                if (parentCard) {
                    const targetDateStr = (c.dataset.when || '').split('T')[0];
                    if (targetDateStr) {
                        const targetDate = new Date(targetDateStr + 'T12:00:00');
                        targetDate.setDate(targetDate.getDate() - 1);
                        const newEndDateStr = targetDate.toISOString().split('T')[0];
                        
                        const rule = parseRecurrenceRule(parentCard.dataset.recurrence);
                        if (rule) {
                            rule.endType = 'date';
                            rule.endDate = newEndDateStr;
                            parentCard.dataset.recurrence = JSON.stringify(rule);
                            generateRecurrences(parentCard);
                        }
                    }
                }
                
                const targetDateStr = (c.dataset.when || '').split('T')[0];
                const children = allCards.filter(card => card.dataset.recurrenceParent === parentId);
                children.forEach(child => {
                    const childDateStr = (child.dataset.when || '').split('T')[0];
                    if (childDateStr >= targetDateStr) {
                        child._deletionHandled = true;
                        executeActualCardRemoval(child, bypassTrash);
                    }
                });
                
                if (!isChild && parentCard) {
                    parentCard._deletionHandled = true;
                    executeActualCardRemoval(parentCard, bypassTrash);
                } else if (isChild && parentCard) {
                    const parentDateStr = (parentCard.dataset.when || '').split('T')[0];
                    if (parentDateStr >= targetDateStr) {
                        parentCard._deletionHandled = true;
                        executeActualCardRemoval(parentCard, bypassTrash);
                    }
                }
            }
            
            persist();
            if (typeof renderWeeklyView === 'function') renderWeeklyView(); else if (typeof window.renderWeeklyView === 'function') window.renderWeeklyView();
            applyFilters();
        });
        return;
    }
    
    executeActualCardRemoval(c, bypassTrash);
}

function executeActualCardRemoval(c, bypassTrash) {
    if (currentBoardId !== 'board-trash' && !bypassTrash) {
        addCardHistory(c, 'Enviado para a lixeira');
        moveCardToBoard(c, 'board-trash', 'Apagados');
        return;
    }
    var index = allCards.indexOf(c);
    if (index > -1) allCards.splice(index, 1);
    c.remove();
    persist();
    updateSlotsHasItems();
    updateTotalTimerDisplay();
}

function startInlineEdit(card, isNewCard = false) {
    var tEl = card.querySelector('.text'); if (!tEl) return; if (card.classList.contains('editing')) return;
    card.classList.add('editing'); var original = tEl.textContent; tEl.setAttribute('contenteditable', 'true'); tEl.focus();
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(tEl);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);

    function finish(save) {
        tEl.removeEventListener('keydown', onKey);
        tEl.removeEventListener('blur', onBlur);
        tEl.removeAttribute('contenteditable');
        card.classList.remove('editing');

        const quickConfigToggle = document.getElementById('quickConfigToggle');
        const textWasEmpty = original.trim() === '';
        const textIsNowEmpty = tEl.textContent.trim() === '';

        const targetCard = card._originalReference || card;

        if (!save) {
            tEl.textContent = original;
            if (textWasEmpty && textIsNowEmpty) {
                removeCard(targetCard, true);
                if (card._originalReference) renderWeeklyView();
            }
        } else if (textIsNowEmpty) {
            if (!textWasEmpty) {
                showConfirm('Excluir cartão vazio?', function () {
                    removeCard(targetCard, true);
                    if (card._originalReference) renderWeeklyView();
                });
            } else {
                removeCard(targetCard, true);
                if (card._originalReference) renderWeeklyView();
            }
        } else {
            if (card._originalReference) {
                const origText = card._originalReference.querySelector('.text');
                if (origText) origText.textContent = tEl.textContent;
            }
            persist();
            if (isNewCard && quickConfigToggle && quickConfigToggle.checked) {
                openTimerDialog([targetCard], function () {
                    setTimeout(function () {
                        openColorDialog([targetCard]);
                        if (card._originalReference) renderWeeklyView();
                    }, 1);
                });
            } else {
                if (card._originalReference) renderWeeklyView();
            }
        }
    }
    function onKey(ev) {
        if (ev.key === 'Escape') {
            ev.preventDefault();
            finish(false);
        }
        if (ev.key === 'Enter' && !ev.shiftKey) {
            ev.preventDefault();
            finish(true);
        }
    }
    function onBlur() { finish(true); }
    tEl.addEventListener('keydown', onKey);
    tEl.addEventListener('blur', onBlur);
}


// ==========================================
// Drag and Drop Logic (from lines 4509 to 4709)
// ==========================================

var dragState = null; var draggingList = null; var lastAnchor = null;
function syncMirrors() {
    $$('.mirror-card').forEach(m => {
        const orig = m._originalReference;
        if (orig) {
            m.classList.toggle('selected', selected.has(orig));
            
            // Sync timer states and dataset attributes
            m.dataset.timerState = orig.dataset.timerState || 'stopped';
            m.dataset.timerTotal = orig.dataset.timerTotal || '';
            m.dataset.timerLeft = orig.dataset.timerLeft || '';
            m.dataset.timerEnd = orig.dataset.timerEnd || '';
            m.dataset.completed = orig.dataset.completed || 'false';
            
            // Sync text content
            const origText = orig.querySelector('.text');
            const mText = m.querySelector('.text');
            if (origText && mText && mText.textContent !== origText.textContent) {
                mText.textContent = origText.textContent;
            }
            
            // Update the display of the mirror card
            updateTimerDisplay(m);
        }
    });
}
var lastSelectedIds = [];
function saveSelectionState() {
    lastSelectedIds = Array.from(selected).map(c => c.dataset.id).filter(Boolean);
}
function restoreSelectionState() {
    if (lastSelectedIds.length === 0) return;
    selected.clear();
    lastSelectedIds.forEach(id => {
        const original = document.querySelector(`.card[data-id="${id}"]:not(.mirror-card)`);
        if (original) {
            selected.add(original);
            original.classList.add('selected');
        }
    });
    syncMirrors();
    updateTotalTimerDisplay();
}
function clearSelection() { 
    selected.forEach(function (c) { c.classList.remove('selected'); }); 
    selected.clear(); 
    syncMirrors();
    updateTotalTimerDisplay(); 
}
function addSelection(c) { 
    if (!selected.has(c)) { 
        selected.add(c); 
        c.classList.add('selected'); 
        lastAnchor = c; 
        syncMirrors();
    } 
    updateTotalTimerDisplay(); 
}
function toggleSelection(c) { 
    if (selected.has(c)) { 
        selected.delete(c); 
        c.classList.remove('selected'); 
    } else { 
        addSelection(c); 
    } 
    syncMirrors();
    updateTotalTimerDisplay(); 
}
function rangeSelect(to) {
    if (!lastAnchor) { addSelection(to); return; }
    var cards = Array.from(document.querySelectorAll('.card'));
    var visibleCards = cards.filter(c => c.style.display !== 'none' && c.offsetHeight > 0);
    var a = visibleCards.indexOf(lastAnchor);
    var b = visibleCards.indexOf(to);
    if (a === -1 || b === -1) {
        addSelection(to);
        return;
    }
    var start = Math.min(a, b);
    var end = Math.max(a, b);
    clearSelection();
    for (var k = start; k <= end; k++) {
        addSelection(visibleCards[k]);
    }
    syncMirrors();
    updateTotalTimerDisplay();
}

function toggleSelectionMode() {
    isSelectionMode = !isSelectionMode;
    const btn = document.getElementById('toggleSelectionModeBtn');
    if (btn) btn.classList.toggle('active', isSelectionMode);
    if (!isSelectionMode) clearSelection();
}
function getSelectionOr(target) { return selected.size ? Array.from(selected) : (target ? [target] : []); }
function pushPH() { if (!dragState) dragState = {}; var ph = el('div', 'placeholder'); dragState.placeholder = ph; return ph; }
function cleanupPH() { if (dragState && dragState.placeholder) dragState.placeholder.remove(); }
function nearestAfter(container, y) { var els = [].slice.call(container.querySelectorAll('.card:not(.dragging)')); var best = { offset: -Infinity, element: null }; els.forEach(function (child) { var r = child.getBoundingClientRect(); var o = y - (r.top + r.height / 2); if (o < 0 && o > best.offset) best = { offset: o, element: child }; }); return best.element; }

function wireDropZone(container) {
    var isSlot = container.classList.contains('slot') || container.classList.contains('goal-slot') || container.classList.contains('unscheduled-slot');
    var cardsContainer = isSlot ? container.querySelector('.cards') : container;

    function handleDrop(e) {
        if (!dragState) return;
        e.preventDefault(); e.stopPropagation();

        var parent = dragState.placeholder.parentElement || cardsContainer;
        var ref = dragState.placeholder;
        var block = (dragState.block && dragState.block.length) ? dragState.block : [dragState.leader];

        applyWhen(container, block);
        
        let targetListTitle = 'Agenda/Outro';
        const listEl = container.closest('.list');
        if (listEl) {
            const titleInp = listEl.querySelector('.title');
            targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || listEl.dataset.time || 'Agenda');
        }
        block.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + '"'); });

        if (!isSlot) {
            block.forEach(function (n) { parent.insertBefore(n, ref); });
        }

        if (dragState.block) { dragState.block.forEach(function (n) { n.classList.remove('dragging'); }); }
        cleanupPH();
        if (isSlot) container.classList.remove('hover');
        dragState = null;

        updateSlotsHasItems();
        persist();
        updateTotalTimerDisplay();
    }

    function handleDragOver(e) {
        if (!dragState) return;
        e.preventDefault();
        var after = nearestAfter(cardsContainer, e.clientY);
        var ph = dragState.placeholder;
        if (!after) cardsContainer.appendChild(ph);
        else cardsContainer.insertBefore(ph, after);
        if (isSlot) container.classList.add('hover');
        
        // Matrix Color Drop (Hover over quadrant)
        if (container.dataset.type === 'quad' && dragState.block) {
            const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' };
            const qColor = EISENHOWER_COLORS[container.dataset.quad];
            if (qColor) {
                var block = (dragState.block && dragState.block.length) ? dragState.block : [dragState.leader];
                block.forEach(function(n) {
                    if (n._originalReference) n = n._originalReference;
                    n.dataset.labelColor = qColor;
                    paintCard(n);
                    const cardInCache = allCards.find(card => card === n);
                    if (cardInCache && cardInCache !== n) {
                        cardInCache.dataset.labelColor = qColor;
                        paintCard(cardInCache);
                    }
                });
            }
        }
    }

    container.addEventListener('dragover', handleDragOver);
    container.addEventListener('drop', handleDrop);
    if (isSlot) {
        container.addEventListener('dragleave', function () { container.classList.remove('hover'); });
    }
}

function applyWhen(listElement, nodes) {
    const day = getActiveDay();
    let targetWhen = '';

    const EISENHOWER_COLORS = {
        Q1: '#2e7d32', // Green (Faça)
        Q2: '#1976d2', // Blue (Agende)
        Q3: '#ffb300', // Yellow (Delegue)
        Q4: '#c62828'  // Red (Elimine)
    };

    let isMatrix = listElement && listElement.dataset.type === 'quad';
    let quad = isMatrix ? listElement.dataset.quad : '';

    if (listElement && listElement.dataset.date) {
        targetWhen = listElement.dataset.date + 'T';
    } else if (listElement && listElement.dataset.type === 'time') {
        targetWhen = day + 'T' + listElement.dataset.time;
    } else if (listElement && listElement.dataset.type === 'goal') {
        targetWhen = day + 'TGOAL';
    } else if (listElement && listElement.closest('.unscheduled-slot')) {
        targetWhen = day + 'T';
    } else {
        targetWhen = '';
    }

    // If dropping into a Kanban list, capture the target boardId
    const listEl = listElement ? listElement.closest('.list') : null;
    const targetBoardId = (listEl && listEl.dataset.type === 'kanban') ? listEl.dataset.boardId : null;

    nodes.forEach(function (n) {
        if (n._originalReference) {
            n = n._originalReference;
        }
        const oldBadge = n.querySelector('.info-badge');
        if (oldBadge) oldBadge.remove();

        if (isMatrix && quad) {
            n.dataset.labelColor = EISENHOWER_COLORS[quad];
        }

        if (targetBoardId) {
            n.dataset.boardId = targetBoardId;
            n.dataset.color = getBoardColor(targetBoardId) || '';
        }

        const cardInCache = allCards.find(card => card === n);
        if (cardInCache) {
            cardInCache.dataset.when = targetWhen;
            if (isMatrix && quad) {
                cardInCache.dataset.labelColor = EISENHOWER_COLORS[quad];
            }
            if (targetBoardId) {
                cardInCache.dataset.boardId = targetBoardId;
                cardInCache.dataset.color = getBoardColor(targetBoardId) || '';
            }
        } else {
            n.dataset.when = targetWhen;
        }
        paintCard(n);
    });
}

boardEl.addEventListener('dragover', function (e) { if (!draggingList) return; e.preventDefault(); var after = listAfter(boardEl, e.clientX); if (after == null) boardEl.appendChild(draggingList); else boardEl.insertBefore(draggingList, after); });
function listAfter(container, x) { var els = [].slice.call(container.querySelectorAll('.list:not(.dragging)')); var best = { offset: -Infinity, element: null }; els.forEach(function (ch) { var r = ch.getBoundingClientRect(); var o = x - (r.left + r.width / 2); if (o < 0 && o > best.offset) best = { offset: o, element: ch }; }); return best.element; }


// ==========================================
// List and Card Context Menus / Filters (from lines 4710 to 5366)
// ==========================================

function createList(title) {
    var list = el('section', 'list');
    list.dataset.type = 'kanban';
    list.dataset.boardId = currentBoardId;
    var h = el('header');
    var t = el('input', 'title');
    t.value = title || 'Nova lista';
    var addBtn = el('button', 'add-btn-minimal');
    addBtn.textContent = '+';
    addBtn.title = 'Novo Cartão';
    addBtn.onclick = function (e) {
        e.stopPropagation();
        var card = createCard({ text: '' });
        var cardsContainer = list.querySelector('.cards');
        cardsContainer.prepend(card);
        startInlineEdit(card, true);
    };
    var more = el('button', 'more');
    more.type = 'button'; more.textContent = '⋯';
    more.addEventListener('click', function (ev) { ev.stopPropagation(); var r = more.getBoundingClientRect(); showListCtx(r.right, r.bottom, list); });
    h.appendChild(t); h.appendChild(addBtn); h.appendChild(more);
    list.appendChild(h);
    var cards = el('div', 'cards');
    list.appendChild(cards);
    wireDropZone(cards);
    var add = el('div', 'add'); list.appendChild(add);
    boardEl.appendChild(list);
    h.draggable = true;
    h.addEventListener('dragstart', function (ev) { draggingList = list; list.classList.add('dragging'); if (ev.dataTransfer) ev.dataTransfer.setData('text/plain', 'list'); });
    h.addEventListener('dragend', function () { draggingList = null; list.classList.remove('dragging'); persist(); });
    h.addEventListener('contextmenu', function (e) { e.preventDefault(); showListCtx(e.clientX, e.clientY, list); });
    return list;
}

function ensureMatrix() {
    matrixEl.innerHTML = '';
    var corner = el('div', 'axis corner'); corner.style.gridArea = '1 / 1'; matrixEl.appendChild(corner);
    var axX1 = el('div', 'axis'); axX1.textContent = 'URGENTE'; axX1.style.gridArea = '1 / 2'; matrixEl.appendChild(axX1);
    var axX2 = el('div', 'axis'); axX2.textContent = 'NÃO URGENTE'; axX2.style.gridArea = '1 / 3'; matrixEl.appendChild(axX2);
    var axY1 = el('div', 'axis axis-y'); axY1.textContent = 'IMPORTANTE'; axY1.style.gridArea = '2 / 1'; matrixEl.appendChild(axY1);
    var axY2 = el('div', 'axis axis-y'); axY2.textContent = 'NÃO IMPORTANTE'; axY2.style.gridArea = '3 / 1'; matrixEl.appendChild(axY2);

    var specs = [
        { quad: 'Q1', label: 'FAÇA AGORA', area: '2 / 2' },
        { quad: 'Q2', label: 'AGENDE', area: '2 / 3' },
        { quad: 'Q3', label: 'DELEGUE', area: '3 / 2' },
        { quad: 'Q4', label: 'ELIMINE', area: '3 / 3' }
    ];
    specs.forEach(function (sp) {
        var l = el('section', 'list');
        l.dataset.type = 'quad'; l.dataset.quad = sp.quad; l.style.gridArea = sp.area;
        var h = el('header');
        var t = el('div', 'quad-label'); t.textContent = sp.label;
        var addBtn = el('button', 'add-btn-minimal');
        addBtn.textContent = '+';
        addBtn.title = 'Novo Cartão';
        addBtn.onclick = function (e) {
            e.stopPropagation();
            var card = createCard({ text: '' });
            const EISENHOWER_COLORS = { Q1: '#2e7d32', Q2: '#1976d2', Q3: '#ffb300', Q4: '#c62828' };
            card.dataset.labelColor = EISENHOWER_COLORS[sp.quad] || '';
            paintCard(card);
            var cardsContainer = l.querySelector('.cards');
            cardsContainer.prepend(card);
            startInlineEdit(card, true);
        };
        h.appendChild(t); h.appendChild(addBtn);
        var cs = el('div', 'cards');
        wireDropZone(cs);
        l.appendChild(h); l.appendChild(cs);
        matrixEl.appendChild(l);
    });
}

function ensureSchedule() {
    if (slotsRoot.querySelector('.goal-slot')) return;
    var goalSlot = el('section', 'list goal-slot');
    goalSlot.dataset.type = 'goal';
    var goalHead = el('div', 'head');
    var goalLabel = el('span', 'goal-label'); goalLabel.textContent = '🎯 OBJETIVO DO DIA';
    var goalAdd = el('button', 'add-btn-minimal');
    goalAdd.textContent = '+';
    goalAdd.onclick = function (e) {
        e.stopPropagation();
        var card = createCard({ text: '', when: getActiveDay() + 'TGOAL' });
        goalSlot.querySelector('.cards').prepend(card);
        startInlineEdit(card, true);
    };
    goalHead.appendChild(goalLabel); goalHead.appendChild(goalAdd);
    goalSlot.appendChild(goalHead);
    var goalCards = el('div', 'cards');
    goalSlot.appendChild(goalCards);
    wireDropZone(goalSlot);
    slotsRoot.appendChild(goalSlot);

    var unscheduledSlot = el('section', 'list unscheduled-slot');
    unscheduledSlot.dataset.type = 'unscheduled';
    unscheduledSlot.id = 'unscheduled-bucket';
    var uHead = el('div', 'head');
    var uLabel = el('span', 'unscheduled-label'); uLabel.textContent = '⚠️ HORÁRIO A DEFINIR';
    var uAdd = el('button', 'add-btn-minimal');
    uAdd.textContent = '+';
    uAdd.onclick = function (e) {
        e.stopPropagation();
        var card = createCard({ text: '', when: getActiveDay() + 'T' });
        unscheduledSlot.querySelector('.cards').prepend(card);
        startInlineEdit(card, true);
        updateSlotsHasItems();
    };
    uHead.appendChild(uLabel); uHead.appendChild(uAdd);
    unscheduledSlot.appendChild(uHead);
    var uCards = el('div', 'cards');
    unscheduledSlot.appendChild(uCards);
    wireDropZone(unscheduledSlot);
    slotsRoot.appendChild(unscheduledSlot);

    for (var h = 6; h <= 23; h++) {
        for (var m = 0; m <= 30; m += 30) {
            if (h === 23 && m === 30) break;
            var t = to2(h) + ':' + to2(m);
            var slot = el('section', 'list slot');
            slot.dataset.type = 'time'; slot.dataset.time = t;
            var head = el('div', 'head');
            var label = el('span', 'time'); label.textContent = t;
            head.appendChild(label);
            slot.appendChild(head);
            var cards = el('div', 'cards');
            slot.appendChild(cards);
            wireDropZone(slot);
            slotsRoot.appendChild(slot);
        }
    }
    var date = document.getElementById('agendaDate');
    if (date && !date.value) { date.value = new Date().toISOString().slice(0, 10); }
}

const addUnscheduledBtn = document.getElementById('addUnscheduledBtn');
if (addUnscheduledBtn) {
    addUnscheduledBtn.onclick = function () {
        const unscheduledSlot = document.getElementById('unscheduled-bucket');
        if (unscheduledSlot) {
            var card = createCard({ text: '', when: getActiveDay() + 'T' });
            unscheduledSlot.querySelector('.cards').prepend(card);
            startInlineEdit(card, true);
            updateSlotsHasItems();
        }
    };
}

function getActiveDay() { var i = document.getElementById('agendaDate'); return (i && i.value) ? i.value : new Date().toISOString().slice(0, 10); }

function updateListHeaderTooltips() {
    const isTodosBoard = (currentBoardId === 'board-todos');
    const lists = $$('.board .list[data-type="kanban"]');
    lists.forEach(list => {
        const header = list.querySelector('header');
        const titleInp = list.querySelector('.title');
        if (!header) return;
        
        if (!isTodosBoard) {
            header.removeAttribute('title');
            if (titleInp) titleInp.removeAttribute('title');
            return;
        }
        
        const cards = list.querySelectorAll('.card');
        const boardIds = new Set();
        cards.forEach(c => {
            if (c.dataset.boardId) {
                boardIds.add(c.dataset.boardId);
            }
        });
        
        if (boardIds.size === 0) {
            const defaultMsg = "Sem cartões";
            header.title = defaultMsg;
            if (titleInp) titleInp.title = defaultMsg;
        } else {
            const boardNames = Array.from(boardIds).map(bId => {
                const board = boardsMeta.find(b => b.id === bId);
                return board ? board.name : "Quadro Desconhecido";
            });
            boardNames.sort();
            const tooltipText = "Quadros nesta lista: " + boardNames.join(', ');
            header.title = tooltipText;
            if (titleInp) titleInp.title = tooltipText;
        }
    });
}

function updateSlotsHasItems() {
    const day = getActiveDay();
    const dayPrefixGoal = day + 'TGOAL';
    const dayPrefixTime = day + 'T';
    const visibleCardsInSlots = new Set();

    const goalSlot = slotsRoot.querySelector('.goal-slot');
    const goalCardsContainer = goalSlot.querySelector('.cards');
    goalCardsContainer.innerHTML = '';
    let goalHasVisible = false;
    allCards.forEach(card => {
        if (card.dataset.when === dayPrefixGoal && cardPassesFilters(card)) {
            goalCardsContainer.appendChild(card);
            goalHasVisible = true;
            visibleCardsInSlots.add(card);
        }
    });
    goalSlot.classList.toggle('has-items', goalHasVisible);

    const unscheduledSlot = document.getElementById('unscheduled-bucket');
    const unscheduledContainer = unscheduledSlot.querySelector('.cards');
    unscheduledContainer.innerHTML = '';
    let unscheduledHasVisible = false;
    const exactUnscheduledMatch = day + 'T';
    allCards.forEach(card => {
        if (card.dataset.when === exactUnscheduledMatch && cardPassesFilters(card)) {
            unscheduledContainer.appendChild(card);
            unscheduledHasVisible = true;
            visibleCardsInSlots.add(card);
        }
    });
    if (unscheduledHasVisible) {
        unscheduledSlot.classList.add('has-items');
        unscheduledSlot.style.display = 'flex';
    } else {
        unscheduledSlot.classList.remove('has-items');
        unscheduledSlot.style.display = 'none';
    }

    $$('.list.slot', schedule).forEach(function (slot) {
        if (slot.id === 'unscheduled-bucket') return;
        const time = slot.dataset.time;
        const cardsContainer = slot.querySelector('.cards');
        cardsContainer.innerHTML = '';
        let slotHasVisible = false;
        const targetWhen = dayPrefixTime + time;
        allCards.forEach(card => {
            if (card.dataset.when === targetWhen && cardPassesFilters(card)) {
                cardsContainer.appendChild(card);
                slotHasVisible = true;
                visibleCardsInSlots.add(card);
            }
        });
        slot.classList.toggle('has-items', slotHasVisible);
    });

    $$('.board .card, .matrix .card').forEach(card => {
        if (visibleCardsInSlots.has(card)) {
            card.style.display = 'none';
        } else if (cardPassesFilters(card)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    updateTotalTimerDisplay();
    updateListHeaderTooltips();
    if (typeof renderWeeklyView === 'function') renderWeeklyView(); else if (typeof window.renderWeeklyView === 'function') window.renderWeeklyView();
}

var selectedColors = new Set();
function parseTime(timeStr) {
    if (!timeStr) return 0;
    var totalMinutes = 0;
    var hoursMatch = timeStr.match(/(\d+)\s*h/);
    var minutesMatch = timeStr.match(/(\d+)\s*m/);
    if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;
    if (minutesMatch) totalMinutes += parseInt(minutesMatch[1], 10);
    if (!hoursMatch && !minutesMatch && /^\d+$/.test(timeStr)) totalMinutes = parseInt(timeStr, 10);
    return totalMinutes;
}
function cardPassesFilters(c) {
    var fFrom = (document.getElementById('fFrom').value) || '';
    var fTo = (document.getElementById('fTo').value) || '';
    var fTime = document.getElementById('fTime').value;
    var ok = true;
    if (selectedColors.size > 0) { ok = ok && selectedColors.has((c.dataset.labelColor || '').toLowerCase()); }
    if (fFrom) { ok = ok && (!!c.dataset.due && c.dataset.due >= fFrom); }
    if (fTo) { ok = ok && (!!c.dataset.due && c.dataset.due <= fTo); }
    if (fTime) {
        var maxMins = parseTime(fTime);
        var cardMins = Math.round(parseInt(c.dataset.timerTotal || '0', 10) / 60);
        ok = ok && (cardMins > 0 && cardMins <= maxMins);
    }
    return ok;
}

function applyFilters() {
    let visibleCount = 0;
    allCards.forEach(function (c) {
        const passesGeneralFilters = cardPassesFilters(c);
        if (!c.dataset.when || !c.dataset.when.includes('T')) {
            c.style.display = passesGeneralFilters ? '' : 'none';
        }
        if (passesGeneralFilters) visibleCount++;
    });
    updateSlotsHasItems();
    updateFiltersUi(allCards.length, $$('.card[style*="display: none"]').length);
    updateTotalTimerDisplay();
}

var ctxTarget = null;
var ctx = document.getElementById('ctx');
var ctxMoveSub = document.getElementById('ctx-move-sub');
var ctxMoveAllSub = document.getElementById('ctx-moveall-sub');
var ctxMoveBoardSub = document.getElementById('ctx-move-board-sub');
var listCtxTarget = null; var listCtx = document.getElementById('ctx-list'); var listMoveSub = document.getElementById('ctx-list-move-sub');
var listMoveBoardSub = document.getElementById('ctx-list-move-board-sub');

function hideCtx() {
    ctx.style.display = 'none'; ctxTarget = null;
    ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';
    $$('.board-nested-sub', ctx).forEach(el => el.style.display = 'none');
}
function showCtx(x, y, card) {
    ctxTarget = card;
    buildMoveSubmenu(); buildMoveBoardSubmenu();
    ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';
    $$('.board-nested-sub', ctx).forEach(el => el.style.display = 'none');
    ctx.style.display = 'block';
    var r = ctx.getBoundingClientRect();
    ctx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px';
    ctx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px';
}

document.addEventListener('mousedown', function (e) {
    if (ctx && ctx.style.display === 'block') {
        if (!ctx.contains(e.target) && !e.target.closest('.kebab')) {
            hideCtx();
        }
    }
    if (listCtx && listCtx.style.display === 'block') {
        if (!listCtx.contains(e.target) && !e.target.closest('.more')) {
            listCtx.style.display = 'none';
            listCtxTarget = null;
        }
    }
});

function updateFiltersUi(totalCards, hiddenCardsCount) {
    var badge = document.getElementById('filtersOn');
    var header = document.getElementById('appHeader');
    const anyActive = selectedColors.size > 0 || !!document.getElementById('fFrom').value || !!document.getElementById('fTo').value || !!document.getElementById('fTime').value;
    if (anyActive) {
        badge.textContent = hiddenCardsCount > 0 ? ('Filtros: ' + hiddenCardsCount + ' oculto' + (hiddenCardsCount > 1 ? 's' : '')) : 'Filtros ativos';
        badge.hidden = false;
        header.classList.add('filters-active');
    } else {
        badge.hidden = true;
        header.classList.remove('filters-active');
    }
}

function buildMoveBoardSubmenu() {
    ctxMoveBoardSub.innerHTML = '';
    $$('.board-nested-sub', ctx).forEach(el => el.remove());

    boardsMeta.forEach(b => {
        if (b.id === currentBoardId) return;
        
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.style.width = '100%';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.justifyContent = 'space-between';
        btn.innerHTML = `${b.name} <span style="font-size:10px">▶</span>`;

        const nestedSub = document.createElement('div');
        nestedSub.className = 'ctx-sub board-nested-sub';
        nestedSub.style.display = 'none';
        ctx.appendChild(nestedSub);

        btn.onclick = function (e) {
            e.stopPropagation();
            const wasVisible = nestedSub.style.display === 'block';
            
            $$('.board-nested-sub', ctx).forEach(d => d.style.display = 'none');

            if (!wasVisible) {
                if (nestedSub.children.length === 0) {
                    const bData = getBoardData(b.id);
                    const kanbanLists = bData.filter(d => d.type === 'kanban');
                    if (kanbanLists.length === 0) {
                        const emptyMsg = document.createElement('div'); 
                        emptyMsg.textContent = '(Vazio)'; 
                        emptyMsg.style.padding = '8px'; 
                        emptyMsg.style.color = '#777'; 
                        nestedSub.appendChild(emptyMsg);
                    } else {
                        kanbanLists.forEach(l => {
                            const lBtn = document.createElement('button'); 
                            lBtn.type = 'button';
                            lBtn.textContent = l.title || 'Sem título';
                            lBtn.onclick = function (ev) { 
                                ev.stopPropagation(); 
                                moveCardToBoard(ctxTarget, b.id, l.title); 
                                hideCtx(); 
                            };
                            nestedSub.appendChild(lBtn);
                        });
                    }
                }
                
                const btnRect = btn.getBoundingClientRect();
                const ctxRect = ctx.getBoundingClientRect();
                
                nestedSub.style.display = 'block';
                
                let leftPos = btnRect.right - ctxRect.left;
                let topPos = btnRect.top - ctxRect.top;
                
                nestedSub.style.left = leftPos + 'px';
                nestedSub.style.top = topPos + 'px';
                
                const subRect = nestedSub.getBoundingClientRect();
                if (subRect.right > window.innerWidth) {
                    nestedSub.style.left = (btnRect.left - ctxRect.left - subRect.width) + 'px';
                }
                if (subRect.bottom > window.innerHeight) {
                    nestedSub.style.top = (btnRect.bottom - ctxRect.top - subRect.height) + 'px';
                }
            }
        };
        ctxMoveBoardSub.appendChild(btn);
    });
    if (ctxMoveBoardSub.children.length === 0) {
        const msg = document.createElement('div'); msg.textContent = 'Nenhum outro quadro.'; msg.style.padding = '10px'; msg.style.color = '#777'; ctxMoveBoardSub.appendChild(msg);
    }
}

function addMoveButton(targetListElement, name, submenuContainer) {
    var b = el('button'); b.textContent = name;
    b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        var block = getSelectionOr(ctxTarget);
        if (!block.length) return;
        var destContainer = targetListElement.querySelector('.cards') || targetListElement;
        var isAgendaDrop = targetListElement.closest('#agenda-sidebar');
        applyWhen(targetListElement, block);
        
        let targetListTitle = 'Agenda/Outro';
        const listEl = targetListElement.closest('.list');
        if (listEl) {
            const titleInp = listEl.querySelector('.title');
            targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || listEl.dataset.time || 'Agenda');
        }
        block.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + '" via Menu'); });

        if (!isAgendaDrop) { block.forEach(function (cardElement) { destContainer.appendChild(cardElement); }); }
        updateSlotsHasItems(); persist(); applyFilters(); hideCtx();
    });
    submenuContainer.appendChild(b);
}

function buildMoveAllSubmenu(fromList) {
    ctxMoveAllSub.innerHTML = '';
    $$('.list').forEach(function (l, i) {
        if (l === fromList) return;
        addMoveAllButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || l.dataset.quad || l.dataset.time || ('Lista ' + (i + 1)), ctxMoveAllSub, fromList);
    });
    const goalSlot = slotsRoot.querySelector('.goal-slot');
    if (goalSlot && goalSlot !== fromList) addMoveAllButton(goalSlot, '🎯 OBJETIVO DO DIA', ctxMoveAllSub, fromList);
}

function addMoveAllButton(targetListElement, name, submenuContainer, sourceListElement) {
    var b = el('button'); b.textContent = name;
    b.addEventListener('click', function (ev) {
        ev.stopPropagation();
        const sourceCardsContainer = sourceListElement.querySelector('.cards');
        if (!sourceCardsContainer) return;
        const cardsToMove = Array.from(sourceCardsContainer.querySelectorAll('.card'));
        if (!cardsToMove.length) return;
        var destContainer = targetListElement.querySelector('.cards') || targetListElement;
        var isAgendaDrop = targetListElement.closest('#agenda-sidebar');
        applyWhen(targetListElement, cardsToMove);
        
        let targetListTitle = 'Agenda/Outro';
        const listEl = targetListElement.closest('.list');
        if (listEl) {
            const titleInp = listEl.querySelector('.title');
            targetListTitle = titleInp ? titleInp.value : (listEl.dataset.quad || listEl.id || listEl.dataset.time || 'Agenda');
        }
        cardsToMove.forEach(function (n) { addCardHistory(n, 'Movido para a lista "' + targetListTitle + '" via Menu'); });

        if (!isAgendaDrop) { cardsToMove.forEach(function (cardElement) { destContainer.appendChild(cardElement); }); }
        else { cardsToMove.forEach(c => c.remove()); }
        updateSlotsHasItems(); persist(); applyFilters(); hideCtx();
    });
    submenuContainer.appendChild(b);
}

function smartPositionSubmenu(btnElement, submenuElement) {
    const ctxMenu = submenuElement.closest('.ctx');
    if (ctxMenu) {
        ctxMenu.querySelectorAll('div[style*="position:relative"]').forEach(div => {
            div.style.zIndex = '';
        });
    }
    const parentDiv = submenuElement.parentElement;
    if (parentDiv && parentDiv.style.position === 'relative') {
        parentDiv.style.zIndex = '100';
    }

    submenuElement.classList.remove('flip-left');
    submenuElement.style.display = 'block';
    submenuElement.style.top = '0';
    const rect = submenuElement.getBoundingClientRect();
    if (rect.right > window.innerWidth) submenuElement.classList.add('flip-left');
    if (rect.bottom > window.innerHeight) submenuElement.style.top = `-${rect.bottom - window.innerHeight + 10}px`;
}

ctx.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var action = btn.dataset.action;
    var block = getSelectionOr(ctxTarget);
    if (action === 'move') {
        const isClosed = ctxMoveSub.style.display === 'none';
        ctxMoveAllSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';
        if (isClosed) smartPositionSubmenu(btn, ctxMoveSub); else ctxMoveSub.style.display = 'none';
        return;
    }
    if (action === 'move-all') {
        var list = (ctxTarget || block[0]) ? (ctxTarget || block[0]).closest('.list') : null;
        if (!list) return;
        buildMoveAllSubmenu(list);
        const isClosed = ctxMoveAllSub.style.display === 'none';
        ctxMoveSub.style.display = 'none'; ctxMoveBoardSub.style.display = 'none';
        if (isClosed) smartPositionSubmenu(btn, ctxMoveAllSub); else ctxMoveAllSub.style.display = 'none';
        return;
    }
    if (action === 'move-board') {
        const isClosed = ctxMoveBoardSub.style.display === 'none';
        ctxMoveSub.style.display = 'none'; ctxMoveAllSub.style.display = 'none';
        if (isClosed) smartPositionSubmenu(btn, ctxMoveBoardSub); else ctxMoveBoardSub.style.display = 'none';
        return;
    }
    hideCtx();
    if (action === 'edit') { if (block.length) startInlineEdit(block[0]); }
    else if (action === 'prop') { showPropertiesDialog(block[0]); }
    else if (action === 'dup') { duplicateCards(block); }
    else if (action === 'del') { block.forEach(function (n) { removeCard(n); }); }
    else if (action === 'color') { openColorDialog(block); }
    else if (action === 'date') { openDateDialog(block); }
    else if (action === 'timer') { openTimerDialog(block); }
    else if (action === 'agenda') { openAgendaDialog(block[0]); }
    else if (action === 'alert') { openAlertDialog(block[0]); }
    else if (action === 'gemini-subtasks') { generateSubtasks(block); }
    else if (action === 'gemini-organize') { organizeCardWithGemini(block); }
    else if (action === 'select-mode') { if (!isSelectionMode) toggleSelectionMode(); addSelection(ctxTarget); }
    else if (action === 'del-all') { var list2 = (ctxTarget || block[0]) ? (ctxTarget || block[0]).closest('.list') : null; if (!list2) return; showConfirm('Excluir TODOS os cartões desta lista?', function () { $$('.card', list2).forEach(function (c) { removeCard(c); }); }); }
});

function showPropertiesDialog(card) {
    if (!card) return;
    showModal('Propriedades do Cartão', function() {
        const wrap = el('div');
        wrap.style.textAlign = 'left';
        wrap.style.fontSize = '14px';
        wrap.style.lineHeight = '1.5';
        
        let hist = [];
        try { hist = JSON.parse(card.dataset.history || '[]'); } catch(e) {}
        
        if (hist.length === 0) {
            const fallBackStr = el('div');
            fallBackStr.style.color = '#ccc';
            fallBackStr.textContent = 'Sem registros de histórico. (Cartão legado)';
            wrap.appendChild(fallBackStr);
        } else {
            const ul = el('ul');
            ul.style.paddingLeft = '20px';
            ul.style.color = '#cfe0ff';
            ul.style.margin = '0';
            
            hist.forEach(h => {
                const li = el('li');
                const dateStr = new Date(h.time).toLocaleString();
                li.innerHTML = `<strong>${h.action}</strong> <br><span style="font-size:12px;color:#9fb3d2">📅 ${dateStr}</span>`;
                li.style.marginBottom = '8px';
                ul.appendChild(li);
            });
            wrap.appendChild(ul);
        }
        
        return wrap;
    }, function() {});
}

function showListCtx(x, y, list) { listCtxTarget = list; buildListMoveSub(); listMoveSub.style.display = 'none'; listCtx.style.display = 'block'; var r = listCtx.getBoundingClientRect(); listCtx.style.left = Math.min(x, innerWidth - r.width - 8) + 'px'; listCtx.style.top = Math.min(y, innerHeight - r.height - 8) + 'px'; }
function buildListMoveSub() {
    listMoveSub.innerHTML = '';
    if (!listCtxTarget) return;
    $$('.list').forEach(function (l, i) {
        if (l === listCtxTarget) return;
        addMoveAllButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || l.dataset.quad || l.dataset.time || ('Lista ' + (i + 1)), listMoveSub, listCtxTarget);
    });
    const goalSlot = slotsRoot.querySelector('.goal-slot');
    if (goalSlot && goalSlot !== listCtxTarget) addMoveAllButton(goalSlot, '🎯 OBJETIVO DO DIA', listMoveSub, listCtxTarget);
}
function buildMoveSubmenu() {
    ctxMoveSub.innerHTML = '';
    $$('.list[data-type="kanban"]', boardEl).forEach(function (l, i) { addMoveButton(l, (l.querySelector('.title') ? l.querySelector('.title').value : null) || ('Lista ' + (i + 1)), ctxMoveSub); });
    const matrixLabels = { 'Q1': 'Q1 - FAÇA AGORA', 'Q2': 'Q2 - AGENDE', 'Q3': 'Q3 - DELEGUE', 'Q4': 'Q4 - ELIMINE' };
    $$('.list[data-type="quad"]', matrixEl).forEach(function (l) { addMoveButton(l, matrixLabels[l.dataset.quad] || l.dataset.quad, ctxMoveSub); });
    const goalSlot = slotsRoot.querySelector('.goal-slot');
    if (goalSlot) addMoveButton(goalSlot, '🎯 OBJETIVO DO DIA', ctxMoveSub);
    $$('.list[data-type="time"]', schedule).forEach(function (l) { addMoveButton(l, l.dataset.time, ctxMoveSub); });
}
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
