export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'author' | 'reader';
    avatar?: string;
    createdAt: string;
    lastLoginAt?: string;
    isActive: boolean;
    articlesCount?: number;
    bio?: string;
}

export interface UserFormData {
    email: string;
    name: string;
    role: User['role'];
    bio?: string;
    isActive: boolean;
}

export interface UserStats {
    totalUsers: number;
    activeUsers: number;
    adminUsers: number;
    authorUsers: number;
    readerUsers: number;
    totalArticles: number;
}