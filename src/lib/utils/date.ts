export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  };
  
  return new Date(date).toLocaleDateString('ru-RU', { ...defaultOptions, ...options });
};

export const getReadingTime = (content: string): number => {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / 200) || 1;
};