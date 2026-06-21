$logPath = "C:\Users\Guilherme\.gemini\antigravity\brain\55b50e51-e758-4e37-8171-3a5b1fc7c93b\.system_generated\logs\transcript.jsonl"
Get-Content $logPath | ForEach-Object {
    if ($_ -match '"name":"write_to_file"') {
        try {
            $step = ConvertFrom-Json $_
            foreach ($tc in $step.tool_calls) {
                if ($tc.name -eq "write_to_file" -and $tc.args.TargetFile -match "index\.html") {
                    $contentLength = $tc.args.CodeContent.Length
                    Write-Output "Step $($step.step_index): write_to_file on index.html, size: $contentLength characters"
                }
            }
        } catch {}
    }
}
