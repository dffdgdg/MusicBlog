// Файл: src/app/admin/page.tsx

import { getAllArticles } from '@/lib/data';
import Link from 'next/link';
import { Eye, Edit, Calendar, Clock, Tag, BarChart3, Plus, Users, FileText, ArrowRight } from 'lucide-react';
import AdminArticleControls from '@/components/AdminArticleControls';

export default async function AdminDashboardPage() {
    const articles = await getAllArticles();

    // Статистика
    const totalArticles = articles.length;
    const recentArticles = articles.slice(0, 5);
    const categories = [...new Set(articles.map(a => a.category))];
    const totalReadingTime = articles.reduce((acc, article) => acc + article.readingTime, 0);
    const uniqueAuthors = new Set(articles.map(a => a.author.name)).size;

    return (
        <div className="space-y-8">
            {/* Заголовок и действия */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                        <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                            Панель управления
                        </span>
                    </h1>
                    <p className="text-slate-400">
                        Обзор статистики и управление контентом
                    </p>
                </div>
                
                <Link
                    href="/admin/add"
                    className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 hover:from-orange-400 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
                >
                    <Plus className="w-5 h-5" />
                    Новая статья
                </Link>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-2xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Всего статей</p>
                            <p className="text-2xl font-bold text-white">{totalArticles}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Tag className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Категорий</p>
                            <p className="text-2xl font-bold text-white">{categories.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Clock className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Часов контента</p>
                            <p className="text-2xl font-bold text-white">
                                {Math.round(totalReadingTime / 60)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-slate-400 text-sm">Авторов</p>
                            <p className="text-2xl font-bold text-white">{uniqueAuthors}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Быстрые действия */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                    href="/admin/add"
                    className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl hover:border-orange-500/40 transition-all duration-300 group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Plus className="w-5 h-5 text-orange-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Новая статья</h3>
                                <p className="text-slate-400 text-sm">Создать новую статью</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                </Link>

                <Link
                    href="/admin/analytics"
                    className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl hover:border-purple-500/40 transition-all duration-300 group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Аналитика</h3>
                                <p className="text-slate-400 text-sm">Статистика просмотров</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                </Link>

                <Link
                    href="/admin/categories"
                    className="p-6 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20 rounded-2xl hover:border-cyan-500/40 transition-all duration-300 group"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Tag className="w-5 h-5 text-cyan-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Категории</h3>
                                <p className="text-slate-400 text-sm">Управление категориями</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                </Link>
            </div>

            {/* Список статей */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Последние статьи</h2>
                    <span className="text-slate-400 text-sm">
                        Показано {Math.min(recentArticles.length, 5)} из {totalArticles}
                    </span>
                </div>

                {recentArticles.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-slate-300 mb-2">Статей пока нет</h3>
                        <p className="text-slate-400 mb-6">Создайте свою первую статью</p>
                        <Link
                            href="/admin/add"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-purple-500 text-white font-semibold px-6 py-3 rounded-2xl hover:shadow-lg transition-all duration-300"
                        >
                            <Plus className="w-5 h-5" />
                            Создать статью
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recentArticles.map(article => (
                            <div 
                                key={article.slug}
                                className="group bg-white/5 hover:bg-white/10 border-2 border-orange-500/20 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                    {/* Информация о статье */}
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-3">
                                            <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-semibold border border-cyan-500/30">
                                                {article.category}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                                                article.level === 'Начальный' 
                                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                    : article.level === 'Средний'
                                                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                                                    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                            }`}>
                                                {article.level}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                                            {article.title}
                                        </h3>

                                        <p className="text-slate-300 mb-4 line-clamp-2">
                                            {article.excerpt}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {article.publishedDate}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {article.readingTime} мин
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Users className="w-4 h-4" />
                                                {article.author.name}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Управление */}
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/articles/${article.slug}`}
                                            target="_blank"
                                            className="p-2 text-slate-400 hover:text-green-400 hover:bg-green-500/10 rounded-xl transition-all duration-300"
                                            title="Просмотреть"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </Link>

                                        <Link
                                            href={`/admin/edit/${article.slug}`}
                                            className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
                                            title="Редактировать"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </Link>

                                        <AdminArticleControls slug={article.slug} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Кнопка "Показать все" если статей много */}
                {totalArticles > 5 && (
                    <div className="text-center pt-6">
                        <Link
                            href="/admin/all-articles"
                            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-semibold transition-colors group"
                        >
                            Показать все статьи ({totalArticles})
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}