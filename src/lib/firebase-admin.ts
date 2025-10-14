// Файл: src/lib/firebase-admin.ts

import admin from 'firebase-admin';

// Проверяем, не был ли SDK уже инициализирован
if (!admin.apps.length) {
    // Собираем объект serviceAccount из переменных окружения
    const serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Здесь "магия": мы заменяем \n в строке на настоящие переносы строк
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export const adminDb = admin.firestore();