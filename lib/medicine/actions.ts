import { apiClient, CACHE_TAGS, REVALIDATE } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Medicine } from "@/types";

/**
 * Response types for type safety
 */
interface MedicinesResponse {
    data: Medicine[];
    total?: number;
    page?: number;
    limit?: number;
}

interface MedicineResponse {
    success: boolean;
    data: Medicine;
}

/**
 * Query parameters for medicine listing
 */
export interface MedicineQueryParams {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

/**
 * Medicine Service - Server-side data fetching with caching
 */
export const MedicineService = {
    /**
     * Get all medicines with optional filtering and pagination
     * Uses ISR with 1 hour revalidation
     */
    getAll: async (params: MedicineQueryParams = {}): Promise<Medicine[]> => {
        try {
            const { page = 1, limit = 10, search, category, minPrice, maxPrice } = params;

            // Build query string
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (search) queryParams.append("name", search);
            if (category) queryParams.append("category", category);
            if (minPrice) queryParams.append("minPrice", minPrice.toString());
            if (maxPrice) queryParams.append("maxPrice", maxPrice.toString());

            const response = await apiClient.get<MedicinesResponse>(
                `${API_ENDPOINTS.medicines.list}?${queryParams.toString()}`,
                {
                    revalidate: REVALIDATE.HOURLY, // Revalidate every hour
                    tags: [CACHE_TAGS.medicines],
                }
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching medicines:", error);
            return [];
        }
    },

    /**
     * Get a single medicine by ID
     * Uses ISR with 1 hour revalidation
     */
    getById: async (id: string): Promise<Medicine | null> => {
        try {
            const response = await apiClient.get<MedicineResponse>(
                API_ENDPOINTS.medicines.detail(id),
                {
                    revalidate: REVALIDATE.HOURLY,
                    tags: [CACHE_TAGS.medicines, `medicine-${id}`],
                }
            );

            return response.data || null;
        } catch (error) {
            console.error(`Error fetching medicine ${id}:`, error);
            return null;
        }
    },

    /**
     * Get featured medicines (first 4)
     * Uses ISR with 1 hour revalidation
     */
    getFeatured: async (): Promise<Medicine[]> => {
        try {
            const medicines = await MedicineService.getAll({ limit: 4 });
            return medicines.slice(0, 4);
        } catch (error) {
            console.error("Error fetching featured medicines:", error);
            return [];
        }
    },

    /**
     * Search medicines (client-side, no cache)
     * For real-time search functionality
     */
    search: async (query: string): Promise<Medicine[]> => {
        try {
            const response = await apiClient.get<MedicinesResponse>(
                `${API_ENDPOINTS.medicines.list}?name=${encodeURIComponent(query)}`,
                {
                    cache: 'no-store', // Always fresh for search
                }
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error searching medicines:", error);
            return [];
        }
    },
};

export default MedicineService;
