import { apiClient, CACHE_TAGS, REVALIDATE } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Nurse } from "@/types";

/**
 * Response types
 */
interface NursesResponse {
    data: Nurse[];
    total?: number;
    page?: number;
    limit?: number;
}

interface NurseResponse {
    success: boolean;
    message?: string;
    data: Nurse;
}

/**
 * Query parameters for nurse listing
 */
export interface NurseQueryParams {
    page?: number;
    limit?: number;
    name?: string;
    work?: string;
    specialization?: string;
}

/**
 * Review data structure
 */
export interface NurseReview {
    rating: number;
    comment: string;
    name: string;
}

/**
 * Nurse Service - Server-side data fetching with caching
 */
export const NurseService = {
    /**
     * Get all nurses with optional filtering and pagination
     * Uses ISR with 1 hour revalidation
     */
    getAll: async (params: NurseQueryParams = {}): Promise<Nurse[]> => {
        try {
            const { page = 1, limit = 10, name, work, specialization } = params;

            // Build query string
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (name) queryParams.append("name", name);
            if (work) queryParams.append("work", work);
            if (specialization) queryParams.append("specialization", specialization);

            const response = await apiClient.get<NursesResponse>(
                `${API_ENDPOINTS.nurses.list}?${queryParams.toString()}`,
                {
                    revalidate: REVALIDATE.HOURLY,
                    tags: [CACHE_TAGS.nurses],
                }
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching nurses:", error);
            return [];
        }
    },

    /**
     * Get a single nurse by ID
     * Uses ISR with 1 hour revalidation
     */
    getById: async (id: string): Promise<Nurse | null> => {
        try {
            const response = await apiClient.get<NurseResponse>(
                API_ENDPOINTS.nurses.detail(id),
                {
                    revalidate: REVALIDATE.HOURLY,
                    tags: [CACHE_TAGS.nurses, `nurse-${id}`],
                }
            );

            return response.data || null;
        } catch (error) {
            console.error(`Error fetching nurse ${id}:`, error);
            return null;
        }
    },

    /**
     * Get featured nurses (first 4)
     * Uses ISR with 1 hour revalidation
     */
    getFeatured: async (): Promise<Nurse[]> => {
        try {
            const nurses = await NurseService.getAll({ limit: 4 });
            return nurses.slice(0, 4);
        } catch (error) {
            console.error("Error fetching featured nurses:", error);
            return [];
        }
    },

    /**
     * Add a review to a nurse
     * No caching for mutations
     */
    addReview: async (id: string, review: NurseReview): Promise<boolean> => {
        try {
            await apiClient.put(
                API_ENDPOINTS.nurses.reviews(id),
                review,
                {
                    cache: 'no-store',
                }
            );
            return true;
        } catch (error) {
            console.error(`Error adding review for nurse ${id}:`, error);
            return false;
        }
    },

    /**
     * Search nurses (client-side, no cache)
     */
    search: async (query: string): Promise<Nurse[]> => {
        try {
            const response = await apiClient.get<NursesResponse>(
                `${API_ENDPOINTS.nurses.list}?name=${encodeURIComponent(query)}`,
                {
                    cache: 'no-store',
                }
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error searching nurses:", error);
            return [];
        }
    },
};

export default NurseService;
