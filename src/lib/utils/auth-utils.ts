import { getCurrentUser } from '@/lib/auth';
import { getArticleBySlugAction } from '@/lib/actions/articles';
import type { User } from '@/types/auth';

export async function isArticleAuthor(articleSlug: string) 
{
  const user = await getCurrentUser();
  if (!user) return false;
  
  if (user.role === 'admin') return true;
  
  const article = await getArticleBySlugAction(articleSlug);
  return article?.author.name === user.name;
}

export function canAccessAuthorPanel(user: User | null) 
{
    return user?.role === 'author' || user?.role === 'admin';
}