export interface OptimizedUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'author' | 'reader';
  
  profile: {
    avatar?: string;
    bio?: string;
    socialLinks?: string[];
  };
  
  stats: {
    articlesCount: number;
    lastLoginAt: string;
    totalViews: number;
  };
  
  preferences: {
    emailNotifications: boolean;
    theme: 'dark' | 'light';
  };
  
  _sys: {
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  };
}