# Performance & Optimization

## Задача
Оптимизируй производительность приложения

## Frontend Optimization

### 1. Code Splitting
```typescript
// Lazy loading страниц
const Dashboard = lazy(() => import('./pages/dashboard'))
const Profile = lazy(() => import('./pages/profile'))

// Suspense boundaries
<Suspense fallback={<Spinner />}>
  <Dashboard />
</Suspense>
```

### 2. Image Optimization
- Lazy loading изображений
- Responsive images
- WebP формат
- Placeholder blur

### 3. React Query Optimization
```typescript
// Кеширование
queryClient.setDefaultOptions({
  queries: {
    staleTime: 5 * 60 * 1000, // 5 минут
    cacheTime: 10 * 60 * 1000, // 10 минут
  }
})

// Prefetching
queryClient.prefetchQuery(['posts'])
```

### 4. Bundle Size
- Анализ bundle (vite-bundle-visualizer)
- Tree shaking
- Удаление неиспользуемых зависимостей
- Dynamic imports

### 5. Memoization
```typescript
// useMemo для тяжелых вычислений
const sortedPosts = useMemo(() => 
  posts.sort((a, b) => b.date - a.date), 
  [posts]
)

// useCallback для функций
const handleClick = useCallback(() => {
  // ...
}, [deps])
```

## Backend Optimization

### 1. Database Queries
```typescript
// Используй select только нужных полей
db.select({
  id: posts.id,
  title: posts.title
}).from(posts)

// Batch queries
const [users, posts] = await Promise.all([
  db.select().from(users),
  db.select().from(posts)
])

// Индексы для частых запросов
```

### 2. Caching
```typescript
// In-memory cache для частых запросов
const cache = new Map()

// Cache middleware
app.use('/api/posts', cacheMiddleware(60)) // 60 сек
```

### 3. Rate Limiting
```typescript
// Защита от DDoS
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // 100 запросов
})

app.use('/api/', limiter)
```

### 4. Compression
```typescript
import compression from 'compression'
app.use(compression())
```

### 5. Database Connection Pool
```typescript
// Оптимизация пула соединений
const sqlite = new Database('./local.db', {
  readonly: false,
  fileMustExist: false,
  timeout: 5000
})
```

## Monitoring

### 1. Performance Metrics
```typescript
// Логирование времени запросов
app.use((req, res, next) => {
  const start = Date.now()
  res.on('finish', () => {
    const duration = Date.now() - start
    if (duration > 1000) {
      console.warn(`Slow request: ${req.path} - ${duration}ms`)
    }
  })
  next()
})
```

### 2. Error Tracking
```typescript
// Централизованная обработка ошибок
app.use((err, req, res, next) => {
  console.error({
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  })
  res.status(500).json({ error: 'Internal Server Error' })
})
```

## SEO Optimization

### 1. Meta Tags
```html
<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:image" content="..." />
```

### 2. Sitemap
- Генерация sitemap.xml
- robots.txt

### 3. SSR (опционально)
- Если нужен SEO, рассмотри SSR
- Или используй pre-rendering

## Checklist
- [ ] Lazy loading компонентов
- [ ] Image optimization
- [ ] React Query кеширование
- [ ] Database индексы
- [ ] Rate limiting
- [ ] Compression
- [ ] Error tracking
- [ ] Performance monitoring
- [ ] Bundle size анализ
- [ ] SEO meta tags

## Инструменты
- Lighthouse для аудита
- Chrome DevTools Performance
- React DevTools Profiler
- Bundle analyzer
