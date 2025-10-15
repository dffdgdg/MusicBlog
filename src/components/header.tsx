// Файл: src/components/Header.tsx

"use client";

import Link from 'next/link';
import { useState } from 'react';
import type { Article } from '@/lib/data';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import Search from './Search';

export default function Header({ articles }: { articles: Article[] }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center bg-black/20 backdrop-blur-lg border-b border-white/10 rounded-b-xl">
                    <Link href="/" onClick={closeMobileMenu} className="text-2xl font-bold tracking-tight text-orange-500">
                         Project Name
                    </Link>
                    
                    {/* --- Версия для ПК --- */}
                    <div className="hidden md:block w-full max-w-md">
                        <Search articles={articles} />
                    </div>
                    <div className="hidden md:flex space-x-6 text-gray-300 items-center">
                        <Link href="/#collections" className="hover:text-white transition-colors">Подборки</Link>
                        <Link href="/articles" className="hover:text-white transition-colors">Статьи</Link>
                    </div>

                    {/* --- Кнопка "Гамбургер" для мобильных --- */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* --- Выезжающее мобильное меню --- */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="md:hidden fixed inset-0 top-[69px] bg-gray-900/95 backdrop-blur-xl z-40 p-6"
                    >
                        <div className="space-y-8">
                            {/* Поиск для мобильной версии */}
                            <Search articles={articles} onLinkClick={closeMobileMenu} />

                            {/* Ссылки для мобильной версии */}
                            <nav className="flex flex-col space-y-4 border-t border-white/10 pt-6">
                                <Link href="/#collections" onClick={closeMobileMenu} className="text-gray-300 hover:text-white text-xl py-2">
                                    Подборки
                                </Link>
                                <Link href="/articles" onClick={closeMobileMenu} className="text-gray-300 hover:text-white text-xl py-2">
                                    Статьи
                                </Link>
                                <Link href="/admin" onClick={closeMobileMenu} className="text-gray-300 hover:text-white text-xl py-2 border-t border-white/10 mt-4 pt-4">
                                    Админ-панель
                                </Link>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}