$htmlPath = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$cssPath = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\scratch\temp_css_block.css"
$jsPath = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\scratch\temp_all_functions.js"

$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)

# Emojis and accented characters as character code points
$calEmoji = [char]55357 + [char]56517
$bellEmoji = [char]55357 + [char]56596
$eCircumflex = [char]234

Write-Host "Reading files..."
$html = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)
$css = [System.IO.File]::ReadAllText($cssPath, [System.Text.Encoding]::UTF8)
$js = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)

# Normalize line endings
$html = $html -replace "`r`n", "`n" -replace "`n", "`r`n"
$css = $css -replace "`r`n", "`n" -replace "`n", "`r`n"
$js = $js -replace "`r`n", "`n" -replace "`n", "`r`n"

# Helper function to replace line containing a substring
function Replace-LineContaining($text, $targetSubstring, $newLineContent) {
    $lines = $text -split "`r`n"
    $found = $false
    for ($i = 0; $i -lt $lines.Length; $i++) {
        if ($lines[$i].Contains($targetSubstring)) {
            $lines[$i] = $newLineContent
            $found = $true
            break
        }
    }
    if ($found) {
        return $lines -join "`r`n"
    }
    return $null
}

# 1. CSS Injection
Write-Host "Injecting CSS..."
$oldStyleClose = "    </style>"
if ($html.Contains($oldStyleClose)) {
    $html = $html.Replace($oldStyleClose, $css + "`r`n" + $oldStyleClose)
    Write-Host "  CSS injected."
} else {
    Write-Error "  ERROR: Style close tag not found."
    exit 1
}

# 2. Context Menu HTML (find line containing 'data-action="date"')
Write-Host "Injecting Context Menu HTML..."
$newContextMenuHtml = '        <button data-action="date">' + $calEmoji + ' Editar Data <span class="shortcut">Alt+D</span></button>' + "`r`n" + '        <button data-action="agenda">' + $calEmoji + ' Agendar / Recorr' + $eCircumflex + 'ncia...</button>' + "`r`n" + '        <button data-action="alert">' + $bellEmoji + ' Configurar Alerta...</button>'
$htmlResult = Replace-LineContaining $html 'data-action="date"' $newContextMenuHtml
if ($null -ne $htmlResult) {
    $html = $htmlResult
    Write-Host "  Context Menu HTML injected."
} else {
    Write-Error "  ERROR: Context Menu target line not found."
    exit 1
}

# 3. Context Menu JS Click Handlers (find line containing "action === 'timer'")
Write-Host "Injecting Context Menu JS Click Handlers..."
$newTimerHandler = "                else if (action === 'timer') { openTimerDialog(block); }`r`n                else if (action === 'agenda') { openAgendaDialog(block[0]); }`r`n                else if (action === 'alert') { openAlertDialog(block[0]); }"
$htmlResult = Replace-LineContaining $html "action === 'timer'" $newTimerHandler
if ($null -ne $htmlResult) {
    $html = $htmlResult
    Write-Host "  Context Menu click handler injected."
} else {
    Write-Error "  ERROR: Timer handler line not found."
    exit 1
}

# 4. Inject Premium JS Functions
Write-Host "Injecting Premium JS Functions..."
$oldInitAppStart = '            function initApp() {'
$newInitAppStart = $js + "`r`n`r`n" + $oldInitAppStart
if ($html.Contains($oldInitAppStart)) {
    $html = $html.Replace($oldInitAppStart, $newInitAppStart)
    Write-Host "  Premium functions injected."
} else {
    Write-Error "  ERROR: initApp start not found."
    exit 1
}

# 5. Add startAlertCheck() inside initApp()
Write-Host "Wiring startAlertCheck()..."
$newInitAppBody = "                if (currentBoardId) { switchBoard(currentBoardId); } else { ensureMatrix(); ensureSchedule(false); initDemo(); }`r`n                startAlertCheck();"
$htmlResult = Replace-LineContaining $html "ensureSchedule(false); initDemo();" $newInitAppBody
if ($null -ne $htmlResult) {
    $html = $htmlResult
    Write-Host "  startAlertCheck() wired."
} else {
    Write-Error "  ERROR: initApp ensureSchedule line not found."
    exit 1
}

# 6. Inject syncAllCardsOrderFromDOM() and call it in serializeAndSeparate()
Write-Host "Injecting syncAllCardsOrderFromDOM()..."
$newSerializeAndSeparate = "            function syncAllCardsOrderFromDOM() {`r`n                const domCards = Array.from(document.querySelectorAll('.card:not(.mirror-card)'));`r`n                if (domCards.length === 0) return;`r`n                const domCardSet = new Set(domCards);`r`n                const nonDomCards = allCards.filter(c => !domCardSet.has(c));`r`n                allCards = [...domCards, ...nonDomCards];`r`n            }`r`n`r`n            // FUNCAO IMPORTANTE: Separa o que e do Quadro do que e da Agenda Global`r`n            function serializeAndSeparate() {`r`n                syncAllCardsOrderFromDOM();"
$htmlResult = Replace-LineContaining $html "function serializeAndSeparate()" $newSerializeAndSeparate
if ($null -ne $htmlResult) {
    $html = $htmlResult
    Write-Host "  syncAllCardsOrderFromDOM() injected."
} else {
    Write-Error "  ERROR: serializeAndSeparate function line not found."
    exit 1
}

# 7. Keyboard Navigation Block Replacement
Write-Host "Replacing Keyboard Navigation Block..."
$oldKeyboardStart = '                if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {'
$oldKeyboardEnd = "                    if (moved) {`r`n                        persist();`r`n                        applyFilters();`r`n                    }`r`n                }"

$startIdx = $html.IndexOf($oldKeyboardStart)
if ($startIdx -lt 0) {
    # Try LF version
    $oldKeyboardEndLF = $oldKeyboardEnd -replace "`r`n", "`n"
    $endIdx = $html.IndexOf($oldKeyboardEndLF)
    if ($endIdx -lt 0) {
        Write-Error "  ERROR: Keyboard block start or end bounds not found."
        exit 1
    }
    $fullOldBlock = $html.Substring($startIdx, $endIdx - $startIdx + $oldKeyboardEndLF.Length)
} else {
    $endIdx = $html.IndexOf($oldKeyboardEnd, $startIdx)
    if ($endIdx -lt 0) {
        # Check if LF version matches
        $oldKeyboardEndLF = $oldKeyboardEnd -replace "`r`n", "`n"
        $endIdx = $html.IndexOf($oldKeyboardEndLF, $startIdx)
        if ($endIdx -lt 0) {
            Write-Error "  ERROR: Keyboard block end bounds not found."
            exit 1
        }
        $fullOldBlock = $html.Substring($startIdx, $endIdx - $startIdx + $oldKeyboardEndLF.Length)
    } else {
        $fullOldBlock = $html.Substring($startIdx, $endIdx - $startIdx + $oldKeyboardEnd.Length)
    }
}

$newKeyboardBlock = @'
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
                                currentSelection.forEach(card => parentCards.insertBefore(card, nextCard));
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
                }
'@

$newKeyboardBlock = $newKeyboardBlock -replace "`r`n", "`n" -replace "`n", "`r`n"
$html = $html.Replace($fullOldBlock, $newKeyboardBlock)
Write-Host "  Keyboard navigation injected."

Write-Host "Writing files back..."
[System.IO.File]::WriteAllText($htmlPath, $html, $utf8NoBOM)
Write-Host "DONE successfully!"
