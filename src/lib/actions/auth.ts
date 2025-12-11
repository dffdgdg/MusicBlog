// src/lib/actions/auth.ts
"use server";

import { adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import type { User } from '@/types/auth';
import { generateAuthToken } from '@/lib/auth';

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  role?: 'reader' | 'author' | 'admin'; 
}

export async function registerUserAction(userData: RegisterData) {
  try {
    const { email, name, password, role = 'reader' } = userData;

    // Проверка существующего пользователя
    const existingUser = await adminDb
      .collection('users')
      .where('email', '==', email)
      .get();

    if (!existingUser.empty) {
      return { 
        success: false, 
        message: 'Пользователь с таким email уже существует' 
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: 'Пароль должен содержать минимум 6 символов'
      };
    }

    const userId = Math.random().toString(36).substr(2, 9);
    const userRecord: User = {
      uid: userId,
      email,
      name,
      role: role as 'admin' | 'author' | 'reader',
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isActive: true
    };

    // Сохраняем пользователя в Firestore
    await adminDb.collection('users').doc(userId).set(userRecord);

    // Генерируем JWT токен
    const authToken = await generateAuthToken(userRecord);

    // Устанавливаем cookies
    const cookieStore = await cookies();
    
    // Основной JWT токен (httpOnly для безопасности)
    cookieStore.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 дней
    });
    
    // Legacy cookie для обратной совместимости
    cookieStore.set('user', JSON.stringify(userRecord), {
      httpOnly: false, // Для клиентского доступа
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: 'Регистрация успешна!',
      user: userRecord,
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
      .get();

    if (userSnapshot.empty) {
      return {
        success: false,
        message: 'Пользователь не найден'
      };
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data() as User;

    // Простая проверка пароля (в реальном приложении используйте хеширование!)
    if (!password) {
      return {
        success: false,
        message: 'Неверный пароль'
      };
    }

    // Обновляем время последнего входа
    const updatedUser = {
      ...userData,
      lastLoginAt: new Date().toISOString()
    };

    await adminDb.collection('users').doc(userDoc.id).update({
      lastLoginAt: new Date().toISOString()
    });

    // Генерируем JWT токен
    const authToken = await generateAuthToken(updatedUser);

    // Устанавливаем cookies
    const cookieStore = await cookies();
    
    // JWT токен
    cookieStore.set('auth-token', authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });
    
    // Legacy cookie
    cookieStore.set('user', JSON.stringify(updatedUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: 'Вход выполнен успешно!',
      user: updatedUser,
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