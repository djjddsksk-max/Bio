# Database Schema Expansion

## Задача
Расширь схему базы данных для полноценного приложения

## Новые таблицы

### 1. user_profiles
```typescript
{
  id: uuid (PK)
  userId: uuid (FK -> users.id)
  firstName: string
  lastName: string
  bio: text
  avatar: string (URL)
  location: string
  website: string
  birthDate: date
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 2. posts
```typescript
{
  id: uuid (PK)
  authorId: uuid (FK -> users.id)
  title: string
  content: text
  excerpt: string
  coverImage: string
  category: string
  tags: string[] (JSON)
  status: enum ('draft', 'published', 'archived')
  viewCount: integer
  likeCount: integer
  createdAt: timestamp
  updatedAt: timestamp
  publishedAt: timestamp
}
```

### 3. comments
```typescript
{
  id: uuid (PK)
  postId: uuid (FK -> posts.id)
  authorId: uuid (FK -> users.id)
  content: text
  parentId: uuid (FK -> comments.id, nullable)
  createdAt: timestamp
  updatedAt: timestamp
}
```

### 4. likes
```typescript
{
  id: uuid (PK)
  userId: uuid (FK -> users.id)
  postId: uuid (FK -> posts.id)
  createdAt: timestamp
}
```

### 5. follows
```typescript
{
  id: uuid (PK)
  followerId: uuid (FK -> users.id)
  followingId: uuid (FK -> users.id)
  createdAt: timestamp
}
```

### 6. notifications
```typescript
{
  id: uuid (PK)
  userId: uuid (FK -> users.id)
  type: enum ('like', 'comment', 'follow', 'mention')
  content: text
  relatedId: uuid
  isRead: boolean
  createdAt: timestamp
}
```

## Индексы
- users.username (unique)
- posts.authorId
- posts.status
- posts.createdAt
- comments.postId
- comments.authorId
- likes.userId, postId (composite unique)
- follows.followerId, followingId (composite unique)

## Relations
- user -> user_profiles (one-to-one)
- user -> posts (one-to-many)
- user -> comments (one-to-many)
- post -> comments (one-to-many)
- post -> likes (one-to-many)
- user -> followers (many-to-many через follows)

## Миграция
1. Создай файлы миграций в migrations/
2. Примени через `npm run db:push`
3. Добавь seed данные для тестирования

## Примечания
- Используй Drizzle ORM синтаксис
- SQLite поддерживает не все типы, адаптируй
- Добавь timestamps везде
- Используй каскадное удаление где нужно
