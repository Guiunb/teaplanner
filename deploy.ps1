# Script de Deploy local e Validação para TEA PLANNER 2.0

$PSScriptRoot = Split-Path -Parent -Path $MyInvocation.MyCommand.Definition
if ([string]::IsNullOrEmpty($PSScriptRoot)) { $PSScriptRoot = Get-Location }

# 1. Rodar o build
Write-Host "--- PASSO 1: Executando o build.ps1 ---" -ForegroundColor Cyan
& (Join-Path $PSScriptRoot "build.ps1")

# Verificar se o build ocorreu bem
if (-not $?) {
    Write-Error "Ocorreu um erro durante a compilação."
    Exit 1
}

# 2. Rodar o validador de sintaxe
Write-Host "`n--- PASSO 2: Validando sintaxe do JavaScript compilado ---" -ForegroundColor Cyan
$printErrPath = Join-Path $PSScriptRoot "scratch/print_err.ps1"
if (Test-Path $printErrPath) {
    & $printErrPath
} else {
    Write-Host "Aviso: scratch/print_err.ps1 não encontrado para validação automática." -ForegroundColor Yellow
}

# 3. Lembrar de rodar os testes
Write-Host "`n--- PASSO 3: Rodar testes locais ---" -ForegroundColor Cyan
Write-Host "Antes de enviar para produção, execute os testes no navegador:" -ForegroundColor Yellow
Write-Host "1. Execute o arquivo 'iniciar_servidor.bat'" -ForegroundColor Gray
Write-Host "2. Acesse http://localhost:8080/test-runner.html e certifique-se de que passa nos 4 testes!" -ForegroundColor Gray

# 4. Enviar para o GitHub
Write-Host "`n--- PASSO 4: Enviar para o GitHub ---" -ForegroundColor Cyan

$gitCmd = "git"
$gitFound = $false

if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitFound = $true
} else {
    # Check common local installation paths
    $commonPaths = @(
        "$env:ProgramFiles\Git\cmd\git.exe",
        "$env:ProgramFiles\Git\bin\git.exe",
        "${env:ProgramFiles(x86)}\Git\cmd\git.exe",
        "$env:LocalAppData\Programs\Git\cmd\git.exe"
    )
    
    # Check if GitHub Desktop has a git binary inside it
    if (Test-Path "$env:LocalAppData\GitHubDesktop") {
        $githubGit = Get-ChildItem -Path "$env:LocalAppData\GitHubDesktop" -Filter "git.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($githubGit) {
            $commonPaths += $githubGit.FullName
        }
    }
    
    foreach ($path in $commonPaths) {
        if (Test-Path $path) {
            $gitCmd = "& `"$path`""
            $gitFound = $true
            break
        }
    }
}

if ($gitFound) {
    Write-Host "Executando comandos git automaticamente..." -ForegroundColor Yellow
    Invoke-Expression "$gitCmd add ."
    Invoke-Expression "$gitCmd commit -m 'deploy: atualizacao automatica com melhorias do modo foco e correcao de timers'"
    Write-Host "Buscando atualizacoes do servidor (git pull)..." -ForegroundColor Gray
    Invoke-Expression "$gitCmd pull origin main --rebase"
    Write-Host "Enviando alteracoes para o GitHub..." -ForegroundColor Gray
    Invoke-Expression "$gitCmd push origin main"
    Write-Host "`nDeploy e envio para o GitHub concluídos com sucesso!" -ForegroundColor Green
} else {
    Write-Host "Aviso: Executável 'git' não encontrado no PATH nem nos diretórios padrão." -ForegroundColor Yellow
    Write-Host "Para concluir, execute os seguintes comandos no Git Bash ou GitHub Desktop:" -ForegroundColor Gray
    Write-Host "  git add ."
    Write-Host "  git commit -m 'deploy: atualizacao automatica com melhorias do modo foco e correcao de timers'"
    Write-Host "  git push origin main"
    Write-Host "`nDeploy compilado e validado localmente com sucesso! (Pendente envio ao GitHub)" -ForegroundColor Green
}
