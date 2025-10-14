// Файл: uploadData.mjs

import admin from 'firebase-admin';
import { readFile } from 'fs/promises';

// Шаг 1: Импортируем наши локальные данные из data.ts
// Мы не можем импортировать TypeScript напрямую, поэтому делаем небольшой трюк
const { allArticlesData } = await import('./src/lib/data.ts');

// Шаг 2: Инициализируем Firebase Admin SDK с помощью нашего ключа
const serviceAccount = JSON.parse(
  await readFile(new URL('./serviceAccountKey.json', import.meta.url))
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// --- Главная функция загрузки ---
async function uploadArticles() {
  console.log('Начинаем загрузку статей...');
  
  const articlesCollection = db.collection('articles');
  const articlesArray = Object.values(allArticlesData);

  // Пробегаемся по каждой статье из нашего локального файла
  for (const article of articlesArray) {
    // Используем slug статьи в качестве ID документа в Firestore
    const docRef = articlesCollection.doc(article.slug);

    // Загружаем полные данные статьи в документ
    await docRef.set(article);

    console.log(`✅ Статья "${article.title}" успешно загружена!`);
  }

  console.log('\n🎉 Все статьи успешно загружены в Firestore!');
}

// Запускаем функцию
uploadArticles().catch(console.error);