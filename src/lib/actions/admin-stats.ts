"use server";

import { adminDb } from '@/lib/firebase-admin';

export async function getAdminStats() {
  try {
    // Получаем все статьи
    const articlesSnapshot = await adminDb.collection('articles').get();
    const articles = articlesSnapshot.docs.map(doc => doc.data());
    
    // Подсчет статистики
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(article => 
      article.status === 'published' || !article.status // Для обратной совместимости
    ).length;
    
    const draftArticles = articles.filter(article => 
      article.status === 'draft'
    ).length;
    
    // Считаем просмотры за сегодня (упрощенно - общее количество)
    const totalViews = articles.reduce((sum, article) => 
      sum + (article.views || 0), 0
    );
    
    // Для "посещений сегодня" нужна более сложная логика
    // Покажем общее количество просмотров как пример
    const todayViews = totalViews; // Здесь можно добавить фильтр по дате
    
    return {
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews,
      todayViews
    };
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalViews: 0,
      todayViews: 0
    };
  }
}