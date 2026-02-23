# Advanced Features

## Задача
Добавь продвинутые фичи в приложение

## 1. Real-time Updates (WebSocket)
- Используй ws (уже установлен)
- Реал-тайм уведомления
- Онлайн статус пользователей
- Live комментарии

### Реализация
```typescript
// server/websocket.ts
- Настрой WebSocket сервер
- Broadcast уведомлений
- Room-based messaging

// client
- Подключение к WS
- Обработка событий
- Reconnect логика
```

## 2. File Upload
- Загрузка аватаров
- Загрузка изображений для постов
- Валидация типов файлов
- Ограничение размера

### Реализация
```typescript
// server/upload.ts
- Multer или встроенный file handling
- Сохранение в /uploads
- Генерация уникальных имен
- Оптимизация изображений (опционально)
```

## 3. Search & Autocomplete
- Полнотекстовый поиск
- Автодополнение при вводе
- Поиск по пользователям
- Поиск по постам

### Реализация
```typescript
// Используй SQL LIKE или FTS
- Индексы для быстрого поиска
- Debounce на клиенте
- Highlight результатов
```

## 4. Email Notifications (Mock)
- Создай email templates
- Уведомления о новых комментариях
- Уведомления о новых подписчиках
- Welcome email

### Реализация
```typescript
// server/email.ts
- HTML email templates
- Mock отправка (console.log)
- Очередь email (опционально)
```

## 5. Pagination & Infinite Scroll
- Пагинация для списков
- Infinite scroll для ленты
- Cursor-based pagination

### Реализация
```typescript
// API
GET /api/posts?page=1&limit=10
GET /api/posts?cursor=uuid&limit=10

// Client
- React Query для кеширования
- Intersection Observer для infinite scroll
```

## 6. Markdown Support
- Markdown редактор для постов
- Preview режим
- Syntax highlighting для кода

### Библиотеки
- react-markdown
- remark/rehype plugins
- Code highlighting (prism/highlight.js)

## 7. Social Features
- Like/Unlike постов
- Follow/Unfollow пользователей
- Share функционал
- Bookmarks

## 8. Analytics Dashboard
- Графики просмотров
- Статистика по постам
- Рост подписчиков
- Engagement metrics

### Используй
- Recharts для графиков
- Агрегация данных на backend
- Кеширование статистики

## Приоритет
1. File Upload (важно для UX)
2. Pagination (производительность)
3. Search (usability)
4. Real-time (wow-эффект)
5. Остальное по желанию

## Примечания
- Делай фичи постепенно
- Тестируй каждую перед следующей
- Документируй API endpoints
