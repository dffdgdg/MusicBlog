import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function AuthorLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="author">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-orange-900/10">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}