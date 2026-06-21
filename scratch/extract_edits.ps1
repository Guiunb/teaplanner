# Extract all replace_file_content calls from transcript.jsonl
$logPath = "C:\Users\Guilherme\.gemini\antigravity\brain\55b50e51-e758-4e37-8171-3a5b1fc7c93b\.system_generated\logs\transcript.jsonl"
$output = @()

Get-Content $logPath | ForEach-Object {
    if ($_ -match '"name":"(replace_file_content|write_to_file)"') {
        # Parse JSON line
        try {
            $step = ConvertFrom-Json $_
            foreach ($tc in $step.tool_calls) {
                if ($tc.name -eq "replace_file_content" -or $tc.name -eq "write_to_file") {
                    $args = $tc.args
                    if ($args.TargetFile -match "index\.html") {
                        $output += [PSCustomObject]@{
                            StepIndex = $step.step_index
                            Type = $tc.name
                            StartLine = $args.StartLine
                            EndLine = $args.EndLine
                            Instruction = $args.Instruction
                            TargetContent = $args.TargetContent
                            ReplacementContent = $args.ReplacementContent
                        }
                    }
                }
            }
        } catch {}
    }
}

$output | Format-List | Out-File "c:\Users\Guilherme\Dropbox\- TEA PLANNER 2.0\scratch\extracted_edits.txt" -Encoding utf8
Write-Output "Extracted edits written to scratch\extracted_edits.txt"
