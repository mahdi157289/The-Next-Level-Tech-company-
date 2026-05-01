# PowerShell script to move and rename the generated AI Agent image
$sourcePath = "C:\Users\bacca\.gemini\antigravity\brain\72c17aa2-a649-404f-83ac-fdf7c9ca41e1\ai_agent_new_1777605245122.png"
$destPath = ".\public\images\ai-agent-v3.png"

if (Test-Path $sourcePath) {
    Write-Host "Found source image at: $sourcePath" -ForegroundColor Cyan
    
    # Ensure public/images directory exists
    if (!(Test-Path ".\public\images")) {
        New-Item -ItemType Directory -Path ".\public\images" -Force
    }
    
    Copy-Item -Path $sourcePath -Destination $destPath -Force
    Write-Host "Successfully copied and renamed image to: $destPath" -ForegroundColor Green
    Write-Host "The 'AI Agent' post should now display the new image." -ForegroundColor Yellow
} else {
    Write-Error "Could not find the source image at $sourcePath. Please check the path and try again."
}
