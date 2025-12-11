import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; 

export function middleware(request: NextRequest) {
  // Публичные маршруты
  const publicPaths = [
    '/', '/api', '/articles', '/contact', 
    '/privacy', '/terms', '/auth'
  ];
  
  const isPublic = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(path)
  );
  
  if (isPublic) {
    return NextResponse.next();
  }

  // Проверка токена для защищенных маршрутов
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {
    // Декодируем и проверяем токен
    const decoded = verifyToken(token);
    const userRole = decoded.role;
    
    // Проверка прав для админ-панели
    if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Проверка прав для авторской панели
    if (request.nextUrl.pathname.startsWith('/author') && 
        !['author', 'admin'].includes(userRole)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
  } catch {
    // Невалидный токен
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}