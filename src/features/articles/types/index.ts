export interface RelatedArticle {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    readingTime: number;
}

export interface ArticleAuthor {
    name: string;
    role: string;
    avatar?: string;
}

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: ArticleAuthor;
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

export interface ArticleFormData {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    content: string;
    level: Article['level'];
    tags: string[];
}