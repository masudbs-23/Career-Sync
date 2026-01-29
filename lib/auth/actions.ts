import apiClient from "@/lib/api/client";
import { AuthResponse, LoginCredentials, SignupCredentials, VerifyOtpCredentials, ResendOtpCredentials, RegisterResponse } from "@/types";

export const AuthService = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>("/api/auth/login", credentials);
    },
    signup: async (data: SignupCredentials): Promise<RegisterResponse> => {
        return apiClient.post<RegisterResponse>("/api/auth/register", data);
    },
    verifyOtp: async (data: VerifyOtpCredentials): Promise<AuthResponse> => {
        return apiClient.post<AuthResponse>("/api/auth/verify-otp", data);
    },
    resendOtp: async (data: ResendOtpCredentials): Promise<{ message: string }> => {
        return apiClient.post<{ message: string }>("/api/auth/resend-otp", data);
    }
};
