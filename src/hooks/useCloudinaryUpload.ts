import { useState, useCallback } from "react";
import axios from "axios";
import { CloudinaryAPI } from "@/lib/apiClient";

export function useCloudinaryUpload() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(
    async (
      file: File,
    ): Promise<{
      secureUrl: string;
      publicId: string;
      resourceType: string;
    } | null> => {
      setIsLoading(true);
      setProgress(0);
      setError(null);

      try {
        // Get signature and config from backend
        const res = await CloudinaryAPI.getSignature();

        if (!res.success || !res.data) {
          throw new Error("Could not initialize secure upload session.");
        }

        const { signature, timestamp, apiKey, cloudName, folder } = res.data;

        // Prepare Form Data for Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", folder);

        // Perform Upload with progress tracking
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          formData,
          {
            onUploadProgress: (e) => {
              const percentCompleted = Math.round(
                (e.loaded * 100) / (e.total || 1),
              );
              setProgress(percentCompleted);
            },
          },
        );

        return {
          secureUrl: response.data.secure_url,
          publicId: response.data.public_id,
          resourceType: response.data.resource_type,
        };
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Upload failed. Please try again.";
        setError(msg);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const deleteFile = useCallback(
    async (publicId: string, resourceType: string): Promise<boolean> => {
      setIsLoading(true);
      setProgress(0);
      setError(null);

      try {
        const res = await CloudinaryAPI.deleteAsset(publicId, resourceType);

        if (!res.success) {
          throw new Error("Failed to delete file. Please try again.");
        }
        return true;
      } catch (err: any) {
        const msg =
          err.response?.data?.message ||
          err.message ||
          "Failed to delete image. Please try again.";
        setError(msg);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    uploadFile,
    deleteFile,
    isLoading,
    progress,
    error,
    reset: () => {
      setProgress(0);
      setError(null);
    },
  };
}
