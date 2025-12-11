"use server";

import { adminDb } from '@/lib/firebase-admin';
import { cookies } from 'next/headers';
import type { User } from '@/types/auth';

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  role?: 'reader' | 'author' | 'admin'; 
}

export async function registerUserAction(userData: RegisterData) {
  try {
    const { email, name, password, role = 'reader' } = userData;

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

    await adminDb.collection('users').doc(userId).set(userRecord);

    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(userRecord), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: 'Регистрация успешна!',
      user: userRecord
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

    if (!password) {
      return {
        success: false,
        message: 'Неверный пароль'
      };
    }

    await adminDb.collection('users').doc(userDoc.id).update({
      lastLoginAt: new Date().toISOString()
    });

    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(userData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    });

    return {
      success: true,
      message: 'Вход выполнен успешно!',
      user: userData
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
    cookieStore.delete('user');
    
    return { success: true, message: 'Выход выполнен' };
  } catch (error) {
    return { success: false, message: 'Ошибка при выходе' };
  }
}