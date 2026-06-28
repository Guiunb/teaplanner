// ===== INITIALIZATION =====
const toggleAgendaBtn = document.getElementById('toggleAgendaBtn');
const workspaceEl = document.querySelector('.workspace');
const AGENDA_STATE_KEY = 'mini-trello-agenda-state';
const toggleBoardBtn = document.getElementById('toggleBoardBtn');
const toggleMatrixBtn = document.getElementById('toggleMatrixBtn');
const boardContainer = document.querySelector('.board-container');
const matrixContainer = document.querySelector('.matrix-container');
const agendaSidebar = document.getElementById('agenda-sidebar');
const mainContent = document.getElementById('main-content');
const weeklyContainer = document.querySelector('.weekly-container');
const weeklyGrid = document.getElementById('weeklyGrid');
const toggleWeeklyBtn = document.getElementById('toggleWeeklyBtn');
const BOARD_STATE_KEY = 'mini-trello-board-state';
const MATRIX_STATE_KEY = 'mini-trello-matrix-state';
const WEEKLY_STATE_KEY = 'mini-trello-weekly-state';
const quickConfigToggle = document.getElementById('quickConfigToggle');
const quickConfigToggleBtn = quickConfigToggle.nextElementSibling;

function saveState() {
    localStorage.setItem(AGENDA_STATE_KEY, agendaSidebar.classList.contains('collapsed') ? 'collapsed' : 'open');
    localStorage.setItem(BOARD_STATE_KEY, boardContainer.classList.contains('collapsed') ? 'collapsed' : 'open');
    localStorage.setItem(MATRIX_STATE_KEY, matrixContainer.classList.contains('collapsed') ? 'collapsed' : 'open');
    localStorage.setItem(WEEKLY_STATE_KEY, weeklyContainer.classList.contains('collapsed') ? 'collapsed' : 'open');
}

function loadState() {
    const agendaState = localStorage.getItem(AGENDA_STATE_KEY);
    const boardState = localStorage.getItem(BOARD_STATE_KEY);
    const matrixState = localStorage.getItem(MATRIX_STATE_KEY);
    const quickConfigState = localStorage.getItem(LS_QUICK_CONFIG_KEY);

    if (agendaState === 'collapsed') { agendaSidebar.classList.add('collapsed'); workspaceEl.classList.add('agenda-collapsed'); toggleAgendaBtn.classList.remove('active'); }
    else { agendaSidebar.classList.remove('collapsed'); workspaceEl.classList.remove('agenda-collapsed'); toggleAgendaBtn.classList.add('active'); }

    if (boardState === 'collapsed') { boardContainer.classList.add('collapsed'); mainContent.classList.add('board-collapsed'); toggleBoardBtn.classList.remove('active'); }
    else { boardContainer.classList.remove('collapsed'); mainContent.classList.remove('board-collapsed'); toggleBoardBtn.classList.add('active'); }

    if (matrixState === 'collapsed') { matrixContainer.classList.add('collapsed'); mainContent.classList.add('matrix-collapsed'); toggleMatrixBtn.classList.remove('active'); }
    else { matrixContainer.classList.remove('collapsed'); mainContent.classList.remove('matrix-collapsed'); toggleMatrixBtn.classList.add('active'); }

    if (quickConfigState === 'true') { quickConfigToggle.checked = true; quickConfigToggleBtn.textContent = 'ON'; }
    else { quickConfigToggle.checked = false; quickConfigToggleBtn.textContent = 'OFF'; }
}

const weeklyState = localStorage.getItem(WEEKLY_STATE_KEY);
if (weeklyState === 'open') { weeklyContainer.classList.remove('collapsed'); toggleWeeklyBtn.classList.add('active'); renderWeeklyView(); }
else { weeklyContainer.classList.add('collapsed'); toggleWeeklyBtn.classList.remove('active'); }

toggleBoardBtn.addEventListener('click', () => { boardContainer.classList.toggle('collapsed'); mainContent.classList.toggle('board-collapsed'); toggleBoardBtn.classList.toggle('active'); saveState(); });
toggleMatrixBtn.addEventListener('click', () => { matrixContainer.classList.toggle('collapsed'); mainContent.classList.toggle('matrix-collapsed'); toggleMatrixBtn.classList.toggle('active'); saveState(); });
toggleAgendaBtn.addEventListener('click', () => { agendaSidebar.classList.toggle('collapsed'); workspaceEl.classList.toggle('agenda-collapsed'); toggleAgendaBtn.classList.toggle('active'); saveState(); });
toggleWeeklyBtn.addEventListener('click', () => { weeklyContainer.classList.toggle('collapsed'); toggleWeeklyBtn.classList.toggle('active'); if (!weeklyContainer.classList.contains('collapsed')) { renderWeeklyView(); } saveState(); });
document.getElementById('toggleSelectionModeBtn').onclick = toggleSelectionMode;
quickConfigToggle.addEventListener('change', () => { const isChecked = quickConfigToggle.checked; quickConfigToggleBtn.textContent = isChecked ? 'ON' : 'OFF'; localStorage.setItem(LS_QUICK_CONFIG_KEY, isChecked); });

document.getElementById('addList').onclick = function () { createList('Nova lista'); persist(); };
document.getElementById('filterColorsBtn').addEventListener('click', openColorFilters);
document.getElementById('undo').onclick = doUndo; document.getElementById('redo').onclick = doRedo;
document.getElementById('clearFilters').onclick = function () { selectedColors.clear(); document.getElementById('fFrom').value = ''; document.getElementById('fTo').value = ''; document.getElementById('fTime').value = ''; applyFilters(); };

// Eventos dos submenus e dropdowns
document.getElementById('menuNewBoard').onclick = () => { const name = prompt('Nome do novo quadro:'); if (name) createNewBoard(name); };
document.getElementById('menuRenameBoard').onclick = renameBoard;
document.getElementById('menuCloneBoard').onclick = cloneBoard;
document.getElementById('menuDeleteBoard').onclick = deleteBoard;
document.getElementById('menuBoardTheme').onclick = openBoardThemePicker;
document.getElementById('menuExportJson').onclick = exportBackup;
document.getElementById('menuImportJson').onclick = () => document.getElementById('importFile').click();
document.getElementById('menuCloudBackups').onclick = () => {
    if (isFirebaseReady && auth && auth.currentUser) {
        openCloudBackupsDialog(auth.currentUser.uid);
    } else {
        alert("Você precisa estar logado com o Google para usar os backups na nuvem.");
    }
};

document.getElementById('importFile').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) importBackup(file);
    e.target.value = '';
});

document.getElementById('boardSelect').onchange = (e) => switchBoard(e.target.value);

// Controle de Dropdowns (mobile friendly & click outside)
document.querySelectorAll('.header-dropdown-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        const parent = this.parentElement;
        document.querySelectorAll('.header-dropdown').forEach(d => {
            if (d !== parent) d.classList.remove('active');
        });
        parent.classList.toggle('active');
    });
});
document.addEventListener('click', function() {
    document.querySelectorAll('.header-dropdown').forEach(d => {
        d.classList.remove('active');
    });
});


const agendaDateInput = document.getElementById('agendaDate');
function changeDay(days) { let currentDate = new Date(agendaDateInput.value + 'T12:00:00'); currentDate.setDate(currentDate.getDate() + days); agendaDateInput.value = currentDate.toISOString().slice(0, 10); applyFilters(); }
document.getElementById('prevDayBtn').addEventListener('click', () => changeDay(-1));
document.getElementById('nextDayBtn').addEventListener('click', () => changeDay(1));
agendaDateInput.addEventListener('change', applyFilters);

