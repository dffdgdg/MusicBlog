import { z } from 'zod';

export const userSchema = z.object({
    email: z.string().email('Некорректный email адрес'),
    name: z.string().min(2, 'Имя должно содержать минимум 2 символа')
                  .max(50, 'Имя не должно превышать 50 символов'),
    role: z.enum(['admin', 'author', 'reader']),
    bio: z.string().max(500, 'Биография не должна превышать 500 символов').optional(),
    isActive: z.boolean().default(true)
});

export type UserFormData = z.infer<typeof userSchema>;