// Файл: src/components/Search.tsx

"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/data';
import { Search as SearchIcon, X, Clock, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search({ 
    articles, 
    onLinkClick 
}: { 
    articles: Article[]; 
    onLinkClick?: () => void; 
}) {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        article.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    useEffect(() => {
        if (query.length > 0) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [query]);

    const clearSearch = () => {
        setQuery('');
        setIsOpen(false);
        inputRef.current?.focus();
    };

    const handleLinkClick = () => {
        setQuery('');
        setIsOpen(false);
        onLinkClick?.();
    };

    return (
        <div className="relative w-full">
            {/* Поле поиска */}
            <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Поиск статей..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
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

            {/* Результаты поиска */}
            <AnimatePresence>
                {isOpen && filteredArticles.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 w-full bg-white/5 backdrop-blur-2xl border-2 border-orange-500/20 rounded-2xl shadow-2xl z-50 overflow-hidden"
                    >
                        <div className="p-2 max-h-96 overflow-y-auto">
                            {filteredArticles.map((article, index) => (
                                <motion.div
                                    key={article.slug}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={`/articles/${article.slug}`}
                                        onClick={handleLinkClick}
                                        className="block p-4 hover:bg-white/10 rounded-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                                <BookOpen className="w-4 h-4 text-cyan-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                                                    {article.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm line-clamp-1 mt-1">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center gap-3 mt-2">
                                                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-500/30">
                                                        {article.category}
                                                    </span>
                                                    <div className="flex items-center gap-1 text-slate-500 text-xs">
                                                        <Clock className="w-3 h-3" />
                                                        {article.readingTime} мин
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Футер результатов */}
                        <div className="p-3 border-t border-white/10 bg-black/20">
                            <p className="text-slate-400 text-sm text-center">
                                Найдено {filteredArticles.length} статей
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Состояние "не найдено" */}
            <AnimatePresence>
                {isOpen && query && filteredArticles.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 w-full bg-white/5 backdrop-blur-2xl border-2 border-orange-500/20 rounded-2xl shadow-2xl z-50 p-6 text-center"
                    >
                        <div className="text-4xl mb-3">🔍</div>
                        <h3 className="font-semibold text-white mb-2">Ничего не найдено</h3>
                        <p className="text-slate-400 text-sm">
                            Попробуйте изменить запрос или посмотреть все статьи
                        </p>
                        <Link
                            href="/articles"
                            onClick={handleLinkClick}
                            className="inline-block mt-4 text-orange-400 hover:text-orange-300 font-semibold text-sm"
                        >
                            Смотреть все статьи →
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}