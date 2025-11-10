import { z } from 'zod';

export const articleSchema = z.object({
    title: z.string()
        .min(5, "Заголовок должен содержать минимум 5 символов")
        .max(100, "Заголовок не должен превышать 100 символов"),
    slug: z.string()
        .regex(/^[a-z0-9-]+$/, "Slug может содержать только латинские буквы в нижнем регистре, цифры и дефисы")
        .min(3, "Slug должен содержать минимум 3 символа"),
    excerpt: z.string()
        .max(200, "Описание не должно превышать 200 символов")
        .optional(),
    category: z.string().min(1, "Выберите категорию"),
    content: z.string().min(10, "Содержание обязательно"),
    readingTime: z.number().min(1).max(60),
    level: z.enum(['Начальный', 'Средний', 'Продвинутый']),
    tags: z.array(z.string()).max(10, "Не более 10 тегов"),
    author: z.object({
        name: z.string().min(1, "Имя автора обязательно"),
        role: z.string().min(1, "Роль автора обязательна")
    })
});

export type ArticleFormData = z.infer<typeof articleSchema>;