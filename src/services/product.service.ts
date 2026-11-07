import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";
import cloudinary from "@/lib/cloudinary";
import logger from "@/lib/logger";
import OrderModel from "@/models/Order";
import ProductModel from "@/models/Product";
import UserModel from "@/models/User";
import {
  CreateProductDto,
  GetAllMarketplaceProductsDto,
  GetAllProductsDto,
  MarketplaceSortBy,
  UpdateProductDto,
} from "@/schemas/productSchema";
import type { MarketplaceProduct } from "@/types/marketplace";
import { isValidObjectId, Types } from "mongoose";
import { getServerSession } from "next-auth";

type CloudinaryResourceType = "image" | "raw" | "video";

type MarketplaceLeanProduct = {
  _id: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  currency: string;
  thumbnailUrl: string;
  tags?: string[];
  salesCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  creatorId: { _id?: unknown; name?: string } | string;
};

export class ProductService {
  private static escapeRegex(value: string) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

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
      const searchTerm = ProductService.escapeRegex(query);

      filter.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
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

  private static toMarketplaceProduct(
    raw: MarketplaceLeanProduct,
  ): MarketplaceProduct {
    const creator =
      typeof raw.creatorId === "object" && raw.creatorId !== null
        ? raw.creatorId
        : null;

    return {
      id: String(raw._id),
      title: raw.title,
      description: raw.description,
      price: raw.price,
      currency: raw.currency,
      thumbnailUrl: raw.thumbnailUrl,
      tags: raw.tags ?? [],
      salesCount: raw.salesCount ?? 0,
      createdAt: new Date(raw.createdAt ?? Date.now()).toISOString(),
      updatedAt: new Date(raw.updatedAt ?? Date.now()).toISOString(),
      creator: {
        id: creator ? String(creator._id ?? "") : String(raw.creatorId ?? ""),
        name: creator?.name?.trim() || "Unknown Creator",
      },
    };
  }

  static async getMarketplaceProducts(product: GetAllMarketplaceProductsDto) {
    const { page, limit, query, sortBy, tag, price } = product;

    const filter: Record<string, unknown> = { status: "published" };

    if (tag && tag.toLowerCase() !== "all") {
      filter.tags = tag.toLowerCase();
    }

    if (price === "free") {
      filter.price = 0;
    } else if (price === "paid") {
      filter.price = { $gt: 0 };
    }

    if (query) {
      const searchTerm = ProductService.escapeRegex(query);
      const creators = await UserModel.find({
        name: { $regex: searchTerm, $options: "i" },
        role: "creator",
      })
        .select("_id")
        .lean();

      filter.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { tags: { $regex: searchTerm, $options: "i" } },
        ...(creators.length
          ? [{ creatorId: { $in: creators.map((creator) => creator._id) } }]
          : []),
      ];
    }

    const sortOptions: Record<MarketplaceSortBy, Record<string, 1 | -1>> = {
      popular: { salesCount: -1, createdAt: -1 },
      newest: { createdAt: -1 },
      "price-asc": { price: 1, createdAt: -1 },
      "price-desc": { price: -1, createdAt: -1 },
    };

    const [rawProducts, totalProducts] = await Promise.all([
      ProductModel.find(filter)
        .select(
          "title description price currency thumbnailUrl tags salesCount createdAt updatedAt creatorId",
        )
        .sort(sortOptions[sortBy])
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("creatorId", "name")
        .lean(),
      ProductModel.countDocuments(filter),
    ]);

    const products = (rawProducts as unknown as MarketplaceLeanProduct[]).map(
      (rawProduct) => ProductService.toMarketplaceProduct(rawProduct),
    );

    return {
      products,
      totalProducts,
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
    };
  }

  static async getMarketplaceProductById(id: string) {
    if (!id || !isValidObjectId(id)) {
      throw new ApiError(
        400,
        "Product ID is required and must be a valid ObjectId",
      );
    }

    const rawProduct = (await ProductModel.findOne({
      _id: id,
      status: "published",
    })
      .select(
        "title description price currency thumbnailUrl tags salesCount createdAt updatedAt creatorId",
      )
      .populate("creatorId", "name")
      .lean()) as unknown as MarketplaceLeanProduct | null;

    if (!rawProduct) {
      throw new ApiError(404, "Product not found");
    }

    const product = ProductService.toMarketplaceProduct(rawProduct);
    const creatorId = product.creator.id;
    const hasValidCreator = Boolean(creatorId) && isValidObjectId(creatorId);

    let productsCount = 0;
    let totalSales = 0;

    if (hasValidCreator) {
      const [count, salesResult] = await Promise.all([
        ProductModel.countDocuments({ creatorId, status: "published" }),
        ProductModel.aggregate<{ totalSales: number }>([
          {
            $match: {
              creatorId: new Types.ObjectId(creatorId),
              status: "published",
            },
          },
          { $group: { _id: null, totalSales: { $sum: "$salesCount" } } },
        ]),
      ]);

      productsCount = count;
      totalSales = salesResult[0]?.totalSales ?? 0;
    }

    const rawRelatedProducts = (await ProductModel.find({
      _id: { $ne: rawProduct._id },
      status: "published",
      ...(product.tags.length ? { tags: { $in: product.tags } } : {}),
    })
      .select(
        "title description price currency thumbnailUrl tags salesCount createdAt updatedAt creatorId",
      )
      .sort({ salesCount: -1, createdAt: -1 })
      .limit(3)
      .populate("creatorId", "name")
      .lean()) as unknown as MarketplaceLeanProduct[];

    const relatedProducts = rawRelatedProducts.map((rawRelatedProduct) =>
      ProductService.toMarketplaceProduct(rawRelatedProduct),
    );

    return {
      ...product,
      creator: {
        ...product.creator,
        productsCount,
        totalSales,
      },
      relatedProducts,
    };
  }

  static async getMarketplaceCategories() {
    const [categories, totalProducts] = await Promise.all([
      ProductModel.aggregate<{
        _id: string;
        count: number;
      }>([
        { $match: { status: "published" } },
        { $unwind: "$tags" },
        { $group: { _id: "$tags", count: { $sum: 1 } } },
        { $sort: { count: -1, _id: 1 } },
        { $limit: 20 },
      ]),
      ProductModel.countDocuments({ status: "published" }),
    ]);

    return {
      categories: categories.map((category) => ({
        tag: category._id,
        count: category.count,
      })),
      totalProducts,
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
