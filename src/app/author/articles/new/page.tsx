import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import ArticleForm from '@/components/forms/article-form';

function NewArticlePage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-6 lg:px-12 xl:px-20 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-black text-white mb-8">
            <span className="bg-gradient-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent">
              Новая статья
            </span>
          </h1>
          <ArticleForm />
        </div>
      </div>
    </div>
  );
}

export default function ProtectedNewArticlePage() {
  return (
    <ProtectedRoute requiredRole="author">
      <NewArticlePage />
    </ProtectedRoute>
  );
}