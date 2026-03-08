import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { ProductService } from "@/services/product.service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";

export async function POST(request: Request) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }

        if (session.user.role !== "creator") {
            throw new ApiError(403, "Only creators can create products");
        }
        const body = await request.json();
        const product = await ProductService.createProduct(body, session.user.id);

        return NextResponse.json(new ApiResponse(201, "Product created successfully", product), { status: 201 })
    })
}

export async function GET(request: Request) {
    return handleRequest(async () => {
        const { searchParams } = new URL(request.url);
        const body = {
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 10),
            query: searchParams.get("query") || "",
            sortBy: searchParams.get("sortBy") || "createdAt",
            sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc"
        };
        const products = await ProductService.getAllProducts(body);

        return NextResponse.json(new ApiResponse(200, "Products fetched successfully", products), { status: 200 })
    })
}