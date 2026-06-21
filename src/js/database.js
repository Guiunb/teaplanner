// ===== Real-time Database Sync Logic =====

function setupFirebaseSync(user) {
    // 1. Sincronizar METADADOS (Lista de Quadros)
    const metaRef = db.ref('users/' + user.uid + '/meta');
    metaRef.on('value', (snapshot) => {
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
                db.ref('users/' + auth.currentUser.uid + '/boards/' + currentBoardId).set(boardData)
                    .catch(e => console.error("Firebase board save error:", e));
                db.ref('users/' + auth.currentUser.uid + '/global/agenda').set(agendaData)
                    .catch(e => console.error("Firebase agenda save error:", e));
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
