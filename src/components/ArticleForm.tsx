"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Article } from '@/lib/data';
import { createArticleAction, updateArticleAction } from '@/lib/actions';
import { Eye, Code, Save, Clock, Tag, User, BookOpen, Plus, X, AlertCircle, CheckCircle2, Video, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownRenderer from '@/components/MarkdownRenderer';
// Конфигурация
const CATEGORIES = [
  'Сведение', 'Мастеринг', 'Синтез', 'Саунд-дизайн', 
  'Теория музыки', 'Ableton Live', 'FL Studio', 'Логика',
  'Вокал', 'Аранжировка', 'Саундпродюссирование'
];

const LEVELS = ['Начальный', 'Средний', 'Продвинутый'] as const;
const MAX_TAGS = 10;
const MAX_TITLE_LENGTH = 100;
const MAX_EXCERPT_LENGTH = 200;

// Компонент предпросмотра Markdown
const MarkdownPreview = ({ content }: { content: string }) => {
  return (
    <div className="markdown-preview">
      <MarkdownRenderer content={content} />
    </div>
  );
};

// Компонент тега
const TagItem = ({ tag, onRemove }: { tag: string; onRemove: () => void }) => (
  <motion.span
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30 hover:border-orange-500/50 transition-colors"
  >
    {tag}
    <button
      type="button"
      onClick={onRemove}
      className="hover:text-orange-300 transition-colors text-xs ml-1 flex items-center"
    >
      <X size={14} />
    </button>
  </motion.span>
);

// Компонент для встраивания видео
const VideoEmbedModal = ({ 
  isOpen, 
  onClose, 
  onInsert 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onInsert: (embedCode: string) => void;
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [platform, setPlatform] = useState<'youtube' | 'rutube'>('youtube');

const generateEmbedCode = () => {
    if (!videoUrl.trim()) return;

    let embedUrl = '';
    
    if (platform === 'youtube') {
        const match = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (match) {
            const videoId = match[1];
            embedUrl = `https://www.youtube.com/embed/${videoId}`;
        }
    } 
    else if (platform === 'rutube') 
      {
        const match = videoUrl.match(/rutube\.ru\/video\/([a-f0-9]+)/);
        if (match) {
            const videoId = match[1];
            embedUrl = `https://rutube.ru/play/embed/${videoId}`;
        }
    }

    if (embedUrl) {
        const embedCode = `\n\n<!-- VIDEO:${embedUrl}:${videoTitle || 'Видео'} -->\n\n`;
        onInsert(embedCode);
        setVideoUrl('');
        setVideoTitle('');
        onClose();
    }
};
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl border border-orange-500/20 p-6 w-full max-w-md"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Video size={20} />
          Вставить видео
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Платформа
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPlatform('youtube')}
                className={`flex-1 py-2 rounded-lg border transition-all ${
                  platform === 'youtube'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white/5 text-gray-400 border-orange-500/20 hover:border-orange-500/50'
                }`}
              >
                YouTube
              </button>
              <button
                type="button"
                onClick={() => setPlatform('rutube')}
                className={`flex-1 py-2 rounded-lg border transition-all ${
                  platform === 'rutube'
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white/5 text-gray-400 border-orange-500/20 hover:border-orange-500/50'
                }`}
              >
                Rutube
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Ссылка на видео
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder={
                platform === 'youtube' 
                  ? 'https://www.youtube.com/watch?v=...' 
                  : 'https://rutube.ru/video/...'
              }
              className="w-full px-3 py-2 bg-black/20 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              Название видео (опционально)
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              placeholder="Введите название видео..."
              className="w-full px-3 py-2 bg-black/20 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={generateEmbedCode}
            disabled={!videoUrl.trim()}
            className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Вставить
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white border border-orange-500/20 rounded-lg transition-colors"
          >
            Отмена
          </button>
        </div>
      </motion.div>
    </div>
  );
};

