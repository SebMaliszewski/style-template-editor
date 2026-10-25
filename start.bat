@echo off
REM Start the editor on http://127.0.0.1:8765  (set NT_PORT / NT_CHROME to override)
cd /d "%~dp0"
where py >nul 2>nul && (py -3 server.py) || (python server.py)
