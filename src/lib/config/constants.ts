import { APP_CONFIG } from './app';

export const CATEGORIES = APP_CONFIG.categories;
export const LEVELS = APP_CONFIG.levels;

export const ARTICLE_LIMITS = {
  title: APP_CONFIG.limits.title,
  excerpt: APP_CONFIG.limits.excerpt,
  tags: APP_CONFIG.limits.tags,
} as const;

export type Category = typeof CATEGORIES[number];
export type Level = typeof LEVELS[number];