boardEl.addEventListener('wheel', (e) => { if (e.altKey) { e.preventDefault(); boardEl.scrollLeft += e.deltaY; } });

// Scroll Drag logic
const mainScrollContainer = document.getElementById('main-content');
let scrollSpeed = { x: 0, y: 0 };
let scrollFrame = null;
function performAutoScroll() {
    if (scrollSpeed.x === 0 && scrollSpeed.y === 0) { scrollFrame = null; return; }
    mainScrollContainer.scrollBy(scrollSpeed.x, scrollSpeed.y);
    scrollFrame = requestAnimationFrame(performAutoScroll);
}
function applyDragScroll() {
    const containers = [document.getElementById('board'), document.getElementById('main-content'), document.getElementById('slots')];
    containers.forEach(container => {
        if (!container) return;
        let isDown = false; let startX, startY, scrollLeft, scrollTop;
        container.addEventListener('mousedown', (e) => {
            if (e.target.closest('.card') || e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || e.target.closest('.header-icon')) return;
            isDown = true; container.style.cursor = 'grabbing'; startX = e.pageX; startY = e.pageY; scrollLeft = container.scrollLeft; scrollTop = container.scrollTop;
        });
        const stopDrag = () => { if (isDown) { isDown = false; container.style.cursor = 'grab'; } };
        container.addEventListener('mouseleave', stopDrag); container.addEventListener('mouseup', stopDrag);
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return; e.preventDefault();
            const x = e.pageX; const y = e.pageY; const walkX = (x - startX) * 1; const walkY = (y - startY) * 1;
            container.scrollLeft = scrollLeft - walkX; container.scrollTop = scrollTop - walkY;
        });
    });
}

document.getElementById('copyDayBtn').addEventListener('click', function () {
    const day = getActiveDay();
    agendaClipboard = allCards.filter(c => (c.dataset.when || '').startsWith(day + 'T')).map(c => ({ ...cardToData(c), timeOrGoal: (c.dataset.when || '').substring(11) }));
    const btn = document.getElementById('copyDayBtn'); btn.textContent = 'Copiado!'; setTimeout(() => { btn.textContent = '📋'; }, 1000);
});
document.getElementById('pasteDayBtn').addEventListener('click', function () {
    if (agendaClipboard.length === 0) { const btn = document.getElementById('pasteDayBtn'); btn.textContent = 'Vazio!'; setTimeout(() => { btn.textContent = '📥'; }, 1000); return; }
    const day = getActiveDay();
    agendaClipboard.forEach(cardData => {
        const newData = { ...cardData }; newData.when = day + 'T' + newData.timeOrGoal;
        const existsInCache = allCards.some(c => c.dataset.when === newData.when && c.querySelector('.text').textContent.trim() === newData.text.trim());
        if (!existsInCache) createCard(newData);
    });
    updateSlotsHasItems(); persist();
});

$$('#fFrom, #fTo, #fTime').forEach(function (el) { el.addEventListener('input', applyFilters); });

document.addEventListener('keydown', function (e) {
    if (document.body.classList.contains('focus-mode')) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            e.preventDefault();
            document.body.classList.remove('manual-focus-mode', 'focus-mode');
            return;
        }
        if ((e.ctrlKey || e.metaKey) && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
            if (focusActiveCard) {
                e.preventDefault();
                
                // If sort is active, reset it to default
                const sortSelect = document.getElementById('focusSortSelect');
                if (sortSelect && sortSelect.value !== 'default') {
                    sortSelect.value = 'default';
                }
                
                const cardMap = new Map();
                document.querySelectorAll('.card:not(.mirror-card)').forEach(c => {
                    const id = c.dataset.id;
                    const total = parseInt(c.dataset.timerTotal || '0', 10);
                    if (id && total > 0 && c.dataset.completed !== 'true') {
                        cardMap.set(id, c);
                    }
                });
                const timerCards = Array.from(cardMap.values());
                const filtered = timerCards.filter(c => {
                    if (focusFilterMode === 'active') {
                        return c.dataset.timerState === 'paused';
                    }
                    return true;
                });
                
                const idx = filtered.indexOf(focusActiveCard);
                if (idx !== -1) {
                    let targetCard = null;
                    let isAbove = true;
                    
                    if (e.key === 'ArrowUp' && idx > 0) {
                        targetCard = filtered[idx - 1];
                        isAbove = true;
                    } else if (e.key === 'ArrowDown' && idx < filtered.length - 1) {
                        targetCard = filtered[idx + 1];
                        isAbove = false;
                    }
                    
                    if (targetCard) {
                        const targetListEl = targetCard.closest('.list');
                        if (targetListEl) {
                            const sourceListEl = focusActiveCard.closest('.list');
                            if (sourceListEl !== targetListEl) {
                                applyWhen(targetListEl, [focusActiveCard]);
                            }
                            
                            if (isAbove) {
                                targetCard.parentNode.insertBefore(focusActiveCard, targetCard);
                            } else {
                                targetCard.parentNode.insertBefore(focusActiveCard, targetCard.nextSibling);
                            }
                            
                            syncAllCardsOrderFromDOM();
                            updateSlotsHasItems();
                            persist();
                            updateFocusMode();
                        }
                    }
                }
                return;
            }
        }
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? doRedo() : doUndo(); return; }
    
    // AJUSTE: Copiar / Colar / Recortar
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) return;
        e.preventDefault();
        appClipboard = Array.from(selected).map(cardToData);
        return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'x') {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) return;
        e.preventDefault();
        appClipboard = Array.from(selected).map(cardToData);
        selected.forEach(card => removeCard(card));
        clearSelection();
        return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.isContentEditable) return;
        if (appClipboard.length === 0) return;
        e.preventDefault();

        // Tenta achar lista sob o mouse
        const hoveredList = $$('.list').find(l => {
            const r = l.getBoundingClientRect();
            return lastMouseX >= r.left && lastMouseX <= r.right && lastMouseY >= r.top && lastMouseY <= r.bottom;
        });
        
        const targetContainer = hoveredList ? (hoveredList.querySelector('.cards') || hoveredList) : boardEl.querySelector('.list .cards');
        if (targetContainer) {
            appClipboard.forEach(data => {
                const newCard = createCard(data);
                targetContainer.appendChild(newCard);
                if (hoveredList) applyWhen(hoveredList, [newCard]);
            });
            persist(); updateSlotsHasItems();
        }
        return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        if (document.activeElement.tagName === 'INPUT' && document.activeElement.closest('.add')) return;
        e.preventDefault();
        let targetList = null; let insertAfterCard = null;
        if (selected.size > 0) { insertAfterCard = Array.from(selected).pop(); targetList = insertAfterCard.closest('.list'); }
        else {
            const lists = $$('.list');
            targetList = lists.find(l => { if (l.offsetParent === null) return false; const rect = l.getBoundingClientRect(); return lastMouseX >= rect.left && lastMouseX <= rect.right && lastMouseY >= rect.top && lastMouseY <= rect.bottom; });
            if (!targetList || targetList.offsetParent === null) targetList = boardEl.querySelector('.list[data-type="kanban"]');
        }
        if (targetList) {
            const cardsContainer = targetList.querySelector('.cards');
            if (cardsContainer) {
                const newCard = createCard({ text: '' });
                if (insertAfterCard && insertAfterCard.parentElement === cardsContainer) cardsContainer.insertBefore(newCard, insertAfterCard.nextSibling); else cardsContainer.appendChild(newCard);
                applyWhen(targetList, [newCard]); persist(); updateTotalTimerDisplay(); startInlineEdit(newCard, true);
            }
        }
        return;
    }
