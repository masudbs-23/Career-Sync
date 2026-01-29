import { apiClient, CACHE_STRATEGIES } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Institution } from "@/types/institution";

/**
 * Response types for type safety
 */
interface InstitutionsResponse {
    data: Institution[];
    total?: number;
    page?: number;
    limit?: number;
}

interface InstitutionResponse {
    success: boolean;
    data: Institution;
}

/**
 * Query parameters for institution listing
 */
export interface InstitutionQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    location?: string;
}

/**
 * Institution Service - Server-side data fetching with caching
 */
export const InstitutionService = {
    /**
     * Get all institutions with optional filtering and pagination
     * Uses ISR with 1 hour revalidation
     */
    getAll: async (params: InstitutionQueryParams = {}): Promise<Institution[]> => {
        try {
            const { page = 1, limit = 10, search, location } = params;

            // Build query string
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (search) queryParams.append("name", search);
            if (location) queryParams.append("location", location);

            const response = await apiClient.get<InstitutionsResponse>(
                `${API_ENDPOINTS.institutions.list}?${queryParams.toString()}`,
                CACHE_STRATEGIES.USER_DATA
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching institutions:", error);
            return [];
        }
    },

    /**
     * Get a single institution by ID
     * Uses ISR with 1 hour revalidation
     */
    getById: async (id: string): Promise<Institution | null> => {
        try {
            const response = await apiClient.get<InstitutionResponse>(
                API_ENDPOINTS.institutions.detail(id),
                {
                    ...CACHE_STRATEGIES.USER_DATA,
                    tags: [...CACHE_STRATEGIES.USER_DATA.tags, `institution-${id}`],
                }
            );

            return response.data || null;
        } catch (error) {
            console.error(`Error fetching institution ${id}:`, error);
            return null;
        }
    },

    /**
     * Get featured institutions (first 4 for home page)
     * Uses ISR with 1 hour revalidation
     */
    getFeatured: async (): Promise<Institution[]> => {
        try {
            const institutions = await InstitutionService.getAll({ limit: 4 });
            return institutions.slice(0, 4);
        } catch (error) {
            console.error("Error fetching featured institutions:", error);
            return [];
        }
    },

    /**
     * Search institutions (client-side, no cache)
     * For real-time search functionality
     */
    search: async (query: string): Promise<Institution[]> => {
        try {
            const response = await apiClient.get<InstitutionsResponse>(
                `${API_ENDPOINTS.institutions.list}?name=${encodeURIComponent(query)}`,
                CACHE_STRATEGIES.SEARCH
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error searching institutions:", error);
            return [];
        }
    },
};
