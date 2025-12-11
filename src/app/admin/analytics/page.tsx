"use client";

import { useState, useEffect } from 'react';
import { getAllArticlesAction, getPopularArticlesAction } from '@/lib/actions/articles';
import { Eye, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { getRealTimeStats } from '@/lib/actions/stats';
import type { Article } from '@/features/articles'; 

export default function AnalyticsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    averageViews: 0,
    mostViewedArticle: { title: '', views: 0 }
  });

  useEffect(() => {
    const loadData = async () => {
      const [allArticles, popularArticles, realStats] = await Promise.all([
        getAllArticlesAction(),
        getPopularArticlesAction(5),
        getRealTimeStats() 
      ]);
      
      setArticles(allArticles);
      setPopularArticles(popularArticles);
      
      
      const totalViews = allArticles.reduce((sum, article) => sum + (article.views || 0), 0);
      const mostViewed = allArticles.reduce((max, article) => 
        (article.views || 0) > (max.views || 0) ? article : max, 
        allArticles[0] || { views: 0, title: '' }
      );
      
      setStats({
        totalArticles: realStats.totalArticles,
        totalViews: realStats.totalViews,
        averageViews: Math.round(realStats.totalViews / realStats.totalArticles) || 0,
        mostViewedArticle: realStats.mostViewedArticle
      });
    };
    
    loadData();
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Аналитика просмотров</h1>
      
      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 p-6 rounded-2xl border border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Всего статей</h3>
              <p className="text-3xl font-bold text-orange-400">{stats.totalArticles}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Всего просмотров</h3>
              <p className="text-3xl font-bold text-purple-400">{stats.totalViews}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">В среднем на статью</h3>
              <p className="text-3xl font-bold text-cyan-400">{stats.averageViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 p-6 rounded-2xl border border-green-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Самая популярная</h3>
              <p className="text-lg font-bold text-green-400 truncate" title={stats.mostViewedArticle.title}>
                {stats.mostViewedArticle.views} просмотров
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Популярные статьи */}
      <div className="bg-white/5 p-6 rounded-2xl border border-orange-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Самые популярные статьи
        </h3>
        <div className="space-y-3">
          {popularArticles.map((article, index) => (
            <div key={article.slug} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-orange-400 font-bold w-6 text-center">{index + 1}</span>
                <span className="text-white truncate flex-1">{article.title}</span>
              </div>
              <span className="text-orange-400 font-semibold whitespace-nowrap">
                {article.views || 0} просмотров
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}