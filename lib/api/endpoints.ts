/**
 * Centralized API endpoints configuration
 * Makes it easy to manage and update API routes
 */

export const API_ENDPOINTS = {
    // Auth endpoints
    auth: {
        login: '/api/auth/login',
        register: '/api/auth/register',
        logout: '/api/auth/logout',
        profile: '/api/auth/profile',
    },

    // Institution endpoints
    institutions: {
        list: '/api/institutions',
        detail: (id: string) => `/api/institutions/${id}`,
    },
} as const;

export default API_ENDPOINTS;
