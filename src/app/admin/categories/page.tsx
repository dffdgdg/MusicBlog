"use client";

import { useState } from 'react';
import { Plus, Edit2, Trash2, Tag, Search, BarChart3, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Интерфейсы для типизации
interface Category {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  color: string;
  description: string;
}

interface CategoryFormData {
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface ColorOption {
  value: string;
  label: string;
  class: string;
}

// Моковые данные категорий
const mockCategories: Category[] = [
  { id: '1', name: 'Сведение', slug: 'mixing', articleCount: 15, color: 'orange', description: 'Техники сведения и микширования треков' },
  { id: '2', name: 'Мастеринг', slug: 'mastering', articleCount: 8, color: 'purple', description: 'Финальная обработка и подготовка к релизу' },
  { id: '3', name: 'Синтез', slug: 'synthesis', articleCount: 12, color: 'cyan', description: 'Создание звуков с помощью синтезаторов' },
  { id: '4', name: 'Саунд-дизайн', slug: 'sound-design', articleCount: 10, color: 'green', description: 'Дизайн и создание уникальных звуков' },
  { id: '5', name: 'Теория музыки', slug: 'music-theory', articleCount: 6, color: 'blue', description: 'Основы музыкальной теории для продюсеров' },
  { id: '6', name: 'Ableton Live', slug: 'ableton-live', articleCount: 20, color: 'red', description: 'Работа в Ableton Live' },
  { id: '7', name: 'FL Studio', slug: 'fl-studio', articleCount: 18, color: 'yellow', description: 'Работа в FL Studio' },
  { id: '8', name: 'Вокал', slug: 'vocal', articleCount: 9, color: 'pink', description: 'Обработка и запись вокала' },
];

const colorOptions: ColorOption[] = [
  { value: 'orange', label: 'Оранжевый', class: 'bg-orange-500' },
  { value: 'purple', label: 'Фиолетовый', class: 'bg-purple-500' },
  { value: 'cyan', label: 'Бирюзовый', class: 'bg-cyan-500' },
  { value: 'green', label: 'Зеленый', class: 'bg-green-500' },
  { value: 'blue', label: 'Синий', class: 'bg-blue-500' },
  { value: 'red', label: 'Красный', class: 'bg-red-500' },
  { value: 'yellow', label: 'Желтый', class: 'bg-yellow-500' },
  { value: 'pink', label: 'Розовый', class: 'bg-pink-500' },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    slug: '',
    description: '',
    color: 'orange'
  });

  // Фильтрация категорий
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Статистика
  const totalCategories = categories.length;
  const totalArticles = categories.reduce((sum, cat) => sum + cat.articleCount, 0);
  const averageArticles = Math.round(totalArticles / totalCategories);

  // Обработчики форм
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: Date.now().toString(),
      ...formData,
      articleCount: 0
    };
    setCategories([...categories, newCategory]);
    setFormData({ name: '', slug: '', description: '', color: 'orange' });
    setIsCreateModalOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    
    setCategories(categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...editingCategory, ...formData }
        : cat
    ));
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', color: 'orange' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить эту категорию?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const startEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color
    });
  };

  const cancelEdit = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '', color: 'orange' });
  };

  const generateSlug = (name: string): string => {
    const mapping: { [key: string]: string } = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
      'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
      'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
      'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
      'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
      'э': 'e', 'ю': 'yu', 'я': 'ya'
    };

    return name
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => mapping[char] || char)
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  return (
    <div className="space-y-8">
      {/* Заголовок и действия */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
            <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Управление категориями
            </span>
          </h1>
          <p className="text-slate-400">
            Создавайте и редактируйте категории для статей
          </p>
        </div>
        
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          Новая категория
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-6 border border-orange-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Всего категорий</p>
              <p className="text-2xl font-bold text-white">{totalCategories}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Всего статей</p>
              <p className="text-2xl font-bold text-white">{totalArticles}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Статей в среднем</p>
              <p className="text-2xl font-bold text-white">{averageArticles}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Поиск и управление */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Поиск категорий..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
          />
        </div>
        
        <div className="text-slate-400 text-sm">
          Найдено: <span className="text-orange-400 font-semibold">{filteredCategories.length}</span>
        </div>
      </div>

      {/* Список категорий */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-orange-500/20 p-6 hover:border-orange-500/40 transition-all duration-300 group"
            >
              {/* Заголовок категории */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${colorOptions.find(c => c.value === category.color)?.class} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg group-hover:text-orange-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-slate-400 text-sm">/{category.slug}</p>
                  </div>
                </div>
                
                {/* Действия */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => startEdit(category)}
                    className="p-1 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="p-1 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Описание */}
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">
                {category.description}
              </p>

              {/* Статистика */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <FileText className="w-4 h-4" />
                  {category.articleCount} статей
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-semibold border ${
                  category.articleCount > 10 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : category.articleCount > 5
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                }`}>
                  {category.articleCount > 10 ? 'Популярная' : category.articleCount > 5 ? 'Средняя' : 'Новая'}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Состояние пустого поиска */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏷️</div>
          <h3 className="text-xl font-bold text-slate-300 mb-2">
            {searchQuery ? 'Категории не найдены' : 'Категорий пока нет'}
          </h3>
          <p className="text-slate-400 mb-6">
            {searchQuery 
              ? 'Попробуйте изменить запрос поиска' 
              : 'Создайте первую категорию для ваших статей'
            }
          </p>
          {!searchQuery && (
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Создать категорию
            </button>
          )}
        </div>
      )}

      {/* Модальное окно создания/редактирования */}
      <AnimatePresence>
        {(isCreateModalOpen || editingCategory) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-3xl border-2 border-orange-500/20 p-6 w-full max-w-md"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                {editingCategory ? 'Редактирование категории' : 'Новая категория'}
              </h2>

              <form onSubmit={editingCategory ? handleEditSubmit : handleCreateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Название категории
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                        slug: generateSlug(e.target.value)
                      });
                    }}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                    placeholder="Например: Сведение"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    URL slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                    placeholder="mixing"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Описание
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300 resize-none"
                    rows={3}
                    placeholder="Краткое описание категории..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Цвет категории
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {colorOptions.map(color => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, color: color.value })}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                          formData.color === color.value
                            ? 'border-white scale-110'
                            : 'border-orange-500/20 hover:border-orange-500/40'
                        }`}
                      >
                        <div className={`w-6 h-6 ${color.class} rounded-lg`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300"
                  >
                    {editingCategory ? 'Сохранить' : 'Создать'}
                  </button>
                  <button
                    type="button"
                    onClick={editingCategory ? cancelEdit : () => setIsCreateModalOpen(false)}
                    className="px-6 py-3 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border-2 border-orange-500/20 rounded-2xl transition-all duration-300"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}