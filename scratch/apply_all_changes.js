const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const cssPath = path.join(__dirname, 'temp_css_block.css');
const jsPath = path.join(__dirname, 'temp_all_functions.js');

console.log('Reading index.html...');
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. CSS Injection
console.log('Injecting CSS...');
const cssContent = fs.readFileSync(cssPath, 'utf8');
const oldStyleClose = '    </style>';
if (html.includes(oldStyleClose)) {
    html = html.replace(oldStyleClose, cssContent + '\n' + oldStyleClose);
    console.log('  CSS injected successfully.');
} else {
    console.error('  ERROR: </style> tag not found.');
    process.exit(1);
}

// 2. HTML Context Menu Options
console.log('Injecting Context Menu HTML...');
const oldContextMenuHtml = '<button data-action="date">📅 Editar Data <span class="shortcut">Alt+D</span></button>';
const newContextMenuHtml = `<button data-action="date">📅 Editar Data <span class="shortcut">Alt+D</span></button>
        <button data-action="agenda">📅 Agendar / Recorrência...</button>
        <button data-action="alert">🔔 Configurar Alerta...</button>`;
if (html.includes(oldContextMenuHtml)) {
    html = html.replace(oldContextMenuHtml, newContextMenuHtml);
    console.log('  HTML Context Menu items injected successfully.');
} else {
    console.error('  ERROR: Context menu date action button not found.');
    process.exit(1);
}

// 3. contextMenu Click Actions
console.log('Injecting Context Menu JS Click Handlers...');
const oldTimerHandler = "else if (action === 'timer') { openTimerDialog(block); }";
const newTimerHandler = `else if (action === 'timer') { openTimerDialog(block); }
                else if (action === 'agenda') { openAgendaDialog(block[0]); }
                else if (action === 'alert') { openAlertDialog(block[0]); }`;
if (html.includes(oldTimerHandler)) {
    html = html.replace(oldTimerHandler, newTimerHandler);
    console.log('  JS Context Menu click handlers injected successfully.');
} else {
    console.error('  ERROR: timer action click handler not found.');
    process.exit(1);
}

// 4. Inject Premium JS Functions Block
console.log('Injecting Premium JS Functions...');
const jsFunctions = fs.readFileSync(jsPath, 'utf8');
const oldInitAppStart = '            function initApp() {';
const newInitAppStart = jsFunctions + '\n\n' + oldInitAppStart;
if (html.includes(oldInitAppStart)) {
    html = html.replace(oldInitAppStart, newInitAppStart);
    console.log('  Premium functions injected successfully.');
} else {
    console.error('  ERROR: function initApp() not found.');
    process.exit(1);
}

// 5. Add startAlertCheck() in initApp()
console.log('Adding startAlertCheck() invocation to initApp()...');
const oldInitAppBody = `            function initApp() {
                initResizers();
                applyDragScroll();
                loadState();
                migrateToMultiBoard();
                initAiControls();
                if (currentBoardId) { switchBoard(currentBoardId); } else { ensureMatrix(); ensureSchedule(false); initDemo(); }
            }`;
const newInitAppBody = `            function initApp() {
                initResizers();
                applyDragScroll();
                loadState();
                migrateToMultiBoard();
                initAiControls();
                if (currentBoardId) { switchBoard(currentBoardId); } else { ensureMatrix(); ensureSchedule(false); initDemo(); }
                startAlertCheck();
            }`;
if (html.includes(oldInitAppBody)) {
    html = html.replace(oldInitAppBody, newInitAppBody);
    console.log('  startAlertCheck() wired successfully.');
} else {
    console.error('  ERROR: initApp body not found.');
    process.exit(1);
}

// 6. Inject syncAllCardsOrderFromDOM() and invoke it in serializeAndSeparate()
console.log('Injecting syncAllCardsOrderFromDOM()...');
const oldSerializeAndSeparate = `            // FUNÇÃO IMPORTANTE: Separa o que é do Quadro do que é da Agenda Global
            function serializeAndSeparate() {
                var boardData = [];`;
const newSerializeAndSeparate = `            function syncAllCardsOrderFromDOM() {
                const domCards = Array.from(document.querySelectorAll('.card:not(.mirror-card)'));
                if (domCards.length === 0) return;
                const domCardSet = new Set(domCards);
                const nonDomCards = allCards.filter(c => !domCardSet.has(c));
                allCards = [...domCards, ...nonDomCards];
            }

            // FUNÇÃO IMPORTANTE: Separa o que é do Quadro do que é da Agenda Global
            function serializeAndSeparate() {
                syncAllCardsOrderFromDOM();
                var boardData = [];`;
if (html.includes(oldSerializeAndSeparate)) {
    html = html.replace(oldSerializeAndSeparate, newSerializeAndSeparate);
    console.log('  syncAllCardsOrderFromDOM() injected successfully.');
} else {
    console.error('  ERROR: serializeAndSeparate function header not found.');
    process.exit(1);
}

// 7. Inject Keyboard Navigation (Ctrl + Arrows) Handler
console.log('Injecting Keyboard Navigation handler...');
const oldKeyboardStart = '                if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {';
const oldKeyboardEnd = `                    if (moved) {
                        persist();
                        applyFilters();
                    }
                }`;

const startIdx = html.indexOf(oldKeyboardStart);
const endIdx = html.indexOf(oldKeyboardEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const fullOldBlock = html.substring(startIdx, endIdx + oldKeyboardEnd.length);
    const newKeyboardBlock = `                if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {
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
                                        currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));
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
                                    let destList = document.querySelector(\`.list[data-quad="\${targetQuad}"]\`);
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
                                currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));
                                moved = true;
                            } else {
                                // Transition Down to the quadrant below: Q1 -> Q3, Q2 -> Q4
                                let targetQuad = quad === 'Q1' ? 'Q3' : (quad === 'Q2' ? 'Q4' : null);
                                if (targetQuad) {
                                    let destList = document.querySelector(\`.list[data-quad="\${targetQuad}"]\`);
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
                                let destList = document.querySelector(\`.list[data-quad="\${targetQuad}"]\`);
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
                                let destList = document.querySelector(\`.list[data-quad="\${targetQuad}"]\`);
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
                                currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));
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
                }`;
    html = html.replace(fullOldBlock, newKeyboardBlock);
    console.log('  Keyboard Navigation handlers injected successfully.');
} else {
    console.error('  ERROR: Keyboard navigation block bounds not found.');
    process.exit(1);
}

console.log('Saving index.html...');
fs.writeFileSync(htmlPath, html, 'utf8');
console.log('All changes applied successfully!');
