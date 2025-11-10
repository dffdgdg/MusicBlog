"use client";

import { useState, useEffect } from 'react';
import type { Article } from '../types/article';
import { ArticleService } from '@/lib/services/article-service';

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await ArticleService.getAll();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const createArticle = async (articleData: Omit<Article, 'id'>) => {
    try {
      const newArticle = await ArticleService.create(articleData);
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create article');
    }
  };

  const updateArticle = async (slug: string, articleData: Partial<Article>) => {
    try {
      const updatedArticle = await ArticleService.update(slug, articleData);
      setArticles(prev => prev.map(article => 
        article.slug === slug ? { ...article, ...updatedArticle } : article
      ));
      return updatedArticle;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update article');
    }
  };

  const deleteArticle = async (slug: string) => {
    try {
      await ArticleService.delete(slug);
      setArticles(prev => prev.filter(article => article.slug !== slug));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  return {
    articles,
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    refetch: loadArticles
  };
}