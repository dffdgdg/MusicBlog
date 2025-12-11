// Проверьте текущее состояние Firebase
// src/lib/firebase-debug.ts
import { adminDb } from './firebase-admin';

export async function debugFirebase() {
  try {
    console.log('🔍 Firebase Debug Information:');
    
    // Проверка подключения
    await adminDb.collection('_test').doc('connection').get();
    console.log('? Firebase connection: OK');
    
    // Проверка коллекции articles
    const articlesSnapshot = await adminDb.collection('articles').limit(1).get();
    console.log('📚 Articles collection exists:', !articlesSnapshot.empty);
    console.log('📊 Total articles:', (await adminDb.collection('articles').get()).size);
    
    // Проверка структуры документов
    if (!articlesSnapshot.empty) {
      const sampleDoc = articlesSnapshot.docs[0];
      console.log('📄 Sample document structure:', {
        id: sampleDoc.id,
        data: sampleDoc.data(),
        exists: sampleDoc.exists
      });
    }
    
  } catch (error) {
    console.error('❌ Firebase debug error:', error);
  }
}