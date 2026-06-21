$path = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Update greeting OlÃ¡ -> Olá
$c3 = [char]0xC3
$a1 = [char]0xA1
$e1 = [char]0xE1
$greetingTarget = 'userInfo.textContent = `Ol' + $c3 + $a1 + ', `'
$greetingReplacement = 'userInfo.textContent = `Ol' + $e1 + ', `'

if ($content.Contains($greetingTarget)) {
    $content = $content.Replace($greetingTarget, $greetingReplacement)
    Write-Host "Greeting updated successfully!"
} else {
    Write-Warning "Greeting target not found!"
}

# 2. Add actualListTitle declaration
$target1 = @'
                const targetData = getBoardData(targetBoardId);
                let moved = false;
'@

$rep1 = @'
                const targetData = getBoardData(targetBoardId);
                let moved = false;
                let actualListTitle = targetListTitle;
'@

# 3. Update targetList fallback to set actualListTitle
$target2 = @'
                } else {
                    if (targetData.length > 0 && targetData[0].type === 'kanban') {
                        targetData[0].cards.push(cardData);
                        moved = true;
                        if (targetBoardId !== 'board-trash') {
                            alert(`Lista "${targetListTitle}" não encontrada. Movido para "${targetData[0].title}".`);
                        }
                    } else {
                        targetData.unshift({ type: 'kanban', title: 'Inbox', cards: [cardData] });
                        moved = true;
                    }
                }
'@

$rep2 = @'
                } else {
                    if (targetData.length > 0 && targetData[0].type === 'kanban') {
                        targetData[0].cards.push(cardData);
                        moved = true;
                        actualListTitle = targetData[0].title;
                        if (targetBoardId !== 'board-trash') {
                            alert(`Lista "${targetListTitle}" não encontrada. Movido para "${targetData[0].title}".`);
                        }
                    } else {
                        targetData.unshift({ type: 'kanban', title: 'Inbox', cards: [cardData] });
                        moved = true;
                        actualListTitle = 'Inbox';
                    }
                }
'@

# 4. Update the save and relocation blocks
$target3 = @'
                if (moved) {
                    localStorage.setItem(LS_BOARD_PREFIX + targetBoardId, JSON.stringify(targetData));

                    const targetBoard = boardsMeta.find(b => b.id === targetBoardId);
                    if (targetBoard) { targetBoard.lastModified = Date.now(); saveBoardsMetadata(); }

                    if (isFirebaseReady && auth && auth.currentUser) {
                        db.ref('users/' + auth.currentUser.uid + '/boards/' + targetBoardId).set(targetData);
                    }

                    // Se estivermos no quadro TODOS, em vez de fazer o cartão sumir, nós o movemos fisicamente no DOM para a lista de destino correspondente
                    if (currentBoardId === 'board-todos' && targetBoardId !== 'board-trash') {
                        const lists = $$('.list[data-type="kanban"]');
                        const targetListEl = lists.find(l => {
                            const titleInp = l.querySelector('.title');
                            return titleInp && titleInp.value.toLowerCase().trim() === targetListTitle.toLowerCase().trim();
                        });
                        if (targetListEl) {
                            const cardsContainer = targetListEl.querySelector('.cards');
                            if (cardsContainer) {
                                cardElement.dataset.boardId = targetBoardId;
                                cardElement.dataset.color = getBoardColor(targetBoardId) || '';
                                cardElement.dataset.when = '';
                                paintCard(cardElement);
                                cardsContainer.appendChild(cardElement);
                                persist();
                                
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
                    // Persist cuida de salvar a remoção no quadro atual E atualizar a agenda global se necessario
                    persist();

                    const btn = document.createElement('div');
                    btn.textContent = `Card movido para quadro "${targetBoard ? targetBoard.name : 'Outro'}"`;
                    btn.style.position = 'fixed'; btn.style.bottom = '20px'; btn.style.left = '50%'; btn.style.transform = 'translateX(-50%)';
                    btn.style.background = '#28a745'; btn.style.color = 'white'; btn.style.padding = '10px 20px'; btn.style.borderRadius = '5px'; btn.style.zIndex = '9999';
                    document.body.appendChild(btn);
                    setTimeout(() => btn.remove(), 3000);
                }
'@

$rep3 = @'
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
'@

# Helper to normalize endings
function Apply-Sub($t, $r) {
    global $content
    if (!$content.Contains($t)) {
        $t = $t -replace "`r`n", "`n"
        $r = $r -replace "`r`n", "`n"
    }
    if ($content.Contains($t)) {
        $content = $content.Replace($t, $r)
        return $true
    }
    return $false
}

if (Apply-Sub $target1 $rep1) { Write-Host "1. actualListTitle declaration added." } else { Write-Warning "1. actualListTitle declaration NOT found!" }
if (Apply-Sub $target2 $rep2) { Write-Host "2. targetList fallback update applied." } else { Write-Warning "2. targetList fallback update NOT found!" }
if (Apply-Sub $target3 $rep3) { Write-Host "3. Save and relocation block updated." } else { Write-Warning "3. Save and relocation block NOT found!" }

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "Finished updates."
