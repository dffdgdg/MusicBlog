// Файл: src/components/Header.tsx

"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

// Шаг 1: Импортируем только ТИП Article, а не данные
import type { Article } from '@/lib/data';

// Шаг 2: Компонент теперь принимает массив статей как пропс
export default function Header({ articles }: { articles: Article[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.trim().length > 1) {
      // Шаг 3: Логика фильтрации теперь работает с массивом из пропсов
      const filtered = articles.filter(article => 
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
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsResultsVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center bg-black/20 backdrop-blur-lg border-b border-white/10 rounded-b-xl">
        <Link href="/" className="text-2xl font-bold tracking-tight text-orange-500">Project title</Link>
        
        <div ref={searchContainerRef} className="relative w-full max-w-md hidden md:block">
          <input 
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => searchQuery.trim().length > 1 && setIsResultsVisible(true)}
            placeholder="Поиск статей..."
            className="w-full bg-gray-800/80 border border-white/10 rounded-full py-2 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
          />
          {isResultsVisible && (
            <div className="absolute top-full mt-2 w-full bg-gray-800/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden">
              {searchResults.length > 0 ? (
                <div className="p-2 space-y-1">
                  {searchResults.map(article => (
                    <Link 
                      key={article.slug} 
                      href={`/articles/${article.slug}`} 
                      onClick={() => setIsResultsVisible(false)}
                      className="block p-3 rounded-lg hover:bg-orange-500/10 transition-colors"
                    >
                      <p className="font-semibold text-white">{article.title}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-400 p-4">Ничего не найдено.</p>
              )}
            </div>
          )}
        </div>

        <div className="hidden md:flex space-x-6 text-gray-300 items-center">
          <Link href="/#collections" className="hover:text-white transition-colors">Подборки</Link>
          <Link href="/articles" className="hover:text-white transition-colors">Статьи</Link>
        </div>
      </nav>
    </header>
  );
}