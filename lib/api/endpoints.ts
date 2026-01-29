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

    // Medicine endpoints
    medicines: {
        list: '/medicines',
        detail: (id: string) => `/medicines/${id}`,
        search: '/medicines/search',
    },

    // Doctor endpoints
    doctors: {
        list: '/doctors',
        detail: (id: string) => `/doctors/${id}`,
        reviews: (id: string) => `/doctors/${id}/reviews`,
    },

    // Nurse endpoints
    nurses: {
        list: '/nurses',
        detail: (id: string) => `/nurses/${id}`,
        reviews: (id: string) => `/nurses/${id}/reviews`,
    },

    // Blood donation endpoints
    blood: {
        list: '/blood',
        detail: (id: string) => `/blood/${id}`,
    },

    // Institution endpoints
    institutions: {
        list: '/api/institutions',
        detail: (id: string) => `/api/institutions/${id}`,
    },
} as const;

export default API_ENDPOINTS;
