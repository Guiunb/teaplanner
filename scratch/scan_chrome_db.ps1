$profilesPath = "C:\Users\Guilherme\AppData\Local\Google\Chrome\User Data"
$files = Get-ChildItem -Path $profilesPath -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.FullName -like "*Local Storage*leveldb*" }

Write-Host "Scanning $($files.Count) LevelDB files..."

foreach ($file in $files) {
    try {
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        
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
            Write-Host "Found match in: $($file.FullName) (Size: $($file.Length) bytes)"
        }
    } catch {
        Write-Host "Error reading $($file.FullName): $_"
    }
}
