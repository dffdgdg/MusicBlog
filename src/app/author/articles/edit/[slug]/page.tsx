// src/app/author/articles/edit/[slug]/page.tsx
import ArticleForm from '@/components/forms/article-form';
import { getArticleBySlugAction } from '@/lib/actions/articles';
import { notFound } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

async function EditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticleBySlugAction(slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-20">
            <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-8">
                        <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
                            Редактировать статью
                        </span>
                    </h1>
                    <ArticleForm initialData={article} />
                </div>
            </div>
        </div>
    );
}

export default function ProtectedEditArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    return (
        <ProtectedRoute requiredRole="author">
            <EditArticlePage params={params} />
        </ProtectedRoute>
    );
}