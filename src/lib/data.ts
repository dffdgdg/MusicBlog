// Файл: src/lib/data.ts

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { unstable_cache } from 'next/cache';

    export interface RelatedArticle {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    readingTime: number;
}

export interface Article {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    author: {
        name: string;
        role: string;
    };
    publishedDate: string;
    readingTime: number;
    content: string; 
    featuredImage?: string;
    level: 'Начальный' | 'Средний' | 'Продвинутый';
    tags: string[];
    relatedArticles: RelatedArticle[];
}

export const getAllArticles = unstable_cache(
    async (): Promise<Article[]> => {
        try {
            const articlesCol = collection(db, 'articles');
            const articlesSnapshot = await getDocs(articlesCol);
            
            const articlesList = articlesSnapshot.docs.map(doc => {
                return doc.data() as Article;
            });

            return articlesList;
        } catch (error) {
            console.error("Ошибка при получении статей из Firestore:", error);
            return []; 
        }
    },
    ['articles'], 
    { revalidate: 3600 }
);


export const getArticleBySlug = unstable_cache(
    async (slug: string): Promise<Article | undefined> => {
        try {
            const docRef = doc(db, 'articles', slug);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return docSnap.data() as Article;
            } else {
                console.log("Статья с таким slug не найдена:", slug);
                return undefined;
            }
        } catch (error) {
            console.error("Ошибка при получении статьи по slug:", error);
            return undefined;
        }
    },
    ['article'], 
    { revalidate: 3600 }
);