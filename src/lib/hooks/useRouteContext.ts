"use client";

import { usePathname } from 'next/navigation';

export function useRouteContext() {
  const pathname = usePathname();
  
  const getRedirectPath = () => {
    if (pathname.includes('/author')) {
      return '/author/articles';
    } else if (pathname.includes('/admin')) {
      return '/admin';
    } else {
      return '/articles';
    }
  };

  const getBasePath = () => {
    if (pathname.includes('/author')) return '/author';
    if (pathname.includes('/admin')) return '/admin';
    return '';
  };

  return {
    isAuthorRoute: pathname.includes('/author'),
    isAdminRoute: pathname.includes('/admin'),
    isPublicRoute: !pathname.includes('/author') && !pathname.includes('/admin'),
    getRedirectPath,
    getBasePath
  };
}