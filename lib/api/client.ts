/**
 * Modern fetch-based API client for Next.js
 * Replaces Axios with native fetch for better Next.js integration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface FetchOptions extends RequestInit {
    revalidate?: number | false;
    tags?: string[];
}

export class APIError extends Error {
    constructor(
        message: string,
        public status: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'APIError';
    }
}

/**
 * Enhanced fetch wrapper with error handling and auth
 */
async function fetchWithAuth<T>(
    endpoint: string,
    options: FetchOptions = {}
): Promise<T> {
    const { revalidate, tags, ...fetchOptions } = options;

    // Build headers
    const headers = new Headers(fetchOptions.headers);
    headers.set('Content-Type', 'application/json');

    // Add auth token (only on client side)
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
    }

    // Build Next.js cache options
    const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
    if (revalidate !== undefined) {
        nextOptions.revalidate = revalidate;
    }
    if (tags) {
        nextOptions.tags = tags;
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers,
            next: Object.keys(nextOptions).length > 0 ? nextOptions : undefined,
        });

        // Handle non-OK responses
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new APIError(
                errorData.message || `HTTP ${response.status}: ${response.statusText}`,
                response.status,
                errorData
            );
        }

        // Parse JSON response
        const data = await response.json();
        return data as T;
    } catch (error) {
        if (error instanceof APIError) {
            throw error;
        }
        // Network or parsing errors
        throw new APIError(
            error instanceof Error ? error.message : 'An unknown error occurred',
            0
        );
    }
}

/**
 * API client with common HTTP methods
 */
export const apiClient = {
    get: <T>(endpoint: string, options?: FetchOptions) =>
        fetchWithAuth<T>(endpoint, { ...options, method: 'GET' }),

    post: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        fetchWithAuth<T>(endpoint, {
            ...options,
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }),

    put: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        fetchWithAuth<T>(endpoint, {
            ...options,
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }),

    patch: <T>(endpoint: string, data?: unknown, options?: FetchOptions) =>
        fetchWithAuth<T>(endpoint, {
            ...options,
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        }),

    delete: <T>(endpoint: string, options?: FetchOptions) =>
        fetchWithAuth<T>(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * Cache tags for revalidation
 */
export const CACHE_TAGS = {
    medicines: 'medicines',
    doctors: 'doctors',
    nurses: 'nurses',
    auth: 'auth',
} as const;

/**
 * Revalidation times (in seconds)
 */
export const REVALIDATE = {
    STATIC: false as const, // Never revalidate
    HOURLY: 3600,
    DAILY: 86400,
    WEEKLY: 604800,
    DYNAMIC: 0, // Always fresh
} as const;

export default apiClient;
