"use server";

import { adminDb } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import type { Article } from '@/features/articles';

export async function createOptimizedArticleAction(articleData: Article) {
  try {
    const articleWithMetadata = {
      ...articleData,
      searchIndex: {
        tags: articleData.tags || [],
        categorySlug: generateSlug(articleData.category),
        levelIndex: getLevelIndex(articleData.level),
        publishedTimestamp: new Date(articleData.publishedDate).getTime(),
      },
      _sys: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'published'
      }
    };

    await adminDb
      .collection('articles')
      .doc(articleData.slug)
      .set(articleWithMetadata);

    await updateCategoryStats(articleData.category);

    revalidatePath('/');
    revalidatePath('/articles');
    revalidatePath(`/articles/${articleData.slug}`);

    return { success: true, message: "Статья успешно создана!" };
  } catch (error) {
    console.error("Ошибка при создании статьи:", error);
    return { success: false, message: "Произошла ошибка на сервере." };
  }
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[а-яё]/g, (char) => {
      const mapping: { [key: string]: string } = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      return mapping[char] || char;
    })
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function getLevelIndex(level: string): number {
  const levels = ['Начальный', 'Средний', 'Продвинутый'];
  return levels.indexOf(level);
}

async function updateCategoryStats(categoryName: string) {
  const categorySlug = generateSlug(categoryName);
  console.log('Updating category stats for:', categoryName);
}