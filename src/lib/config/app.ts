export const APP_CONFIG = {
  name: 'СоздайМузыку',
  description: 'Ваша интерактивная студия знаний о создании музыки',
  version: '1.0.0',
  
  categories: [
    'Сведение', 'Мастеринг', 'Синтез', 'Саунд-дизайн', 
    'Теория музыки', 'Ableton Live', 'FL Studio', 'Логика',
    'Вокал', 'Аранжировка', 'Саундпродюссирование'
  ] as const,
  
  levels: ['Начальный', 'Средний', 'Продвинутый'] as const,
  
  limits: {
    title: 100,
    excerpt: 200,
    tags: 10,
    bio: 500,
    uploadSize: 5 * 1024 * 1024, // 5MB
  },
  
  routes: {
    home: '/',
    articles: '/articles',
    admin: '/admin',
    contact: '/contact',
  },
  
  cache: {
    articles: 3600, 
    users: 1800, 
  }
} as const;