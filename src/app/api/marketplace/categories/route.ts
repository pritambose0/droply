import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { ProductService } from "@/services/product.service";
import { NextResponse } from "next/server";

export async function GET() {
  return handleRequest(async () => {
    const categories = await ProductService.getMarketplaceCategories();

    return NextResponse.json(
      new ApiResponse(200, "Categories fetched successfully", categories),
      { status: 200 },
    );
  });
}
