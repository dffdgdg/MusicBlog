"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, X, Palette } from 'lucide-react';
import type { CollectionFormData } from '@/types/collections';

// Интерфейс для статьи из API
interface ApiArticle {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description?: string;
}

// Интерфейс для коллекции из API
interface ApiCollection {
  id: string;
  title: string;
  description: string;
  articles: string[];
}

interface CollectionFormProps {
  initialData?: Partial<CollectionFormData>;
  onSubmit: (data: CollectionFormData) => Promise<void>;
}

export function CollectionForm({ initialData, onSubmit }: CollectionFormProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticles, setSelectedArticles] = useState<string[]>(initialData?.articles || []);
  const [availableArticles, setAvailableArticles] = useState<ApiArticle[]>([]);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    color: initialData?.color || '#f97316', 
    tags: initialData?.tags || [],
    featured: initialData?.featured || false,
    articles: selectedArticles
  });

  // Функция для загрузки статей
  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles?select=true');
      if (response.ok) {
        const articles: ApiArticle[] = await response.json();
        setAvailableArticles(articles);
      } else {
        // Запасной вариант: мок-данные для тестирования
        const mockArticles: ApiArticle[] = [
          { slug: 'article-1', title: 'Основы сведения', category: 'Сведение' },
          { slug: 'article-2', title: 'Мастеринг для начинающих', category: 'Мастеринг' },
          { slug: 'article-3', title: 'Синтез звука', category: 'Синтез' }
        ];
        setAvailableArticles(mockArticles);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  // Фильтрация статей по поиску
  const filteredArticles = availableArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Генерация slug из заголовка
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const mapping: Record<string, string> = {
          'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
          'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
          'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
          'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
          'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
          'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
          'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        return mapping[char] || char;
      })
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Если slug пустой, генерируем из заголовка
    const finalSlug = formData.slug || generateSlug(formData.title);
    
    const submitData: CollectionFormData = {
      ...formData,
      slug: finalSlug,
      articles: selectedArticles
    };
    
    await onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* Основная информация */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Название коллекции *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFormData({...formData, title: e.target.value});
              // Автоматически генерируем slug если он пустой
              if (!formData.slug) {
                setFormData(prev => ({...prev, slug: generateSlug(e.target.value)}));
              }
            }}
            className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
            placeholder="Например: Основы Ableton Live"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            URL slug *
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, slug: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
            placeholder="osnovy-ableton-live"
            required
          />
          <p className="text-xs text-slate-400 mt-2">
            Уникальный идентификатор для URL
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Описание *
          </label>
          <textarea
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
            rows={3}
            placeholder="Опишите, какие статьи входят в эту коллекцию..."
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
                className={`w-8 h-8 rounded-full border-2 transition-all ${formData.color === color ? 'border-white scale-110' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Теги */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Теги (через запятую)
          </label>
          <input
            type="text"
            value={formData.tags.join(', ')}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
            className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
            placeholder="ableton, сведение, новичкам"
          />
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/5 border border-orange-500/20 rounded-xl text-white focus:outline-none focus:border-orange-500/50 transition-all duration-300"
          />
        </div>

        {/* Результаты поиска */}
        {searchQuery && filteredArticles.length > 0 && (
          <div className="bg-white/5 rounded-xl p-2 max-h-48 overflow-y-auto">
            {filteredArticles.map(article => (
              <div key={article.slug} className="flex items-center justify-between p-2 hover:bg-white/10 rounded">
                <div>
                  <div className="text-white font-medium">{article.title}</div>
                  <div className="text-slate-400 text-sm">{article.category}</div>
                </div>
                {!selectedArticles.includes(article.slug) ? (
                  <button
                    type="button"
                    onClick={() => setSelectedArticles([...selectedArticles, article.slug])}
                    className="p-1 text-green-400 hover:bg-green-500/20 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-green-400 text-sm">Добавлено</span>
                )}
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

      {/* Флаг "Избранное" */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, featured: e.target.checked})}
          className="w-4 h-4 text-orange-500 bg-gray-700 border-gray-600 rounded focus:ring-orange-500 focus:ring-2"
        />
        <label htmlFor="featured" className="text-sm font-semibold text-white">
          Сделать избранной коллекцией
        </label>
      </div>

      {/* Кнопка сохранения */}
      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-bold rounded-2xl hover:shadow-lg transition-all hover:scale-[1.02]"
      >
        {initialData ? 'Сохранить коллекцию' : 'Создать коллекцию'}
      </button>
    </form>
  );
}