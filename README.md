# СоздайМузыку

Музыкальный блог на Next.js 15 с Firebase.

**Демо:** [music-blog1.vercel.app](https://music-blog1.vercel.app)

## Что умеет

- Статьи с редактором
- Авторизация через Firebase (роли: админ, автор, пользователь)
- Комментарии
- Адаптивная вёрстка

## Стек

- Next.js 15, TypeScript, Tailwind CSS
- Firebase (Auth, Firestore)
- Vercel для хостинга

## Установка

```bash
git clone https://github.com/dffdgdg/MusicBlog.git
cd MusicBlog
npm install
```

Создай `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
FIREBASE_ADMIN_SDK_KEY=...
```

Запуск:

```bash
npm run dev
```

## Структура
```
MusicBlog/
├── src/
│   ├── app/                    # Директория приложения Next.js
│   │   ├── (public)/          # Группа публичных маршрутов
│   │   ├── admin/             # Панель администратора
│   │   ├── api/               # API маршруты
│   │   ├── auth/              # Страницы аутентификации
│   │   ├── author/            # Панель автора
│   │   ├── profile/           # Страницы профиля
│   │   ├── debug/             # Утилиты отладки
│   │   ├── layout.tsx         # Корневой layout
│   │   ├── globals.css        # Глобальные стили
│   │   └── not-found.tsx      # Страница 404
│   ├── components/            # React компоненты
│   │   ├── auth/              # Компоненты аутентификации
│   │   ├── comments/          # Функционал комментариев
│   │   ├── forms/             # Компоненты форм
│   │   ├── layout/            # Компоненты макета
│   │   ├── shared/            # Общие компоненты
│   │   └── ui/                # UI компоненты
│   ├── features/              # Логика конкретных функций
│   ├── lib/                   # Утилиты и конфигурация
│   │   ├── actions/           # Server actions
│   │   ├── auth/              # Логика аутентификации
│   │   ├── config/            # Конфигурация
│   │   ├── firestore/         # Операции Firestore
│   │   ├── hooks/             # Кастомные React хуки
│   │   ├── utils/             # Утилитарные функции
│   │   ├── validations/       # Схемы валидации
│   │   ├── auth.ts            # Утилиты авторизации
│   │   ├── firebase.ts        # Клиентская конфигурация Firebase
│   │   ├── firebase-admin.ts  # Конфигурация Firebase Admin
│   │   ├── security.ts        # Утилиты безопасности
│   │   └── data.ts            # Утилиты данных
│   ├── stores/                # Управление состоянием
│   └── types/                 # TypeScript типы
├── public/                    # Статические ресурсы
├── middleware.ts              # Middleware Next.js
├── next.config.ts             # Конфигурация Next.js
├── tailwind.config.ts         # Конфигурация Tailwind
├── tsconfig.json              # Конфигурация TypeScript
├── firebase.json              # Конфигурация Firebase
├── firestore.rules            # Правила безопасности Firestore
├── database.rules.json        # Правила Realtime Database
├── firestore.indexes.json     # Конфигурация индексов Firestore
└── package.json               # Зависимости и скрипты
```

## Маршруты

Маршруты аутентификации

    /auth - Страница аутентификации
    /api/auth/* - API маршруты аутентификации

Публичные маршруты

    / - Главная страница
    /articles - Список статей
    /contact - Контакты
    /privacy - Политика конфиденциальности
    /terms - Условия использования

Защищённые маршруты

    /admin/* - Панель администратора (требуется роль admin)
    /author/* - Панель автора (требуется роль author или admin)
    /profile/* - Профиль пользователя (требуется аутентификация)

## Скрипты

```bash
npm run dev      # разработка
npm run build    # сборка
npm run lint     # линтер
```

## Деплой

На Vercel — просто пушь в GitHub и подключи репо.

На Firebase:
```bash
firebase deploy
```

---
