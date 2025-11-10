// src/app/debug-auth/page.tsx
"use client";

import { useAuthStore } from '@/stores/auth-store';

export default function DebugAuthPage() {
  const { user, isAuthenticated, hasPermission } = useAuthStore();
  
  return (
    <div className="min-h-screen pt-20 p-8">
      <h1 className="text-2xl font-bold text-white mb-4">Отладка авторизации</h1>
      <div className="bg-white/5 p-6 rounded-2xl">
        <pre className="text-white">
          {JSON.stringify({
            user,
            isAuthenticated,
            permissions: {
              reader: hasPermission('reader'),
              author: hasPermission('author'),
              admin: hasPermission('admin')
            }
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
}