// src/lib/auth.ts
"use server";

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key-change-this-in-production';

interface JwtPayload {
  uid: string;
  email: string;
  name: string;
  role: string;
  iat?: number;
  exp?: number;
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    
    // 1. Проверяем JWT токен (основной способ)
    const authToken = cookieStore.get('auth-token');
    
    if (authToken?.value) {
      try {
        const decoded = jwt.verify(authToken.value, JWT_SECRET) as JwtPayload;
        
        return {
          id: decoded.uid,
          email: decoded.email,
          name: decoded.name,
          role: decoded.role as 'admin' | 'author' | 'reader',
          createdAt: new Date().toISOString(), 
          lastLoginAt: new Date().toISOString(),
          isActive: true
        };
      } catch (jwtError) {
        console.log('JWT token invalid:', jwtError);
      }
    }
    
    // 2. Legacy проверка для обратной совместимости
    const userCookie = cookieStore.get('user');
    
    if (!userCookie) {
      console.log('No authentication cookies found');
      return null;
    }
    
    const userData = JSON.parse(userCookie.value);
    
    // Валидация legacy данных
    if (!userData.uid && !userData.id) {
      console.log('Invalid user cookie: missing ID');
      return null;
    }
    
     return {
      id: userData.uid || userData.id || `user-${Date.now()}`, 
      uid: userData.uid || userData.id || `user-${Date.now()}`,
      email: userData.email || '',
      name: userData.name || 'Пользователь',
      role: (userData.role || 'reader') as 'admin' | 'author' | 'reader',
      avatar: userData.avatar,
      createdAt: userData.createdAt || new Date().toISOString(),
      lastLoginAt: userData.lastLoginAt,
      isActive: userData.isActive !== false
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

export async function generateAuthToken(user: {
  uid: string;
  email: string;
  name: string;
  role: string;
}) {
  const token = jwt.sign(
    {
      uid: user.uid,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  return token;
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function hasRole(requiredRole: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;
  
  const roleHierarchy = {
    reader: ['reader'],
    author: ['reader', 'author'],
    admin: ['reader', 'author', 'admin']
  };
  
  return roleHierarchy[user.role as keyof typeof roleHierarchy]?.includes(requiredRole) || false;
}

export async function requireAuth(requiredRole?: string) {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  if (requiredRole && !(await hasRole(requiredRole))) {
    throw new Error(`Insufficient permissions. Required role: ${requiredRole}`);
  }
  
  return user;
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  
  cookieStore.delete('auth-token');
  cookieStore.delete('user');
  
  return { success: true };
}