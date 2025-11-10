import { adminDb } from '@/lib/firebase-admin';

export class OptimizedCategoryQueries {
  // Получение категорий со статистикой
  static async getCategoriesWithStats() {
    const snapshot = await adminDb
      .collection('categories')
      .orderBy('meta.order')
      .get();

    return snapshot.docs.map(doc => doc.data());
  }

  // Обновление статистики категории
  static async updateCategoryStats(categorySlug: string) {
    const articlesSnapshot = await adminDb
      .collection('articles')
      .where('searchIndex.categorySlug', '==', categorySlug)
      .where('_sys.status', '==', 'published')
      .get();

    const stats = {
      articlesCount: articlesSnapshot.size,
      totalViews: articlesSnapshot.docs.reduce((sum, doc) => {
        const data = doc.data();
        return sum + (data.stats?.views || 0);
      }, 0),
      lastArticleDate: articlesSnapshot.docs.reduce((latest, doc) => {
        const date = doc.data().publishedDate;
        return date > latest ? date : latest;
      }, '')
    };

    await adminDb
      .collection('categories')
      .doc(categorySlug)
      .update({
        stats,
        'meta.updatedAt': new Date().toISOString()
      });
  }
}