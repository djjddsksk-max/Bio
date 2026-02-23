# Deployment & Production

## Задача
Подготовь приложение к production deployment

## 1. Environment Variables

### .env файлы
```bash
# .env.development
NODE_ENV=development
PORT=5000
DATABASE_URL=./local.db
SESSION_SECRET=dev-secret

# .env.production
NODE_ENV=production
PORT=5000
DATABASE_URL=./production.db
SESSION_SECRET=your-secure-secret-here
```

### Загрузка env
```typescript
// server/config.ts
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().transform(Number),
  DATABASE_URL: z.string(),
  SESSION_SECRET: z.string().min(32)
})

export const config = envSchema.parse(process.env)
```

## 2. Build Process

### Production build
```json
// package.json
{
  "scripts": {
    "build": "npm run build:client && npm run build:server",
    "build:client": "vite build",
    "build:server": "tsx script/build.ts",
    "start": "node dist/index.cjs"
  }
}
```

### Оптимизация build
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: 'terser',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
        }
      }
    }
  }
})
```

## 3. Docker

### Dockerfile
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=/data/production.db
    volumes:
      - ./data:/data
    restart: unless-stopped
```

## 4. Deployment Platforms

### Vercel
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "client/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/index.ts" },
    { "src": "/(.*)", "dest": "client/$1" }
  ]
}
```

### Railway
```toml
# railway.toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm start"
restartPolicyType = "ON_FAILURE"
```

### Render
```yaml
# render.yaml
services:
  - type: web
    name: bio-app
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
```

## 5. Database Migration

### Production migration strategy
```typescript
// migrations/migrate.ts
import { migrate } from 'drizzle-orm/better-sqlite3/migrator'
import { db } from '../server/db'

async function runMigrations() {
  console.log('Running migrations...')
  await migrate(db, { migrationsFolder: './migrations' })
  console.log('Migrations complete!')
}

runMigrations()
```

### Backup strategy
```bash
# backup.sh
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp production.db backups/production_$DATE.db
echo "Backup created: production_$DATE.db"
```

## 6. Monitoring & Logging

### Structured logging
```typescript
// server/logger.ts
import winston from 'winston'

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
})
```

### Health check endpoint
```typescript
// server/routes.ts
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: Date.now()
  })
})
```

## 7. Security

### Helmet для security headers
```typescript
import helmet from 'helmet'
app.use(helmet())
```

### CORS настройка
```typescript
import cors from 'cors'
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}))
```

### Rate limiting
```typescript
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use('/api/', limiter)
```

## 8. Performance

### Compression
```typescript
import compression from 'compression'
app.use(compression())
```

### Static file caching
```typescript
app.use(express.static('dist/client', {
  maxAge: '1y',
  etag: true
}))
```

## 9. Monitoring Services

### Рекомендуемые сервисы
- Sentry - error tracking
- LogRocket - session replay
- Datadog - APM
- Uptime Robot - uptime monitoring

## Deployment Checklist
- [ ] Environment variables настроены
- [ ] Production build работает
- [ ] Database migrations применены
- [ ] Backup strategy настроена
- [ ] Logging настроен
- [ ] Security headers добавлены
- [ ] Rate limiting включен
- [ ] Health check endpoint работает
- [ ] SSL/HTTPS настроен
- [ ] Monitoring настроен
- [ ] Error tracking настроен
- [ ] Performance оптимизирован

## Примечания
- Всегда тестируй production build локально
- Используй staging environment перед production
- Делай backup перед каждым deployment
- Мониторь логи после deployment
