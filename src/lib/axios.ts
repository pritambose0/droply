import axios, { AxiosError } from "axios";

export interface APIResponse<T = unknown> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
}

export interface ApiError {
    message: string;
    errors?: string[];
    status?: number;
}

export const axiosInstance = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError<APIResponse>) => {
        const message = error.response?.data?.message || error.message || "An unexpected error occurred";
        const errors = error.response?.data?.errors || [];
        const status = error.response?.status;

        return Promise.reject({ message, errors, status });
    }
);
