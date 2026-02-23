# API Testing Script

Write-Host "=== Testing REST API ===" -ForegroundColor Green
Write-Host ""

# Register new user
Write-Host "1. Register user..." -ForegroundColor Yellow
$registerBody = '{"username":"demo","password":"demo123"}'
try {
    $response = Invoke-WebRequest -Uri http://localhost:5000/api/auth/register -Method POST -Body $registerBody -ContentType "application/json" -UseBasicParsing -SessionVariable session
    Write-Host "Success: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Login
Write-Host "2. Login..." -ForegroundColor Yellow
$loginBody = '{"username":"testuser","password":"testpass123"}'
try {
    $response = Invoke-WebRequest -Uri http://localhost:5000/api/auth/login -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing -SessionVariable session
    Write-Host "Success: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Get current user
Write-Host "3. Get current user..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri http://localhost:5000/api/auth/me -Method GET -UseBasicParsing -WebSession $session
    Write-Host "Success: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Protected route
Write-Host "4. Access protected route..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri http://localhost:5000/api/protected -Method GET -UseBasicParsing -WebSession $session
    Write-Host "Success: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Logout
Write-Host "5. Logout..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri http://localhost:5000/api/auth/logout -Method POST -UseBasicParsing -WebSession $session
    Write-Host "Success: $($response.Content)" -ForegroundColor Green
} catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Check access after logout
Write-Host "6. Check access after logout..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri http://localhost:5000/api/protected -Method GET -UseBasicParsing -WebSession $session
    Write-Host "Unexpected: access granted" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "Success: access denied (401)" -ForegroundColor Green
    } else {
        Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}
Write-Host ""

Write-Host "=== Testing completed ===" -ForegroundColor Green
