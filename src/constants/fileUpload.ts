export const UPLOAD_CONFIG = {
  THUMBNAIL: {
    ALLOWED_TYPES: ["image/png", "image/jpeg", "image/webp"],
    MAX_SIZE_MB: 5,
    ACCEPT_STR: "image/png,image/jpeg,image/webp",
  },
  PRODUCT_FILE: {
    ALLOWED_TYPES: [
      "application/zip",
      "application/x-zip-compressed",
      "application/pdf",
      "video/mp4",
    ],
    MAX_SIZE_MB: 100,
    ACCEPT_STR: ".zip,.pdf,.mp4",
  },
} as const;
