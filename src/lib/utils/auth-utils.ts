import { getCurrentUser } from '@/lib/auth';
import { getArticleBySlugAction } from '@/lib/actions/articles';

export async function isArticleAuthor(articleSlug: string) {
  const user = await getCurrentUser();
  if (!user) return false;
  
  // Для админов - полный доступ
  if (user.role === 'admin') return true;
  
  // Для авторов - проверяем владение статьей
  const article = await getArticleBySlugAction(articleSlug);
  return article?.author.name === user.name;
}

export function canAccessAuthorPanel(user: any) {
  return user?.role === 'author' || user?.role === 'admin';
}