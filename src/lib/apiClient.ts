import {
  RegisterUserDto,
  VerifyCodeDto,
  SendCodeDto,
  ResetPasswordDto,
} from "@/schemas/authSchema";
import {
  CreateProductDto,
  UpdateProductDto,
  GetAllProductsDto,
  ProductResponseDto,
} from "@/schemas/productSchema";
import { CreateOrderDto } from "@/schemas/orderSchema";
import { axiosInstance, APIResponse } from "./axios";

export interface SignatureResponse {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export const AuthAPI = {
  signup: (data: RegisterUserDto): Promise<APIResponse> =>
    axiosInstance.post("/auth/signup", data),
  verify: (data: VerifyCodeDto): Promise<APIResponse> =>
    axiosInstance.post("/auth/verify", data),
  resendOTP: (data: SendCodeDto): Promise<APIResponse> =>
    axiosInstance.post("/auth/resend-otp", data),
  forgotPassword: (data: SendCodeDto): Promise<APIResponse> =>
    axiosInstance.post("/auth/forgot-password", data),
  resetPassword: (data: ResetPasswordDto): Promise<APIResponse> =>
    axiosInstance.post("/auth/reset-password", data),
};

export const ProductAPI = {
  create: (data: CreateProductDto): Promise<APIResponse> =>
    axiosInstance.post("/products", data),
  getAll: (
    params?: GetAllProductsDto,
  ): Promise<
    APIResponse<{
      products: ProductResponseDto[];
      page: number;
      limit: number;
      totalPages: number;
      totalProducts: number;
    }>
  > => axiosInstance.get("/products", { params }),
  getById: (id: string): Promise<APIResponse> =>
    axiosInstance.get(`/products/${id}`),
  update: (id: string, data: UpdateProductDto): Promise<APIResponse> =>
    axiosInstance.patch(`/products/${id}`, data),
  delete: (id: string): Promise<APIResponse> =>
    axiosInstance.delete(`/products/${id}`),
  getDownloadUrl: (productId: string, orderId: string): Promise<APIResponse> =>
    axiosInstance.get(`/products/${productId}/download`, {
      params: { orderId },
    }),
};

export const OrderAPI = {
  create: (data: CreateOrderDto): Promise<APIResponse> =>
    axiosInstance.post("/orders", data),
  getAll: (): Promise<APIResponse> => axiosInstance.get("/orders"),
  getById: (id: string): Promise<APIResponse> =>
    axiosInstance.get(`/orders/${id}`),
};

export const CloudinaryAPI = {
  getSignature: (): Promise<APIResponse<SignatureResponse>> =>
    axiosInstance.post("/cloudinary-signature"),

  deleteAsset: (publicId: string, resourceType: string): Promise<APIResponse> =>
    axiosInstance.delete("/cloudinary-asset", {
      data: { publicId, resourceType },
    }),
};
