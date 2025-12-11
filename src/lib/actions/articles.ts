"use server";

import { admin, adminDb } from '@/lib/firebase-admin';
import type { Article } from '@/features/articles';
import { unstable_cache } from 'next/cache';

export const getCachedArticles = unstable_cache(
  async () => {
    const articles = await getAllArticlesAction();
    return articles;
  },
  ['articles'],
  { revalidate: 3600 }
);
export async function getArticleBySlugAction(slug: string): Promise<Article | undefined> {
    try {
        const docRef = adminDb.collection('articles').doc(slug);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            return docSnap.data() as Article;
        } else {
            console.log("Статья с таким slug не найдена:", slug);
            return undefined;
        }
    } catch (error) {
        console.error("Ошибка при получении статьи по slug:", error);
        return undefined;
    }
}

export async function getAllArticlesAction(): Promise<Article[]> {
  try {
    console.log('?? Fetching articles from Firestore...');
    
    const articlesSnapshot = await adminDb.collection('articles').get();
    
    console.log(`?? Found ${articlesSnapshot.size} documents in 'articles' collection`);
    
    if (articlesSnapshot.empty) {
      console.log('?? No articles found in Firestore');
      return [];
    }

    const firstDoc = articlesSnapshot.docs[0];
    const firstData = firstDoc.data();
    console.log('?? Sample document structure:', {
      id: firstDoc.id,
      title: firstData.title,
      category: firstData.category,
      slug: firstData.slug,
      contentLength: firstData.content?.length || 0
    });

    const articlesList = articlesSnapshot.docs.map(doc => {
      const data = doc.data();
      console.log(`?? Processing article: ${data.title} (${doc.id})`);
      
      if (!data.slug || !data.title) {
        console.warn(`? Invalid article structure for doc: ${doc.id}`, {
          hasSlug: !!data.slug,
          hasTitle: !!data.title
        });
        return null;
      }
      
      return data as Article;
    }).filter(Boolean) as Article[];

    console.log(`? Successfully processed ${articlesList.length} articles`);
    return articlesList;
    
  } catch (error) {
    console.error('? Critical error fetching articles:', error);
    return [];
  }
}

export async function incrementArticleViews(slug: string) {
    try {
        const articleRef = adminDb.collection('articles').doc(slug);
        const articleDoc = await articleRef.get();
        
        if (articleDoc.exists) {
            const currentViews = articleDoc.data()?.views || 0;
            const currentStatsViews = articleDoc.data()?.stats?.views || 0;
            
            await articleRef.update({
                views: currentViews + 1,
                'stats.views': currentStatsViews + 1,
                lastViewed: new Date().toISOString()
            });
            
            console.log(`Просмотр статьи ${slug} засчитан. Текущее количество: ${currentViews + 1}`);
        }
        
        return { success: true };
    } catch (error) {
        console.error("Ошибка при увеличении счетчика просмотров:", error);
        return { success: false, message: "Ошибка при обновлении просмотров" };
    }
}

export async function getPopularArticlesAction(limit: number = 5): Promise<Article[]> {
    try {
        const articlesSnapshot = await adminDb
            .collection('articles')
            .orderBy('views', 'desc')
            .limit(limit)
            .get();
        
        return articlesSnapshot.docs.map(doc => doc.data() as Article);
    } catch (error) {
        console.error("Ошибка при получении популярных статей:", error);
        return [];
    }
}