// src/lib/actions/auth.ts
"use server";

import { adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import type { User, UserWithPassword } from '@/types/auth';
import { generateAuthToken } from '@/lib/auth';
import { hashPassword, verifyPassword } from '../auth/password';

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  role?: 'reader' | 'author' | 'admin'; 
}

export async function registerUserAction(userData: RegisterData) {
  try {
    const { email, name, password, role = 'reader' } = userData;

    // Валидация пароля
    if (password.length < 8) {
      return {
        success: false,
        message: 'Пароль должен содержать минимум 8 символов'
      };
    }

    // Хешируем пароль
    const passwordHash = await hashPassword(password);

    const userId = Math.random().toString(36).substr(2, 9);
    const userRecord: UserWithPassword = {
      uid: userId,
      email,
      name,
      passwordHash,
      role: role as 'admin' | 'author' | 'reader',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isActive: true
    };

    // Сохраняем с хешем пароля
    await adminDb.collection('users').doc(userId).set(userRecord);

    // Создаем пользователя без пароля для ответа
    const user: User = {
      uid: userId,
      email,
      name,
      role: role as 'admin' | 'author' | 'reader',
      createdAt: userRecord.createdAt,
      lastLoginAt: userRecord.lastLoginAt,
      isActive: true
    };

    // Генерируем токен и устанавливаем куки
    const authToken = await generateAuthToken(user);
    const cookieStore = await cookies();
    
    cookieStore.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: 'Регистрация успешна!',
      user,
      token: authToken
    };
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при регистрации'
    };
  }
}

export async function loginUserAction(email: string, password: string) {
  try {
    const userSnapshot = await adminDb
      .collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return {
        success: false,
        message: 'Неверный email или пароль'
      };
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data() as UserWithPassword;

    const isValidPassword = await verifyPassword(password, userData.passwordHash);
    
    if (!isValidPassword) {
      return {
        success: false,
        message: 'Неверный email или пароль'
      };
    }

    // Создаем пользователя без пароля для клиента
    const user: User = {
      uid: userDoc.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: userData.avatar,
      createdAt: userData.createdAt,
      lastLoginAt: new Date().toISOString(),
      isActive: userData.isActive
    };

    // Обновляем время входа
    await adminDb.collection('users').doc(userDoc.id).update({
      lastLoginAt: new Date().toISOString()
    });

    // Генерируем токен и устанавливаем куки
    const authToken = await generateAuthToken(user);
    const cookieStore = await cookies();
    
    cookieStore.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: 'Вход выполнен успешно!',
      user,
      token: authToken
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: 'Произошла ошибка при входе'
    };
  }
}

export async function logoutUserAction() {
  try {
    const cookieStore = await cookies();
    
    // Удаляем оба типа cookies
    cookieStore.delete('auth-token');
    cookieStore.delete('user');
    
    return { success: true, message: 'Выход выполнен' };
  } catch {
    return { success: false, message: 'Ошибка при выходе' };
  }
}

// Вспомогательная функция для проверки токена
export async function validateAuthToken(token: string) {
  try {
    const { verifyToken } = await import('@/lib/auth');
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return { valid: false, user: null };
    }
    
    // Проверяем, существует ли пользователь в базе
    const userSnapshot = await adminDb
      .collection('users')
      .doc(decoded.uid)
      .get();
    
    if (!userSnapshot.exists) {
      return { valid: false, user: null };
    }
    
    return {
      valid: true,
      user: userSnapshot.data() as User
    };
  } catch (error) {
    console.error('Token validation error:', error);
    return { valid: false, user: null };
  }
}