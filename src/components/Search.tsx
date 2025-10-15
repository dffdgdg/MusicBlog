// Файл: src/components/Search.tsx

"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Article } from '@/lib/data';

// Компонент принимает статьи и функцию для закрытия мобильного меню
export default function Search({ articles, onLinkClick }: { articles: Article[], onLinkClick?: () => void }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Article[]>([]);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.trim().length > 1) {
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
    }, []);
    
    // Функция, которая будет вызвана при клике на результат поиска
    const handleResultClick = () => {
        setIsResultsVisible(false);
        setSearchQuery(''); // Очищаем поиск
        onLinkClick?.(); // Вызываем onLinkClick, если он был передан (для закрытия моб. меню)
    };

    return (
        <div ref={searchContainerRef} className="relative w-full">
            <input 
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                onFocus={() => searchQuery.trim().length > 1 && setIsResultsVisible(true)}
                placeholder="Поиск статей..."
                className="w-full bg-gray-800/80 border border-white/10 rounded-full py-2 px-5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
            />
            {isResultsVisible && (
                <div className="absolute top-full mt-2 w-full bg-gray-800/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg overflow-hidden z-10">
                    {searchResults.length > 0 ? (
                        <div className="p-2 space-y-1 max-h-80 overflow-y-auto">
                            {searchResults.map(article => (
                                <Link 
                                    key={article.slug} 
                                    href={`/articles/${article.slug}`} 
                                    onClick={handleResultClick}
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
    );
}