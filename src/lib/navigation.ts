export class NavigationService {
  static getArticleFormRedirect(currentPath: string): string {
    if (currentPath.includes('/author/articles/new') || currentPath.includes('/author/articles/edit')) {
      return '/author/articles';
    } else if (currentPath.includes('/admin/add') || currentPath.includes('/admin/edit')) {
      return '/admin';
    }
    return '/articles';
  }

  static getArticleDeleteRedirect(currentPath: string): string {
    if (currentPath.includes('/author')) {
      return '/author/articles';
    } else if (currentPath.includes('/admin')) {
      return '/admin';
    }
    return '/articles';
  }

  static getBaseRoute(currentPath: string): 'author' | 'admin' | 'public' {
    if (currentPath.includes('/author')) return 'author';
    if (currentPath.includes('/admin')) return 'admin';
    return 'public';
  }
}