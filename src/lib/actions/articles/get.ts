"use server";

import { ArticleQueries } from '@/lib/firestore/queries/article-queries';

export async function getAllArticlesAction() {
  return await ArticleQueries.getHomepageArticles();
}