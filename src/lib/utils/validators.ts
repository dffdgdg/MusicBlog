export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateSlug(slug: string): boolean {
  const slugRegex = /^[a-z0-9-]+$/;
  return slugRegex.test(slug);
}

export function validateTitle(title: string): { isValid: boolean; error?: string } {
  if (title.length < 5) {
    return { isValid: false, error: 'Заголовок должен содержать минимум 5 символов' };
  }
  if (title.length > 100) {
    return { isValid: false, error: 'Заголовок не должен превышать 100 символов' };
  }
  return { isValid: true };
}