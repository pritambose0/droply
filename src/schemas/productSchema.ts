import z from "zod";
import { SUPPORTED_CURRENCIES } from "../constants/currencies";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be at most 100 characters long")
    .trim(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be at most 1000 characters long")
    .trim(),
  price: z
    .number()
    .min(0, "Price must be at least 0")
    .max(1000000, "Price must be at most 1000000"),
  currency: z.enum(SUPPORTED_CURRENCIES),
  fileUrl: z.url("Invalid file URL").trim(),
  thumbnailUrl: z.url("Invalid thumbnail URL").trim(),
  status: z.enum(["draft", "published"]).default("published"),
  tags: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => {
      if (typeof val === "string") {
        return val
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== "");
      }
      return val;
    })
    .pipe(
      z
        .array(
          z
            .string()
            .min(1, "Tag cannot be empty")
            .max(20, "Each tag must be at most 20 characters")
            .trim()
            .toLowerCase(),
        )
        .min(1, "At least one tag is required")
        .max(10, "At most 10 tags are allowed")
        .refine((data) => new Set(data).size === data.length, {
          message: "Tags must be unique",
        }),
    ),
});

export const updateProductSchema = createProductSchema.partial().extend({
  productId: z.string().min(1, "Product ID is required").trim(),
});

export const getAllProductsSchema = z.object({
  page: z.number().min(1, "Page must be at least 1").optional().default(1),
  limit: z.number().min(1, "Limit must be at least 1").optional().default(10),
  query: z.string().optional().default(""),
  sortBy: z.string().optional().default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"),
});

export const productFormSchema = createProductSchema.omit({
  fileUrl: true,
  thumbnailUrl: true,
});

export const productResponseSchema = createProductSchema.extend({
  id: z.string().min(1, "Product ID is required").trim(),
  createdAt: z.string().transform((val) => new Date(val)),
  updatedAt: z.string().transform((val) => new Date(val)),
  deletedAt: z
    .string()
    .transform((val) => new Date(val))
    .optional(),
  userId: z.string().min(1, "User ID is required").trim(),
  salesCount: z.number().min(0, "Sales count must be at least 0"),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;
export type CreateProductInput = z.input<typeof createProductSchema>;
export type UpdateProductDto = z.infer<typeof updateProductSchema>;
export type GetAllProductsDto = z.infer<typeof getAllProductsSchema>;
export type ProductFormSchema = z.input<typeof productFormSchema>;
export type ProductResponseDto = z.infer<typeof productResponseSchema>;