function getActiveCardForEdit() {
    // 1. Check if there's a visible selected card in the DOM (original or mirror)
    const visibleSelectedCard = Array.from(document.querySelectorAll('.card.selected'))
        .find(c => c.offsetParent !== null);
    if (visibleSelectedCard) {
        return visibleSelectedCard;
    }

    // 2. Fallback to the global selection Set. If the card is mirror-represented in the weekly view, edit the mirror.
    if (selected.size > 0) {
        const firstSelected = Array.from(selected)[0];
        const mirrorCard = Array.from(document.querySelectorAll('.mirror-card'))
            .find(m => m._originalReference === firstSelected && m.offsetParent !== null);
        if (mirrorCard) return mirrorCard;
        return firstSelected;
    }

    // 3. Fallback to the context menu target
    if (ctxTarget) {
        const mirrorCard = Array.from(document.querySelectorAll('.mirror-card'))
            .find(m => m._originalReference === ctxTarget && m.offsetParent !== null);
        if (mirrorCard) return mirrorCard;
        return ctxTarget;
    }

    // 4. Fallback to the active card in Focus Mode
    if (document.body.classList.contains('focus-mode') && focusActiveCard) {
        if (focusActiveCard.offsetParent !== null) return focusActiveCard;
        const mirrorCard = Array.from(document.querySelectorAll('.mirror-card'))
            .find(m => m._originalReference === focusActiveCard && m.offsetParent !== null);
        if (mirrorCard) return mirrorCard;
        return focusActiveCard;
    }

    return null;
}

    var currentSelection = getSelectionOr(ctxTarget);
    const activeEl = document.activeElement;
    const isEditingCard = activeEl.isContentEditable && activeEl.classList.contains('text') && activeEl.closest('.card');
    if (e.key === 'F2') {
        if (activeEl.closest('.modal') || activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') {
            return;
        }
        e.preventDefault();
        if (isEditingCard) {
            activeEl.blur();
        } else {
            const cardToEdit = getActiveCardForEdit();
            if (cardToEdit) {
                startInlineEdit(cardToEdit);
            }
        }
        return;
    }
    if ((activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.closest('.modal')) || (isEditingCard)) {
        if (isEditingCard && (e.key === 'Delete' || e.key === 'Backspace') && activeEl.textContent.trim() === '') { e.preventDefault(); const cardToDelete = [activeEl.closest('.card')]; showConfirm('Excluir cartão vazio?', function () { cardToDelete.forEach(n => removeCard(n)); clearSelection(); }); }
        return;
    }
    if (!currentSelection.length && !ctxTarget && (e.key === 'Delete' || e.key === 'Backspace')) return;
    if (currentSelection.length > 0 && e.altKey) {
        if (e.key.toLowerCase() === 't') { e.preventDefault(); openTimerDialog(currentSelection); }
        else if (e.key.toLowerCase() === 'c') { e.preventDefault(); openColorDialog(currentSelection); }
        else if (e.key.toLowerCase() === 'd') { e.preventDefault(); openDateDialog(currentSelection); }
        else if (e.key.toLowerCase() === 'p') { 
            e.preventDefault();
            const activeProps = document.querySelector('.modal-wrap');
            if (activeProps && activeProps.querySelector('h3') && activeProps.querySelector('h3').textContent === 'Propriedades do Cartão') {
                activeProps.remove();
            } else {
                showPropertiesDialog(currentSelection[0]);
            }
        }
        return;
    }
    if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') { e.preventDefault(); duplicateCards(currentSelection); return; }
    if (currentSelection.length > 0 && (e.key === 'Delete' || e.key === 'Backspace')) { e.preventDefault(); showConfirm('Excluir ' + currentSelection.length + ' cartão(s)?', function () { currentSelection.forEach(function (n) { removeCard(n); }); clearSelection(); }); return; }
    if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {
        let moved = false;
        let targetCard = currentSelection[0];
        let parentCards = targetCard.parentElement;
        let parentList = targetCard.closest('.list');

        const EISENHOWER_COLORS = {
            Q1: '#2e7d32', // Green
            Q2: '#1976d2', // Blue
            Q3: '#ffb300', // Yellow
            Q4: '#c62828'  // Red
        };

        // Helpers
        function shiftCardDate(card, days) {
            let when = card.dataset.when || '';
            if (!when) return false;
            let parts = when.split('T');
            let dateStr = parts[0];
            let timeStr = parts[1] || '';
            let date = new Date(dateStr + 'T12:00:00');
            if (isNaN(date.getTime())) return false;
            date.setDate(date.getDate() + days);
            let newDateStr = date.toISOString().split('T')[0];
            card.dataset.when = newDateStr + 'T' + timeStr;
            return true;
        }

        // Shift time helper
        function shiftCardTime(card, minutes) {
            let when = card.dataset.when || '';
            if (!when) return false;
            let parts = when.split('T');
            let dateStr = parts[0];
            let timeStr = parts[1] || '';
            if (!timeStr || timeStr === 'GOAL') return false;
            let timeParts = timeStr.split(':');
            if (timeParts.length < 2) return false;
            let hrs = parseInt(timeParts[0], 10);
            let mins = parseInt(timeParts[1], 10);
            let totalMins = hrs * 60 + mins + minutes;
            if (totalMins < 0) totalMins = 0;
            if (totalMins >= 24 * 60) totalMins = 24 * 60 - 30;
            let newHrs = Math.floor(totalMins / 60);
            let newMins = totalMins % 60;
            let newTimeStr = String(newHrs).padStart(2, '0') + ':' + String(newMins).padStart(2, '0');
            card.dataset.when = dateStr + 'T' + newTimeStr;
            return true;
        }

        // 1. Scheduled cards (Agenda / Weekly View)
        if (targetCard.dataset.when) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                currentSelection.forEach(c => shiftCardDate(c, -1));
                moved = true;
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                currentSelection.forEach(c => shiftCardDate(c, 1));
                moved = true;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (parentCards && parentCards.children.length > 1) {
                    if (e.key === 'ArrowUp') {
                        let previousCard = targetCard.previousElementSibling;
                        if (previousCard) {
                            currentSelection.forEach(card => parentCards.insertBefore(card, previousCard));
                            moved = true;
                        } else {
                            currentSelection.forEach(c => shiftCardTime(c, -30));
                            moved = true;
                        }
                    } else { // ArrowDown
                        let lastCardInSelection = currentSelection[currentSelection.length - 1];
                        let nextCard = lastCardInSelection.nextElementSibling;
                        if (nextCard) {
                            let afterNextCard = nextCard.nextElementSibling;
                            currentSelection.forEach(card => parentCards.insertBefore(card, afterNextCard));
                            moved = true;
                        } else {
                            currentSelection.forEach(c => shiftCardTime(c, 30));
                            moved = true;
                        }
                    }
                } else {
                    if (e.key === 'ArrowUp') {
                        currentSelection.forEach(c => shiftCardTime(c, -30));
                    } else {
                        currentSelection.forEach(c => shiftCardTime(c, 30));
                    }
                    moved = true;
                }
            }
        }
        // 2. Matrix Quadrant cards
        else if (parentList && parentList.dataset.type === 'quad') {
            let quad = parentList.dataset.quad;
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                let previousCard = targetCard.previousElementSibling;
                while (previousCard && previousCard.style.display === 'none') {
                    previousCard = previousCard.previousElementSibling;
                }
                if (previousCard) {
                    currentSelection.forEach(card => parentCards.insertBefore(card, previousCard));
                    moved = true;
                } else {
                    // Transition Up to the quadrant above: Q3 -> Q1, Q4 -> Q2
                    let targetQuad = quad === 'Q3' ? 'Q1' : (quad === 'Q4' ? 'Q2' : null);
                    if (targetQuad) {
                        let destList = document.querySelector(`.list[data-quad="${targetQuad}"]`);
                        if (destList) {
                            let destCards = destList.querySelector('.cards');
                            currentSelection.forEach(c => {
                                c.dataset.labelColor = EISENHOWER_COLORS[targetQuad];
                                destCards.appendChild(c);
                                paintCard(c);
                            });
                            moved = true;
                        }
                    }
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                let lastCardInSelection = currentSelection[currentSelection.length - 1];
                let nextCard = lastCardInSelection.nextElementSibling;
                while (nextCard && nextCard.style.display === 'none') {
                    nextCard = nextCard.nextElementSibling;
                }
                if (nextCard) {
                    let afterNextCard = nextCard.nextElementSibling;
                    currentSelection.forEach(card => parentCards.insertBefore(card, afterNextCard));
                    moved = true;
                } else {
                    // Transition Down to the quadrant below: Q1 -> Q3, Q2 -> Q4
                    let targetQuad = quad === 'Q1' ? 'Q3' : (quad === 'Q2' ? 'Q4' : null);
                    if (targetQuad) {
                        let destList = document.querySelector(`.list[data-quad="${targetQuad}"]`);
                        if (destList) {
                            let destCards = destList.querySelector('.cards');
                            currentSelection.forEach(c => {
                                c.dataset.labelColor = EISENHOWER_COLORS[targetQuad];
                                destCards.insertBefore(c, destCards.firstChild);
                                paintCard(c);
                            });
                            moved = true;
                        }
                    }
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                // Transition Left: Q2 -> Q1, Q4 -> Q3
                let targetQuad = quad === 'Q2' ? 'Q1' : (quad === 'Q4' ? 'Q3' : null);
                if (targetQuad) {
                    let destList = document.querySelector(`.list[data-quad="${targetQuad}"]`);
                    if (destList) {
                        let destCards = destList.querySelector('.cards');
                        currentSelection.forEach(c => {
                            c.dataset.labelColor = EISENHOWER_COLORS[targetQuad];
                            destCards.appendChild(c);
                            paintCard(c);
                        });
                        moved = true;
                    }
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                // Transition Right: Q1 -> Q2, Q3 -> Q4
                let targetQuad = quad === 'Q1' ? 'Q2' : (quad === 'Q3' ? 'Q4' : null);
                if (targetQuad) {
                    let destList = document.querySelector(`.list[data-quad="${targetQuad}"]`);
                    if (destList) {
                        let destCards = destList.querySelector('.cards');
                        currentSelection.forEach(c => {
                            c.dataset.labelColor = EISENHOWER_COLORS[targetQuad];
                            destCards.appendChild(c);
                            paintCard(c);
                        });
                        moved = true;
                    }
                }
            }
        }
        // 3. Kanban cards
        else if (parentList && parentList.dataset.type === 'kanban') {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                let previousCard = targetCard.previousElementSibling;
                while (previousCard && previousCard.style.display === 'none') {
                    previousCard = previousCard.previousElementSibling;
                }
                if (previousCard) {
                    currentSelection.forEach(card => parentCards.insertBefore(card, previousCard));
                    moved = true;
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                let lastCardInSelection = currentSelection[currentSelection.length - 1];
                let nextCard = lastCardInSelection.nextElementSibling;
                while (nextCard && nextCard.style.display === 'none') {
                    nextCard = nextCard.nextElementSibling;
                }
                if (nextCard) {
                    let afterNextCard = nextCard.nextElementSibling;
                    currentSelection.forEach(card => parentCards.insertBefore(card, afterNextCard));
                    moved = true;
                } else {
                    currentSelection.forEach(card => parentCards.appendChild(card));
                    moved = true;
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                let prevList = parentList.previousElementSibling;
                while (prevList && !prevList.matches('.list[data-type="kanban"]')) {
                    prevList = prevList.previousElementSibling;
                }
                if (prevList) {
                    let destCards = prevList.querySelector('.cards');
                    applyWhen(prevList, currentSelection);
                    currentSelection.forEach(card => destCards.appendChild(card));
                    moved = true;
                }
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                let nextList = parentList.nextElementSibling;
                while (nextList && !nextList.matches('.list[data-type="kanban"]')) {
                    nextList = nextList.nextElementSibling;
                }
                if (nextList) {
                    let destCards = nextList.querySelector('.cards');
                    applyWhen(nextList, currentSelection);
                    currentSelection.forEach(card => destCards.appendChild(card));
                    moved = true;
                }
            }
        }

        if (moved) {
            updateSlotsHasItems();
            renderWeeklyView();
            persist();
            applyFilters();
        }
    }
});

