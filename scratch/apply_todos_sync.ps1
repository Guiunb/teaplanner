$path = "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\index.html"
$lines = Get-Content -Path $path

$startIndex = -1
for ($i = 0; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -like "*function subscribeToCurrentBoard*") {
        $startIndex = $i
        break
    }
}

if ($startIndex -eq -1) {
    Write-Host "ERROR: Could not find subscribeToCurrentBoard"
    Exit 1
}

$endIndex = -1
for ($i = $startIndex; $i -lt $lines.Count; $i++) {
    # The function ends right before // ===== Helpers =====
    if ($lines[$i] -like "*// ===== Helpers =====*") {
        $endIndex = $i - 1
        break
    }
}

if ($endIndex -eq -1) {
    Write-Host "ERROR: Could not find closing boundary (// ===== Helpers =====)"
    Exit 1
}

# The new function lines
$newLines = @(
    "            function subscribeToCurrentBoard(uid, boardId) {"
    "                if (!isFirebaseReady || !uid || !boardId) return;"
    ""
    "                if (currentBoardRef) currentBoardRef.off();"
    ""
    "                if (boardId === 'board-todos') {"
    "                    console.log('Sync: Escutando alterações em TODOS os quadros...');"
    "                    currentBoardRef = db.ref('users/' + uid + '/boards');"
    "                    currentBoardRef.on('value', (snapshot) => {"
    "                        let val = snapshot.val();"
    "                        if (!val) val = {};"
    ""
    "                        let changed = false;"
    "                        Object.keys(val).forEach(bId => {"
    "                            if (bId === 'board-todos') return;"
    "                            const boardDataStr = JSON.stringify(val[bId]);"
    "                            const localData = localStorage.getItem(LS_BOARD_PREFIX + bId);"
    "                            if (boardDataStr !== localData) {"
    "                                localStorage.setItem(LS_BOARD_PREFIX + bId, boardDataStr);"
    "                                changed = true;"
    "                            }"
    "                        });"
    ""
    "                        // Sempre carrega se houver alteração ou se for o primeiro render do board-todos"
    "                        if (changed || boardEl.children.length === 0) {"
    "                            isRemoteUpdate = true;"
    "                            loadAndRenderAll();"
    "                            isRemoteUpdate = false;"
    "                        }"
    "                    });"
    "                    return;"
    "                }"
    ""
    "                console.log(`Sync: Escutando alterações no quadro ${boardId}...`);"
    "                currentBoardRef = db.ref('users/' + uid + '/boards/' + boardId);"
    ""
    "                currentBoardRef.on('value', (snapshot) => {"
    "                    let val = snapshot.val();"
    "                    "
    "                    if (!snapshot.exists()) {"
    "                        const localBoardStr = localStorage.getItem(LS_BOARD_PREFIX + boardId);"
    "                        if (localBoardStr && localBoardStr !== '[]' && localBoardStr !== '') {"
    "                            console.log(`Sync: Firebase board ${boardId} não existe, enviando local...`);"
    "                            try {"
    "                                currentBoardRef.set(JSON.parse(localBoardStr));"
    "                                return;"
    "                            } catch (e) {"
    "                                console.error('Erro ao fazer parse do quadro local para enviar:', e);"
    "                            }"
    "                        }"
    "                    }"
    ""
    "                    if (!val) val = [];"
    ""
    "                    const currentLocalData = localStorage.getItem(LS_BOARD_PREFIX + boardId);"
    "                    const valStr = JSON.stringify(val);"
    ""
    "                    if (valStr === currentLocalData) return;"
    ""
    "                    console.log('Sync: Conteúdo do quadro atualizado remotamente.');"
    "                    isRemoteUpdate = true;"
    "                    localStorage.setItem(LS_BOARD_PREFIX + boardId, valStr);"
    ""
    "                    if (currentBoardId === boardId) {"
    "                        loadAndRenderAll();"
    "                    }"
    "                    isRemoteUpdate = false;"
    "                });"
    "            }"
    ""
)

# Rebuild the file lines
$finalLines = $lines[0..($startIndex - 1)] + $newLines + $lines[($endIndex + 1)..($lines.Count - 1)]

[System.IO.File]::WriteAllLines($path, $finalLines, [System.Text.Encoding]::UTF8)
Write-Host "SUCCESS: Replaced subscribeToCurrentBoard via lines manipulation!"
