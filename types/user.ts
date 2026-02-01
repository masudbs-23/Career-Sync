export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: {
        public_id: string;
        url: string;
    } | null;
    gender?: string;
    phone?: string;
    createdAt?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ErrorResponse {
    message: string;
}

// Re-export auth types
export * from "./auth";