document.addEventListener('dragover', (e) => {
    if (!dragState) return;
    const threshold = 100; const speed = 12; const rect = mainScrollContainer.getBoundingClientRect();
    scrollSpeed = { x: 0, y: 0 };
    if (e.clientY < rect.top + threshold) scrollSpeed.y = -speed; else if (e.clientY > rect.bottom - threshold) scrollSpeed.y = speed;
    if (e.clientX < rect.left + threshold) scrollSpeed.x = -speed; else if (e.clientX > rect.right - threshold) scrollSpeed.x = speed;
    if ((scrollSpeed.x !== 0 || scrollSpeed.y !== 0) && !scrollFrame) scrollFrame = requestAnimationFrame(performAutoScroll);
});

function stopScrollParams() { scrollSpeed = { x: 0, y: 0 }; if (scrollFrame) { cancelAnimationFrame(scrollFrame); scrollFrame = null; } }
document.addEventListener('dragend', stopScrollParams); document.addEventListener('drop', stopScrollParams); document.addEventListener('mouseleave', stopScrollParams);

function initDemo() {
    withMute(function () {
        var toDo = createList('Para Fazer');
        toDo.querySelector('.cards').appendChild(createCard({ text: 'Tarefa importante e urgente', color: '#104239', timerTotal: '1800' }));
        createList('Em Andamento'); createList('Feito');
        if (matrixEl) { var q1 = matrixEl.querySelector('.list[data-quad="Q1"] .cards'); q1.appendChild(createCard({ text: 'Crise: Resolver problema no servidor!', color: '#104239', timerTotal: '7200' })); }
        createCard({ text: "Definir meta principal do dia", when: `${getActiveDay()}TGOAL`, timerTotal: '900' });
    });
    applyFilters(); updateSlotsHasItems(); updateTotalTimerDisplay();
}

var focusActiveCard = null;
var focusFilterMode = 'all';
var focusDragSourceCard = null;

// Variáveis Globais de Estado do Treemap
var focusViewMode = 'list'; // 'list' | 'treemap'
var focusSizeCriteria = 'default'; // 'default' | 'age-oldest' | 'age-newest' | 'timer-largest' | 'timer-smallest'
var treemapZoom = 1;
var treemapPanX = 0;
var treemapPanY = 0;

function setupFocusTreemapControls() {
    const listBtn = document.getElementById('focusViewListBtn');
    const treemapBtn = document.getElementById('focusViewTreemapBtn');
    const sortGroup = document.getElementById('focusSortGroup');
    const sizeGroup = document.getElementById('focusSizeGroup');
    const listList = document.getElementById('focusTimersList');
    const treemapContainer = document.getElementById('focusTreemapContainer');
    const sizeSelect = document.getElementById('focusSizeSelect');

    if (listBtn) {
        listBtn.onclick = () => {
            focusViewMode = 'list';
            listBtn.classList.add('active');
            treemapBtn.classList.remove('active');
            sortGroup.style.display = '';
            sizeGroup.style.display = 'none';
            listList.style.display = '';
            treemapContainer.style.display = 'none';
            updateFocusMode();
        };
    }

    if (treemapBtn) {
        treemapBtn.onclick = () => {
            focusViewMode = 'treemap';
            treemapBtn.classList.add('active');
            listBtn.classList.remove('active');
            sortGroup.style.display = 'none';
            sizeGroup.style.display = '';
            listList.style.display = 'none';
            treemapContainer.style.display = 'flex';
            resetTreemapView();
            updateFocusMode();
        };
    }

    if (sizeSelect) {
        sizeSelect.onchange = (e) => {
            focusSizeCriteria = e.target.value;
            updateFocusMode();
        };
    }

    setupTreemapInteractivity();
}

