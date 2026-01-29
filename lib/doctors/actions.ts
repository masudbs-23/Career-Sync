import { apiClient, CACHE_TAGS, REVALIDATE } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Doctor } from "@/types";

/**
 * Response types
 */
interface DoctorsResponse {
    data: Doctor[];
    total?: number;
    page?: number;
    limit?: number;
}

interface DoctorResponse {
    success: boolean;
    data: Doctor;
}

/**
 * Query parameters for doctor listing
 */
export interface DoctorQueryParams {
    page?: number;
    limit?: number;
    name?: string;
    work?: string;
    expert?: string;
    specialization?: string;
}

/**
 * Review data structure
 */
export interface DoctorReview {
    rating: number;
    comment: string;
    name: string;
}

/**
 * Doctor Service - Server-side data fetching with caching
 */
export const DoctorService = {
    /**
     * Get all doctors with optional filtering and pagination
     * Uses ISR with 1 hour revalidation
     */
    getAll: async (params: DoctorQueryParams = {}): Promise<Doctor[]> => {
        try {
            const { page = 1, limit = 10, name, work, expert, specialization } = params;

            // Build query string
            const queryParams = new URLSearchParams();
            queryParams.append("page", page.toString());
            queryParams.append("limit", limit.toString());
            if (name) queryParams.append("name", name);
            if (work) queryParams.append("work", work);
            if (expert) queryParams.append("expert", expert);
            if (specialization) queryParams.append("specialization", specialization);

            const response = await apiClient.get<DoctorsResponse>(
                `${API_ENDPOINTS.doctors.list}?${queryParams.toString()}`,
                {
                    revalidate: REVALIDATE.HOURLY,
                    tags: [CACHE_TAGS.doctors],
                }
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching doctors:", error);
            return [];
        }
    },

    /**
     * Get a single doctor by ID
     * Uses ISR with 1 hour revalidation
     */
    getById: async (id: string): Promise<Doctor | null> => {
        try {
            const response = await apiClient.get<DoctorResponse>(
                API_ENDPOINTS.doctors.detail(id),
                {
                    revalidate: REVALIDATE.HOURLY,
                    tags: [CACHE_TAGS.doctors, `doctor-${id}`],
                }
            );

            return response.data || null;
        } catch (error) {
            console.error(`Error fetching doctor ${id}:`, error);
            return null;
        }
    },

    /**
     * Get featured doctors (first 4)
     * Uses ISR with 1 hour revalidation
     */
    getFeatured: async (): Promise<Doctor[]> => {
        try {
            const doctors = await DoctorService.getAll({ limit: 4 });
            return doctors.slice(0, 4);
        } catch (error) {
            console.error("Error fetching featured doctors:", error);
            return [];
        }
    },

    /**
     * Add a review to a doctor
     * No caching for mutations
     */
    addReview: async (id: string, review: DoctorReview): Promise<boolean> => {
        try {
            await apiClient.put(
                API_ENDPOINTS.doctors.reviews(id),
                review,
                {
                    cache: 'no-store',
                }
            );
            return true;
        } catch (error) {
            console.error(`Error adding review for doctor ${id}:`, error);
            return false;
        }
    },

    /**
     * Search doctors (client-side, no cache)
     */
    search: async (query: string): Promise<Doctor[]> => {
        try {
            const response = await apiClient.get<DoctorsResponse>(
                `${API_ENDPOINTS.doctors.list}?name=${encodeURIComponent(query)}`,
                {
                    cache: 'no-store',
                }
            );

            return Array.isArray(response.data) ? response.data : [];
        } catch (error) {
            console.error("Error searching doctors:", error);
            return [];
        }
    },
};

export default DoctorService;
