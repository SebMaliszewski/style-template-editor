# Start the editor on http://127.0.0.1:8765  (set $env:NT_PORT / $env:NT_CHROME to override)
Set-Location $PSScriptRoot
if (Get-Command py -ErrorAction SilentlyContinue) { py -3 server.py } else { python server.py }
