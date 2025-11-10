"use client";

import { useState, useEffect } from 'react';
import type { Article } from '../types/article';
import { getAllArticlesAction } from '@/lib/actions/articles';

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
      const data = await getAllArticlesAction();
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  // Для клиентских операций можно оставить эти функции,
  // но они будут работать только с локальным состоянием
  const createArticle = async (articleData: Omit<Article, 'id'>) => {
    // В реальном приложении здесь будет вызов API
    const newArticle = {
      ...articleData,
      id: Date.now().toString(),
    } as Article;
    
    setArticles(prev => [newArticle, ...prev]);
    return newArticle;
  };

  const updateArticle = async (slug: string, articleData: Partial<Article>) => {
    setArticles(prev => prev.map(article => 
      article.slug === slug ? { ...article, ...articleData } : article
    ));
  };

  const deleteArticle = async (slug: string) => {
    setArticles(prev => prev.filter(article => article.slug !== slug));
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