// Файл: src/components/Footer.tsx

"use client"; 

import Link from 'next/link';
import { Youtube, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []); 

    return (
    <footer className="bg-gray-950 border-t border-white/10">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  
                    {/* 1. Блок с брендом и соцсетями */}
                    <div className="md:col-span-4">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-orange-500">
                             СоздайМузыку
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-xs">
                            Бесплатная база знаний для начинающих музыкантов. От идеи до готового трека.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-white transition-colors">
                                <Youtube size={24} />
                            </a>
                             <a href="#" aria-label="Telegram" className="text-gray-400 hover:text-white transition-colors">
                                <Send size={24} />
                            </a>
                        </div>
                    </div>

                    {/* 2. Навигационные колонки */}
                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-white tracking-wider">Навигация</h3>
                        <ul className="mt-4 space-y-3">
                            <li><Link href="/" className="footer-link">Главная</Link></li>
                            <li><Link href="/articles" className="footer-link">Все статьи</Link></li>
                            <li><Link href="/#collections" className="footer-link">Подборки</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="font-semibold text-white tracking-wider">Категории</h3>
                        <ul className="mt-4 space-y-3">
                            <li><a href="#" className="footer-link">Сведение</a></li>
                            <li><a href="#" className="footer-link">Сонграйтинг</a></li>
                            <li><a href="#" className="footer-link">Дизайн звука</a></li>
                            <li><a href="#" className="footer-link">Мастеринг</a></li>
                        </ul>
                    </div>

                    {/* 3. Блок подписки */}
                    <div className="md:col-span-4">
                        <h3 className="font-semibold text-white tracking-wider">Будь в курсе</h3>
                        <p className="mt-4 text-gray-400">
                            Получайте лучшие материалы и анонсы новых статей раз в неделю.
                        </p>
                        <form className="mt-4 flex gap-2">
                            <input
                                type="email"
                                placeholder="Ваш email"
                                className="w-full bg-gray-800/80 border border-white/10 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                suppressHydrationWarning={true}/>
                            <button
                                type="submit"
                                aria-label="Подписаться"
                                className="bg-orange-500 hover:bg-orange-600 text-white font-bold p-2.5 rounded-lg transition-colors"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Нижняя строка с копирайтом */}
                <div className="mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    <p>&copy; {currentYear} СоздайМузыку. Все права защищены.</p>
                </div>
            </div>
        </footer>
    );
}