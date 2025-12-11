"use client";

import { useState } from 'react';
import { Search, Plus, X, Tag, Palette } from 'lucide-react';
import { getAllArticlesAction } from '@/lib/actions/articles';

interface CollectionFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
}

export function CollectionForm({ initialData, onSubmit }: CollectionFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticles, setSelectedArticles] = useState<string[]>(initialData?.articles || []);
  const [availableArticles, setAvailableArticles] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    color: initialData?.color || '#f97316', // orange по умолчанию
    tags: initialData?.tags || [],
    featured: initialData?.featured || false
  });

  // Поиск статей для добавления в коллекцию
  const searchArticles = async (query: string) => {
    const articles = await getAllArticlesAction();
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10);
    
    setAvailableArticles(filtered);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({
        ...formData,
        articles: selectedArticles
      });
    }} className="space-y-8">
      
      {/* Основная информация */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Название коллекции
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Описание
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white"
            rows={3}
            required
          />
        </div>

        {/* Выбор цвета */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2 flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Цвет коллекции
          </label>
          <div className="flex gap-2">
            {['#f97316', '#8b5cf6', '#10b981', '#3b82f6', '#ef4444'].map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({...formData, color})}
                className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-white' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Поиск и добавление статей */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Поиск статей для добавления в коллекцию..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              searchArticles(e.target.value);
            }}
            className="flex-1 px-4 py-2 bg-white/5 border border-orange-500/20 rounded-xl text-white"
          />
        </div>

        {/* Результаты поиска */}
        {searchQuery && availableArticles.length > 0 && (
          <div className="bg-white/5 rounded-xl p-2 max-h-48 overflow-y-auto">
            {availableArticles.map(article => (
              <div key={article.slug} className="flex items-center justify-between p-2 hover:bg-white/10 rounded">
                <div>
                  <div className="text-white font-medium">{article.title}</div>
                  <div className="text-slate-400 text-sm">{article.category}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedArticles.includes(article.slug)) {
                      setSelectedArticles([...selectedArticles, article.slug]);
                    }
                  }}
                  className="p-1 text-green-400 hover:bg-green-500/20 rounded"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Выбранные статьи */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Статьи в коллекции ({selectedArticles.length})
          </h3>
          {selectedArticles.length === 0 ? (
            <p className="text-slate-400 text-sm">Добавьте статьи в коллекцию</p>
          ) : (
            <div className="space-y-2">
              {selectedArticles.map(slug => {
                const article = availableArticles.find(a => a.slug === slug);
                return article ? (
                  <div key={slug} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <div>
                      <div className="text-white">{article.title}</div>
                      <div className="text-slate-400 text-sm">{article.category}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedArticles(selectedArticles.filter(s => s !== slug))}
                      className="p-1 text-red-400 hover:bg-red-500/20 rounded"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>

      {/* Кнопка сохранения */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all"
      >
        {initialData ? 'Сохранить коллекцию' : 'Создать коллекцию'}
      </button>
    </form>
  );
}