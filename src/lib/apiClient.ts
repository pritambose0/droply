import { RegisterUserDto, VerifyCodeDto, SendCodeDto, ResetPasswordDto } from "@/schemas/authSchema";
import { CreateProductDto, UpdateProductDto, GetAllProductsDto } from "@/schemas/productSchema";
import { CreateOrderDto } from "@/schemas/orderSchema";
import { axiosInstance, APIResponse } from "./axios";

export const AuthAPI = {
    signup: (data: RegisterUserDto): Promise<APIResponse> => axiosInstance.post("/auth/signup", data),
    verify: (data: VerifyCodeDto): Promise<APIResponse> => axiosInstance.post("/auth/verify", data),
    resendOTP: (data: SendCodeDto): Promise<APIResponse> => axiosInstance.post("/auth/resend-otp", data),
    forgotPassword: (data: SendCodeDto): Promise<APIResponse> => axiosInstance.post("/auth/forgot-password", data),
    resetPassword: (data: ResetPasswordDto): Promise<APIResponse> => axiosInstance.post("/auth/reset-password", data),
};

export const ProductAPI = {
    create: (data: CreateProductDto): Promise<APIResponse> => axiosInstance.post("/products", data),
    getAll: (params?: GetAllProductsDto): Promise<APIResponse> => axiosInstance.get("/products", { params }),
    getById: (id: string): Promise<APIResponse> => axiosInstance.get(`/products/${id}`),
    update: (id: string, data: UpdateProductDto): Promise<APIResponse> => axiosInstance.patch(`/products/${id}`, data),
    delete: (id: string): Promise<APIResponse> => axiosInstance.delete(`/products/${id}`),
    getDownloadUrl: (productId: string, orderId: string): Promise<APIResponse> => 
        axiosInstance.get(`/products/${productId}/download`, { params: { orderId } }),
};

export const OrderAPI = {
    create: (data: CreateOrderDto): Promise<APIResponse> => axiosInstance.post("/orders", data),
    getAll: (): Promise<APIResponse> => axiosInstance.get("/orders"),
    getById: (id: string): Promise<APIResponse> => axiosInstance.get(`/orders/${id}`),
};

export const CloudinaryAPI = {
    getSignature: (): Promise<APIResponse> => axiosInstance.post("/cloudinary-signature"),
};
