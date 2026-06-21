$logsPath = "C:\Users\Guilherme\.gemini\antigravity\brain\55b50e51-e758-4e37-8171-3a5b1fc7c93b\.system_generated\logs"
$jsonFiles = Get-ChildItem -Path $logsPath -Filter "*.jsonl"

Write-Host "Scanning JSONL logs for untruncated premium feature code..."

foreach ($file in $jsonFiles) {
    Write-Host "Reading $($file.Name)..."
    $lines = Get-Content -Path $file.FullName
    
    foreach ($line in $lines) {
        if ($line -like "*openAgendaDialog*") {
            try {
                $obj = ConvertFrom-Json $line -ErrorAction Stop
                
                # Check if this is a tool call or response
                if ($obj.tool_calls) {
                    foreach ($call in $obj.tool_calls) {
                        if ($call.args.ReplacementContent -and $call.args.ReplacementContent -like "*openAgendaDialog*") {
                            $code = $call.args.ReplacementContent
                            $lineNum = $call.args.StartLine
                            Write-Host "Found ReplacementContent in tool_call at step $($obj.step_index), line $lineNum"
                            Set-Content -Path "scratch\extracted_full_call_$($obj.step_index).js" -Value $code -Encoding utf8
                        }
                        if ($call.args.CodeContent -and $call.args.CodeContent -like "*openAgendaDialog*") {
                            $code = $call.args.CodeContent
                            Write-Host "Found CodeContent in tool_call at step $($obj.step_index)"
                            Set-Content -Path "scratch\extracted_full_code_$($obj.step_index).js" -Value $code -Encoding utf8
                        }
                    }
                }
            } catch {
                # Not valid JSON or parsing error, skip
            }
        }
    }
}

Write-Host "Scan completed."
