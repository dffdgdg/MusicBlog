"use client";

import React from 'react';
import Link from 'next/link';
import { useState, useMemo, useDeferredValue, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Search, Filter, X, SlidersHorizontal, Clock, Eye } from 'lucide-react';
import type { Article } from '@/features/articles'; 
import { ErrorBoundary } from '@/components/shared/ui/ErrorBoundary';
import ArticleSkeleton from './article-skeleton';

const ArticleCard = React.memo(({ article, index, viewMode }: { article: Article; index: number; viewMode: 'grid' | 'list' }) => {
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: index * 0.1
            }
        }
    };

    if (viewMode === 'grid') {
        return (
            <motion.article
                variants={fadeUp}
                className="group"
            >
                <Link
                    href={`/articles/${article.slug}`}
                    className="block h-full p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
                >
                    {/* Анимированный фон */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Категория и время чтения */}
                    <div className="flex justify-between items-start mb-6">
                        <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold border border-cyan-500/30">
                            {article.category}
                        </span>
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-slate-400 text-sm flex items-center gap-1 font-semibold">
                                <Clock className="w-4 h-4" />
                                {article.readingTime} мин
                            </span>
                            {/* ДОБАВЛЕНО: Просмотры */}
                            <span className="text-slate-500 text-xs flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {article.views || 0}
                            </span>
                        </div>
                    </div>

                    {/* Заголовок */}
                    <h3 className="text-2xl font-bold mb-4 text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                        {article.title}
                    </h3>

                    {/* Автор и дата */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {article.author.name.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white text-sm font-semibold">
                                {article.author.name}
                            </span>
                            <span className="text-slate-400 text-xs">
                                {article.publishedDate}
                            </span>
                        </div>
                    </div>

                    {/* Описание */}
                    {article.excerpt && (
                        <p className="text-slate-300 mb-8 line-clamp-3 leading-relaxed">
                            {article.excerpt}
                        </p>
                    )}

                    {/* Кнопка чтения */}
                    <div className="flex justify-between items-center pt-6 border-t border-white/10">
                        <motion.span
                            className="font-bold text-slate-200 flex items-center gap-2 group-hover:text-orange-400 group-hover:gap-3 transition-all duration-300"
                            whileHover={{ x: 5 }}
                        >
                            Читать
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </motion.span>

                        {/* Анимированная линия */}
                        <div className="h-0.5 bg-gradient-to-r from-orange-400/0 via-orange-400 to-orange-400/0 w-0 group-hover:w-16 transition-all duration-500" />
                    </div>
                </Link>
            </motion.article>
        );
    }

    // List view
    return (
        <motion.article
            variants={fadeUp}
            className="group"
        >
            <Link
                href={`/articles/${article.slug}`}
                className="block p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl relative overflow-hidden"
            >
                {/* Анимированный фон */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-bold border border-cyan-500/30">
                                {article.category}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-400 text-sm flex items-center gap-1 font-semibold">
                                    <Clock className="w-4 h-4" />
                                    {article.readingTime} мин
                                </span>
                                {/* ДОБАВЛЕНО: Просмотры */}
                                <span className="text-slate-500 text-sm flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    {article.views || 0}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                            {article.title}
                        </h3>

                        {article.excerpt && (
                            <p className="text-slate-300 leading-relaxed line-clamp-2">
                                {article.excerpt}
                            </p>
                        )}

                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {article.author.name.charAt(0)}
                                </div>
                                <span className="text-white text-sm font-semibold">
                                    {article.author.name}
                                </span>
                            </div>
                            <span className="text-slate-400 text-sm">•</span>
                            <span className="text-slate-400 text-sm">{article.publishedDate}</span>
                        </div>
                    </div>

                    <motion.div
                        className="flex items-center gap-3 text-orange-400 font-bold group-hover:gap-4 transition-all duration-300"
                        whileHover={{ x: 5 }}
                    >
                        Читать
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                </div>
            </Link>
        </motion.article>
    );
});

ArticleCard.displayName = 'ArticleCard';

// Компонент для отображения списка статей с оптимизацией
const ArticlesList = React.memo(({ 
    articles, 
    viewMode 
}: { 
    articles: Article[]; 
    viewMode: 'grid' | 'list' 
}) => {
    return (
        <motion.div
            key={viewMode}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={
                viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                    : 'space-y-6 max-w-6xl mx-auto'
            }
        >
            <AnimatePresence>
                {articles.map((article, index) => (
                    <motion.div
                        key={article.slug}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <ArticleCard
                            article={article}
                            index={index}
                            viewMode={viewMode}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
});

ArticlesList.displayName = 'ArticlesList';

// Компонент для пустого состояния
const EmptyState = React.memo(({ 
    searchQuery, 
    selectedCategories, 
    onClearFilters 
}: { 
    searchQuery: string; 
    selectedCategories: string[]; 
    onClearFilters: () => void;
}) => {
    return (
        <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-20"
        >
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-3xl font-bold text-slate-300 mb-4">
                {searchQuery || selectedCategories.length > 0
                    ? 'Ничего не найдено'
                    : 'Пока здесь пусто'}
            </h3>
            <p className="text-slate-400 max-w-md mx-auto text-lg mb-8">
                {searchQuery || selectedCategories.length > 0
                    ? 'Попробуйте изменить параметры поиска или выбрать другие категории'
                    : 'Статьи появятся совсем скоро. Следите за обновлениями!'}
            </p>
            {(searchQuery || selectedCategories.length > 0) && (
                <button
                    onClick={onClearFilters}
                    className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-bold px-8 py-3 rounded-2xl transition-all duration-300"
                >
                    Показать все статьи
                </button>
            )}
        </motion.div>
    );
});

EmptyState.displayName = 'EmptyState';

// Основной компонент
export default function ArticlesClient({ articles }: { articles: Article[] }) {
    const categories = useMemo(() => 
        Array.from(new Set(articles.map(a => a.category))), 
        [articles]
    );
    
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    
    // Используем useDeferredValue для плавного поиска
    const deferredSearchQuery = useDeferredValue(searchQuery);

    // Оптимизированная фильтрация с useMemo
    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const title = article.title?.toLowerCase() ?? '';
            const excerpt = article.excerpt?.toLowerCase() ?? '';
            const category = article.category?.trim().toLowerCase() ?? '';

            const search = deferredSearchQuery.toLowerCase().trim();

            const matchesSearch =
                !search ||
                title.includes(search) ||
                excerpt.includes(search) ||
                category.includes(search);

            const matchesCategories =
                selectedCategories.length === 0 ||
                selectedCategories.map(c => c.toLowerCase().trim()).includes(category);

            return matchesSearch && matchesCategories;
        });
    }, [articles, deferredSearchQuery, selectedCategories]);

    // Оптимизированные обработчики
    const toggleCategory = useMemo(() => (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    }, []);

    const clearAllFilters = useMemo(() => () => {
        setSelectedCategories([]);
        setSearchQuery('');
    }, []);

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <ErrorBoundary fallback={
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😵</div>
                    <h2 className="text-2xl font-bold text-white mb-4">Ошибка загрузки статей</h2>
                    <p className="text-slate-400 mb-6">Попробуйте обновить страницу</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition-colors"
                    >
                        Обновить страницу
                    </button>
                </div>
            </div>
        }>
            <div className="relative min-h-screen">
                {/* Общий фон как на главной */}
                <div className="fixed inset-0 -z-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
                </div>

                <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-32">
                    {/* Hero Header */}
                    <motion.header
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="text-center mb-16"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
                        >
                            <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                Журнал
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed"
                        >
                            Все наши знания, собранные в одном месте. Найдите интересующую вас тему и погрузитесь в изучение.
                        </motion.p>
                    </motion.header>

                    {/* Search and Controls Section */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerChildren}
                        className="mb-16"
                    >
                        {/* Search Bar */}
                        <motion.div
                            variants={fadeUp}
                            className="max-w-4xl mx-auto mb-8"
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Поиск по статьям..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                )}
                            </div>
                        </motion.div>

                        {/* Controls Row */}
                        <motion.div
                            variants={fadeUp}
                            className="flex flex-col lg:flex-row items-center justify-between gap-6"
                        >
                            {/* Left Side - Filters */}
                            <div className="flex items-center gap-4">
                                {/* Filter Toggle Button */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-300 border-2 ${
                                        showFilters || selectedCategories.length > 0
                                            ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/30'
                                            : 'bg-white/5 backdrop-blur-xl text-slate-300 border-orange-500/20 hover:border-orange-500/50'
                                    }`}
                                >
                                    <SlidersHorizontal size={16} />
                                    Фильтры
                                    {selectedCategories.length > 0 && (
                                        <span className="bg-white text-orange-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                                            {selectedCategories.length}
                                        </span>
                                    )}
                                </button>

                                {/* Clear Filters Button */}
                                {(searchQuery || selectedCategories.length > 0) && (
                                    <button
                                        onClick={clearAllFilters}
                                        className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-slate-300 hover:text-white bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 hover:border-orange-500/50 transition-all duration-300"
                                    >
                                        <X size={16} />
                                        Сбросить
                                    </button>
                                )}
                            </div>

                            {/* Right Side - View Mode and Results Count */}
                            <div className="flex items-center gap-6">
                                {/* Results Count */}
                                <div className="text-slate-300 text-sm font-semibold hidden sm:block">
                                    Найдено: <span className="text-orange-400">{filteredArticles.length}</span>
                                </div>

                                {/* View Mode Toggle */}
                                <div className="flex gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-xl border-2 border-orange-500/20">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 rounded-xl transition-all duration-300 ${
                                            viewMode === 'grid'
                                                ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <LayoutGrid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 rounded-xl transition-all duration-300 ${
                                            viewMode === 'list'
                                                ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                                                : 'text-slate-400 hover:text-white hover:bg-white/10'
                                        }`}
                                    >
                                        <List size={20} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Categories Filter Panel */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-6 overflow-hidden"
                                >
                                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border-2 border-orange-500/20 p-6">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Filter size={18} />
                                            Категории
                                        </h3>
                                        <div className="flex flex-wrap gap-3">
                                            {categories.map(category => (
                                                <button
                                                    key={category}
                                                    onClick={() => toggleCategory(category)}
                                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border-2 ${
                                                        selectedCategories.includes(category)
                                                            ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white border-transparent shadow-lg'
                                                            : 'bg-white/10 text-slate-300 border-orange-500/20 hover:border-orange-500/50'
                                                    }`}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Active Filters */}
                        {selectedCategories.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex flex-wrap gap-2">
                                <span className="text-slate-400 text-sm">Активные фильтры:</span>
                                {selectedCategories.map(category => (
                                    <span
                                        key={category}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm border border-orange-500/30"
                                    >
                                        {category}
                                        <button
                                            onClick={() => toggleCategory(category)}
                                            className="hover:text-orange-300 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Articles Grid/List */}
                    <Suspense fallback={
    <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
        : 'space-y-6 max-w-6xl mx-auto'
    }>
        {[...Array(6)].map((_, i) => (
            <ArticleSkeleton key={i} viewMode={viewMode} />
        ))}
    </div>
}>
    <motion.div
        layout
        className="relative"
        transition={{ duration: 0.5 }}
    >
        {filteredArticles.length === 0 ? (
            <EmptyState 
                searchQuery={searchQuery}
                selectedCategories={selectedCategories}
                onClearFilters={clearAllFilters}
            />
        ) : (
            <ArticlesList 
                articles={filteredArticles}
                viewMode={viewMode}
            />
        )}
    </motion.div>
</Suspense>
                </div>
            </div>
        </ErrorBoundary>
    );
}