function setupTreemapInteractivity() {
    const container = document.getElementById('focusTreemapContainer');
    const canvas = document.getElementById('focusTreemapCanvas');
    const resetBtn = document.getElementById('focusTreemapResetBtn');
    if (!container || !canvas) return;
    
    let isDragging = false;
    let startX = 0, startY = 0;

    container.onwheel = (e) => {
        e.preventDefault();
        const factor = 1.1;
        let newZoom = treemapZoom;
        if (e.deltaY < 0) {
            newZoom *= factor;
        } else {
            newZoom /= factor;
        }
        newZoom = Math.max(0.5, Math.min(newZoom, 4.0));

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        treemapPanX = mouseX - (mouseX - treemapPanX) * (newZoom / treemapZoom);
        treemapPanY = mouseY - (mouseY - treemapPanY) * (newZoom / treemapZoom);
        treemapZoom = newZoom;

        applyTreemapTransform();
    };

    container.onmousedown = (e) => {
        if (e.target.closest('button') || e.target.closest('input') || e.target.closest('.card') || e.target.closest('.focus-timer-item')) return;
        isDragging = true;
        startX = e.clientX - treemapPanX;
        startY = e.clientY - treemapPanY;
    };

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        treemapPanX = e.clientX - startX;
        treemapPanY = e.clientY - startY;
        applyTreemapTransform();
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    if (resetBtn) {
        resetBtn.onclick = resetTreemapView;
    }
}

function applyTreemapTransform() {
    const canvas = document.getElementById('focusTreemapCanvas');
    if (canvas) {
        canvas.style.transform = `translate(${treemapPanX}px, ${treemapPanY}px) scale(${treemapZoom})`;
    }
}

function resetTreemapView() {
    treemapZoom = 1;
    treemapPanX = 0;
    treemapPanY = 0;
    applyTreemapTransform();
}

function getCardAge(card) {
    try {
        const history = JSON.parse(card.dataset.history || '[]');
        if (history.length > 0 && history[0].time) {
            return history[0].time;
        }
    } catch(e) {}
    if (card.dataset.createdTime) {
        return parseInt(card.dataset.createdTime, 10);
    }
    return Date.now();
}

function calculateSquarifiedTreemap(items, containerRect, onLayoutCard) {
    if (items.length === 0) return;
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const containerArea = containerRect.w * containerRect.h;
    if (totalWeight === 0 || containerArea === 0) return;

    const data = items.map(item => ({
        ...item,
        area: (item.weight / totalWeight) * containerArea
    })).sort((a, b) => b.area - a.area);

    let x = containerRect.x, y = containerRect.y;
    let w = containerRect.w, h = containerRect.h;
    let remaining = [...data];

    while (remaining.length > 0) {
        const side = Math.min(w, h);
        const row = [];
        let rowArea = 0;

        while (remaining.length > 0) {
            const next = remaining[0];
            const nextRowArea = rowArea + next.area;
            const currentRatio = worstRatio(row, side, rowArea);
            const nextRatio = worstRatio([...row, next], side, nextRowArea);

            if (row.length > 0 && nextRatio > currentRatio) break;
            row.push(remaining.shift());
            rowArea = nextRowArea;
        }

        const rowHeight = rowArea / side;
        let offset = 0;

        row.forEach(item => {
            const itemLength = item.area / rowHeight;
            let rx, ry, rw, rh;
            if (w >= h) {
                rx = x; ry = y + offset; rw = rowHeight; rh = itemLength;
            } else {
                rx = x + offset; ry = y; rw = itemLength; rh = rowHeight;
            }
            onLayoutCard(item, { x: rx, y: ry, w: rw, h: rh });
            offset += itemLength;
        });

        if (w >= h) {
            x += rowHeight; w -= rowHeight;
        } else {
            y += rowHeight; h -= rowHeight;
        }
    }
}

function worstRatio(row, side, rowArea) {
    if (row.length === 0) return Infinity;
    let minArea = Infinity, maxArea = -Infinity;
    row.forEach(item => {
        if (item.area < minArea) minArea = item.area;
        if (item.area > maxArea) maxArea = item.area;
    });
    const sideSq = side * side, rowAreaSq = rowArea * rowArea;
    return Math.max((sideSq * maxArea) / rowAreaSq, rowAreaSq / (sideSq * minArea));
}

function renderFocusTreemap(filteredCards) {
    const canvas = document.getElementById('focusTreemapCanvas');
    if (!canvas) return;
    canvas.innerHTML = '';

    const rect = canvas.parentElement.getBoundingClientRect();
    const containerWidth = rect.width || 400;
    const containerHeight = rect.height || 280;

    if (filteredCards.length === 0) return;

    function getCardTimerValue(card) {
        let left = parseInt(card.dataset.timerLeft, 10);
        if (isNaN(left) || left < 0) {
            left = parseInt(card.dataset.timerTotal, 10);
        }
        if (isNaN(left) || left < 0) {
            left = 0;
        }
        return Math.max(left, 1);
    }

    // 1. Extração de Metadados e Cálculo de Pesos
    let items = [];
    if (focusSizeCriteria === 'default') {
        items = filteredCards.map(c => ({ card: c, weight: 1 }));
    } else if (focusSizeCriteria.startsWith('age-')) {
        const ages = filteredCards.map(c => getCardAge(c)).filter(a => !isNaN(a));
        const minAge = ages.length > 0 ? Math.min(...ages) : Date.now();
        const maxAge = ages.length > 0 ? Math.max(...ages) : Date.now();
        const diff = maxAge - minAge;

        items = filteredCards.map(c => {
            const age = getCardAge(c);
            let w = 1;
            if (diff > 0) {
                w = focusSizeCriteria === 'age-oldest' 
                    ? 1 + 49 * ((maxAge - age) / diff) 
                    : 1 + 49 * ((age - minAge) / diff);
            }
            return { card: c, weight: w };
        });
    } else if (focusSizeCriteria.startsWith('timer-')) {
        const timers = filteredCards.map(c => getCardTimerValue(c));
        const minT = Math.min(...timers);
        const maxT = Math.max(...timers);
        const diff = maxT - minT;

        items = filteredCards.map(c => {
            const tVal = getCardTimerValue(c);
            let w = tVal;
            if (focusSizeCriteria === 'timer-smallest') {
                w = diff > 0 ? (maxT + minT - tVal) : 1;
            }
            return { card: c, weight: w };
        });
    }

    // 2. Executa o Layout do Treemap
    calculateSquarifiedTreemap(items, { x: 0, y: 0, w: containerWidth, h: containerHeight }, (item, rect) => {
        const c = item.card;
        
        // Criação de Wrapper absoluto
        const wrapper = document.createElement('div');
        wrapper.className = 'treemap-card-wrapper';
        wrapper.style.left = `${rect.x}px`;
        wrapper.style.top = `${rect.y}px`;
        wrapper.style.width = `${rect.w}px`;
        wrapper.style.height = `${rect.h}px`;

        // Clone interativo do cartão original
        const cardClone = c.cloneNode(true);
        cardClone.className = 'treemap-card';
        cardClone.classList.remove('selected', 'dragging');
        cardClone.removeAttribute('draggable');
        
        if (c === focusActiveCard) {
            cardClone.classList.add('active');
        }

        // Garante aplicação de cor do board
        const cardColor = getBoardColor(c.dataset.boardId) || c.dataset.color;
        if (cardColor) {
            cardClone.style.setProperty('--board-color', cardColor);
        }

        // Associações de eventos interativos
        cardClone.onclick = (e) => {
            if (e.target.closest('.dot') || e.target.closest('.play-pause-btn') || e.target.closest('.timer-display')) return;
            focusActiveCard = c;
            updateFocusMode();
        };

        cardClone.ondblclick = (e) => {
            e.stopPropagation();
            handleCardDblClick(c);
        };

        // Eventos nos botões internos do clone
        const dot = cardClone.querySelector('.dot');
        if (dot) {
            dot.onclick = (e) => {
                e.stopPropagation();
                toggleCardCompletion({ target: dot });
                updateFocusMode();
            };
        }

        const timerDisp = cardClone.querySelector('.timer-display');
        if (timerDisp) {
            timerDisp.onclick = (e) => {
                e.stopPropagation();
                toggleCardTimer(c);
                updateFocusMode();
            };
        }

        // Atualização da exibição interna
        updateTimerDisplay(cardClone);

        wrapper.appendChild(cardClone);
        canvas.appendChild(wrapper);
    });
}

