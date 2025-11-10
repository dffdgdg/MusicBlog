export class AppError extends Error {
    constructor(
        message: string,
        public code: string,
        public statusCode: number = 500
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleError = (error: unknown): { message: string; code: string } => {
    console.error('Application error:', error);

    if (error instanceof AppError) {
        return { message: error.message, code: error.code };
    }

    if (error instanceof Error) {
        return { message: error.message, code: 'UNKNOWN_ERROR' };
    }

    return { 
        message: 'Произошла непредвиденная ошибка', 
        code: 'UNKNOWN_ERROR' 
    };
};

export const withErrorHandling = <T extends any[], R>(
    fn: (...args: T) => Promise<R>
) => {
    return async (...args: T): Promise<R> => {
        try {
            return await fn(...args);
        } catch (error) {
            const handledError = handleError(error);
            throw new AppError(handledError.message, handledError.code);
        }
    };
};