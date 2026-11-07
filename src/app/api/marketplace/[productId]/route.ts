import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { ProductService } from "@/services/product.service";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> },
) {
  return handleRequest(async () => {
    const { productId } = await params;

    const product = await ProductService.getMarketplaceProductById(productId);

    return NextResponse.json(
      new ApiResponse(200, "Product fetched successfully", product),
      { status: 200 },
    );
  });
}
