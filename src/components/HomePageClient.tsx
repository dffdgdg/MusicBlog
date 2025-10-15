// Файл: src/components/HomePageClient.tsx

"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Article } from "@/lib/data"; // Импортируем только тип

const topicCollections = [
    { title: "Первые шаги в Ableton Live", description: "Разбираемся с интерфейсом и создаем первый бит с нуля.", slug: "/collections/first-beat", tags: ["DAW", "Практика"] },
    { title: "Теория музыки для электронщиков", description: "Только то, что действительно нужно для написания мелодий.", slug: "/collections/music-theory", tags: ["Теория", "Гармония"] }
];

export default function HomePageClient({ latestArticles }: { latestArticles: Article[] }) {
    const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }};

    return (
        <div>
            <section className="text-center container mx-auto px-6 pt-24 md:pt-32 pb-16">
                <motion.h1 variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
                    Создавай музыку осознанно
                </motion.h1>
                <motion.p variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="max-w-3xl mx-auto text-lg text-gray-300 mb-10 leading-relaxed">
                    Практичные статьи, понятные объяснения и реальные примеры — всё, что нужно для уверенного старта.
                </motion.p>
                <motion.a href="#collections" variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="btn-primary">
                    Начать изучение
                </motion.a>
            </section>
            
            <section id="collections" className="container mx-auto px-6 py-16">
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-4xl font-bold mb-10 text-center">
                    С чего начать?
                </motion.h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {topicCollections.map((path, i) => (
                        <motion.div key={path.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ delay: i * 0.1 }}>
                            <Link href={path.slug} className="group block p-8 rounded-2xl border transition-all duration-300 bg-white/5 backdrop-blur-md border-orange-500/30 hover:border-orange-500/60 hover:bg-white/10 transform hover:-translate-y-2 h-full">
                                <h3 className="text-3xl font-bold mb-2">{path.title}</h3>
                                <p className="text-gray-300 mb-4">{path.description}</p>
                                <div className="flex justify-between items-center mt-auto">
                                    <div className="flex gap-2">{path.tags.map((tag) => <span key={tag} className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full">{tag}</span>)}</div>
                                    <span className="font-semibold text-orange-400 flex items-center gap-2 transition-transform duration-300 group-hover:gap-3">
                                        Перейти <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
            
            <section className="container mx-auto px-6 py-16">
                <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} className="text-4xl font-bold mb-10 text-center">
                    Свежие статьи
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestArticles.slice(0, 3).map((article, i) => (
                        <motion.div key={article.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ delay: i * 0.2 }}>
                            <Link href={`/articles/${article.slug}`} className="group block p-6 rounded-2xl border bg-white/5 backdrop-blur-md hover:bg-white/10 hover:-translate-y-1 transition-all h-full">
                                <p className="text-sm font-semibold text-cyan-400 mb-2">{article.category}</p>
                                <h3 className="text-xl font-bold mb-3">{article.title}</h3>
                                <span className="font-semibold text-gray-300 flex items-center gap-2 transition-transform duration-300 group-hover:text-orange-400 group-hover:gap-3 mt-auto">
                                    Читать <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
                 <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} transition={{ delay: 0.4 }} className="text-center mt-12">
                    <Link href="/articles" className="text-lg font-semibold text-orange-400 hover:text-orange-300 transition-colors">
                        Смотреть все статьи &rarr;
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}