# Registers a Task Scheduler task that starts the editor at logon (hidden window).
# Run in PowerShell:  powershell -ExecutionPolicy Bypass -File scripts\install-windows-autostart.ps1
# Remove:            Unregister-ScheduledTask -TaskName StyleTemplateEditor -Confirm:$false
$dir = Split-Path -Parent $PSScriptRoot
$py = (Get-Command pythonw -ErrorAction SilentlyContinue).Source
if (-not $py) { $py = (Get-Command python -ErrorAction Stop).Source }
$action  = New-ScheduledTaskAction -Execute $py -Argument "`"$dir\server.py`"" -WorkingDirectory $dir
$trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$set     = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit 0
Register-ScheduledTask -TaskName StyleTemplateEditor -Action $action -Trigger $trigger -Settings $set -Force | Out-Null
Start-ScheduledTask -TaskName StyleTemplateEditor
Write-Host "Autostart installed. Open http://127.0.0.1:8765"
