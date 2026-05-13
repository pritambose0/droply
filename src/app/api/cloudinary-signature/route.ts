import { handleRequest } from "@/helpers/handleRequest";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";

export async function POST() {
  return handleRequest(async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new ApiError(401, "You are not authenticated");
    }

    if (session.user.role !== "creator") {
      throw new ApiError(403, "Only creators can upload files");
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const params = {
      timestamp,
      folder: `droply/products/${session.user.id}`,
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return NextResponse.json(
      new ApiResponse(200, "Signature generated successfully", {
        ...params,
        signature,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      }),
    );
  });
}
