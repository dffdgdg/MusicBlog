// src/lib/auth.ts
"use server";

import { cookies } from 'next/headers';

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('user');
    
    if (!userCookie) {
      console.log('No user cookie found');
      return null;
    }
    
    const userData = JSON.parse(userCookie.value);
    
    console.log('Current user from cookie:', {
      id: userData.uid || userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role
    });
    
    // Возвращаем структурированные данные пользователя
    return {
      id: userData.uid || userData.id || `user-${Date.now()}`,
      email: userData.email || '',
      name: userData.name || 'Пользователь',
      role: userData.role || 'reader',
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

// Дополнительная функция для проверки роли
export async function hasRole(requiredRole: string) {
  const user = await getCurrentUser();
  if (!user) return false;
  
  const roleHierarchy = {
    reader: ['reader'],
    author: ['reader', 'author'],
    admin: ['reader', 'author', 'admin']
  };
  
  return roleHierarchy[user.role as keyof typeof roleHierarchy]?.includes(requiredRole) || false;
}