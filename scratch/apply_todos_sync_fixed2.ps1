$path = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# 1. Update greeting OlÃ¡ -> Olá
$greetingTarget = 'userInfo.textContent = `OlÃ¡, `'
$greetingReplacement = 'userInfo.textContent = `Olá, `'
if ($content.Contains($greetingTarget)) {
    $content = $content.Replace($greetingTarget, $greetingReplacement)
    Write-Host "Greeting updated successfully!"
} else {
    Write-Warning "Greeting target not found!"
}

# 2. Update moveCardToBoard
$targetMove = @'
            function moveCardToBoard(cardElement, targetBoardId, targetListTitle) {
                if (!cardElement) return;

                const targetBoardMeta = boardsMeta.find(b => b.id === targetBoardId);
                const boardName = targetBoardMeta ? targetBoardMeta.name : 'Outro Quadro';
                addCardHistory(cardElement, 'Movido para o quadro "' + boardName + '"');

                const cardData = cardToData(cardElement);
                // IMPORTANTE: Ao mover para outro quadro, remove a data (sai da agenda global)
                // A menos que a gente quisesse manter, mas conceitualmente se vai pro kanban de lá, vira backlog.
                cardData.when = '';
                cardData.boardId = targetBoardId;
                cardData.color = getBoardColor(targetBoardId) || '';

                const targetData = getBoardData(targetBoardId);
                let moved = false;

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
                        if (targetBoardId !== 'board-trash') {
                            alert(`Lista "${targetListTitle}" não encontrada. Movido para "${targetData[0].title}".`);
                        }
                    } else {
                        targetData.unshift({ type: 'kanban', title: 'Inbox', cards: [cardData] });
                        moved = true;
                    }
                }

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
            }
'@

$replacementMove = @'
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
                            alert(`Lista "${targetListTitle}" não encontrada. Movido para "${targetData[0].title}".`);
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
'@

if (!$content.Contains($targetMove)) {
    $targetMove = $targetMove -replace "`r`n", "`n"
    $replacementMove = $replacementMove -replace "`r`n", "`n"
}

if ($content.Contains($targetMove)) {
    $content = $content.Replace($targetMove, $replacementMove)
    Write-Host "moveCardToBoard updated successfully!"
} else {
    Write-Warning "moveCardToBoard target not found!"
}

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
Write-Host "Finished updates."
