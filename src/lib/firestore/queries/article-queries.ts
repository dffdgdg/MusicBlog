import { adminDb } from '@/lib/firebase-admin';
import type { OptimizedArticle } from '../schemas/article';

export class ArticleQueries {
  static async getHomepageArticles(limit: number = 6) {
    const snapshot = await adminDb
      .collection('articles')
      .where('_sys.status', '==', 'published')
      .orderBy('searchIndex.publishedTimestamp', 'desc')
      .limit(limit)
      .select('slug', 'title', 'excerpt', 'category')
      .get();

    return snapshot.docs.map(doc => doc.data() as OptimizedArticle);
  }
}