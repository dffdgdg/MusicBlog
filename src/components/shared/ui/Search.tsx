"use client";

import { useState, useMemo, useDeferredValue, memo, useCallback } from 'react';
import Link from 'next/link';
import type { Article } from '@/features/articles';
import { Search as SearchIcon, X, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchResultProps {
  article: Article;
  onLinkClick: () => void;
  index: number;
}

const SearchResultItem = memo(({ article, onLinkClick, index }: SearchResultProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Link
      href={`/articles/${article.slug}`}
      onClick={onLinkClick}
      className="block p-4 hover:bg-orange-500/10 rounded-xl transition-all duration-300 group border-b border-white/5 last:border-b-0"
      prefetch={false}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
          <BookOpen className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
            {article.title}
          </h3>
          <p className="text-slate-300 text-sm line-clamp-1 mt-1">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-500/30">
              {article.category}
            </span>
            <div className="flex items-center gap-1 text-slate-400 text-xs">
              <Clock className="w-3 h-3" />
              {article.readingTime} мин
            </div>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
));

SearchResultItem.displayName = 'SearchResultItem';

interface OptimizedSearchProps {
  articles: Article[];
  onLinkClick?: () => void;
}

export default function OptimizedSearch({ articles, onLinkClick }: OptimizedSearchProps) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  const filteredArticles = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    
    const searchTerm = deferredQuery.toLowerCase();
    
    return articles
      .filter(article =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.excerpt.toLowerCase().includes(searchTerm) ||
        article.category.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5); // Ограничиваем результаты
  }, [articles, deferredQuery]);

  const clearSearch = useCallback(() => {
    setQuery('');
  }, []);

  const handleLinkClick = useCallback(() => {
    setQuery('');
    onLinkClick?.();
  }, [onLinkClick]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="relative w-full">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Поиск статей..."
          value={query}
          onChange={handleInputChange}
          className="w-full pl-12 pr-12 py-3 bg-gray-800/90 border-2 border-orange-500/30 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-all duration-300"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <AnimatePresence>
        {query && filteredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-3 w-full bg-gray-900/95 border-2 border-orange-500/30 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm"
          >
            <div className="p-2 max-h-80 overflow-y-auto"> {/* Ограничиваем высоту */}
              {filteredArticles.map((article, index) => (
                <SearchResultItem 
                  key={article.slug}
                  article={article} 
                  onLinkClick={handleLinkClick}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}