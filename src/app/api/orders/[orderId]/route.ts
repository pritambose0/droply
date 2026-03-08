import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";
import { OrderService } from "@/services/order.service";

export async function GET({ params }: { params: Promise<{ orderId: string }> }) {
    return handleRequest(async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "You are not authenticated");
        }
        const order = await OrderService.getOrderById((await params).orderId, session.user.id);

        return NextResponse.json(new ApiResponse(200, "Order fetched successfully", order), { status: 200 })
    })
}