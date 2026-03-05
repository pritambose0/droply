import z from "zod";

export const createOrderSchema = z.object({
    productId: z.string().length(24, "Invalid product ID"),
});

export type CreateOrderDto = z.infer<typeof createOrderSchema>;
