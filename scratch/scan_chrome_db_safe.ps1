$profilesPath = "C:\Users\Guilherme\AppData\Local\Google\Chrome\User Data"
$files = Get-ChildItem -Path $profilesPath -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*Local Storage*leveldb*" }

Write-Host "Scanning $($files.Count) LevelDB files (including locked files)..."

foreach ($file in $files) {
    try {
        # Open file with FileShare.ReadWrite to bypass lock
        $stream = New-Object System.IO.FileStream($file.FullName, [System.IO.FileMode]::Open, [System.IO.FileAccess]::Read, [System.IO.FileShare]::ReadWrite)
        $reader = New-Object System.IO.BinaryReader($stream)
        $bytes = $reader.ReadBytes($file.Length)
        $reader.Close()
        $stream.Close()
        
        # UTF-8: h o s t i n g e r
        $pattern = @(104, 111, 115, 116, 105, 110, 103, 101, 114)
        $found = $false
        for ($i = 0; $i -le $bytes.Length - $pattern.Length; $i++) {
            $match = $true
            for ($j = 0; $j -lt $pattern.Length; $j++) {
                if ($bytes[$i+$j] -ne $pattern[$j]) {
                    $match = $false
                    break
                }
            }
            if ($match) {
                $found = $true
                break
            }
        }
        
        if (-not $found) {
            # UTF-16LE: h \0 o \0 s \0 t \0 i \0 n \0 g \0 e \0 r \0
            $pattern16 = @(104, 0, 111, 0, 115, 0, 116, 0, 105, 0, 110, 0, 103, 0, 101, 0, 114, 0)
            for ($i = 0; $i -le $bytes.Length - $pattern16.Length; $i++) {
                $match = $true
                for ($j = 0; $j -lt $pattern16.Length; $j++) {
                    if ($bytes[$i+$j] -ne $pattern16[$j]) {
                        $match = $false
                        break
                    }
                }
                if ($match) {
                    $found = $true
                    break
                }
            }
        }
        
        if ($found) {
            Write-Host "Found match for 'hostinger' in: $($file.FullName) (Size: $($file.Length) bytes)"
        }
        
        # Also check for "board-todos" or general app keys to locate the active database file
        $boardPattern = @(98, 111, 97, 114, 100, 45, 116, 111, 100, 111, 115) # board-todos
        $hasBoard = $false
        for ($i = 0; $i -le $bytes.Length - $boardPattern.Length; $i++) {
            $match = $true
            for ($j = 0; $j -lt $boardPattern.Length; $j++) {
                if ($bytes[$i+$j] -ne $boardPattern[$j]) {
                    $match = $false
                    break
                }
            }
            if ($match) {
                $hasBoard = $true
                break
            }
        }
        
        if ($hasBoard) {
            Write-Host "Found 'board-todos' data in: $($file.FullName) (Size: $($file.Length) bytes)"
        }
    } catch {
        Write-Host "Error reading $($file.FullName): $_"
    }
}
