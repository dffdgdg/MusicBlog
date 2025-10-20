// Файл: src/components/ArticleCard.tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  date?: string;
  category?: string;
}

interface ArticleCardProps {
  article: Article;
  viewMode: 'grid' | 'list';
  index: number;
}

export const ArticleCard = ({ article, viewMode, index }: ArticleCardProps) => {
  const formattedDate = article.date
    ? new Date(article.date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      })
    : '';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: 'easeOut',
      }}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 shadow-md hover:shadow-xl border border-slate-700 transition-all duration-300
        ${viewMode === 'list' ? 'flex items-center gap-6 p-4' : 'p-5 flex flex-col'}
      `}
    >
      {/* Thumbnail */}
      {article.image && (
        <div
          className={`relative overflow-hidden rounded-xl ${
            viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'w-full h-48 mb-4'
          }`}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          {article.category && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-500/20 text-orange-400">
              {article.category}
            </span>
          )}
          {formattedDate && (
            <div className="flex items-center text-xs text-slate-400">
              <Calendar className="w-3 h-3 mr-1" />
              {formattedDate}
            </div>
          )}
        </div>

        <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="text-slate-400 text-sm line-clamp-3">
            {article.excerpt}
          </p>
        )}

        <Link
          href={`/articles/${article.slug}`}
          className="mt-4 inline-flex items-center text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
        >
          Читать
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
};
