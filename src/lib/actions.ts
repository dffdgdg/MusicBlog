"use server"; 

import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin"; 
import type { Article } from '@/features/articles';

export async function createArticleAction(articleData: Article) {
    console.log("Попытка создать статью:", articleData.title);

    if (!articleData.title || !articleData.slug) {
        return { success: false, message: "Заголовок и slug обязательны." };
    }

    try {
        const docRef = adminDb.collection('articles').doc(articleData.slug);
        await docRef.set(articleData);

        console.log("Статья успешно создана в Firestore!");


        revalidatePath('/');
        revalidatePath('/articles');
        revalidatePath(`/articles/${articleData.slug}`);

        return { success: true, message: "Статья успешно создана!" };

    } 
    catch (error) {
        console.error("Ошибка при создании статьи:", error);
        return { success: false, message: "Произошла ошибка на сервере." };
    }
}

export async function updateArticleAction(slug: string, articleData: Article) {
    console.log("Попытка обновить статью:", slug);
    if (!articleData.title || !articleData.slug) {
        return { success: false, message: "Заголовок и slug обязательны." };
    }
    try {
        const docRef = adminDb.collection('articles').doc(slug);
        await docRef.set(articleData, { merge: true });
        console.log("Статья успешно обновлена!");
        revalidatePath('/articles');
        revalidatePath(`/articles/${slug}`);
        return { success: true, message: "Статья успешно обновлена!" };
    } catch (error) {
        console.error("Ошибка при обновлении статьи:", error);
        return { success: false, message: "Произошла ошибка на сервере." };
    }
}

export async function deleteArticleAction(slug: string) {
    console.log("Попытка удалить статью со slug:", slug);

    if (!slug) {
        return { success: false, message: "Не указан slug для удаления." };
    }

    try {
        // Получаем ссылку на документ по его slug
        const docRef = adminDb.collection('articles').doc(slug);

        // Удаляем документ
        await docRef.delete();

        console.log("Статья успешно удалена из Firestore!");

        // Очищаем кэш для страниц, где эта статья отображалась
        revalidatePath('/articles');
        revalidatePath(`/articles/${slug}`);

        return { success: true, message: "Статья успешно удалена!" };

    } catch (error) {
        console.error("Ошибка при удалении статьи:", error);
        return { success: false, message: "Произошла ошибка на сервере при удалении." };
    }
}