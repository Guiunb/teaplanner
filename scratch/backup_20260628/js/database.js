// ===== Real-time Database Sync Logic =====
let isInitialLoadComplete = false;
let hasLoadedMetadata = false;
let hasLoadedCurrentBoard = false;
let hasLoadedGlobalAgenda = false;

let lastCloudBackupTime = 0;
const CLOUD_BACKUP_THROTTLE = 10 * 60 * 1000; // 10 minutos em ms

function checkInitialLoadComplete() {
    if (hasLoadedMetadata && hasLoadedCurrentBoard && hasLoadedGlobalAgenda) {
        if (!isInitialLoadComplete) {
            isInitialLoadComplete = true;
            console.log("Sync: Carga inicial do Firebase concluída com sucesso.");
        }
    }
}

function setupFirebaseSync(user) {
    // 1. Sincronizar METADADOS (Lista de Quadros)
    const metaRef = db.ref('users/' + user.uid + '/meta');
    metaRef.on('value', (snapshot) => {
        hasLoadedMetadata = true;
        checkInitialLoadComplete();
        let val = snapshot.val();
        if (val && !Array.isArray(val)) {
            val = Object.keys(val).map(k => val[k]);
        }

        if (!snapshot.exists() || !val || val.length === 0) {
            const localMetaStr = localStorage.getItem(LS_BOARDS_META);
            if (localMetaStr) {
                try {
                    const localMeta = JSON.parse(localMetaStr);
                    if (localMeta && localMeta.length > 0) {
                        console.log("Sync: Firebase meta não existe, enviando metadados locais...");
                        metaRef.set(localMeta);
                        return;
                    }
                } catch (e) {
                    console.error("Erro ao ler metadados locais na sincronização:", e);
                }
            }
        }

        if (val && Array.isArray(val)) {
            let updated = false;
            if (!val.some(b => b.id === 'board-todos')) {
                val.unshift({ id: 'board-todos', name: 'TODOS 📋', lastModified: Date.now(), color: '#1976d2' });
                updated = true;
            }
            if (!val.some(b => b.id === 'board-trash')) {
                val.push({ id: 'board-trash', name: 'Lixeira 🗑️', lastModified: Date.now(), color: '#5a1419' });
                updated = true;
            }
            if (JSON.stringify(val) !== JSON.stringify(boardsMeta)) {
                console.log("Sync: Nova lista de quadros recebida.");
                boardsMeta = val;
                localStorage.setItem(LS_BOARDS_META, JSON.stringify(boardsMeta));
                updateBoardSelectUI();
                if (updated) {
                    saveBoardsMetadata(true);
                }
                if (!boardsMeta.find(b => b.id === currentBoardId)) {
                    if (boardsMeta.length > 0) switchBoard(boardsMeta[0].id);
                    else createNewBoard('Meu Quadro');
                }
            }
        }
    });

    // 2. Sincronizar AGENDA GLOBAL (Sempre ativa)
    subscribeToGlobalAgenda(user.uid);

    // 3. Sincronizar o QUADRO ATUAL
    subscribeToCurrentBoard(user.uid, currentBoardId);
}

function syncFromCloud(user) {
    setupFirebaseSync(user);
}

function subscribeToGlobalAgenda(uid) {
    if (!isFirebaseReady || !uid) return;
    if (globalAgendaRef) globalAgendaRef.off();

    console.log("Sync: Escutando Agenda Global...");
    globalAgendaRef = db.ref('users/' + uid + '/global/agenda');

    globalAgendaRef.on('value', (snapshot) => {
        hasLoadedGlobalAgenda = true;
        checkInitialLoadComplete();
        let val = snapshot.val();
        
        if (!snapshot.exists()) {
            const localAgendaStr = localStorage.getItem(LS_GLOBAL_AGENDA);
            if (localAgendaStr && localAgendaStr !== '[]' && localAgendaStr !== '') {
                console.log("Sync: Firebase agenda global não existe, enviando local...");
                try {
                    globalAgendaRef.set(JSON.parse(localAgendaStr));
                    return;
                } catch (e) {
                    console.error("Erro ao fazer parse da agenda local para enviar:", e);
                }
            }
        }

        if (!val) val = []; // Agenda vazia

        const currentLocal = localStorage.getItem(LS_GLOBAL_AGENDA);
        const valStr = JSON.stringify(val);

        if (valStr === currentLocal) return;

        console.log("Sync: Agenda Global atualizada remotamente.");
        isRemoteUpdate = true;
        localStorage.setItem(LS_GLOBAL_AGENDA, valStr);

        // Recarrega a tela mesclando (Board + Agenda Nova)
        loadAndRenderAll();
        isRemoteUpdate = false;
    });
}

