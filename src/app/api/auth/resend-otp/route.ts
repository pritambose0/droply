import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { AuthService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    return handleRequest(async () => {
        const body = await request.json();
        await AuthService.resendOTP(body);

        return NextResponse.json(new ApiResponse(200, "If this email exists, an OTP has been sent"), { status: 200 });
    })
}