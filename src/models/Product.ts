import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    currency: "USD" | "EUR" | "INR";
    fileUrl: string;
    thumbnailUrl: string;
    status: "draft" | "published";
    tags: string[];
    salesCount: number;
    creatorId: mongoose.Schema.Types.ObjectId;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>({
    title: {
        type: String,
        trim: true,
        minLength: [3, "Title must be at least 3 characters"],
        maxLength: [100, "Title must be at most 100 characters"],
        required: [true, "Title is required"],
    },
    description: {
        type: String,
        trim: true,
        minLength: [10, "Description must be at least 10 characters"],
        maxLength: [1000, "Description must be at most 1000 characters"],
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        min: [0, "Price must be at least 0"],
        max: [1000000, "Price must be at most 1000000"],
        required: [true, "Price is required"],
    },
    currency: {
        type: String,
        enum: ["USD", "EUR", "INR"],
        default: "USD",
    },
    fileUrl: {
        type: String,
        select: false,
        required: [true, "File URL is required"],
        validate: {
            validator: function (value: string) {
                return validator.isURL(value);
            },
            message: "Please provide a valid URL",
        },
    },
    thumbnailUrl: {
        type: String,
        validate: {
            validator: function (value: string) {
                return validator.isURL(value);
            },
            message: "Please provide a valid URL",
        },
        required: [true, "Thumbnail is required"],
    },
    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },
    tags: {
        type: [
            {
                type: String,
                lowercase: true,
                maxlength: [20, "Each tag must be ≤ 20 characters"],
                trim: true,
            },
        ],
        default: [],
        validate: [
            {
                validator: function (value: string[]) {
                    return value.length <= 10;
                },
                message: "Tags must be at most 10",
            },
            {
                validator: function (value: string[]) {
                    return new Set(value).size === value.length;
                },
                message: "Tags must be unique",
            },
        ],
    },
    salesCount: {
        type: Number,
        default: 0,
        min: [0, "Sales count must be at least 0"],
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
        required: [true, "Creator ID is required"],
    },
}, {
    timestamps: true, toJSON: {
        transform: function (_doc, ret: { fileUrl?: string; __v?: number }) {
            delete ret.fileUrl;
            delete ret.__v;
            return ret;
        },
    }, toObject: {
        transform: function (_doc, ret: { fileUrl?: string; __v?: number }) {
            delete ret.fileUrl;
            delete ret.__v;
            return ret;
        },
    }
});

ProductSchema.index({ status: 1, createdAt: -1 });


const ProductModel =
    (mongoose.models.Product as mongoose.Model<IProduct>) ||
    mongoose.model<IProduct>("Product", ProductSchema);

export default ProductModel;