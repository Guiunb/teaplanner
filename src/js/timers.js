function updateTotalTimerDisplay() {
    let selectedSeconds = 0;
    let visibleSeconds = 0;
    let totalSecondsAll = 0;
    if (selected.size > 0) {
        selected.forEach(card => {
            selectedSeconds += parseInt(card.dataset.timerTotal || '0', 10);
        });
    }
    allCards.forEach(card => {
        const cardTime = parseInt(card.dataset.timerTotal || '0', 10);
        totalSecondsAll += cardTime;
        const style = window.getComputedStyle(card);
        if (style.display !== 'none' && style.visibility !== 'hidden') {
            if (card.offsetParent !== null) {
                visibleSeconds += cardTime;
            }
        }
    });
    const displayText = selected.size > 0 ? formatSecondsToTime(selectedSeconds) : formatSecondsToTime(visibleSeconds);
    if (sumTimersDisplay) {
        sumTimersDisplay.textContent = displayText;
        sumTimersDisplay.title = `Selecionado: ${formatSecondsToTime(selectedSeconds)} / Filtrado: ${formatSecondsToTime(visibleSeconds)} / Total: ${formatSecondsToTime(totalSecondsAll)}`;
    }
}

function syncCardTimerState(card) {
    const cardId = card.dataset.id;
    if (!cardId) return;
    const state = card.dataset.timerState;
    const total = card.dataset.timerTotal;
    const left = card.dataset.timerLeft;
    const end = card.dataset.timerEnd;
    const completed = card.dataset.completed;
    
    // Find all card representations in the DOM (including duplicates and mirrors)
    document.querySelectorAll(`.card[data-id="${cardId}"]`).forEach(other => {
        if (other === card) return;
        other.dataset.timerState = state || '';
        other.dataset.timerTotal = total || '';
        other.dataset.timerLeft = left || '';
        other.dataset.timerEnd = end || '';
        other.dataset.completed = completed || 'false';
        updateTimerDisplay(other);
    });

    // Also update in allCards cache
    allCards.forEach(other => {
        if (other.dataset.id === cardId && other !== card) {
            other.dataset.timerState = state || '';
            other.dataset.timerTotal = total || '';
            other.dataset.timerLeft = left || '';
            other.dataset.timerEnd = end || '';
            other.dataset.completed = completed || 'false';
            updateTimerDisplay(other);
        }
    });
}

function startGlobalTimer() {
    if (globalTimerInterval) return;
    globalTimerInterval = setInterval(function () {
        // 1. Gather all unique card IDs that have a running timer
        const runningIds = new Set();
        document.querySelectorAll('.card[data-timer-state="running"]').forEach(c => {
            if (c.dataset.id) runningIds.add(c.dataset.id);
        });
        allCards.forEach(c => {
            if (c.dataset.timerState === 'running' && c.dataset.id) {
                runningIds.add(c.dataset.id);
            }
        });

        // 2. Clear interval if no active timers
        if (runningIds.size === 0) {
            clearInterval(globalTimerInterval);
            globalTimerInterval = null;
            return;
        }

        // 3. For each running card ID, compute elapsed time and update all representations
        runningIds.forEach(id => {
            const cards = document.querySelectorAll(`.card[data-id="${id}"]`);
            let end = NaN;
            
            // Find a valid end timestamp
            for (let c of cards) {
                const val = parseInt(c.dataset.timerEnd, 10);
                if (!isNaN(val)) {
                    end = val;
                    break;
                }
            }
            
            // If not found in DOM, check in allCards
            if (isNaN(end)) {
                for (let c of allCards) {
                    if (c.dataset.id === id) {
                        const val = parseInt(c.dataset.timerEnd, 10);
                        if (!isNaN(val)) {
                            end = val;
                            break;
                        }
                    }
                }
            }
            
            if (isNaN(end)) {
                cards.forEach(c => {
                    c.dataset.timerState = 'paused';
                    updateTimerDisplay(c);
                });
                allCards.forEach(c => {
                    if (c.dataset.id === id) {
                        c.dataset.timerState = 'paused';
                        updateTimerDisplay(c);
                    }
                });
                return;
            }

            const now = Date.now();
            let left = Math.round((end - now) / 1000);
            let state = 'running';

            if (left <= 0) {
                state = 'finished';
                left = 0;
                playBeep(); // Trigger alert
            }

            // Sync the updates to all DOM representations
            cards.forEach(c => {
                c.dataset.timerState = state;
                c.dataset.timerLeft = left;
                if (state === 'finished') {
                    c.style.animation = '';
                }
                updateTimerDisplay(c);
            });

            // Also update in allCards cache
            allCards.forEach(c => {
                if (c.dataset.id === id) {
                    c.dataset.timerState = state;
                    c.dataset.timerLeft = left;
                    updateTimerDisplay(c);
                }
            });
        });

        // 4. Update Focus Mode overlay and weekly mirrors
        updateFocusMode();
        syncMirrors();
    }, 1000);
}

function toggleCardTimer(c) {
    var state = c.dataset.timerState || 'stopped';
    var total = parseInt(c.dataset.timerTotal || '0', 10);
    if (total === 0) return;

    if (state === 'running') { // Pause
        c.dataset.timerState = 'paused';
        var now = Date.now();
        var end = parseInt(c.dataset.timerEnd, 10);
        c.dataset.timerLeft = Math.round((end - now) / 1000);
    } else { // Start or resume
        c.dataset.timerState = 'running';
        var left = parseInt(c.dataset.timerLeft, 10);
        if (state === 'finished' || isNaN(left) || left <= 0) left = total;
        c.dataset.timerEnd = Date.now() + left * 1000;
        c.style.animation = '';
        startGlobalTimer();
    }
    syncCardTimerState(c);
    persist();
    updateTimerDisplay(c);
    syncMirrors();
}

function handleCardDblClick(c) {
    startInlineEdit(c);
}

// [DEDUP v8] "startAlertCheck" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).


// [DEDUP v8] "showNotificationToast" removida daqui: a versao ATIVA vive em ai.js (ultima no build vence).

