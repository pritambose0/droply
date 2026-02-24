import logger from "@/lib/logger";
import { ApiError } from "./ApiError";
import { z } from "zod";

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
    const result = schema.safeParse(data);

    if (!result.success) {
        const errors = result.error.issues.map((err) => ({
            field: err.path.join("."),
            message: err.message,
        }));

        logger.error(errors);
        throw new ApiError(422, "Validation failed", errors);
    }

    return result.data;
}