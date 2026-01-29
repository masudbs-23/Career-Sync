/**
 * Modern fetch-based API client for Next.js
 * Replaces Axios with native fetch for better Next.js integration
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export interface FetchOptions extends RequestInit {
    revalidate?: number | false;
    tags?: string[];
    cache?: RequestCache;
    next?: {
        revalidate?: number | false;
        tags?: string[];
    };
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
    const { revalidate, tags, cache, next: nextOptions, ...fetchOptions } = options;

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

    // Build Next.js cache options with priority to explicit next object
    const cacheOptions: { revalidate?: number | false; tags?: string[] } = {};
    if (revalidate !== undefined) {
        cacheOptions.revalidate = revalidate;
    }
    if (tags) {
        cacheOptions.tags = tags;
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers,
            cache: cache || (typeof window !== 'undefined' ? 'no-store' : 'default'),
            next: nextOptions || (Object.keys(cacheOptions).length > 0 ? cacheOptions : undefined),
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
 * Revalidation times (in seconds)
 */
export const REVALIDATE = {
    STATIC: false as const, // Never revalidate
    HOURLY: 3600,
    DAILY: 86400,
    WEEKLY: 604800,
    DYNAMIC: 0, // Always fresh
} as const;

/**
 * Cache tags for revalidation
 */
export const CACHE_TAGS = {
    institutions: 'institutions',
    auth: 'auth',
    user: 'user',
    search: 'search',
    static: 'static',
} as const;

/**
 * Cache strategies for different use cases
 */
export const CACHE_STRATEGIES = {
    // Static data that rarely changes
    STATIC: {
        revalidate: REVALIDATE.WEEKLY,
        tags: [CACHE_TAGS.static] as string[],
    },
    // User-specific data
    USER_DATA: {
        revalidate: REVALIDATE.HOURLY,
        tags: [CACHE_TAGS.user] as string[],
    },
    // Search results
    SEARCH: {
        revalidate: REVALIDATE.DYNAMIC,
        tags: [CACHE_TAGS.search] as string[],
    },
    // Real-time data
    REALTIME: {
        revalidate: REVALIDATE.DYNAMIC,
        tags: [] as string[],
    },
} as const;

export default apiClient;
