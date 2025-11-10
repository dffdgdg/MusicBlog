export const CATEGORIES = [
  'Сведение', 
  'Мастеринг', 
  'Синтез', 
  'Саунд-дизайн', 
  'Теория музыки', 
  'Ableton Live', 
  'FL Studio', 
  'Логика',
  'Вокал', 
  'Аранжировка', 
  'Саундпродюссирование'
] as const;

export type Category = typeof CATEGORIES[number];