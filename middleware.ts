// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Пропускаем все публичные маршруты
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname.startsWith('/articles') ||
      request.nextUrl.pathname.startsWith('/contact') ||
      request.nextUrl.pathname.startsWith('/privacy') ||
      request.nextUrl.pathname.startsWith('/terms')) {
    return NextResponse.next();
  }

  // Получаем токен из cookies (если используете)
  const token = request.cookies.get('auth-token');
  
  // Для демо-версии пропускаем все запросы
  // В реальном приложении здесь будет проверка JWT токена
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/author/:path*'
  ]
};