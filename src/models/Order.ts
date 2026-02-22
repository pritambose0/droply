import mongoose, { Document, Schema } from "mongoose";
import { SUPPORTED_CURRENCIES } from "../constants/currencies";

export interface IOrder extends Document {
    productId: mongoose.Schema.Types.ObjectId;
    buyerId: mongoose.Schema.Types.ObjectId;
    sellerId: mongoose.Schema.Types.ObjectId;
    amount: number;
    currency: typeof SUPPORTED_CURRENCIES[number];
    paymentStatus: "pending" | "paid" | "failed";
    paymentId: string;
    orderStatus: "processing" | "completed" | "cancelled" | "failed";
}

const OrderSchema: Schema<IOrder> = new Schema<IOrder>({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product ID is required"],
        index: true,
        immutable: true,
    },
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Buyer ID is required"],
        index: true,
        immutable: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Seller ID is required"],
        index: true,
        immutable: true,
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [1, "Amount must be at least 1"],
        max: [1000000, "Amount must be at most 1000000"],
        immutable: true,
    },
    currency: {
        type: String,
        enum: SUPPORTED_CURRENCIES,
        required: [true, "Currency is required"],
        immutable: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending",
    },
    paymentId: {
        type: String,
        default: null,
        select: false,
    },
    orderStatus: {
        type: String,
        enum: ["processing", "completed", "cancelled", "failed"],
        default: "processing",
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (_doc, ret: { __v?: number; paymentId?: string }) {
            delete ret.__v;
            delete ret.paymentId;
            return ret;
        },
    },
    toObject: {
        transform: function (_doc, ret: { __v?: number; paymentId?: string }) {
            delete ret.__v;
            delete ret.paymentId;
            return ret;
        },
    },
});

OrderSchema.index({ buyerId: 1, createdAt: -1 });

const OrderModel = (mongoose.models.Order as mongoose.Model<IOrder>) || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;