function renderFocusTimersList() {
    const listEl = document.getElementById('focusTimersList');
    if (!listEl) return;
    
    // 1. Gather all unique card elements from allCards that have a timer set and are not completed
    const timerCards = allCards.filter(c => {
        const total = parseInt(c.dataset.timerTotal || '0', 10);
        return total > 0 && c.dataset.completed !== 'true';
    });
    
    // 2. Apply active filter if selected
    const filtered = timerCards.filter(c => {
        if (focusFilterMode === 'active') {
            return c.dataset.timerState === 'paused';
        }
        return true; // 'all'
    });
    
    // 3. Apply sorting
    const focusSortSelect = document.getElementById('focusSortSelect');
    const sortVal = focusSortSelect ? focusSortSelect.value : 'default';
    if (sortVal === 'shortest') {
        filtered.sort((a, b) => {
            const timeA = parseInt(a.dataset.timerLeft || a.dataset.timerTotal || '0', 10);
            const timeB = parseInt(b.dataset.timerLeft || b.dataset.timerTotal || '0', 10);
            return timeA - timeB;
        });
    } else if (sortVal === 'longest') {
        filtered.sort((a, b) => {
            const timeA = parseInt(a.dataset.timerLeft || a.dataset.timerTotal || '0', 10);
            const timeB = parseInt(b.dataset.timerLeft || b.dataset.timerTotal || '0', 10);
            return timeB - timeA;
        });
    }

    if (focusViewMode === 'list') {
        renderFocusTimersListWithData(filtered);
    } else {
        renderFocusTreemap(filtered);
    }
}

function renderFocusTimersListWithData(filtered) {
    const listEl = document.getElementById('focusTimersList');
    if (!listEl) return;
    listEl.innerHTML = '';

    if (filtered.length === 0) {
        const empty = document.createElement('div');
        empty.style.color = 'var(--muted)';
        empty.style.fontSize = '12px';
        empty.style.textAlign = 'center';
        empty.style.padding = '20px 0';
        empty.textContent = focusFilterMode === 'active' ? 'Nenhum timer pausado no momento.' : 'Nenhum timer configurado.';
        listEl.appendChild(empty);
        return;
    }
    
    filtered.forEach(c => {
        const item = document.createElement('div');
        item.className = 'focus-timer-item';
        
        // HTML5 Drag and Drop reordering
        item.draggable = true;
        item.ondragstart = (e) => {
            focusDragSourceCard = c;
            item.classList.add('dragging');
            
            // If sort is active, reset it to default
            const sortSelect = document.getElementById('focusSortSelect');
            if (sortSelect && sortSelect.value !== 'default') {
                sortSelect.value = 'default';
            }
            
            try {
                e.dataTransfer.setData('text/plain', 'focus-timer');
                e.dataTransfer.effectAllowed = 'move';
            } catch (_) {}
        };
        
        item.ondragover = (e) => {
            e.preventDefault();
            if (!focusDragSourceCard || focusDragSourceCard === c) return;
            
            const rect = item.getBoundingClientRect();
            const relY = e.clientY - rect.top;
            const midpoint = rect.height / 2;
            
            if (relY < midpoint) {
                item.classList.add('drag-over-top');
                item.classList.remove('drag-over-bottom');
            } else {
                item.classList.add('drag-over-bottom');
                item.classList.remove('drag-over-top');
            }
        };
        
        item.ondragenter = (e) => {
            e.preventDefault();
        };
        
        item.ondragleave = () => {
            item.classList.remove('drag-over-top', 'drag-over-bottom');
        };
        
        item.ondragend = () => {
            item.classList.remove('dragging');
            item.classList.remove('drag-over-top', 'drag-over-bottom');
            focusDragSourceCard = null;
        };
        
        item.ondrop = (e) => {
            e.preventDefault();
            e.stopPropagation();
            item.classList.remove('drag-over-top', 'drag-over-bottom');
            
            if (!focusDragSourceCard || focusDragSourceCard === c) return;
            
            const rect = item.getBoundingClientRect();
            const relY = e.clientY - rect.top;
            const midpoint = rect.height / 2;
            const isAbove = relY < midpoint;
            
            const targetListEl = c.closest('.list');
            if (targetListEl) {
                const sourceListEl = focusDragSourceCard.closest('.list');
                if (sourceListEl !== targetListEl) {
                    applyWhen(targetListEl, [focusDragSourceCard]);
                }
                
                if (isAbove) {
                    c.parentNode.insertBefore(focusDragSourceCard, c);
                } else {
                    c.parentNode.insertBefore(focusDragSourceCard, c.nextSibling);
                }
                
                syncAllCardsOrderFromDOM();
                updateSlotsHasItems();
                persist();
                updateFocusMode();
            }
        };

        if (c === focusActiveCard) {
            item.classList.add('active');
        }
        
        // Dynamic left border based on board color
        const cardColor = getBoardColor(c.dataset.boardId) || c.dataset.color;
        if (cardColor) {
            item.style.borderLeft = `4px solid ${cardColor}`;
        }
        
        const info = document.createElement('div');
        info.className = 'info';
        
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = (c.querySelector('.text') ? c.querySelector('.text').textContent : '').trim();
        
        const timeState = document.createElement('div');
        timeState.className = 'time-state';
        
        const seconds = parseInt(c.dataset.timerLeft || c.dataset.timerTotal || '0', 10);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const timeStr = `${to2(mins)}:${to2(secs)}`;
        
        let stateLabel = 'Aguardando';
        if (c.dataset.timerState === 'running') stateLabel = 'Rodando';
        else if (c.dataset.timerState === 'paused') stateLabel = 'Pausado';
        else if (c.dataset.timerState === 'finished') stateLabel = 'Finalizado';
        
        timeState.textContent = `⏱️ ${timeStr} (${stateLabel})`;
        
        info.appendChild(title);
        info.appendChild(timeState);
        
        const controls = document.createElement('div');
        controls.className = 'controls';
        
        const playBtn = document.createElement('button');
        playBtn.className = 'play-pause-btn';
        playBtn.type = 'button';
        playBtn.textContent = c.dataset.timerState === 'running' ? '⏸️' : '▶️';
        playBtn.title = c.dataset.timerState === 'running' ? 'Pausar' : 'Iniciar';
        
        playBtn.onclick = (e) => {
            e.stopPropagation();
            toggleCardTimer(c);
            updateFocusMode();
        };
        
        controls.appendChild(playBtn);
        
        item.appendChild(info);
        item.appendChild(controls);
        
        item.onclick = () => {
            focusActiveCard = c;
            updateFocusMode();
        };
        
        listEl.appendChild(item);
    });
}

