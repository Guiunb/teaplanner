# Servidor HTTP Local para TEA PLANNER 2.0
# Permite rodar o Test Runner sem erros de segurança (CORS/file://)

$port = 8080
$listener = New-Object System.Net.HttpListener

# Tenta encontrar uma porta livre caso a 8080 esteja ocupada
while ($true) {
    try {
        $listener.Prefixes.Clear()
        $listener.Prefixes.Add("http://localhost:$port/")
        $listener.Start()
        break
    } catch {
        $port++
        if ($port -gt 8100) {
            Write-Error "Não foi possível encontrar uma porta livre entre 8080 e 8100."
            Exit
        }
    }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   TEA PLANNER 2.0 - Servidor de Testes Local             " -ForegroundColor Green
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "Servidor rodando com sucesso em: http://localhost:$port/" -ForegroundColor Yellow
Write-Host "Abra o navegador e acesse: http://localhost:$port/test-runner.html" -ForegroundColor Yellow
Write-Host "Pressione [Ctrl + C] nesta janela para encerrar o servidor." -ForegroundColor Red
Write-Host "==========================================================" -ForegroundColor Cyan

# Abre o navegador padrão na página de testes
Start-Process "http://localhost:$port/test-runner.html"

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # Converte a rota de URL em caminho de arquivo local
        $url = [System.Uri]::UnescapeDataString($request.Url.LocalPath)
        if ($url -eq "/") { $url = "/index.html" }
        
        # Remove a barra inicial para concatenar com a pasta do script
        $relPath = $url.TrimStart('/')
        $localPath = Join-Path $PSScriptRoot $relPath

        # Verifica se o arquivo existe e o serve
        if (Test-Path $localPath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($localPath)
            
            # Define o tipo MIME adequado
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $contentType = switch ($ext) {
                ".html" { "text/html; charset=utf-8" }
                ".css"  { "text/css; charset=utf-8" }
                ".js"   { "text/javascript; charset=utf-8" }
                ".json" { "application/json; charset=utf-8" }
                ".png"  { "image/png" }
                ".jpg"  { "image/jpeg" }
                ".jpeg" { "image/jpeg" }
                ".gif"  { "image/gif" }
                ".svg"  { "image/svg+xml" }
                default { "application/octet-stream" }
            }
            
            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # Retorna 404 se o arquivo não for encontrado
            $response.StatusCode = 404
            $response.StatusDescription = "Not Found"
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("Arquivo nao encontrado: $url")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    # Captura interrupções como Ctrl+C
} finally {
    $listener.Close()
}
