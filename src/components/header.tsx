// Файл: src/components/Header.tsx

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { Article } from '@/lib/data';
import { Menu, X, BookOpen, LayoutGrid, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Search from './Search';

export default function Header({ articles }: { articles: Article[] }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50">
                <nav className="container mx-auto px-6 lg:px-12 xl:px-20 py-4 bg-black/40 backdrop-blur-2xl border-b border-orange-500/20">
                    <div className="flex justify-between items-center">
                        {/* Логотип */}
<Link 
    href="/" 
    onClick={closeMobileMenu} 
    className="flex items-center gap-3 group"
>
    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg md:hidden">
        <Image
            src="/logo.svg"
            alt="СоздайМузыку"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            priority
        />
    </div>
    <div className="hidden md:flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg">
            <Image
                src="/logo.svg"
                alt="СоздайМузыку"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
            />
        </div>
        <div>
            <h1 className="text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                    СоздайМузыку
                </span>
            </h1>
            <p className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ваша студия знаний
            </p>
        </div>
    </div>
</Link>
                        
                        {/* Поиск для ПК */}
                        <div className="hidden lg:block flex-1 max-w-2xl mx-8">
                            <Search articles={articles} />
                        </div>

                        {/* Навигация для ПК */}
                        <div className="hidden md:flex items-center gap-6">
                            <Link 
                                href="/#collections" 
                                className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-all duration-300 group"
                            >
                                <LayoutGrid className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Подборки</span>
                            </Link>
                            <Link 
                                href="/articles" 
                                className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-all duration-300 group"
                            >
                                <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Статьи</span>
                            </Link>
                            <Link 
                                href="/admin" 
                                className="flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition-all duration-300 group"
                            >
                                <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Админ</span>
                            </Link>
                        </div>

                        {/* Кнопка поиска для мобильных */}
                        <div className="flex md:hidden items-center gap-4">
                            <Link 
                                href="/admin"
                                className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-xl transition-all duration-300"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                            {/* Кнопка "Гамбургер" для мобильных */}
                            <button 
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Поиск для планшетов */}
                    <div className="hidden md:block lg:hidden mt-4">
                        <Search articles={articles} />
                    </div>
                </nav>
            </header>

            {/* Выезжающее мобильное меню */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 top-20 bg-gray-900/95 backdrop-blur-2xl z-40"
                    >
                        <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
                            {/* Поиск для мобильной версии */}
                            <div className="mb-8">
                                <Search articles={articles} onLinkClick={closeMobileMenu} />
                            </div>

                            {/* Навигация для мобильной версии */}
                            <nav className="space-y-2">
                                <Link 
                                    href="/#collections" 
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-4 p-4 text-slate-300 hover:text-orange-400 hover:bg-orange-500/10 rounded-2xl transition-all duration-300 group border border-orange-500/20"
                                >
                                    <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <LayoutGrid className="w-5 h-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Подборки</h3>
                                        <p className="text-sm text-slate-400">Тематические коллекции</p>
                                    </div>
                                </Link>

                                <Link 
                                    href="/articles" 
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-4 p-4 text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 rounded-2xl transition-all duration-300 group border border-purple-500/20"
                                >
                                    <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-5 h-5 text-purple-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Статьи</h3>
                                        <p className="text-sm text-slate-400">Все материалы журнала</p>
                                    </div>
                                </Link>

                                <Link 
                                    href="/admin" 
                                    onClick={closeMobileMenu}
                                    className="flex items-center gap-4 p-4 text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-2xl transition-all duration-300 group border border-cyan-500/20"
                                >
                                    <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <User className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white">Админ-панель</h3>
                                        <p className="text-sm text-slate-400">Управление контентом</p>
                                    </div>
                                </Link>
                            </nav>

                            {/* Дополнительная информация */}
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <div className="text-2xl font-bold text-orange-400">50+</div>
                                        <div className="text-xs text-slate-400">Статей</div>
                                    </div>
                                    <div className="p-3 bg-white/5 rounded-xl">
                                        <div className="text-2xl font-bold text-purple-400">10+</div>
                                        <div className="text-xs text-slate-400">Категорий</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Overlay для закрытия меню */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMobileMenu}
                        className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    />
                )}
            </AnimatePresence>
        </>
    );
}