export const APP_CONFIG = {
  // Основные настройки
  name: 'СоздайМузыку',
  description: 'Ваша интерактивная студия знаний о создании музыки',
  version: '1.0.0',
  
  // Категории статей
  categories: [
    'Сведение', 'Мастеринг', 'Синтез', 'Саунд-дизайн', 
    'Теория музыки', 'Ableton Live', 'FL Studio', 'Логика',
    'Вокал', 'Аранжировка', 'Саундпродюссирование'
  ] as const,
  
  // Уровни сложности
  levels: ['Начальный', 'Средний', 'Продвинутый'] as const,
  
  // Лимиты
  limits: {
    title: 100,
    excerpt: 200,
    tags: 10,
    bio: 500,
    uploadSize: 5 * 1024 * 1024, // 5MB
  },
  
  // Маршруты
  routes: {
    home: '/',
    articles: '/articles',
    admin: '/admin',
    contact: '/contact',
  },
  
  // Настройки кэширования
  cache: {
    articles: 3600, // 1 час
    users: 1800, // 30 минут
  }
} as const;