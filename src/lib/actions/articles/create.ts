"use server";

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import type { Article } from '@/features/articles';

export async function createArticleAction(articleData: Article) {
    console.log("Попытка создать статью:", articleData.title);

    try {
        const currentUser = await getCurrentUser();
        
        if (!currentUser) {
            return { success: false, message: "Требуется авторизация" };
        }

        if (articleData.author.name !== currentUser.name && currentUser.role !== 'admin') {
            return { success: false, message: "Недостаточно прав для создания статьи от этого автора" };
        }

        const articleWithMetadata = {
            ...articleData,
            _author: {
                id: currentUser.id,
                email: currentUser.email,
                role: currentUser.role
            },
            _sys: {
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                createdBy: currentUser.id
            }
        };

        const docRef = adminDb.collection('articles').doc(articleData.slug);
        await docRef.set(articleWithMetadata);

        console.log("Статья успешно создана в Firestore!");

        revalidatePath('/');
        revalidatePath('/articles');
        revalidatePath(`/articles/${articleData.slug}`);

        return { success: true, message: "Статья успешно создана!" };

    } catch (error) {
        console.error("Ошибка при создании статьи:", error);
        return { success: false, message: "Произошла ошибка на сервере." };
    }
}