# start-tunnel.ps1
# Starts the Node static server (npm start) and opens a localtunnel to expose the port.
# Requirements: Node.js, npm, localtunnel (npm i -g localtunnel) or ngrok in PATH.

param(
  [int]$Port = 8080,
  [string]$Subdomain = ''
)

# Start server in background
Write-Host "Starting server on port $Port..."
Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npm start" -WorkingDirectory (Get-Location)
Start-Sleep -Seconds 1

# Try localtunnel first
if (Get-Command lt -ErrorAction SilentlyContinue) {
  Write-Host "Opening localtunnel on port $Port..."
  if ($Subdomain -ne '') {
    lt --port $Port --subdomain $Subdomain
  } else {
    lt --port $Port
  }
  return
}

# Fallback to ngrok if available
$ngrok = Get-Command ngrok -ErrorAction SilentlyContinue
if ($ngrok) {
  Write-Host "Opening ngrok on port $Port..."
  & ngrok http $Port
  return
}

Write-Host "Neither localtunnel (lt) nor ngrok were found on PATH. Install one and re-run.`nLocalTunnel: npm i -g localtunnel`nngrok: https://ngrok.com/download"
