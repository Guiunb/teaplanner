$htmlPath = "index.html"
$content = Get-Content -Path $htmlPath -Raw

$targetStart = "                if (currentSelection.length > 0 && (e.ctrlKey || e.metaKey)) {"
$targetEnd = "                    if (moved) {`r`n                        persist();`r`n                        applyFilters();`r`n                    }`r`n                }"
if (!$content.Contains($targetEnd)) {
    $targetEnd = "                    if (moved) {`n                        persist();`n                        applyFilters();`n                    }`n                }"
}

# Let's search for the block by slicing or finding index
$startIndex = $content.IndexOf($targetStart)
$endIndex = $content.IndexOf($targetEnd, $startIndex)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    # We found the block!
    $endLength = $targetEnd.Length
    $fullBlockLength = ($endIndex + $endLength) - $startIndex
    
    $oldBlock = $content.Substring($startIndex, $fullBlockLength)
    
    $newBlock = @'
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

    $content = $content.Replace($oldBlock, $newBlock)
    [System.IO.File]::WriteAllText($htmlPath, $content, (New-Object System.Text.UTF8Encoding($false)))
    Write-Host "Injected keyboard navigation successfully."
} else {
    Write-Error "Could not find start/end bounds of the old keyboard navigation block."
}
