$data = Get-Content -Raw -Path 'c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\tea-planner-backup-reconstruido20260603.json' | ConvertFrom-Json
$timmerBoard = $data.boards.mjpwxp9zgcag2gqeby
Write-Output "Type of timmerBoard: $($timmerBoard.GetType().FullName)"
if ($timmerBoard -is [System.Array]) {
    Write-Output "It is an array of length $($timmerBoard.Length)"
    Write-Output "Lists inside:"
    foreach ($list in $timmerBoard) {
        Write-Output "  List Title: $($list.title), Type: $($list.type), Quad: $($list.quad), Cards Count: $($list.cards.Count)"
    }
} else {
    Write-Output "It is an object. Properties: $($timmerBoard | Get-Member -MemberType NoteProperty | Select-Object -ExpandProperty Name | Out-String)"
}
