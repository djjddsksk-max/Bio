# Backend API Improvements

## Задача
Расширь backend функционал и добавь новые API endpoints

## Что нужно сделать

### 1. User Profile API
```
GET /api/user/profile - Получить профиль
PUT /api/user/profile - Обновить профиль
POST /api/user/avatar - Загрузить аватар
PUT /api/user/password - Сменить пароль
```

### 2. Posts/Content API
```
GET /api/posts - Список постов (с пагинацией)
GET /api/posts/:id - Один пост
POST /api/posts - Создать пост
PUT /api/posts/:id - Обновить пост
DELETE /api/posts/:id - Удалить пост
```

### 3. Comments API
```
GET /api/posts/:id/comments - Комментарии к посту
POST /api/posts/:id/comments - Добавить комментарий
DELETE /api/comments/:id - Удалить комментарий
```

### 4. Search & Filter
```
GET /api/search?q=query - Поиск
GET /api/posts?category=tech&sort=date - Фильтрация
```

### 5. Analytics API
```
GET /api/analytics/stats - Статистика пользователя
GET /api/analytics/activity - История активности
```

## Требования

### Database Schema
- Добавь таблицы: posts, comments, user_profiles
- Используй Drizzle ORM
- Добавь индексы для производительности
- Создай relations между таблицами

### Validation
- Используй Zod для валидации всех входных данных
- Добавь проверку прав доступа
- Валидируй размеры файлов

### Error Handling
- Единый формат ошибок
- Правильные HTTP статус коды
- Логирование ошибок

### Security
- Rate limiting для API
- Sanitize user input
- CORS настройки
- Защита от SQL injection (через Drizzle)

## Структура
```
server/
  routes/
    auth.ts
    users.ts
    posts.ts
    comments.ts
    analytics.ts
  middleware/
    auth.ts
    validation.ts
    rateLimit.ts
  storage/
    users.ts
    posts.ts
    comments.ts
```

## Примечания
- Все роуты должны быть защищены (кроме публичных)
- Добавь middleware для проверки аутентификации
- Используй транзакции для сложных операций
