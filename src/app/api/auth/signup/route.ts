import { ApiResponse } from "@/helpers/ApiResponse";
import { handleRequest } from "@/helpers/handleRequest";
import { AuthService } from "@/services/auth.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    return handleRequest(async () => {
        const body = await request.json();
        const user = await AuthService.registerUser(body);

        return NextResponse.json(new ApiResponse(201, "User created successfully", user), { status: 201 })
    })
}