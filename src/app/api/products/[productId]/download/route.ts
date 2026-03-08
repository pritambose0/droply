import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { ProductService } from "@/services/product.service";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/options"

export async function GET(request: Request, { params }: { params: Promise<{ productId: string }> }) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }

        const { productId } = await params;
        const { searchParams } = new URL(request.url);
        const orderId = searchParams.get("orderId");

        if (!orderId) {
            throw new ApiError(400, "Order ID is required");
        }

        const fileUrl = await ProductService.downloadProduct(productId, orderId, session.user.id);

        return NextResponse.json(new ApiResponse(200, "File URL fetched successfully", fileUrl), { status: 200 })
    })
}