function subscribeToCurrentBoard(uid, boardId) {
    if (!isFirebaseReady || !uid || !boardId) return;

    if (currentBoardRef) currentBoardRef.off();

    if (boardId === 'board-todos') {
        console.log('Sync: Escutando alterações em TODOS os quadros...');
        currentBoardRef = db.ref('users/' + uid + '/boards');
        currentBoardRef.on('value', (snapshot) => {
            hasLoadedCurrentBoard = true;
            checkInitialLoadComplete();
            let val = snapshot.val();
            if (!val) val = {};

            let changed = false;
            Object.keys(val).forEach(bId => {
                if (bId === 'board-todos') return;
                const boardDataStr = JSON.stringify(val[bId]);
                const localData = localStorage.getItem(LS_BOARD_PREFIX + bId);
                if (boardDataStr !== localData) {
                    localStorage.setItem(LS_BOARD_PREFIX + bId, boardDataStr);
                    changed = true;
                }
            });

            // Sempre carrega se houver alteração ou se for o primeiro render do board-todos
            if (changed || boardEl.children.length === 0) {
                isRemoteUpdate = true;
                loadAndRenderAll();
                isRemoteUpdate = false;
            }
        });
        return;
    }

    console.log(`Sync: Escutando alterações no quadro ${boardId}...`);
    currentBoardRef = db.ref('users/' + uid + '/boards/' + boardId);

    currentBoardRef.on('value', (snapshot) => {
        hasLoadedCurrentBoard = true;
        checkInitialLoadComplete();
        let val = snapshot.val();
        
        if (!snapshot.exists()) {
            const localBoardStr = localStorage.getItem(LS_BOARD_PREFIX + boardId);
            if (localBoardStr && localBoardStr !== '[]' && localBoardStr !== '') {
                console.log(`Sync: Firebase board ${boardId} não existe, enviando local...`);
                try {
                    currentBoardRef.set(JSON.parse(localBoardStr));
                    return;
                } catch (e) {
                    console.error('Erro ao fazer parse do quadro local para enviar:', e);
                }
            }
        }

        if (!val) val = [];

        const currentLocalData = localStorage.getItem(LS_BOARD_PREFIX + boardId);
        const valStr = JSON.stringify(val);

        if (valStr === currentLocalData) return;

        console.log('Sync: Conteúdo do quadro atualizado remotamente.');
        isRemoteUpdate = true;
        localStorage.setItem(LS_BOARD_PREFIX + boardId, valStr);

        if (currentBoardId === boardId) {
            loadAndRenderAll();
        }
        isRemoteUpdate = false;
    });
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
                if (typeof isInitialLoadComplete !== 'undefined' && !isInitialLoadComplete) {
                    console.log("Sync: Ignorando gravação no Firebase (carga inicial incompleta).");
                } else {
                    db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).set(boardData)
                        .catch(e => console.error("Firebase board save error:", e));
                    db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(agendaData)
                        .catch(e => console.error("Firebase agenda save error:", e));
                }
            }
        }

        if (isFirebaseReady && auth && auth.currentUser && !isRemoteUpdate) {
            if (typeof isInitialLoadComplete !== 'undefined' && isInitialLoadComplete) {
                triggerAutomaticCloudBackup(auth.currentUser.uid);
            }
        }
    } catch (e) { }
    capture();
}

function saveToCloud(path, data) {
    if (isFirebaseReady && db && auth && auth.currentUser) {
        return db.ref(path).set(data);
    }
    return Promise.resolve();
}

