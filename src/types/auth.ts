// src/types/auth.ts
export interface User {
  uid: string;
  email: string;
  name: string;
  role: 'admin' | 'author' | 'reader';
  avatar?: string;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type UserRole = 'admin' | 'author' | 'reader';