function updateFocusMode() {
    // Se estiver no modo manual ou tela pequena
    const isManual = document.body.classList.contains('manual-focus-mode');
    if (window.innerWidth < 700 || isManual) {
        // Resolve a card to focus on
        let targetCard = focusActiveCard;
        // Verify if targetCard is still valid
        if (targetCard && (!allCards.includes(targetCard) || targetCard.dataset.completed === 'true')) {
            targetCard = null;
        }
        
        // If no targetCard, look for a running timer
        if (!targetCard) {
            targetCard = allCards.find(c => c.dataset.timerState === 'running');
        }
        // If still none, look for a paused/finished/stopped timer that is not completed
        if (!targetCard) {
            targetCard = allCards.find(c => {
                const total = parseInt(c.dataset.timerTotal || '0', 10);
                return total > 0 && c.dataset.completed !== 'true';
            });
        }
        
        if (targetCard) {
            focusActiveCard = targetCard;
            document.body.classList.add('focus-mode');
            
            const text = (targetCard.querySelector('.text') ? targetCard.querySelector('.text').textContent : '').trim();
            const state = targetCard.dataset.timerState || 'stopped';
            const disp = targetCard.querySelector('.timer-display');
            
            document.getElementById('focusTargetText').textContent = text;
            
            // Format time display
            let timeStr = '00:00';
            if (disp) {
                timeStr = disp.textContent.replace('⏱️ ', '').replace(' min', '').replace('⏳ ', '').trim();
            } else {
                const seconds = parseInt(targetCard.dataset.timerLeft || targetCard.dataset.timerTotal || '0', 10);
                const mins = Math.floor(seconds / 60);
                const secs = seconds % 60;
                timeStr = `${to2(mins)}:${to2(secs)}`;
            }
            document.getElementById('focusTargetTime').textContent = timeStr;
            
            const toggleBtn = document.getElementById('focusToggleBtn');
            toggleBtn.textContent = state === 'running' ? '⏸️' : '▶️';
            
            // Apply card color / board color to the focus-card-clone border & pulse animation
            const activeCardColor = getBoardColor(targetCard.dataset.boardId) || targetCard.dataset.color || '#ffa726';
            const cloneEl = document.querySelector('#focus-overlay .focus-card-clone');
            if (cloneEl) {
                cloneEl.style.setProperty('--focus-border-color', activeCardColor);
                cloneEl.style.setProperty('--focus-glow-color', activeCardColor + '66');
                cloneEl.style.setProperty('--focus-glow-color-half', activeCardColor + '33');
            }
            
            const allBtn = document.getElementById('focusFilterAll');
            const activeBtn = document.getElementById('focusFilterActive');
            if (allBtn && activeBtn) {
                if (focusFilterMode === 'all') {
                    allBtn.classList.add('active');
                    activeBtn.classList.remove('active');
                } else {
                    allBtn.classList.remove('active');
                    activeBtn.classList.add('active');
                }
            }
            
            renderFocusTimersList();
            return;
        }
    }
    document.body.classList.remove('focus-mode');
}

// Lógica dos botões do foco
document.getElementById('focusToggleBtn').onclick = () => {
    if (focusActiveCard) {
        toggleCardTimer(focusActiveCard);
        updateFocusMode();
    }
};

document.getElementById('focusResetBtn').onclick = () => {
    if (focusActiveCard) {
        focusActiveCard.dataset.timerState = 'paused';
        const total = parseInt(focusActiveCard.dataset.timerTotal || '0', 10);
        focusActiveCard.dataset.timerLeft = total;
        
        syncCardTimerState(focusActiveCard);
        persist();
        updateTimerDisplay(focusActiveCard);
        syncMirrors();
        updateFocusMode();
    }
};

document.getElementById('focusPlusBtn').onclick = () => {
    if (focusActiveCard) {
        let left = parseInt(focusActiveCard.dataset.timerLeft, 10);
        let total = parseInt(focusActiveCard.dataset.timerTotal, 10) || 0;
        if (isNaN(left)) left = total;
        focusActiveCard.dataset.timerLeft = left + 60;
        focusActiveCard.dataset.timerTotal = total + 60;
        if (focusActiveCard.dataset.timerState === 'running') {
            let end = parseInt(focusActiveCard.dataset.timerEnd, 10);
            if (!isNaN(end)) focusActiveCard.dataset.timerEnd = end + 60000;
            else focusActiveCard.dataset.timerEnd = Date.now() + (left + 60) * 1000;
        }
        syncCardTimerState(focusActiveCard);
        updateTimerDisplay(focusActiveCard);
        updateFocusMode();
        persist();
        syncMirrors();
    }
};

document.getElementById('focusPlus5Btn').onclick = () => {
    if (focusActiveCard) {
        let left = parseInt(focusActiveCard.dataset.timerLeft, 10);
        let total = parseInt(focusActiveCard.dataset.timerTotal, 10) || 0;
        if (isNaN(left)) left = total;
        focusActiveCard.dataset.timerLeft = left + 300;
        focusActiveCard.dataset.timerTotal = total + 300;
        if (focusActiveCard.dataset.timerState === 'running') {
            let end = parseInt(focusActiveCard.dataset.timerEnd, 10);
            if (!isNaN(end)) focusActiveCard.dataset.timerEnd = end + 300000;
            else focusActiveCard.dataset.timerEnd = Date.now() + (left + 300) * 1000;
        }
        syncCardTimerState(focusActiveCard);
        updateTimerDisplay(focusActiveCard);
        updateFocusMode();
        persist();
        syncMirrors();
    }
};

document.getElementById('focusMinusBtn').onclick = () => {
    if (focusActiveCard) {
        let left = parseInt(focusActiveCard.dataset.timerLeft, 10);
        let total = parseInt(focusActiveCard.dataset.timerTotal, 10) || 0;
        if (isNaN(left)) left = total;
        if (left > 60) {
            focusActiveCard.dataset.timerLeft = left - 60;
            focusActiveCard.dataset.timerTotal = Math.max(0, total - 60);
            if (focusActiveCard.dataset.timerState === 'running') {
                let end = parseInt(focusActiveCard.dataset.timerEnd, 10);
                if (!isNaN(end)) focusActiveCard.dataset.timerEnd = end - 60000;
            }
        } else {
            focusActiveCard.dataset.timerLeft = 0;
            focusActiveCard.dataset.timerState = 'finished';
        }
        syncCardTimerState(focusActiveCard);
        updateTimerDisplay(focusActiveCard);
        updateFocusMode();
        persist();
        syncMirrors();
    }
};

document.getElementById('focusMinus5Btn').onclick = () => {
    if (focusActiveCard) {
        let left = parseInt(focusActiveCard.dataset.timerLeft, 10);
        let total = parseInt(focusActiveCard.dataset.timerTotal, 10) || 0;
        if (isNaN(left)) left = total;
        if (left > 300) {
            focusActiveCard.dataset.timerLeft = left - 300;
            focusActiveCard.dataset.timerTotal = Math.max(0, total - 300);
            if (focusActiveCard.dataset.timerState === 'running') {
                let end = parseInt(focusActiveCard.dataset.timerEnd, 10);
                if (!isNaN(end)) focusActiveCard.dataset.timerEnd = end - 300000;
            }
        } else {
            focusActiveCard.dataset.timerLeft = 0;
            focusActiveCard.dataset.timerState = 'finished';
        }
        syncCardTimerState(focusActiveCard);
        updateTimerDisplay(focusActiveCard);
        updateFocusMode();
        persist();
        syncMirrors();
    }
};

