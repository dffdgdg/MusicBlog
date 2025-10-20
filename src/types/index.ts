// Файл: src/types/index.ts
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
    page: number;
    limit: number;
    total: number;
}

export interface SearchParams {
    query: string;
    category?: string;
    tags?: string[];
}