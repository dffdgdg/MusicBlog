// Файл: src/lib/validations/article.ts
import { z } from 'zod';

export const articleSchema = z.object({
    title: z.string().min(5, "Заголовок должен содержать минимум 5 символов")
                  .max(100, "Заголовок не должен превышать 100 символов"),
    slug: z.string().regex(/^[a-z0-9-]+$/, "Slug может содержать только латинские буквы, цифры и дефисы"),
    excerpt: z.string().min(50, "Описание должно содержать минимум 50 символов")
                     .max(200, "Описание не должно превышать 200 символов"),
    category: z.string().min(1, "Выберите категорию"),
    content: z.string().min(100, "Содержание должно содержать минимум 100 символов"),
    readingTime: z.number().min(1, "Время чтения должно быть не менее 1 минуты")
                          .max(60, "Время чтения не должно превышать 60 минут"),
    level: z.enum(['Начальный', 'Средний', 'Продвинутый']),
    tags: z.array(z.string()).max(10, "Не более 10 тегов")
});

export type ArticleFormData = z.infer<typeof articleSchema>;