document.getElementById('focusCompleteBtn').onclick = () => {
    if (focusActiveCard) {
        focusActiveCard.dataset.completed = 'true';
        focusActiveCard.classList.remove('timer-finished');
        if (focusActiveCard.dataset.timerState === 'running') {
            focusActiveCard.dataset.timerState = 'paused';
            var now = Date.now();
            var end = parseInt(focusActiveCard.dataset.timerEnd, 10);
            if (!isNaN(end)) {
                focusActiveCard.dataset.timerLeft = Math.round((end - now) / 1000);
            }
        }
        if (focusActiveCard.dataset.timerState === 'finished') {
            focusActiveCard.dataset.timerState = 'stopped';
        }
        syncCardTimerState(focusActiveCard);
        persist();
        updateTimerDisplay(focusActiveCard);
        syncMirrors();
        focusActiveCard = null;
        updateFocusMode();
    }
};

document.getElementById('focusFilterAll').onclick = () => {
    focusFilterMode = 'all';
    updateFocusMode();
};

document.getElementById('focusFilterActive').onclick = () => {
    focusFilterMode = 'active';
    updateFocusMode();
};

const focusSortEl = document.getElementById('focusSortSelect');
if (focusSortEl) {
    focusSortEl.onchange = () => {
        updateFocusMode();
    };
}

document.getElementById('focusCloseBtn').onclick = () => {
    document.body.classList.remove('manual-focus-mode', 'focus-mode');
};

document.getElementById('manualFocusBtn').onclick = () => {
    const hasTimer = Array.from(document.querySelectorAll('.card:not(.mirror-card)')).some(c => {
        const total = parseInt(c.dataset.timerTotal || '0', 10);
        return total > 0 && c.dataset.completed !== 'true';
    });
    if (!hasTimer) {
        alert("Configure um timer em algum cartão primeiro para entrar no modo foco!");
        return;
    }
    document.body.classList.toggle('manual-focus-mode');
    updateFocusMode();
};

// ===== RESIZERS LOGIC =====
function initResizers() {
    const resizerSidebar = document.getElementById('resizer-sidebar');
    const sidebar = document.getElementById('agenda-sidebar');
    const resizerMatrix = document.getElementById('resizer-matrix');
    const matrixContainer = document.getElementById('matrix-container');
    const boardContainer = document.getElementById('board-container');
    const resizerWeekly = document.getElementById('resizer-weekly');
    const weeklyContainer = document.getElementById('weekly-container');

    // Load saved sizes
    try {
        const saved = JSON.parse(localStorage.getItem('TEA_RESIZERS') || '{}');
        if (saved.sidebarWidth && window.innerWidth > 700) sidebar.style.flexBasis = saved.sidebarWidth + 'px';
        if (saved.boardHeight) {
            const h = parseInt(saved.boardHeight);
            boardContainer.style.height = (isNaN(h) || h < 100) ? '300px' : h + 'px';
        }
        if (saved.weeklyHeight) {
            const h = parseInt(saved.weeklyHeight);
            weeklyContainer.style.height = (isNaN(h) || h < 50) ? '250px' : h + 'px';
        }
    } catch(e) {}

    function saveResizerState() {
        const state = {
            sidebarWidth: sidebar.getBoundingClientRect().width,
            boardHeight: boardContainer.getBoundingClientRect().height,
            weeklyHeight: weeklyContainer.getBoundingClientRect().height
        };
        localStorage.setItem('TEA_RESIZERS', JSON.stringify(state));
    }

    function setupResizer(resizer, type) {
        if (!resizer) return;
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        function onStart(e) {
            isResizing = true;
            resizer.classList.add('resizing');
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
            startX = clientX;
            startY = clientY;
            
            if (type === 'sidebar') {
                startWidth = sidebar.getBoundingClientRect().width;
            } else if (type === 'matrix') {
                startHeight = boardContainer.getBoundingClientRect().height;
            } else if (type === 'weekly') {
                startHeight = weeklyContainer.getBoundingClientRect().height;
            }
            
            // Disable transitions during resize for smooth dragging
            if (type === 'sidebar') sidebar.style.transition = 'none';
            if (type === 'matrix') {
                boardContainer.style.transition = 'none';
                matrixContainer.style.transition = 'none';
            }
            if (type === 'weekly') {
                weeklyContainer.style.transition = 'none';
                boardContainer.style.transition = 'none';
            }
        }

        function onMove(e) {
            if (!isResizing) return;
            const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
            const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

            if (type === 'sidebar') {
                // Calcula a nova largura (sidebar está na direita, então mouse pra esquerda = aumenta width)
                let newWidth = startWidth - (clientX - startX);
                // Limites de tamanho
                if (newWidth < 200) newWidth = 200;
                
                // Limita o crescimento para manter a proporção dos cartões
                let maxWidth = Math.min(400, window.innerWidth * 0.8);
                if (newWidth > maxWidth) newWidth = maxWidth;
                
                sidebar.style.flexBasis = newWidth + 'px';
            } else if (type === 'matrix') {
                // Calcula a nova altura para o board (resizer entre board e matrix)
                let newHeight = startHeight + (clientY - startY);
                if (newHeight < 100) newHeight = 100; // Altura mínima do board
                if (newHeight > window.innerHeight * 0.7) newHeight = window.innerHeight * 0.7; // Altura máxima
                boardContainer.style.height = newHeight + 'px';
                boardContainer.style.flex = 'none'; // Ensure flex-grow doesn't override height
            } else if (type === 'weekly') {
                let newHeight = startHeight + (clientY - startY);
                if (newHeight < 150) newHeight = 150; // Altura mínima do weekly view
                if (newHeight > window.innerHeight * 0.8) newHeight = window.innerHeight * 0.8;
                weeklyContainer.style.height = newHeight + 'px';
                weeklyContainer.style.flex = 'none';
            }
        }

        function onEnd(e) {
            if (!isResizing) return;
            isResizing = false;
            resizer.classList.remove('resizing');
            
            // Restore transitions
            if (type === 'sidebar') sidebar.style.transition = '';
            if (type === 'matrix') {
                boardContainer.style.transition = '';
                matrixContainer.style.transition = '';
            }
            if (type === 'weekly') {
                weeklyContainer.style.transition = '';
                boardContainer.style.transition = '';
            }
            
            saveResizerState();
        }

        resizer.addEventListener('mousedown', onStart);
        resizer.addEventListener('touchstart', onStart, { passive: true });
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: true });
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchend', onEnd);
    }

    setupResizer(resizerSidebar, 'sidebar');
    setupResizer(resizerMatrix, 'matrix');
    setupResizer(resizerWeekly, 'weekly');
}

function initApp() {
    initResizers();
    applyDragScroll();
    loadState();
    migrateToMultiBoard();
    initAiControls();
    setupFocusTreemapControls();
    if (currentBoardId) { switchBoard(currentBoardId); } else { ensureMatrix(); ensureSchedule(false); initDemo(); }
    startAlertCheck();
}

// Exposição para o Test Runner
window.createCard = createCard;
window.persist = persist;
window.getActiveDay = getActiveDay;
window.switchBoard = switchBoard;
window.initDemo = initDemo;
Object.defineProperty(window, 'allCards', {
    get: function() { return allCards; },
    set: function(val) { allCards = val; },
    configurable: true
});
Object.defineProperty(window, 'boardsMeta', {
    get: function() { return boardsMeta; },
    set: function(val) { boardsMeta = val; },
    configurable: true
});

// Inicialização do App
initApp();
