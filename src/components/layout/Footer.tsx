"use client"; 

import Link from 'next/link';
import { Youtube, Send, Mail, Music, Headphones, Mic2 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() 
{
    const [currentYear, setCurrentYear] = useState('');

    useEffect(() => {
        setCurrentYear(new Date().getFullYear().toString());
    }, []); 

    return (
        <footer className="bg-gradient-to-t from-gray-900 to-black border-t border-orange-500/20">
            <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
                  
                    {/* 1. Блок с брендом и описанием */}
                    <div className="lg:col-span-4">
                        <Link href="/" className="inline-block">
                            <h2 className="text-3xl font-black tracking-tight">
                                <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                    СоздайМузыку
                                </span>
                            </h2>
                        </Link>
                        <p className="mt-4 text-slate-400 max-w-md leading-relaxed">
                            Бесплатная база знаний для начинающих музыкантов. От идеи до готового трека. 
                            Практичные руководства, понятные объяснения и реальные примеры.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a 
                                href="#" 
                                aria-label="YouTube" 
                                className="p-3 bg-white/5 hover:bg-orange-500/20 border border-orange-500/20 rounded-2xl text-slate-400 hover:text-orange-400 transition-all duration-300 hover:scale-110"
                            >
                                <Youtube size={20} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="Telegram" 
                                className="p-3 bg-white/5 hover:bg-blue-500/20 border border-blue-500/20 rounded-2xl text-slate-400 hover:text-blue-400 transition-all duration-300 hover:scale-110"
                                >
                                <Send size={20} />
                            </a>
                            <a 
                                href="#" 
                                aria-label="Email" 
                                className="p-3 bg-white/5 hover:bg-cyan-500/20 border border-cyan-500/20 rounded-2xl text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                            >
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* 2. Навигационные колонки */}
                    <div className="lg:col-span-2">
                        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
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
                                <Link href="/#collections" className="footer-link group">
                                    <span className="group-hover:text-cyan-400 transition-colors">Подборки</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/#video" className="footer-link group">
                                    <span className="group-hover:text-green-400 transition-colors">Видео</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                            <Headphones className="w-5 h-5 text-purple-400" />
                            Категории
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            <Link href="#" className="footer-link group">
                                <span className="group-hover:text-orange-400 transition-colors">Сведение</span>
                            </Link>
                            <Link href="#" className="footer-link group">
                                <span className="group-hover:text-purple-400 transition-colors">Сонграйтинг</span>
                            </Link>
                            <Link href="#" className="footer-link group">
                                <span className="group-hover:text-cyan-400 transition-colors">Саунд-дизайн</span>
                            </Link>
                            <Link href="#" className="footer-link group">
                                <span className="group-hover:text-green-400 transition-colors">Мастеринг</span>
                            </Link>
                            <Link href="#" className="footer-link group">
                                <span className="group-hover:text-yellow-400 transition-colors">Аранжировка</span>
                            </Link>
                            <Link href="#" className="footer-link group">
                                <span className="group-hover:text-blue-400 transition-colors">Вокал</span>
                            </Link>
                        </div>
                    </div>

                    {/* 3. Блок подписки */}
                    <div className="lg:col-span-3">
                        <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2">
                            <Mic2 className="w-5 h-5 text-cyan-400" />
                            Будь в курсе
                        </h3>
                        <p className="text-slate-400 mb-4 leading-relaxed">
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
                        <p className="text-xs text-slate-500 mt-3">
                            Подписываясь, вы соглашаетесь с нашей политикой конфиденциальности
                        </p>
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