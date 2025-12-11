export interface CategoryWithStats 
{
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  
  stats: {
    articlesCount: number;
    totalViews: number;
    lastArticleDate: string;
  };
  
  meta: {
    order: number;
    isFeatured: boolean;
  };
}