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

function startGlobalTimer() {
    if (globalTimerInterval) return;
    globalTimerInterval = setInterval(function () {
        const runningCards = document.querySelectorAll('.card[data-timer-state="running"]:not(.mirror-card)');
        if (runningCards.length === 0) {
            clearInterval(globalTimerInterval);
            globalTimerInterval = null;
            return;
        }
        runningCards.forEach(function (c) {
            var now = Date.now();
            var end = parseInt(c.dataset.timerEnd, 10);
            if (isNaN(end)) {
                c.dataset.timerState = 'paused';
                return;
            }
            var left = Math.round((end - now) / 1000);
            if (left <= 0) {
                c.dataset.timerState = 'finished';
                c.dataset.timerLeft = 0;
                c.style.animation = '';
                playBeep(); // <--- ALERTA SONORO
            } else {
                c.dataset.timerLeft = left;
            }
            updateTimerDisplay(c);
        });
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
    persist();
    updateTimerDisplay(c);
    syncMirrors();
}

function handleCardDblClick(c) {
    startInlineEdit(c);
}

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
