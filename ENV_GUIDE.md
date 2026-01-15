# Environment Configuration Guide

## Overview
This project uses environment files to manage different testing environments and configurations. The setup supports multiple environments with proper precedence handling.

## Environment Files

### File Precedence (highest to lowest)
1. `.env.local` - Local development overrides (not committed to git)
2. `.env.{NODE_ENV}` - Environment-specific configs (e.g., `.env.staging`)  
3. `.env` - Default configuration (committed to git)

### Available Environment Files

| File | Purpose | Git Tracked |
|------|---------|-------------|
| `.env` | Default QA environment settings | ✅ Yes |
| `.env.staging` | Staging environment settings | ✅ Yes |
| `.env.production` | Production environment template | ✅ Yes |
| `.env.local` | Local development overrides | ❌ No |

## Usage

### Running Tests with Different Environments

```powershell
# Default environment (uses .env)
npm run test

# QA environment (explicit)
npm run test:qa

# Staging environment  
npm run test:staging

# Local development (uses .env.local)
npm run test:local

# Debug mode (headed browser with slow motion)
npm run test:debug

# Headed mode (see browser)
npm run test:headed
```

### Environment Variables

#### Application URLs
- `BASE_URL` - Base application URL
- `LOGIN_URL` - Login page URL

#### Browser Configuration
- `HEADLESS` - Run in headless mode (true/false)
- `BROWSER_TIMEOUT` - Browser action timeout in ms
- `VIEWPORT_WIDTH` - Browser viewport width
- `VIEWPORT_HEIGHT` - Browser viewport height

#### Test Configuration
- `TEST_TIMEOUT` - Test timeout in milliseconds
- `EXPECT_TIMEOUT` - Assertion timeout in milliseconds  
- `RETRIES` - Number of test retries on failure
- `WORKERS` - Number of parallel workers
- `PARALLEL` - Run tests in parallel (true/false)

#### Test Users
- `TEST_USER_AVIONTWO` - Username for aviontwo user
- `TEST_USER_AVIONTHREE` - Username for avionthree user
- `DEFAULT_PASSWORD` - Default password for test users

#### Link IDs
- `LINK_ID_PAGE_VIEW` - Link ID for page view tests
- `LINK_ID_DOCUMENT_VIEW` - Link ID for document view tests
- `LINK_ID_SMOKE_DOC` - Link ID for smoke document tests

#### Debug Configuration
- `DEBUG_MODE` - Enable debug logging (true/false)
- `SLOW_MO` - Slow motion delay in ms
- `CONSOLE_LOGS` - Show console logs (true/false)

## Setup Instructions

### 1. Copy Environment Template
```powershell
# Create your local environment file
Copy-Item .env .env.local
```

### 2. Edit Local Configuration
Edit `.env.local` with your local settings:
```env
HEADLESS=false
DEBUG_MODE=true
SLOW_MO=500
TEST_TIMEOUT=180000
```

### 3. Set Environment-Specific Credentials
For staging/production, update the respective files with proper credentials.

### 4. Verify Configuration
```powershell
npm run env:check
```

## Security Best Practices

### ✅ Do Commit
- `.env` (default config)  
- `.env.staging` (staging config)
- `.env.production` (template only, no real credentials)

### ❌ Don't Commit
- `.env.local` (personal settings)
- `.env.production` with real credentials
- Any `.env.*.local` files

### Production Credentials
For production testing:
1. Never commit real production credentials
2. Use CI/CD environment variables instead
3. Reference them in .env.production as `${VARIABLE_NAME}`

## Examples

### Override Single Setting
```powershell
# Run with specific timeout
$env:TEST_TIMEOUT="60000"; npm run test

# Run single test headed
$env:HEADLESS="false"; npx playwright test specific-test.spec.ts
```

### Environment-Specific User Management
```typescript
import { getTestUser } from '../src/Commons/EnvironmentConfig';

// Gets user from current environment
const user = getTestUser('aviontwo');
await loginPage.login(user.username, user.password);
```

### Custom Environment Setup
```powershell
# Create custom environment
Copy-Item .env .env.custom

# Run with custom environment  
$env:NODE_ENV="custom"; npm run test
```

## Troubleshooting

### Environment Not Loading
1. Check file names (no typos)
2. Verify NODE_ENV is set correctly
3. Run `npm run env:check` to verify

### Variables Not Working
1. Ensure no spaces around `=` in .env files
2. Use quotes for values with spaces: `BASE_URL="https://example.com"`
3. Restart terminal after changes

### Precedence Issues
Remember the order: `.env.local` > `.env.{NODE_ENV}` > `.env`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run test` | Run all tests with default environment |
| `npm run test:qa` | Run tests in QA environment |
| `npm run test:staging` | Run tests in staging environment |
| `npm run test:local` | Run tests with local development settings |
| `npm run test:debug` | Run tests in debug mode (headed, slow) |
| `npm run test:headed` | Run tests in headed mode |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:report` | Show test report |
| `npm run env:check` | Verify environment configuration |