function triggerAutomaticCloudBackup(uid) {
    if (!isFirebaseReady || !uid) return;
    const now = Date.now();
    if (now - lastCloudBackupTime < CLOUD_BACKUP_THROTTLE) return;
    lastCloudBackupTime = now;

    // Coleta dados atuais para backup completo
    const backupData = {
        version: '2.0',
        timestamp: now,
        boardsMeta: boardsMeta,
        globalAgenda: JSON.parse(localStorage.getItem(LS_GLOBAL_AGENDA) || '[]'),
        boards: {}
    };
    boardsMeta.forEach(b => {
        backupData.boards[b.id] = JSON.parse(localStorage.getItem(LS_BOARD_PREFIX + b.id) || '[]');
    });

    // Salva no banco de dados do Firebase
    db.ref('users/' + uid + '/backups/' + now).set(backupData)
        .then(() => {
            // Salva na lista leve (índice de backups) para o menu rápido
            const dateStr = new Date(now).toLocaleString('pt-BR');
            db.ref('users/' + uid + '/backup_index/' + now).set({
                timestamp: now,
                dateStr: dateStr
            });

            console.log("Sync: Backup automático salvo na nuvem.");

            // Limpa backups com mais de 7 dias (7 * 24 * 60 * 60 * 1000 = 604800000 ms)
            const oneWeekAgo = now - 604800000;
            
            // Deleta da tabela de backups pesados
            db.ref('users/' + uid + '/backups').orderByKey().endAt(String(oneWeekAgo)).once('value', (snapshot) => {
                const oldBackups = snapshot.val();
                if (oldBackups) {
                    Object.keys(oldBackups).forEach(key => {
                        db.ref('users/' + uid + '/backups/' + key).remove()
                            .catch(e => console.error("Erro ao deletar backup antigo:", e));
                    });
                }
            });

            // Deleta da tabela de index leve
            db.ref('users/' + uid + '/backup_index').orderByKey().endAt(String(oneWeekAgo)).once('value', (snapshot) => {
                const oldIndexes = snapshot.val();
                if (oldIndexes) {
                    Object.keys(oldIndexes).forEach(key => {
                        db.ref('users/' + uid + '/backup_index/' + key).remove()
                            .catch(e => console.error("Erro ao deletar índice antigo:", e));
                    });
                }
            });
        })
        .catch(e => console.error("Erro ao criar backup automático:", e));
}

