import { ApiError } from "@/helpers/ApiError";
import { validate } from "@/helpers/validate";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import {
    CreateProductDto,
    createProductSchema,
    GetAllProductsDto,
    getAllProductsSchema,
    UpdateProductDto,
    updateProductSchema
} from "@/schemas/productSchema";

export class ProductService {
    static async createProduct(product: CreateProductDto, creatorId: string) {
        const {
            title,
            description,
            price,
            currency,
            fileUrl,
            thumbnailUrl,
            status,
            tags
        } = validate(createProductSchema, product);

        const existingProduct = await ProductModel.findOne({
            $and: [{ title }, { creatorId }]
        });

        if (existingProduct) {
            throw new ApiError(400, "Product already exists");
        }

        const newProduct = await ProductModel.create({
            creatorId,
            title,
            description,
            price,
            currency,
            fileUrl,
            thumbnailUrl,
            status,
            tags
        });

        return newProduct;
    }

    static async getAllProducts(product: GetAllProductsDto) {
        const {
            page,
            limit,
            query,
            sortBy,
            sortOrder
        } = validate(getAllProductsSchema, product);

        const filter: Record<string, unknown> = { status: "published" };

        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } },
                { tags: { $regex: query, $options: "i" } },
            ];
        }

        const products = await ProductModel.find(filter)
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalProducts = await ProductModel.countDocuments(filter);

        return { products, totalProducts, page, totalPages: Math.ceil(totalProducts / limit) };
    }

    static async getProductById(id: string) {
        const product = await ProductModel.findById(id);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        return product;
    }

    static async updateProduct(product: UpdateProductDto, creatorId: string, productId: string) {
        const {
            title,
            description,
            price,
            currency,
            fileUrl,
            thumbnailUrl,
            status,
            tags
        } = validate(updateProductSchema, product);

        const existingProduct = await ProductModel.findById(productId);

        if (!existingProduct) {
            throw new ApiError(404, "Product not found");
        }

        if (existingProduct.creatorId.toString() !== creatorId) {
            throw new ApiError(403, "You are not authorized to update this product");
        }

        const updates = { title, description, price, currency, fileUrl, thumbnailUrl, status, tags };

        Object.entries(updates).forEach(([key, value]) => {
            if (value !== undefined) {
                (existingProduct as any)[key] = value;
            }
        });

        await existingProduct.save();

        return existingProduct;
    }

    static async deleteProduct(creatorId: string, productId: string) {
        const existingProduct = await ProductModel.findById(productId);

        if (!existingProduct) {
            throw new ApiError(404, "Product not found");
        }

        if (existingProduct.creatorId.toString() !== creatorId) {
            throw new ApiError(403, "You are not authorized to delete this product");
        }

        await existingProduct.deleteOne();

        return;
    }

    static async downloadProduct(productId: string, orderId: string, userId: string) {
        const product = await ProductModel.findById(productId).select("+fileUrl");

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        const order = await OrderModel.findById(orderId);
        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        if (order.productId.toString() !== productId) {
            throw new ApiError(403, "You are not authorized to download this product");
        }

        if (order.buyerId.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to download this product");
        }

        if (order.orderStatus !== "completed") {
            throw new ApiError(403, "Order is not completed");
        }

        if (order.paymentStatus !== "paid") {
            throw new ApiError(403, "Please complete the payment to download the product");
        }

        return product.fileUrl;
    }
}