"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- ДАННЫЕ ---
const topicCollections = [
  {
    title: "Первые шаги в Ableton Live",
    description: "Разбираемся с интерфейсом и создаем первый бит с нуля.",
    slug: "/collections/first-beat",
    tags: ["DAW", "Практика"],
  },
  {
    title: "Теория музыки для электронщиков",
    description:
      "Только то, что действительно нужно для написания мелодий и гармоний.",
    slug: "/collections/music-theory",
    tags: ["Теория", "Гармония"],
  },
];

const spotlightArticle = {
  slug: "mixing-fundamentals",
  title: "Большой гид по сведению для начинающих",
  excerpt:
    "Все ключевые техники в одной статье: от баланса и панорамы до основ эквализации и компрессии.",
  category: "Сведение",
};

const popularArticles = [
  { slug: "songwriting-inspiration", title: "Где искать вдохновение, когда его нет?" },
  { slug: "vocal-processing-101", title: "5 шагов к чистому вокалу" },
  { slug: "sound-synthesis-basics", title: "Основы синтеза: из чего состоит звук?" },
];

const allArticles = [spotlightArticle, ...popularArticles];

// --- ГЛАВНАЯ СТРАНИЦА ---
export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof allArticles>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      const filtered = allArticles.filter((article) =>
        article.title.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsResultsVisible(true);
    } else {
      setIsResultsVisible(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsResultsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Анимационные пресеты ---
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <main className="pt-24 md:pt-32">
        {/* --- HERO --- */}
        <section className="relative text-center container mx-auto px-6 py-24 md:py-32">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-300 text-transparent bg-clip-text"
          >
            Учись создавать музыку с нуля
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-3xl mx-auto text-lg text-gray-300 mb-10 leading-relaxed"
          >
            Практичные статьи, понятные объяснения и реальные примеры —
            всё, что нужно начинающему продюсеру.
          </motion.p>

          <motion.a
            href="#collections"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full text-lg inline-block transform hover:scale-105 transition-transform"
          >
            Начать изучение
          </motion.a>
        </section>

        {/* Разделитель */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1.2 }}
          className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-20"
        ></motion.div>

        {/* --- 1. Подборки для старта --- */}
        <section id="collections" className="container mx-auto px-6 py-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-10 text-center"
          >
            С чего начать?
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {topicCollections.map((path, i) => (
              <motion.div
                key={path.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.7 }}
              >
                <Link
                  href={path.slug}
                  className="block p-8 rounded-2xl border transition-all duration-300 bg-white/5 backdrop-blur-md border-orange-500/30 hover:border-orange-500/60 hover:bg-white/10 transform hover:-translate-y-2"
                >
                  <h3 className="text-3xl font-bold mb-2">{path.title}</h3>
                  <p className="text-gray-300 mb-4">{path.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-2">
                      {path.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="font-semibold text-orange-400">
                      Перейти →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- 3. Свежие статьи --- */}
        <section className="container mx-auto px-6 py-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-10 text-center"
          >
            Свежие статьи
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allArticles.slice(0, 3).map((article, i) => (
              <motion.div
                key={article.slug}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
              >
                <Link
                  href={`/articles/${article.slug}`}
                  className="block p-6 rounded-2xl border bg-white/5 backdrop-blur-md hover:bg-white/10 hover:-translate-y-2 transition-all"
                >
                  <h3 className="text-2xl font-bold mb-3">{article.title}</h3>
                  <span className="font-semibold text-orange-400">
                    Читать →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- О проекте --- */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 py-20 text-center max-w-6xl"
        >
          <h2 className="text-4xl font-bold mb-6">О проекте</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Этот сайт создан для тех, кто только начинает свой путь в музыке.
            Здесь вы найдете понятные объяснения, реальные примеры и вдохновение —
            всё, чтобы уверенно двигаться от первых шагов к собственным трекам.
          </p>
        </motion.section>
      </main>

      {/* --- FOOTER --- */}
      <motion.footer
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1.2 }}
        className="text-center py-12 mt-12 border-t border-white/10"
      >
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-bold mb-3">Присоединяйтесь к сообществу</h3>
          <p className="text-gray-400 mb-6">
            Получайте лучшие материалы и новые статьи каждую неделю.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Ваш email"
              className="w-full bg-gray-900/50 border border-white/20 rounded-full px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              Подписаться
            </button>
          </form>
        </div>
      </motion.footer>
    </>
  );
}
