$sh = New-Object -ComObject Shell.Application
$bin = $sh.NameSpace(0x0a)
$items = $bin.Items()
$items | Where-Object { $_.Name -like "*index*" } | Select-Object Name, Path, DeletedDate
