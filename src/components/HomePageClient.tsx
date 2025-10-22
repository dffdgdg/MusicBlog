// Файл: src/components/HomePageClient.tsx

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { Article } from "@/lib/data"; 

const topicCollections = [
    { 
        title: "Первые шаги в Ableton Live", 
        description: "Разбираемся с интерфейсом и создаем первый бит с нуля. От идеи до готового трека.", 
        slug: "/collections/first-beat", 
        tags: ["DAW", "Практика"],
        icon: "🎛️"
    },
    { 
        title: "Теория музыки для электронщиков", 
        description: "Только то, что действительно нужно для написания мелодий. Без лишней теории.", 
        slug: "/collections/music-theory", 
        tags: ["Теория", "Гармония"],
        icon: "🎵"
    }
];

// ID ролика из Rutube
const introVideoId = "76ae2d198cbf010c185243a4123bbc81";

export default function HomePageClient({ latestArticles }: { latestArticles: Article[] }) {
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
    
    const [activeSection, setActiveSection] = useState('hero');
    const [videoStarted, setVideoStarted] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Эффект параллакса для мыши
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Инициализация рефов для секций
    useEffect(() => {
        sectionsRef.current = {
            'hero': document.getElementById('hero'),
            'video': document.getElementById('video'),
            'collections': document.getElementById('collections'),
            'articles': document.getElementById('articles')
        };
    }, []);

    // Отслеживаем скролл для активной секции
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 3;
            
            const sections = ['hero', 'video', 'collections', 'articles'];
            let currentSection = 'hero';

            for (const section of sections) {
                const element = sectionsRef.current[section];
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;
                    
                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        currentSection = section;
                        break;
                    }
                }
            }

            setActiveSection(currentSection);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleVideoStart = () => {
        setVideoStarted(true);
    };

    const handleVideoPreviewClick = () => {
        setVideoStarted(true);
        setTimeout(() => {
            iframeRef.current?.focus();
        }, 100);
    };

    // Анимация появления элементов с задержкой
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
        <div className="relative overflow-hidden">
            {/* Улучшенный анимированный фон */}
            <div className="fixed inset-0 -z-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/80 to-orange-900/40"></div>
                <motion.div 
                    className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"
                    animate={{
                        x: mousePosition.x * 0.5,
                        y: mousePosition.y * 0.5,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                    }}
                />
                <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                    animate={{
                        x: -mousePosition.x * 0.3,
                        y: -mousePosition.y * 0.3,
                        scale: [1.1, 1, 1.1]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        delay: 1
                    }}
                />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Улучшенная интерактивная навигация */}
            <motion.div 
                className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 items-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                {['hero', 'video', 'collections', 'articles'].map((section) => {
                    const isActive = activeSection === section;
                    return (
                        <motion.button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className="group relative flex items-center justify-center"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.4 : 1,
                                    backgroundColor: isActive ? '#fb923c' : 'rgba(255,255,255,0.2)',
                                    width: isActive ? '12px' : '8px',
                                    height: isActive ? '12px' : '8px'
                                }}
                                className="rounded-full transition-all duration-300 relative"
                            >
                                {isActive && (
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.5, 1],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                        className="absolute inset-0 rounded-full bg-orange-400 -m-1"
                                    />
                                )}
                            </motion.div>
                            
                            {/* Tooltip */}
                            <div className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    {section === 'hero' && 'Главная'}
                                    {section === 'video' && 'Видео'}
                                    {section === 'collections' && 'Курсы'}
                                    {section === 'articles' && 'Статьи'}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* HERO SECTION */}
            <section
                id="hero"
                className="container mx-auto px-6 lg:px-12 xl:px-20 py-32 md:py-48 text-center relative"
            >
                {/* Декоративные элементы */}
                <div className="absolute top-20 left-10 w-2 h-2 bg-orange-400 rounded-full opacity-60 animate-pulse" />
                <div className="absolute bottom-40 right-16 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-20 w-1 h-1 bg-cyan-400 rounded-full opacity-80 animate-pulse delay-500" />

                <motion.div
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                    className="max-w-5xl mx-auto"
                >
                    <motion.h1
                        variants={fadeUp}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8"
                    >
                        <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            Создавай музыку
                        </span>
                        <br />
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-6xl lg:text-7xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                        >
                            осознанно
                        </motion.span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        className="max-w-3xl mx-auto text-lg md:text-xl text-slate-200 mb-12 leading-relaxed"
                    >
                        Практичные статьи, понятные объяснения и реальные примеры — 
                        всё, что нужно для уверенного старта в мире музыки.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <motion.a
                            href="#collections"
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(251, 146, 60, 0.3)"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 text-lg"
                        >
                            Начать изучение
                        </motion.a>
                        <motion.a
                            href="#video"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border border-orange-500/50 text-orange-400 hover:bg-orange-500/10 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 text-lg"
                        >
                            Смотреть видео
                        </motion.a>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-6 h-10 border-2 border-orange-400 rounded-full flex justify-center"
                        >
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-1 h-3 bg-orange-400 rounded-full mt-2"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>

            {/* VIDEO SECTION */}
            <section
                id="video"
                className="container mx-auto px-6 lg:px-12 xl:px-20 py-28 relative"
            >
                {/* УБРАН проблемный градиентный разделитель */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-center mb-20"
                >
                    <motion.h2 
                        className="text-4xl md:text-6xl font-black mb-6"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 30 }}
                    >
                        <span className="bg-gradient-to-r from-orange-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Приветствие от автора
                        </span>
                    </motion.h2>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Узнайте о философии проекта и как извлечь максимум пользы из материалов
                    </p>
                </motion.div>

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-6xl mx-auto relative group"
                >
                    <div className="relative rounded-3xl overflow-hidden border-2 border-orange-500/30 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl shadow-2xl">
                        {/* Hover эффекты */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
                        
                        {/* Превью */}
                        <AnimatePresence>
                            {!videoStarted && (
                                <motion.div
                                    initial={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    onClick={handleVideoPreviewClick}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black/60 to-black/40 cursor-pointer z-10 transition-all duration-500 group-hover:bg-black/30"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-24 h-24 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-2xl"
                                    >
                                        <svg
                                            className="w-12 h-12 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </motion.div>
                                    <motion.p
                                        initial={{ opacity: 0.8 }}
                                        whileHover={{ opacity: 1 }}
                                        className="text-white font-bold text-xl"
                                    >
                                        Смотреть приветствие
                                    </motion.p>
                                    <p className="text-orange-300 mt-2 text-sm">
                                        Длительность: 2 минуты
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <iframe
                            ref={iframeRef}
                            src={`https://rutube.ru/play/embed/${introVideoId}${videoStarted ? "?autoplay=1" : ""}`}
                            className="w-full aspect-video transition-all duration-700 group-hover:scale-[1.01]"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Вступительное видео от автора"
                            onLoad={handleVideoStart}
                        />
                    </div>
                </motion.div>
            </section>

            {/* COLLECTIONS SECTION */}
            <section
                id="collections"
                className="container mx-auto px-6 lg:px-12 xl:px-20 py-28 relative"
            >
                {/* УБРАН проблемный градиентный разделитель */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent">
                            С чего начать?
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Выберите подходящий путь обучения. Мы подготовили структурированные материалы для быстрого старта.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {topicCollections.map((collection, i) => (
                        <motion.div
                            key={collection.slug}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: i * 0.2 }}
                            className="group"
                        >
                            <Link
                                href={collection.slug}
                                className="block p-10 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full relative overflow-hidden"
                            >
                                {/* Анимированный фон */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                
                                {/* Иконка */}
                                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {collection.icon}
                                </div>

                                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">
                                    {collection.title}
                                </h3>
                                
                                <p className="text-slate-300 mb-8 leading-relaxed text-lg">
                                    {collection.description}
                                </p>
                                
                                <div className="flex justify-between items-center mt-auto pt-8 border-t border-white/10">
                                    <div className="flex gap-3">
                                        {collection.tags.map((tag) => (
                                            <span 
                                                key={tag} 
                                                className="px-4 py-2 bg-slate-800/50 text-slate-300 rounded-full text-sm border border-slate-700/50 group-hover:border-orange-500/30 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <motion.span 
                                        className="font-bold text-orange-400 flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                                        whileHover={{ x: 5 }}
                                    >
                                        Начать
                                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </motion.span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ARTICLES SECTION */}
            <section
                id="articles"
                className="container mx-auto px-6 lg:px-12 xl:px-20 py-28 relative"
            >
                {/* УБРАН проблемный градиентный разделитель */}

                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-orange-400 bg-clip-text text-transparent">
                            Свежие статьи
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                        Актуальные материалы по созданию музыки, звуковому дизайну и продюссированию
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerChildren}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
                >
                    {latestArticles.slice(0, 3).map((article, i) => (
                        <motion.article
                            key={article.slug}
                            variants={fadeUp}
                            custom={i}
                            className="group"
                        >
                            <Link
                                href={`/articles/${article.slug}`}
                                className="block h-full p-8 rounded-3xl border-2 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border-orange-500/20 hover:border-orange-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
                            >
                                {/* Анимированный фон */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-orange-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Категория */}
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
                                        {article.category}
                                    </span>
                                    <motion.span 
                                        className="text-slate-400 text-sm flex items-center gap-1"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                                        </svg>
                                        {article.readingTime + ' мин' || '5 мин'}
                                    </motion.span>
                                </div>

                                {/* Заголовок */}
                                <h3 className="text-2xl font-bold mb-4 text-white leading-tight group-hover:text-orange-400 transition-colors line-clamp-2">
                                    {article.title}
                                </h3>

                                {/* Уровень сложности */}
                                <div className="flex items-center gap-2 mb-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                        article.level === 'Начальный' 
                                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                            : article.level === 'Продвинутый'
                                            ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                    }`}>
                                        {article.level || 'Начальный'}
                                    </span>
                                </div>

                                {/* Описание */}
                                {article.excerpt && (
                                    <p className="text-slate-300 mb-6 line-clamp-3 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                )}

                                {/* Кнопка */}
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
                    ))}
                </motion.div>

                {/* Кнопка "все статьи" */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <Link
                        href="/articles"
                        className="inline-flex items-center gap-3 text-lg font-bold text-orange-400 hover:text-orange-300 transition-colors group"
                    >
                        Смотреть все статьи
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="group-hover:translate-x-2 transition-transform duration-300"
                        >
                            →
                        </motion.span>
                    </Link>
                </motion.div>
            </section>

            {/* CTA SECTION */}
            <section className="container mx-auto px-6 lg:px-12 xl:px-20 py-20">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center p-12 rounded-3xl bg-gradient-to-br from-orange-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl border border-orange-500/30"
                >
                    <h2 className="text-3xl md:text-5xl font-black mb-6">
                        <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                            Готовы начать?
                        </span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                        Присоединяйтесь к сообществу музыкантов и начните свой путь в мире звука
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <Link
                            href="/articles"
                            className="bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-bold px-12 py-4 rounded-2xl shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 text-lg"
                        >
                            Начать обучение
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}