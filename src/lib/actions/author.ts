// src/lib/actions/author.ts
"use server";

import { adminDb } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth';

// Вспомогательная функция для проверки прав автора/админа
async function checkAuthorAccess() {
  const user = await getCurrentUser();
  if (!user || (user.role !== 'author' && user.role !== 'admin')) {
    throw new Error('Unauthorized - требуется роль автора или администратора');
  }
  return user;
}

export async function getAuthorStats() {
  try {
    const user = await checkAuthorAccess(); // Используем новую функцию

    const articlesSnapshot = await adminDb
      .collection('articles')
      .where('author.id', '==', user.id)
      .get();

    const articles = articlesSnapshot.docs.map(doc => doc.data());
    
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(article => 
      article.status === 'published'
    ).length;
    const draftArticles = articles.filter(article => 
      article.status === 'draft'
    ).length;
    const totalViews = articles.reduce((sum, article) => 
      sum + (article.views || 0), 0
    );

    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews,
    };
  } catch (error) {
    console.error('Error fetching author stats:', error);
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalViews: 0,
    };
  }
}

export async function getAuthorArticles() {
  try {
    const user = await checkAuthorAccess(); // Используем новую функцию

    // Для админов показываем все статьи, для авторов - только свои
    let articlesQuery;
    if (user.role === 'admin') {
      articlesQuery = adminDb
        .collection('articles')
        .orderBy('createdAt', 'desc');
    } else {
      articlesQuery = adminDb
        .collection('articles')
        .where('author.id', '==', user.id)
        .orderBy('createdAt', 'desc');
    }

    const articlesSnapshot = await articlesQuery.get();

    return articlesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error fetching author articles:', error);
    return [];
  }
}