"use client";

import Link from 'next/link';
import { Compass, Home, BookOpen, Search, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
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
                staggerChildren: 0.2
            }
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Общий фон как на главной */}
            <div className="fixed inset-0 -z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-32">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerChildren}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Анимированная иконка */}
                    <motion.div
                        variants={fadeUp}
                        className="mb-8"
                    >
                        <div className="relative inline-flex">
                            <div className="w-32 h-32 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center border-2 border-orange-500/30">
                                <Compass size={60} className="text-orange-400" />
                            </div>
                            <motion.div
                                animate={{ 
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{ 
                                    duration: 2, 
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                                className="absolute -top-4 -right-4 w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center border border-cyan-500/30"
                            >
                                <span className="text-2xl">❓</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Заголовок */}
                    <motion.h1
                        variants={fadeUp}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6"
                    >
                        <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            404
                        </span>
                    </motion.h1>

                    {/* Подзаголовок */}
                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl md:text-5xl font-bold text-white mb-6"
                    >
                        Страница потерялась в звуках
                    </motion.h2>

                    {/* Описание */}
                    <motion.p
                        variants={fadeUp}
                        className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Кажется, вы сбились с ритма. Эта страница не найдена, но у нас есть много 
                        других интересных материалов о создании музыки!
                    </motion.p>

                    {/* Действия */}
                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                    >
                        <Link 
                            href="/" 
                            className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/30 transition-all duration-300 group"
                        >
                            <Home size={20} className="group-hover:scale-110 transition-transform" />
                            <span>На главную</span>
                        </Link>
                        <Link 
                            href="/articles" 
                            className="flex items-center gap-3 bg-white/5 backdrop-blur-xl border-2 border-orange-500/20 hover:border-orange-500/50 text-slate-300 hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 group"
                        >
                            <BookOpen size={20} className="group-hover:scale-110 transition-transform" />
                            <span>Ко всем статьям</span>
                        </Link>
                    </motion.div>

                    {/* Дополнительная информация */}
                    <motion.div
                        variants={fadeUp}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto"
                    >
                        <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-orange-500/20">
                            <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <Search className="w-6 h-6 text-orange-400" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">Используйте поиск</h3>
                            <p className="text-slate-400 text-sm">
                                Найдите нужную статью через поиск в шапке сайта
                            </p>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/20">
                            <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <BookOpen className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">Изучайте статьи</h3>
                            <p className="text-slate-400 text-sm">
                                Более 50 материалов по созданию музыки
                            </p>
                        </div>

                        <div className="p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-cyan-500/20">
                            <div className="w-12 h-12 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                                <Music className="w-6 h-6 text-cyan-400" />
                            </div>
                            <h3 className="font-semibold text-white mb-2">Начните обучение</h3>
                            <p className="text-slate-400 text-sm">
                                Структурированные курсы для начинающих
                            </p>
                        </div>
                    </motion.div>

                    {/* Декоративные элементы */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-16 text-center"
                    >
                        <p className="text-slate-500 text-sm">
                            Если вы считаете, что это ошибка,{' '}
                            <a href="/contact" className="text-orange-400 hover:text-orange-300 underline transition-colors">
                                сообщите нам
                            </a>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}