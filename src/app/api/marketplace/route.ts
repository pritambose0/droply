import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { validate } from "@/helpers/validate";
import { getAllMarketplaceProductsSchema } from "@/schemas/productSchema";
import { ProductService } from "@/services/product.service";
import { NextResponse } from "next/server";

function toPositiveInt(value: string | null, fallback: number) {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export async function GET(request: Request) {
  return handleRequest(async () => {
    const { searchParams } = new URL(request.url);

    const validatedQuery = validate(getAllMarketplaceProductsSchema, {
      page: toPositiveInt(searchParams.get("page"), 1),
      limit: toPositiveInt(searchParams.get("limit"), 9),
      query: searchParams.get("query") || "",
      sortBy: searchParams.get("sortBy") || "popular",
      tag: searchParams.get("tag") || "",
      price: searchParams.get("price") || "all",
    });

    const products =
      await ProductService.getMarketplaceProducts(validatedQuery);

    return NextResponse.json(
      new ApiResponse(200, "Products fetched successfully", products),
      { status: 200 },
    );
  });
}
