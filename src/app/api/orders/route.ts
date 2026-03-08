import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";
import { OrderService } from "@/services/order.service";

export async function POST(request: Request) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }

        const body = await request.json();
        const order = await OrderService.createOrder(body, session.user.id);

        return NextResponse.json(new ApiResponse(201, "Order created successfully", order), { status: 201 })
    })
}

export async function GET(request: Request) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);
        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }
        const isCreator = session.user.role === "creator";
        const { searchParams } = new URL(request.url);
        const body = {
            sellerId: session.user.id,
            page: Number(searchParams.get("page") || 1),
            limit: Number(searchParams.get("limit") || 10),
            sortBy: searchParams.get("sortBy") || "createdAt",
            sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc"
        };

        if (isCreator) {
            const orders = await OrderService.getOrderBySellerId(body.sellerId, body.page, body.limit, body.sortBy, body.sortOrder);

            return NextResponse.json(new ApiResponse(200, "Orders fetched successfully", orders), { status: 200 })
        }
        else {
            const orders = await OrderService.getOrderByBuyerId(session.user.id, body.page, body.limit, body.sortBy, body.sortOrder);

            return NextResponse.json(new ApiResponse(200, "Orders fetched successfully", orders), { status: 200 })
        }
    })
}