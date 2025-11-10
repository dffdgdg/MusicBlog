"use server";

import { adminDb } from '@/lib/firebase-admin';
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
// Функция для получения статьи по slug
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

// Функция для получения всех статей
export async function getAllArticlesAction(): Promise<Article[]> {
    try {
        const articlesSnapshot = await adminDb.collection('articles').get();
        
        if (articlesSnapshot.empty) {
            console.log("No articles found in Firestore");
            return [];
        }

        const articlesList = articlesSnapshot.docs.map(doc => {
            const data = doc.data();
            if (!data.slug || !data.title) {
                console.warn(`Invalid article structure for doc: ${doc.id}`);
                return null;
            }
            return data as Article;
        }).filter(Boolean) as Article[];

        return articlesList;
    } catch (error) {
        console.error("Critical error fetching articles:", error);
        return [];
    }
}

// Функция для увеличения счетчика просмотров (без куков)
export async function incrementArticleViews(slug: string) {
    try {
        // Увеличиваем общее количество просмотров
        const articleRef = adminDb.collection('articles').doc(slug);
        const articleDoc = await articleRef.get();
        
        if (articleDoc.exists) {
            const currentViews = articleDoc.data()?.views || 0;
            await articleRef.update({
                views: currentViews + 1,
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

// Функция для получения популярных статей
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