import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; 

export async function middleware(request: NextRequest) {
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

  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  try {
    const decoded = await verifyToken(token); 
    
    if (!decoded) {
      return NextResponse.redirect(new URL('/auth', request.url));
    }
    
    const userRole = decoded.role;
    
    if (request.nextUrl.pathname.startsWith('/admin') && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (request.nextUrl.pathname.startsWith('/author') && 
        !['author', 'admin'].includes(userRole)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}