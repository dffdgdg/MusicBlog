export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

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