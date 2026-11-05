import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";
import cloudinary from "@/lib/cloudinary";
import logger from "@/lib/logger";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import {
  CreateProductDto,
  GetAllProductsDto,
  UpdateProductDto,
} from "@/schemas/productSchema";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";

type CloudinaryResourceType = "image" | "raw" | "video";

export class ProductService {
  static async createProduct(product: CreateProductDto, creatorId: string) {
    const {
      title,
      description,
      price,
      currency,
      fileUrl,
      thumbnailUrl,
      filePublicId,
      thumbnailPublicId,
      status,
      tags,
    } = product;

    const existingProduct = await ProductModel.findOne({
      $and: [{ title }, { creatorId }],
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
      filePublicId,
      thumbnailPublicId,
      status,
      tags,
    });

    return newProduct;
  }

  static async getAllProducts(product: GetAllProductsDto, creatorId: string) {
    const { page, limit, query, sortBy, sortOrder, status } = product;

    const filter: Record<string, unknown> = { creatorId };

    if (status && status !== "all") {
      filter.status = status;
    }

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    const rawProducts = await ProductModel.find(filter)
      .sort({ [sortBy]: sortOrder === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const products = rawProducts.map((product) => {
      return {
        ...product,
        id: product._id.toString(),
      };
    });

    const totalProducts = await ProductModel.countDocuments(filter);

    return {
      products,
      totalProducts,
      page,
      totalPages: Math.ceil(totalProducts / limit),
    };
  }

  static async getProductById(id: string) {
    if (!id || !isValidObjectId(id)) {
      throw new ApiError(
        400,
        "Product ID is required and must be a valid ObjectId",
      );
    }

    const product = await ProductModel.findById(id).select("+fileUrl");

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const session = await getServerSession(authOptions);

    // Mongoose's toJSON automatically deletes fileUrl (as defined in the model).
    const productData = product.toJSON();

    // If the requester is the owner, we manually attach the fileUrl back!
    if (session && session.user.id === product.creatorId.toString()) {
      productData.fileUrl = product.fileUrl;
    }

    return productData;
  }

  static async updateProduct(
    product: UpdateProductDto,
    creatorId: string,
    productId: string,
  ) {
    const {
      title,
      description,
      price,
      currency,
      fileUrl,
      thumbnailUrl,
      filePublicId,
      thumbnailPublicId,
      status,
      tags,
    } = product;

    if (!isValidObjectId(productId) || !isValidObjectId(creatorId)) {
      throw new ApiError(400, "Invalid product ID or creator ID");
    }

    const existingProduct = await ProductModel.findById(productId);

    if (!existingProduct) {
      throw new ApiError(404, "Product not found");
    }

    if (existingProduct.creatorId.toString() !== creatorId) {
      throw new ApiError(403, "You are not authorized to update this product");
    }

    const updates = {
      title,
      description,
      price,
      currency,
      fileUrl,
      thumbnailUrl,
      filePublicId,
      thumbnailPublicId,
      status,
      tags,
    };

    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([, value]) => value !== undefined),
    );

    existingProduct.set(filteredUpdates);

    await existingProduct.save();

    return existingProduct;
  }

  static async deleteProduct(creatorId: string, productId: string) {
    if (!isValidObjectId(productId) || !isValidObjectId(creatorId)) {
      throw new ApiError(400, "Invalid product ID or creator ID");
    }

    const existingProduct = await ProductModel.findById(productId).select(
      "+fileUrl +thumbnailUrl +filePublicId +thumbnailPublicId",
    );

    if (!existingProduct) {
      throw new ApiError(404, "Product not found");
    }

    if (existingProduct.creatorId.toString() !== creatorId) {
      throw new ApiError(403, "You are not authorized to delete this product");
    }

    const assets = [
      {
        publicId: existingProduct.filePublicId,
        url: existingProduct.fileUrl,
        fallbackResourceType: "raw" as CloudinaryResourceType,
      },
      {
        publicId: existingProduct.thumbnailPublicId,
        url: existingProduct.thumbnailUrl,
        fallbackResourceType: "image" as CloudinaryResourceType,
      },
    ];

    await existingProduct.deleteOne();

    await Promise.allSettled(
      assets.map((asset) =>
        ProductService.deleteCloudinaryAsset(
          asset.publicId,
          asset.url,
          asset.fallbackResourceType,
        ),
      ),
    );

    return;
  }

  private static getResourceType(
    url: string,
    fallback: CloudinaryResourceType,
  ): CloudinaryResourceType {
    if (url.includes("/raw/upload/")) return "raw";
    if (url.includes("/video/upload/")) return "video";
    if (url.includes("/image/upload/")) return "image";
    return fallback;
  }

  private static getFileExtension(url: string): string {
    try {
      const pathname = new URL(url).pathname;
      const lastDot = pathname.lastIndexOf(".");
      const extension = pathname.slice(lastDot);
      return lastDot !== -1 && extension.length <= 10 ? extension : "";
    } catch {
      return "";
    }
  }

  private static async deleteCloudinaryAsset(
    publicId: string | undefined,
    url: string,
    fallbackResourceType: CloudinaryResourceType,
  ) {
    if (!publicId) return;

    const resourceType = ProductService.getResourceType(
      url,
      fallbackResourceType,
    );

    let assetId = publicId;

    if (resourceType === "raw") {
      const extension = ProductService.getFileExtension(url);
      if (extension && !assetId.endsWith(extension)) {
        assetId += extension;
      }
    }

    try {
      const result = await cloudinary.uploader.destroy(assetId, {
        resource_type: resourceType,
        invalidate: true,
      });

      if (result.result !== "ok" && result.result !== "not found") {
        logger.warn(
          { publicId: assetId, resourceType, result: result.result },
          "Cloudinary asset deletion was not acknowledged",
        );
      }
    } catch (error) {
      logger.warn(
        { err: error, publicId: assetId, resourceType },
        "Failed to delete Cloudinary asset",
      );
    }
  }

  static async downloadProduct(
    productId: string,
    orderId: string,
    userId: string,
  ) {
    if (
      !isValidObjectId(productId) ||
      !isValidObjectId(orderId) ||
      !isValidObjectId(userId)
    ) {
      throw new ApiError(400, "Invalid product ID or order ID or user ID");
    }

    const product = await ProductModel.findById(productId).select("+fileUrl");

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    const order = await OrderModel.findById(orderId);
    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.productId.toString() !== productId) {
      throw new ApiError(
        403,
        "You are not authorized to download this product",
      );
    }

    if (order.buyerId.toString() !== userId) {
      throw new ApiError(
        403,
        "You are not authorized to download this product",
      );
    }

    if (order.orderStatus !== "completed") {
      throw new ApiError(403, "Order is not completed");
    }

    if (order.paymentStatus !== "paid") {
      throw new ApiError(
        403,
        "Please complete the payment to download the product",
      );
    }

    return product.fileUrl;
  }
}
