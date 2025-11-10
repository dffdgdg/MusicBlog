export * from './types';
export * from './components';
export * from './hooks';

export type { Article, RelatedArticle } from './types';

export interface RelatedArticle {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    readingTime: number;
}

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: {
        name: string;
        role: string;
    };
    publishedDate: string;
    readingTime: number;
    content: string;
    featuredImage?: string;
    level: 'Начальный' | 'Средний' | 'Продвинутый';
    tags: string[];
    relatedArticles: RelatedArticle[];
    views?: number;
    uniqueViews?: number;
    lastViewed?: string;
}