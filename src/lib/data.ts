export interface User {
    uid: string;
    email: string;
    displayName: string;
    role: 'admin' | 'author' | 'reader';
    createdAt: string;
    lastLoginAt: string;
    isActive: boolean;
}

export interface UserFormData {
    email: string;
    name: string;
    role: User['role'];
    bio?: string;
    isActive: boolean;
}