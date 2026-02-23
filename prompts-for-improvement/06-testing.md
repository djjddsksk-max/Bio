# Testing & Quality

## Задача
Добавь тесты и улучши качество кода

## 1. Unit Tests

### Frontend (Vitest + React Testing Library)
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// client/src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '../ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
```

### Backend (Vitest)
```typescript
// server/__tests__/auth.test.ts
import { describe, it, expect } from 'vitest'
import { crypto } from '../auth'

describe('Auth', () => {
  it('hashes password correctly', async () => {
    const hash = await crypto.hash('password123')
    expect(hash).toBeTruthy()
    expect(hash).toContain('.')
  })
})
```

## 2. Integration Tests

### API Tests
```typescript
// server/__tests__/api.test.ts
import request from 'supertest'
import { app } from '../index'

describe('Auth API', () => {
  it('POST /api/auth/register', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'test', password: 'test123' })
    
    expect(res.status).toBe(200)
    expect(res.body.user).toBeDefined()
  })
})
```

## 3. E2E Tests (Playwright)

```bash
npm install -D @playwright/test
```

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('user can register', async ({ page }) => {
  await page.goto('http://localhost:5000')
  await page.click('text=Sign Up')
  await page.fill('[name=username]', 'testuser')
  await page.fill('[name=password]', 'test123')
  await page.click('button[type=submit]')
  
  await expect(page).toHaveURL('/dashboard')
})
```

## 4. Code Quality

### ESLint
```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### Prettier
```bash
npm install -D prettier
```

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Husky (Git Hooks)
```bash
npm install -D husky lint-staged
npx husky init
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 5. Type Safety

### Strict TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### Zod для runtime validation
```typescript
// Все API inputs через Zod
const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  category: z.enum(['tech', 'life', 'other'])
})
```

## 6. Documentation

### JSDoc комментарии
```typescript
/**
 * Creates a new post
 * @param data - Post data
 * @returns Created post with ID
 * @throws {ValidationError} If data is invalid
 */
async function createPost(data: CreatePostInput): Promise<Post> {
  // ...
}
```

### API Documentation
```markdown
# API.md

## POST /api/posts
Creates a new post

**Request:**
```json
{
  "title": "string",
  "content": "string"
}
```

**Response:**
```json
{
  "id": "uuid",
  "title": "string",
  "createdAt": "timestamp"
}
```
```

## 7. CI/CD (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm install
      - run: npm run check
      - run: npm run test
      - run: npm run build
```

## Test Coverage Goals
- Unit tests: 80%+
- Integration tests: основные flows
- E2E tests: критичные user journeys

## Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "format": "prettier --write \"**/*.{ts,tsx,json,md}\""
  }
}
```

## Приоритет
1. TypeScript strict mode
2. ESLint + Prettier
3. Unit tests для utils
4. Integration tests для API
5. E2E tests для критичных flows
