import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { ProductService } from "@/services/product.service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { validate } from "@/helpers/validate";
import { updateProductSchema } from "@/schemas/productSchema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  return handleRequest(async () => {
    const { productId } = await params;

    const product = await ProductService.getProductById(productId);

    return NextResponse.json(
      new ApiResponse(200, "Product fetched successfully", product),
      { status: 200 },
    );
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  return handleRequest(async () => {
    const { productId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) {
      throw new ApiError(401, "You are not authenticated");
    }
    const body = await request.json();

    const validatedBody = validate(updateProductSchema, {
      ...body,
      productId,
    });

    const product = await ProductService.updateProduct(
      validatedBody,
      session.user.id,
      productId,
    );

    return NextResponse.json(
      new ApiResponse(200, "Product updated successfully", product),
      { status: 200 },
    );
  });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> },
) {
  return handleRequest(async () => {
    const { productId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) {
      throw new ApiError(401, "You are not authenticated");
    }
    await ProductService.deleteProduct(session.user.id, productId);

    return NextResponse.json(
      new ApiResponse(200, "Product deleted successfully"),
      { status: 200 },
    );
  });
}
