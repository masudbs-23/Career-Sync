/**
 * Advanced caching utilities for Next.js applications
 */

import { unstable_cache } from 'next/cache';
import { CACHE_TAGS, REVALIDATE } from '@/lib/api/client';

/**
 * Create a cached function with automatic revalidation
 */
export function createCachedFunction<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    options: {
        revalidate?: number | false;
        tags?: string[];
        keyPrefix?: string;
    } = {}
) {
    const { revalidate = REVALIDATE.HOURLY, tags = [], keyPrefix = 'cache' } = options;

    return unstable_cache(fn, [keyPrefix], {
        revalidate,
        tags,
    });
}

/**
 * Cache utilities for different data types
 */
export const CacheUtils = {
    /**
     * Cache static data that rarely changes
     */
    static: <T extends (...args: any[]) => Promise<any>>(fn: T, keyPrefix?: string) =>
        createCachedFunction(fn, {
            revalidate: REVALIDATE.WEEKLY,
            tags: [CACHE_TAGS.static],
            keyPrefix: `static-${keyPrefix || 'data'}`,
        }),

    /**
     * Cache user-specific data
     */
    user: <T extends (...args: any[]) => Promise<any>>(fn: T, userId?: string) =>
        createCachedFunction(fn, {
            revalidate: REVALIDATE.HOURLY,
            tags: [CACHE_TAGS.user, userId ? `user-${userId}` : 'user'],
            keyPrefix: `user-${userId || 'data'}`,
        }),

    /**
     * Cache search results with shorter TTL
     */
    search: <T extends (...args: any[]) => Promise<any>>(fn: T, query?: string) =>
        createCachedFunction(fn, {
            revalidate: REVALIDATE.DYNAMIC,
            tags: [CACHE_TAGS.search, query ? `search-${query}` : 'search'],
            keyPrefix: `search-${query || 'data'}`,
        }),

    /**
     * Cache real-time data (no caching)
     */
    realtime: <T extends (...args: any[]) => Promise<any>>(fn: T) => fn,
};

/**
 * Helper function to generate cache keys
 */
export function generateCacheKey(prefix: string, ...params: (string | number)[]): string {
    return [prefix, ...params].join('-');
}

/**
 * Batch revalidation utility
 */
export async function revalidateMultiple(tags: string[]): Promise<void> {
    const { revalidateTag } = await import('next/cache');
    
    tags.forEach(tag => {
        revalidateTag(tag, "max");
    });
}