// Статистика статьи
const ArticleStats = ({ content, title, excerpt }: { content: string; title: string; excerpt: string }) => {
  const words = content.split(/\s+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200) || 1;
  
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="space-y-1">
        <div className="text-slate-400">Символов</div>
        <div className="text-white font-semibold">{content.length.toLocaleString()}</div>
      </div>
      <div className="space-y-1">
        <div className="text-slate-400">Слов</div>
        <div className="text-white font-semibold">{words.toLocaleString()}</div>
      </div>
      <div className="space-y-1">
        <div className="text-slate-400">Время чтения</div>
        <div className="text-orange-400 font-semibold">{readingTime} мин</div>
      </div>
      <div className="space-y-1">
        <div className="text-slate-400">Заголовок</div>
        <div className={`font-semibold ${title.length > MAX_TITLE_LENGTH - 20 ? 'text-red-400' : 'text-green-400'}`}>
          {title.length}/{MAX_TITLE_LENGTH}
        </div>
      </div>
    </div>
  );
};

export default function ArticleForm({ initialData }: { initialData?: Article }) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Состояния формы
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category: initialData?.category || CATEGORIES[0],
    level: initialData?.level || 'Начальный',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    tags: initialData?.tags || [],
  });

  const [newTag, setNewTag] = useState('');
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [status, setStatus] = useState({ message: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const isEditing = !!initialData;

  // Генерация slug
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[а-яё]/g, (char) => {
        const mapping: { [key: string]: string } = {
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
  // Автогенерация slug при изменении заголовка
  useEffect(() => {
    if (!isEditing && formData.title && !formData.slug) {
      const newSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title, isEditing, formData.slug]);

  // Управление тегами
  const addTag = () => {
    const trimmedTag = newTag.trim();
    
    if (!trimmedTag) return;
    
    if (formData.tags.length >= MAX_TAGS) {
      setStatus({ message: `Максимум ${MAX_TAGS} тегов`, isError: true });
      return;
    }
    
    if (formData.tags.includes(trimmedTag)) {
      setStatus({ message: 'Этот тег уже добавлен', isError: true });
      return;
    }
    
    setFormData(prev => ({ ...prev, tags: [...prev.tags, trimmedTag] }));
    setNewTag('');
    setStatus({ message: '', isError: false });
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Вставка Markdown
  const insertMarkdown = (syntax: string, wrapSelection = true) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end);
    
    let newText = formData.content;
    let newCursorPos = start + syntax.length;

    if (wrapSelection && selectedText) {
      newText = formData.content.substring(0, start) + syntax + selectedText + syntax + formData.content.substring(end);
      newCursorPos = end + syntax.length * 2;
    } else {
      newText = formData.content.substring(0, start) + syntax + formData.content.substring(start);
    }

    setFormData(prev => ({ ...prev, content: newText }));
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Вставка видео
  const insertVideo = (embedCode: string) => {
    insertMarkdown(`\n\n${embedCode}\n\n`, false);
  };

  // Кнопки форматирования
  const formatButtons = [
    { label: 'H1', syntax: '# ', wrap: false },
    { label: 'H2', syntax: '## ', wrap: false },
    { label: 'H3', syntax: '### ', wrap: false },
    { label: 'Жирный', syntax: '**', wrap: true },
    { label: 'Курсив', syntax: '_', wrap: true },
    { label: 'Код', syntax: '`', wrap: true },
    { label: 'Ссылка', syntax: '[текст](url)', wrap: false },
    { label: 'Список', syntax: '- ', wrap: false },
    { label: 'Цитата', syntax: '> ', wrap: false },
  ];

  // Валидация формы
  const validateForm = () => {
    if (!formData.title.trim()) {
      return 'Заголовок обязателен';
    }
    if (!formData.slug.trim()) {
      return 'Slug обязателен';
    }
    if (!formData.content.trim()) {
      return 'Содержание обязательно';
    }
    if (formData.title.length > MAX_TITLE_LENGTH) {
      return `Заголовок не должен превышать ${MAX_TITLE_LENGTH} символов`;
    }
    if (formData.excerpt.length > MAX_EXCERPT_LENGTH) {
      return `Описание не должно превышать ${MAX_EXCERPT_LENGTH} символов`;
    }
    return null;
  };

  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setStatus({ message: validationError, isError: true });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: 'Сохранение...', isError: false });

    const articleData: Article = {
      ...formData,
      slug: formData.slug,
      author: initialData?.author || { 
        name: "Администратор", 
        role: "Автор" 
      },
      publishedDate: initialData?.publishedDate || new Date().toLocaleDateString('ru-RU', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      }),
      readingTime: Math.ceil(formData.content.split(/\s+/).filter(Boolean).length / 200) || 1,
      relatedArticles: initialData?.relatedArticles || []
    };

    try {
      const result = isEditing 
        ? await updateArticleAction(initialData.slug, articleData)
        : await createArticleAction(articleData);

      if (result.success) {
        setStatus({ message: result.message, isError: false });
        setTimeout(() => {
          router.push('/admin');
          router.refresh();
        }, 1500);
      } else {
        setStatus({ message: result.message, isError: true });
      }
    } catch (error) {
      setStatus({ 
        message: 'Произошла ошибка при сохранении', 
        isError: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8">
        {/* Заголовок и управление */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
        >
          <div>
            <h1 className="text-3xl font-black text-white mb-2">
              {isEditing ? 'Редактирование статьи' : 'Новая статья'}
            </h1>
            <p className="text-slate-400">
              {isEditing ? 'Обновите содержание статьи' : 'Создайте новую статью для вашего журнала'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Переключатель режима */}
            <div className="flex bg-white/5 rounded-xl p-1 border border-orange-500/20">
              <button
                type="button"
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'edit' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Code size={16} />
                Редактор
              </button>
              <button
                type="button"
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  viewMode === 'preview' 
                    ? 'bg-orange-500 text-white shadow-lg' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Eye size={16} />
                Превью
              </button>
            </div>

            {/* Кнопка сохранения */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isEditing ? 'Сохранить' : 'Опубликовать'}
            </button>
          </div>
        </motion.div>

        {/* Статус */}
        <AnimatePresence>
          {status.message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex items-center gap-3 p-4 rounded-xl border ${
                status.isError
                  ? 'bg-red-500/20 border-red-500/30 text-red-400'
                  : 'bg-green-500/20 border-green-500/30 text-green-400'
              }`}
            >
              {status.isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
              {status.message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Левая панель - метаданные */}
          <div className="xl:col-span-1 space-y-6">
            {/* Slug */}
            <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6">
              <label className="block text-sm font-semibold text-white mb-3">
                URL статьи
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                className="w-full px-4 py-3 bg-black/20 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="url-stati"
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                Уникальный идентификатор статьи в URL
              </p>
            </div>

            {/* Категория и уровень */}
            <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <BookOpen size={16} />
                  Категория
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-black/20 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <User size={16} />
                  Уровень сложности
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as typeof formData.level }))}
                  className="w-full px-4 py-3 bg-black/20 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  {LEVELS.map(lvl => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Теги - КОМПАКТНЫЙ ВАРИАНТ */}
<div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6">
  <label className="block text-sm font-semibold text-white mb-3 flex items-center gap-2">
    <Tag size={16} />
    Теги
    <span className="text-xs text-gray-400 ml-auto">
      {formData.tags.length}/{MAX_TAGS}
    </span>
  </label>
  
  {/* Компактное поле ввода */}
  <div className="flex items-center gap-2 mb-4">
     <input
        type="text"
        value={newTag}
        onChange={(e) => setNewTag(e.target.value)}
        onKeyPress={handleTagKeyPress}
        placeholder="Введите тег и нажмите Enter..."
        className="w-full px-3 py-2 bg-black/20 border border-orange-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-sm"
        disabled={formData.tags.length >= MAX_TAGS}
      />
    <button
      type="button"
      onClick={addTag}
      disabled={!newTag.trim() || formData.tags.length >= MAX_TAGS}
      className="p-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      title="Добавить тег"
    >
      <Plus size={16} />
    </button>
  </div>

  {/* Список тегов */}
  <div className="min-h-[40px]">
    <AnimatePresence mode="popLayout">
      <div className="flex flex-wrap gap-2">
        {formData.tags.map(tag => (
          <motion.span
            key={tag}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30 hover:border-orange-500/50 transition-colors"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-orange-300 transition-colors text-xs ml-1"
            >
              <X size={14} />
            </button>
          </motion.span>
        ))}
        
        {formData.tags.length === 0 && (
          <span className="text-gray-500 text-sm">Тегов пока нет</span>
        )}
      </div>
    </AnimatePresence>
  </div>
</div>

            {/* Статистика */}
            <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6">
              <label className="block text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Clock size={16} />
                Статистика
              </label>
              <ArticleStats
                content={formData.content}
                title={formData.title}
                excerpt={formData.excerpt}
              />
            </div>
          </div>

          {/* Правая панель - контент */}
          <div className="xl:col-span-3 space-y-6">
            {/* Заголовок */}
            <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6">
              <label className="block text-sm font-semibold text-white mb-3 flex items-center justify-between">
                <span>Заголовок статьи</span>
                <span className={`text-xs ${formData.title.length > MAX_TITLE_LENGTH - 20 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.title.length}/{MAX_TITLE_LENGTH}
                </span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_TITLE_LENGTH) {
                    setFormData(prev => ({ ...prev, title: e.target.value }));
                  }
                }}
                className="w-full px-4 py-4 bg-black/20 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-xl font-semibold"
                placeholder="Введите заголовок статьи..."
                required
              />
            </div>

            {/* Описание */}
            <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6">
              <label className="block text-sm font-semibold text-white mb-3 flex items-center justify-between">
                <span>Краткое описание</span>
                <span className={`text-xs ${formData.excerpt.length > MAX_EXCERPT_LENGTH - 50 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.excerpt.length}/{MAX_EXCERPT_LENGTH}
                </span>
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_EXCERPT_LENGTH) {
                    setFormData(prev => ({ ...prev, excerpt: e.target.value }));
                  }
                }}
                className="w-full px-4 py-3 bg-black/20 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                rows={3}
                placeholder="Краткое описание статьи, которое будет отображаться в списках..."
              />
            </div>

            {/* Редактор/Превью */}
            <div className="bg-white/5 rounded-2xl border border-orange-500/20 p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <label className="block text-sm font-semibold text-white">
                  Содержание статьи
                </label>
                
                {viewMode === 'edit' && (
                  <div className="flex flex-wrap gap-2">
                    {formatButtons.map((button, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => insertMarkdown(button.syntax, button.wrap)}
                        className="px-3 py-2 bg-white/5 text-gray-300 rounded-lg text-sm hover:bg-white/10 hover:text-white transition-colors border border-white/10 hover:border-orange-500/30"
                      >
                        {button.label}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setIsVideoModalOpen(true)}
                      className="px-3 py-2 bg-orange-500/20 text-orange-400 rounded-lg text-sm hover:bg-orange-500/30 hover:text-orange-300 transition-colors border border-orange-500/30 hover:border-orange-500/50 flex items-center gap-2"
                    >
                      <Youtube size={14} />
                      Видео
                    </button>
                  </div>
                )}
              </div>

              {viewMode === 'edit' ? (
                <textarea
                  ref={textareaRef}
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full h-96 px-4 py-4 bg-black/20 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors font-mono text-sm resize-none"
                  placeholder={`# Начните писать свою статью здесь...

Расскажите о чем-то интересном в формате Markdown.

## Подзаголовок

- Список преимуществ
- Еще один пункт

> Вдохновляющая цитата

\`код можно выделять бэктиками\`

{{video:https://www.youtube.com/embed/VIDEO_ID:Название видео}}`}
                  required
                />
              ) : (
                <div className="min-h-96 p-6 bg-black/20 border border-orange-500/30 rounded-xl">
                  <MarkdownPreview content={formData.content} />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>

      {/* Модальное окно для вставки видео */}
      <VideoEmbedModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onInsert={insertVideo}
      />
    </>
  );
}