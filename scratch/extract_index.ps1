$brainDir = "C:\Users\Guilherme\.gemini\antigravity\brain\76705acf-1bbe-40b2-ad42-1baced32f8f8"
$transcriptPath1 = "$brainDir\.system_generated\logs\transcript_full.jsonl"
$transcriptPath2 = "$brainDir\.system_generated\logs\transcript.jsonl"

$path = $null
if (Test-Path $transcriptPath1) { $path = $transcriptPath1 }
elseif (Test-Path $transcriptPath2) { $path = $transcriptPath2 }

if ($null -eq $path) {
    Write-Error "Transcript file not found!"
    exit
}

Write-Host "Reading transcript from $path..."
$lines = Get-Content -Path $path

# Loop backwards to find the last write_to_file for index.html
$found = $false
for ($i = $lines.Length - 1; $i -ge 0; $i--) {
    $line = $lines[$i]
    if ($line.Contains("write_to_file") -and $line.Contains("index.html")) {
        try {
            $json = ConvertFrom-Json $line
            # Check tool_calls array
            if ($null -ne $json.tool_calls) {
                foreach ($tc in $json.tool_calls) {
                    if ($tc.name -eq "write_to_file" -and $tc.args.TargetFile -like "*index.html") {
                        $content = $tc.args.CodeContent
                        if ($null -ne $content -and $content.Length -gt 100000) {
                            # Save this as backup
                            [System.IO.File]::WriteAllText("scratch\recovered_index.html", $content, (New-Object System.Text.UTF8Encoding($false)))
                            Write-Host "Successfully recovered index.html from step $($json.step_index)! Length: $($content.Length) characters."
                            $found = $true
                            break
                        }
                    }
                }
            }
        } catch {
            # Ignore parse errors for partial lines
        }
    }
    if ($found) { break }
}

if (-not $found) {
    Write-Host "No write_to_file found. Searching for replace_file_content or other writes..."
}
