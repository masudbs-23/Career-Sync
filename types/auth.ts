export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    email: string;
    password: string;
}

export interface VerifyOtpCredentials {
    email: string;
    otp: string;
}

export interface ResendOtpCredentials {
    email: string;
}

export interface RegisterResponse {
    message: string;
    success?: boolean;
}
