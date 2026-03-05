import { validate } from "@/helpers/validate";
import { CreateOrderDto, createOrderSchema } from "../schemas/orderSchema";
import { ApiError } from "@/helpers/ApiError";
import ProductModel from "@/models/Product";
import OrderModel from "@/models/Order";

export class OrderService {
    static async createOrder(order: CreateOrderDto, buyerId: string) {
        const {
            productId
        } = validate(createOrderSchema, order);

        const product = await ProductModel.findById(productId);

        if (!product) {
            throw new ApiError(404, "Product not found");
        }

        if (product.status !== "published") {
            throw new ApiError(400, "Product is not available for purchase");
        }

        if (buyerId === product.creatorId.toString()) {
            throw new ApiError(400, "You cannot purchase your own product");
        }

        const existingOrder = await OrderModel.findOne({
            productId,
            buyerId,
            paymentStatus: { $in: ["pending", "paid"] },
        });

        if (existingOrder) {
            throw new ApiError(409, "You already have an active order for this product");
        }

        const newOrder = await OrderModel.create({
            productId,
            buyerId,
            sellerId: product.creatorId,
            currency: product.currency,
            paymentStatus: "pending",
            orderStatus: "processing",
            price: product.price,
        });

        return newOrder;
    }

    static async getOrderByBuyerId(
        buyerId: string,
        page: number = 1,
        limit: number = 10,
        sortBy: string = "createdAt",
        sortOrder: "asc" | "desc" = "desc"
    ) {
        const skip = (page - 1) * limit;

        const orders = await OrderModel.find({ buyerId })
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .populate("productId", "title thumbnailUrl price currency")

        const total = await OrderModel.countDocuments({ buyerId });

        return {
            data: orders,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    static async getOrderBySellerId(
        sellerId: string,
        page: number = 1,
        limit: number = 10,
        sortBy: string = "createdAt",
        sortOrder: "asc" | "desc" = "desc"
    ) {
        const skip = (page - 1) * limit;

        const orders = await OrderModel.find({ sellerId })
            .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(limit)
            .populate("productId", "title thumbnailUrl price currency")
            .populate("buyerId", "name email");

        const total = await OrderModel.countDocuments({ sellerId });

        return {
            data: orders,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    }

    static async getOrderById(orderId: string, userId: string) {

        const order = await OrderModel.findById(orderId);
        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        if (order.buyerId.toString() !== userId && order.sellerId.toString() !== userId) {
            throw new ApiError(403, "You are not authorized to access this order");
        }

        return order;
    }

    static async updatePaymentStatus(orderId: string, paymentStatus: "paid" | "failed", paymentId: string) {

        const order = await OrderModel.findById(orderId).select("+paymentId");

        if (!order) {
            throw new ApiError(404, "Order not found");
        }

        order.paymentStatus = paymentStatus;
        order.paymentId = paymentId;

        if (paymentStatus === "paid") {
            await ProductModel.findByIdAndUpdate(order.productId, {
                $inc: { salesCount: 1 },
            });
            order.orderStatus = "completed";
        }

        if (paymentStatus === "failed") {
            order.orderStatus = "failed";
        }

        await order.save();
        return order;
    }
}