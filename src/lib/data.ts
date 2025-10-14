// Файл: src/lib/data.ts (НОВАЯ ВЕРСИЯ)

import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Типы остаются без изменений, они описывают структуру наших данных
export type ContentBlock = 
    | { type: 'heading'; text: string; }
    | { type: 'paragraph'; text: string; }
    | { type: 'list'; items: string[]; }
    | { type: 'quote'; text: string; author: string; }
    | { type: 'youtube'; videoId: string; caption: string; };

export type Article = {
    slug: string;
    title: string;
    category: string;
    author: { name: string; avatarUrl: string; };
    publishedDate: string;
    readingTime: number;
    content: ContentBlock[];
    relatedArticles: { slug: string; title: string; }[];
};


// --- НОВЫЕ ФУНКЦИИ ДЛЯ ПОЛУЧЕНИЯ ДАННЫХ ИЗ FIRESTORE ---

/**
 * Получает ВСЕ статьи из коллекции 'articles' в Firestore.
 * Next.js автоматически кэширует результат этого запроса.
 */
export async function getAllArticles(): Promise<Article[]> {
    try {
        const articlesCol = collection(db, 'articles');
        const articlesSnapshot = await getDocs(articlesCol);
        
        const articlesList = articlesSnapshot.docs.map(doc => {
            return doc.data() as Article;
        });

        return articlesList;
    } catch (error) {
        console.error("Ошибка при получении статей из Firestore:", error);
        return []; // Возвращаем пустой массив в случае ошибки
    }
}

/**
 * Получает ОДНУ статью по ее slug из Firestore.
 * @param slug - Уникальный идентификатор статьи.
 */
export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
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
}