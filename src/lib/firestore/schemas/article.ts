export interface OptimizedArticle 
{
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedDate: string;
  readingTime: number;
  level: 'Начальный' | 'Средний' | 'Продвинутый';
  author: {
    name: string;
    role: string;
  };
  
  stats: {
    views: number;
    likes: number;
    shares: number;
    lastUpdated: string;
  };
  
  content: string;
  
  searchIndex: {
    tags: string[];
    categorySlug: string;
    levelIndex: number; 
    publishedTimestamp: number; 
  };
  
  _sys: {
    createdAt: string;
    updatedAt: string;
    status: 'published' | 'draft' | 'archived';
  };
}

