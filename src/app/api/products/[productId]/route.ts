import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { ProductService } from "@/services/product.service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
    return handleRequest(async () => {
        const product = await ProductService.getProductById((await params).productId);

        return NextResponse.json(new ApiResponse(200, "Product fetched successfully", product), { status: 200 })
    })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ productId: string }> }) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }
        const body = await request.json();
        const product = await ProductService.updateProduct(body, session.user.id, (await params).productId);

        return NextResponse.json(new ApiResponse(200, "Product updated successfully", product), { status: 200 })
    })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }
        await ProductService.deleteProduct(session.user.id, (await params).productId);

        return NextResponse.json(new ApiResponse(200, "Product deleted successfully"), { status: 200 })
    })
}