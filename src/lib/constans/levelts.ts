export const LEVELS = ['Начальный', 'Средний', 'Продвинутый'] as const;

export type Level = typeof LEVELS[number];