function openCloudBackupsDialog(uid) {
    if (!isFirebaseReady || !uid) return;
    
    // Mostra modal de carregando
    const modalElements = showModal('Backups na Nuvem ☁️', function() {
        const wrap = el('div');
        wrap.style.minWidth = '350px';
        wrap.style.padding = '10px 0';
        
        const loading = el('div');
        loading.textContent = 'Carregando lista de backups...';
        loading.style.color = '#9fb3d2';
        loading.style.textAlign = 'center';
        loading.id = 'backup-loading-msg';
        wrap.appendChild(loading);
        
        const listContainer = el('div');
        listContainer.id = 'backups-list-container';
        listContainer.style.display = 'flex';
        listContainer.style.flexDirection = 'column';
        listContainer.style.gap = '8px';
        listContainer.style.maxHeight = '300px';
        listContainer.style.overflowY = 'auto';
        wrap.appendChild(listContainer);
        
        return wrap;
    }, function(body, wrap) {
        // Apenas fecha
    });
    
    // Remove o botão de OK do modal para simplificar (deixando apenas Fechar)
    if (modalElements && modalElements.okButton) {
        modalElements.okButton.style.display = 'none';
        modalElements.cancelButton.textContent = 'Fechar';
    }
    
    // Busca o index leve do Firebase
    db.ref('users/' + uid + '/backup_index').once('value')
        .then((snapshot) => {
            const loadingMsg = document.getElementById('backup-loading-msg');
            if (loadingMsg) loadingMsg.remove();
            
            const listContainer = document.getElementById('backups-list-container');
            if (!listContainer) return;
            
            const val = snapshot.val();
            if (!val) {
                const empty = el('div');
                empty.textContent = 'Nenhum backup automático encontrado.';
                empty.style.color = '#9fb3d2';
                empty.style.textAlign = 'center';
                listContainer.appendChild(empty);
                return;
            }
            
            // Ordena os backups do mais recente para o mais antigo
            const sortedKeys = Object.keys(val).sort((a, b) => b - a);
            
            sortedKeys.forEach(key => {
                const backupInfo = val[key];
                
                const item = el('div');
                item.style.display = 'flex';
                item.style.justifyContent = 'space-between';
                item.style.alignItems = 'center';
                item.style.padding = '8px 12px';
                item.style.background = '#0f223d';
                item.style.border = '1px solid #2a4e78';
                item.style.borderRadius = '6px';
                
                const infoText = el('div');
                infoText.style.color = '#fff';
                infoText.style.fontSize = '14px';
                infoText.textContent = backupInfo.dateStr || new Date(Number(key)).toLocaleString('pt-BR');
                item.appendChild(infoText);
                
                const restoreBtn = el('button');
                restoreBtn.textContent = 'Restaurar';
                restoreBtn.style.padding = '5px 10px';
                restoreBtn.style.background = '#2e7d32';
                restoreBtn.style.color = '#fff';
                restoreBtn.style.border = 'none';
                restoreBtn.style.borderRadius = '4px';
                restoreBtn.style.cursor = 'pointer';
                restoreBtn.style.fontSize = '12px';
                
                restoreBtn.onclick = () => {
                    showConfirm(`Tem certeza que deseja restaurar o backup de ${infoText.textContent}? Isso substituirá todos os seus quadros e agenda atuais.`, () => {
                        // Fecha o modal de backups
                        if (modalElements && modalElements.wrap) {
                            modalElements.wrap.remove();
                        }
                        
                        // Mostra carregando
                        const loader = showModal('Restaurando...', () => {
                            const d = el('div');
                            d.textContent = 'Buscando dados no servidor...';
                            return d;
                        }, () => {});
                        loader.okButton.style.display = 'none';
                        loader.cancelButton.style.display = 'none';
                        
                        // Busca o backup completo do Firebase
                        db.ref('users/' + uid + '/backups/' + key).once('value')
                            .then((backupSnap) => {
                                const data = backupSnap.val();
                                loader.wrap.remove();
                                if (data && data.boardsMeta && data.boards) {
                                    // Executa a importação dos dados
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
                                    
                                    // Sincroniza de volta no Firebase para forçar atualização em outros dispositivos
                                    const promises = [];
                                    promises.push(db.ref('users/' + uid + '/meta').set(data.boardsMeta));
                                    promises.push(db.ref('users/' + uid + '/global/agenda').set(data.globalAgenda || []));
                                    Object.keys(data.boards).forEach(boardId => {
                                        promises.push(db.ref('users/' + uid + '/boards/' + boardId).set(data.boards[boardId]));
                                    });
                                    
                                    Promise.all(promises).then(() => {
                                        alert('Backup restaurado com sucesso! Recarregando aplicativo...');
                                        window.location.reload();
                                    }).catch(err => {
                                        console.error('Erro na sincronização pós-restauro:', err);
                                        window.location.reload();
                                    });
                                } else {
                                    alert('Erro: Arquivo de backup corrompido ou vazio no servidor.');
                                }
                            })
                            .catch(err => {
                                loader.wrap.remove();
                                console.error('Erro ao buscar backup no Firebase:', err);
                                alert('Erro de rede ao buscar dados do backup.');
                            });
                    });
                };
                
                item.appendChild(restoreBtn);
                listContainer.appendChild(item);
            });
        })
        .catch(err => {
            console.error("Erro ao buscar backup_index:", err);
            const loadingMsg = document.getElementById('backup-loading-msg');
            if (loadingMsg) {
                loadingMsg.textContent = 'Erro ao conectar ao Firebase.';
                loadingMsg.style.color = '#ff6b6b';
            }
        });
}
