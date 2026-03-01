import z from "zod";
import { SUPPORTED_CURRENCIES } from "../constants/currencies";

export const createProductSchema = z.object({
    title: z.string()
        .min(3, "Title must be at least 3 characters long")
        .max(100, "Title must be at most 100 characters long")
        .trim(),
    description: z.string()
        .min(10, "Description must be at least 10 characters long")
        .max(1000, "Description must be at most 1000 characters long")
        .trim(),
    price: z.number()
        .min(0, "Price must be at least 0")
        .max(1000000, "Price must be at most 1000000"),
    currency: z.enum(SUPPORTED_CURRENCIES).default("USD"),
    fileUrl: z.url("Invalid file URL").trim(),
    thumbnailUrl: z.url("Invalid thumbnail URL").trim(),
    status: z.enum(["draft", "published"]).optional().default("draft"),
    tags: z.array(
        z.string()
            .min(1, "Tag cannot be empty")
            .max(20, "Each tag must be at most 20 characters")
            .trim()
            .toLowerCase()
    ).min(1, "At least one tag is required")
        .max(10, "At most 10 tags are allowed")
        .refine((data) => new Set(data).size === data.length, {
            message: "Tags must be unique",
        })
})

export const updateProductSchema = createProductSchema.partial().extend({
    productId: z.string().min(1, "Product ID is required").trim(),
});

export const deleteProductSchema = z.object({
    productId: z.string().min(1, "Product ID is required").trim(),
});

export const getAllProductsSchema = z.object({
    page: z.number().min(1, "Page must be at least 1").optional().default(1),
    limit: z.number().min(1, "Limit must be at least 1").optional().default(10),
    query: z.string().optional().default(""),
    sortBy: z.string().optional().default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type DeleteProductDto = z.infer<typeof deleteProductSchema>;
export type GetAllProductsDto = z.infer<typeof getAllProductsSchema>;