export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt?: string;
  coverImage?: string;
  color?: string;
  tags: string[];
  articles: string[]; 
  order: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CollectionFormData {
  title: string;
  slug: string;
  description: string;
  excerpt?: string;
  tags: string[];
  articles: string[];
  color: string;
  featured: boolean;
}