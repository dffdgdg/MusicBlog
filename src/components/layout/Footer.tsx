"use client";

import Link from 'next/link';
import { Send, Mail, Music, Headphones, Mic2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []);

    return (
        <footer className="bg-gradient-to-t from-gray-900 to-black border-t border-orange-500/20">
            <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-16">
                {/* Основные 3 колонки */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                  
                    {/* Колонка 1: Бренд и описание */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-black tracking-tight">
                                <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                    СоздайМузыку
                                </span>
                            </h2>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Бесплатная база знаний для начинающих музыкантов. От идеи до готового трека. 
                            Практичные руководства, понятные объяснения и реальные примеры.
                        </p>
                    </div>

                    {/* Колонка 2: Навигация */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                            <Music className="w-5 h-5 text-orange-400" />
                            Навигация
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="footer-link group">
                                    <span className="group-hover:text-orange-400 transition-colors">Главная</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/articles" className="footer-link group">
                                    <span className="group-hover:text-purple-400 transition-colors">Все статьи</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/collections" className="footer-link group">
                                    <span className="group-hover:text-cyan-400 transition-colors">Подборки</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#video" className="footer-link group">
                                    <span className="group-hover:text-green-400 transition-colors">Видео</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="footer-link group">
                                    <span className="group-hover:text-orange-400 transition-colors">Контакты</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Колонка 3: Подписка */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-white text-lg flex items-center gap-2">
                            <Mic2 className="w-5 h-5 text-cyan-400" />
                            Будь в курсе
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                            Получайте лучшие материалы и анонсы новых статей. Без спама, только полезное.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full bg-white/5 border-2 border-orange-500/20 rounded-2xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 transition-all duration-300"
                                suppressHydrationWarning={true}
                            />
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Send size={18} />
                                Подписаться
                            </button>
                        </form>
                    </div>
                </div>

                {/* Нижняя строка с копирайтом */}
                <div className="mt-16 pt-8 border-t border-orange-500/20">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-slate-400 text-sm">
                            <p>&copy; {currentYear} СоздайМузыку. Сделано с ❤️ для сообщества музыкантов.</p>
                        </div>
                        
                        <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="text-slate-400 hover:text-orange-400 transition-colors">
                                Политика конфиденциальности
                            </Link>
                            <Link href="/terms" className="text-slate-400 hover:text-purple-400 transition-colors">
                                Условия использования
                            </Link>
                            <Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                                Контакты
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}