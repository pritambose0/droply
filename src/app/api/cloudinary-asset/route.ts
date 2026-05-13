import { handleRequest } from "@/helpers/handleRequest";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import { ApiError } from "@/helpers/ApiError";
import { ApiResponse } from "@/helpers/ApiResponse";

export async function DELETE(req: Request) {
  return handleRequest(async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw new ApiError(401, "You are not authenticated");
    }

    if (session.user.role !== "creator") {
      throw new ApiError(403, "Only creators can delete files");
    }

    const { publicId, resourceType } = await req.json();

    if (!publicId) {
      throw new ApiError(400, "Public ID is required");
    }

    const userFolderPrefix = `droply/products/${session.user.id}/`;
    if (!publicId.startsWith(userFolderPrefix)) {
      throw new ApiError(403, "You are not authorized to delete this file");
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    if (result.result !== "ok") {
      throw new ApiError(500, "Failed to delete file from Cloudinary");
    }

    return NextResponse.json(
      new ApiResponse(200, "File deleted successfully", result),
    );
  });
}
