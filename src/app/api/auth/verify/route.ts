import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { AuthService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    return handleRequest(async () => {
        const body = await request.json();
        await AuthService.verifyCode(body);

        return NextResponse.json(new ApiResponse(200, "User verified successfully"), { status: 200 })
    })
}