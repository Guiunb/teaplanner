Get-ChildItem -Path "c:\Users\Guilherme" -Filter "*index*.html" -Recurse -File -ErrorAction SilentlyContinue | 
    Where-Object { $_.LastWriteTime -gt (Get-Date).AddDays(-7) } | 
    Select-Object FullName, Length, LastWriteTime | 
    Sort-Object LastWriteTime -Descending
