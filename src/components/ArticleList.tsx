// Файл: src/components/ArticleList.tsx

"use client";

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';

// Импортируем только ТИП статьи, а не сами данные
import type { Article } from '@/lib/data';

// Компонент теперь принимает массив статей как пропс
export default function ArticleList({ articles }: { articles: Article[] }) {
    const categories = Array.from(new Set(articles.map(a => a.category)));

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState<string>('Все');

    const filteredArticles = selectedCategory === 'Все'
        ? articles
        : articles.filter(a => a.category === selectedCategory);

    return (
        <>
            {/* Панель фильтра и переключателя */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => setSelectedCategory('Все')}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                            selectedCategory === 'Все'
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                        Все
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                selectedCategory === cat
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="flex gap-2 p-1 rounded-lg bg-white/5">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition ${ viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white' }`}
                    >
                        <LayoutGrid size={20} />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md transition ${ viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-gray-400 hover:text-white' }`}
                    >
                        <List size={20} />
                    </button>
                </div>
            </div>

            {/* Список статей */}
            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredArticles.map(article => (
                             <motion.div key={article.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="group block p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-400/40"
                                >
                                    <p className="text-sm font-semibold text-cyan-400 mb-2">{article.category}</p>
                                    <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-orange-300 transition-colors duration-300">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-auto">
                                        {article.publishedDate} • {article.readingTime} мин
                                    </p>
                                </Link>
                             </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                    >
                        {filteredArticles.map(article => (
                            <motion.div key={article.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                                <Link
                                    href={`/articles/${article.slug}`}
                                    className="block px-6 py-5 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
                                            {article.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {article.author.name} • {article.category}
                                        </p>
                                    </div>
                                    <div className="mt-2 sm:mt-0 text-gray-300 text-sm font-semibold">
                                        Читать &rarr;
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}