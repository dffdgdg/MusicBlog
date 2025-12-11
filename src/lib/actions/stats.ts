"use server";

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

export async function getRealTimeStats() {
  try {
    const articlesSnapshot = await adminDb.collection('articles').get();
    
    const stats = {
      totalArticles: articlesSnapshot.size,
      totalViews: 0,
      mostViewedArticle: { title: '', views: 0, slug: '' }
    };

    articlesSnapshot.forEach(doc => {
      const data = doc.data();
      const views = data.views || 0;
      
      stats.totalViews += views;
      
      if (views > stats.mostViewedArticle.views) {
        stats.mostViewedArticle = {
          title: data.title || 'Без названия',
          views,
          slug: data.slug || doc.id
        };
      }
    });

    stats.totalViews = stats.totalViews || 0;

    revalidatePath('/admin/analytics');
    revalidatePath('/');

    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      totalArticles: 0,
      totalViews: 0,
      mostViewedArticle: { title: '', views: 0, slug: '' }
    };
  }
}