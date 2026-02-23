# REST Express App

Полноценное приложение с React фронтендом и Express backend с SQLite базой данных.

## ✅ Что готово

- Аутентификация (регистрация, логин, логаут)
- SQLite база данных через Drizzle ORM
- Passport.js для управления сессиями
- Защищенные API роуты
- React + TypeScript фронтенд
- UI компоненты на базе Radix UI

## 🚀 Быстрый старт

Всё уже настроено и работает! Сервер запущен на http://localhost:5000

### Тестовый пользователь
- Username: `testuser`
- Password: `testpass123`

## API Endpoints

### Аутентификация

**POST /api/auth/register** - Регистрация
```json
{
  "username": "user",
  "password": "password"
}
```

**POST /api/auth/login** - Вход
```json
{
  "username": "user",
  "password": "password"
}
```

**POST /api/auth/logout** - Выход

**GET /api/auth/me** - Текущий пользователь

### Защищенные роуты

**GET /api/protected** - Пример (требует аутентификации)

## Команды

```bash
npm run dev      # Запуск dev сервера
npm run build    # Production сборка
npm start        # Запуск production
npm run check    # Проверка типов
npm run db:push  # Применить изменения схемы БД
```

## Структура

```
├── client/          # React фронтенд
│   ├── src/
│   │   ├── components/  # UI компоненты
│   │   ├── pages/       # Страницы
│   │   └── hooks/       # React хуки
├── server/          # Express backend
│   ├── index.ts     # Точка входа
│   ├── routes.ts    # API роуты
│   ├── auth.ts      # Аутентификация
│   ├── db.ts        # Подключение к БД
│   └── storage.ts   # Слой данных
├── shared/          # Общий код
│   └── schema.ts    # Drizzle схемы
└── local.db         # SQLite база
```

## Технологии

- **Frontend**: React 19, TypeScript, Vite, TailwindCSS, Radix UI
- **Backend**: Express 5, TypeScript, Passport.js
- **Database**: SQLite, Drizzle ORM
- **Validation**: Zod
