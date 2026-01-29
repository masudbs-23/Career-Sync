/**
 * API Route for cache management
 * Provides endpoints for cache revalidation and monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { action, tags, paths } = body;

        // Validate secret for security
        const secret = request.headers.get('x-cache-secret');
        if (secret !== process.env.CACHE_SECRET) {
            return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
        }

        switch (action) {
            case 'revalidate-tags':
                if (tags && Array.isArray(tags)) {
                    tags.forEach(tag => revalidateTag(tag, "max"));
                    return NextResponse.json({ 
                        message: 'Tags revalidated successfully', 
                        tags 
                    });
                }
                break;

            case 'revalidate-paths':
                if (paths && Array.isArray(paths)) {
                    paths.forEach(path => revalidatePath(path));
                    return NextResponse.json({ 
                        message: 'Paths revalidated successfully', 
                        paths 
                    });
                }
                break;

            case 'revalidate-all':
                // Revalidate common tags
                const commonTags = ['institutions', 'user', 'search', 'static'];
                commonTags.forEach(tag => revalidateTag(tag, "max"));
                
                // Revalidate common paths
                const commonPaths = ['/institutions', '/profile', '/'];
                commonPaths.forEach(path => revalidatePath(path));
                
                return NextResponse.json({ 
                    message: 'All cache revalidated successfully',
                    tags: commonTags,
                    paths: commonPaths
                });

            default:
                return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    } catch (error) {
        console.error('Cache API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    // Simple health check endpoint
    return NextResponse.json({ 
        message: 'Cache API is running',
        timestamp: new Date().toISOString(),
        availableActions: ['revalidate-tags', 'revalidate-paths', 'revalidate-all']
    });
}
