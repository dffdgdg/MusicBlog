"use server";

import { adminDb } from '@/lib/firebase-admin';
import type { User, UserFormData } from '@/types/user';

export async function getAllUsersAction(): Promise<User[]> {
  try {
    const usersSnapshot = await adminDb.collection('users').get();
    
    const users = await Promise.all(
      usersSnapshot.docs.map(async (doc) => {
        const userData = doc.data();
        
        const articlesSnapshot = await adminDb
          .collection('articles')
          .where('author.name', '==', userData.name)
          .get();

        return {
          id: doc.id,
          email: userData.email || '',
          name: userData.name || '',
          role: userData.role || 'reader',
          avatar: userData.avatar,
          createdAt: userData.createdAt || new Date().toISOString(),
          lastLoginAt: userData.lastLoginAt,
          isActive: userData.isActive !== false,
          articlesCount: articlesSnapshot.size,
          bio: userData.bio || ''
        } as User;
      })
    );

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error('Не удалось загрузить пользователей');
  }
}

export async function createUserAction(userData: UserFormData): Promise<{ success: boolean; message: string }> {
  try {
    const existingUser = await adminDb
      .collection('users')
      .where('email', '==', userData.email)
      .get();

    if (!existingUser.empty) {
      return { success: false, message: 'Пользователь с таким email уже существует' };
    }

    await adminDb.collection('users').add({
      ...userData,
      createdAt: new Date().toISOString(),
      lastLoginAt: null
    });
    
    return { success: true, message: 'Пользователь успешно создан' };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: 'Ошибка при создании пользователя' };
  }
}

export async function updateUserAction(id: string, userData: Partial<UserFormData>): Promise<{ success: boolean; message: string }> {
  try {
    await adminDb.collection('users').doc(id).update(userData);
    return { success: true, message: 'Пользователь успешно обновлен' };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, message: 'Ошибка при обновлении пользователя' };
  }
}

export async function deleteUserAction(id: string): Promise<{ success: boolean; message: string }> {
  try {
    // Проверяем, есть ли у пользователя статьи
    const user = await getUserByIdAction(id);
    if (user && user.articlesCount && user.articlesCount > 0) {
      return { 
        success: false, 
        message: 'Нельзя удалить пользователя с опубликованными статьями' 
      };
    }

    await adminDb.collection('users').doc(id).delete();
    return { success: true, message: 'Пользователь успешно удален' };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: 'Ошибка при удалении пользователя' };
  }
}

async function getUserByIdAction(id: string): Promise<User | null> {
  try {
    const userDoc = await adminDb.collection('users').doc(id).get();
    
    if (!userDoc.exists) {
      return null;
    }

    const userData = userDoc.data();
    const articlesSnapshot = await adminDb
      .collection('articles')
      .where('author.name', '==', userData.name)
      .get();

    return {
      id: userDoc.id,
      email: userData.email,
      name: userData.name,
      role: userData.role,
      avatar: userData.avatar,
      createdAt: userData.createdAt,
      lastLoginAt: userData.lastLoginAt,
      isActive: userData.isActive !== false,
      articlesCount: articlesSnapshot.size,
      bio: userData.bio
    } as User;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}