"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  Tag,
  FileText,
  Image as ImageIcon,
  ShieldAlert,
  Download,
  Plus,
  AlertCircle,
  CheckCircle2,
  X,
} from "lucide-react";
import { FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

import Button from "@/components/Button";
import Input from "@/components/Input";
import PreviewModal from "@/components/PreviewModal";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import {
  getApiErrorMessage,
  useCreateProduct,
  useUpdateProduct,
} from "@/hooks/useProducts";
import { UPLOAD_CONFIG } from "@/constants/fileUpload";
import {
  CreateProductDto,
  productFormSchema,
  ProductFormSchema,
  ProductResponseDto,
  UpdateProductDto,
} from "@/schemas/productSchema";

type ProductFormData = ProductResponseDto & { _id?: string };

interface ProductFormProps {
  mode?: "create" | "edit";
  initialData?: ProductFormData;
}

export default function ProductForm({
  mode = "create",
  initialData,
}: ProductFormProps) {
  const router = useRouter();

  const {
    inputRef: thumbInputRef,
    preview: thumbPreview,
    file: thumbFile,
    handleFile: handleThumbFile,
    removeFile: removeThumb,
    error: thumbError,
  } = useFileUpload({
    allowedTypes: [...UPLOAD_CONFIG.THUMBNAIL.ALLOWED_TYPES],
    maxSizeMB: UPLOAD_CONFIG.THUMBNAIL.MAX_SIZE_MB,
  });

  const {
    inputRef: fileInputRef,
    fileName: productFileName,
    file: productFile,
    handleFile: handleProductFile,
    removeFile: removeProductFile,
    error: fileError,
  } = useFileUpload({
    allowedTypes: [...UPLOAD_CONFIG.PRODUCT_FILE.ALLOWED_TYPES],
    maxSizeMB: UPLOAD_CONFIG.PRODUCT_FILE.MAX_SIZE_MB,
    generatePreview: false,
  });

  const [showPreview, setShowPreview] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isUploadingAll, setIsUploadingAll] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);

  const { uploadFile, error: uploadError } = useCloudinaryUpload();

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const isSaving =
    isUploadingAll || createProduct.isPending || updateProduct.isPending;

  // Auto-dismiss success message
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  const activeError = submitError || uploadError || null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price ?? undefined,
      currency: initialData?.currency || "USD",
      tags: Array.isArray(initialData?.tags)
        ? initialData?.tags.join(", ")
        : "",
      status: initialData?.status || "draft",
    },
  });

  const onSubmit = async (
    data: ProductFormSchema,
    intentStatus: "draft" | "published",
  ) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    // If creating, require files. If editing, files might already exist.
    if (mode === "create") {
      if (!thumbFile) {
        setSubmitError("Please select a product thumbnail.");
        return;
      }
      if (!productFile) {
        setSubmitError("Please select a product file.");
        return;
      }
    }

    let thumbnailUrl = initialData?.thumbnailUrl;
    let fileUrl = initialData?.fileUrl;
    let thumbnailPublicId = initialData?.thumbnailPublicId;
    let filePublicId = initialData?.filePublicId;

    const totalBytes = (thumbFile?.size ?? 0) + (productFile?.size ?? 0);
    let thumbLoaded = 0;
    let fileLoaded = 0;
    const reportOverallProgress = () => {
      if (totalBytes <= 0) return;
      const percent = Math.min(
        100,
        Math.round(((thumbLoaded + fileLoaded) / totalBytes) * 100),
      );
      setOverallProgress(percent);
    };

    try {
      if (thumbFile || productFile) {
        setIsUploadingAll(true);
        setOverallProgress(0);
        try {
          if (thumbFile) {
            const thumbResult = await uploadFile(thumbFile, (percent) => {
              thumbLoaded = (thumbFile.size * percent) / 100;
              reportOverallProgress();
            });
            if (!thumbResult) {
              throw new Error("Thumbnail upload failed. Please try again.");
            }
            thumbnailUrl = thumbResult.secureUrl;
            thumbnailPublicId = thumbResult.publicId;
          }

          if (productFile) {
            const fileResult = await uploadFile(productFile, (percent) => {
              fileLoaded = (productFile.size * percent) / 100;
              reportOverallProgress();
            });
            if (!fileResult) {
              throw new Error("Product file upload failed. Please try again.");
            }
            fileUrl = fileResult.secureUrl;
            filePublicId = fileResult.publicId;
          }
        } finally {
          setIsUploadingAll(false);
        }
      }

      const commonData = {
        ...data,
        status: intentStatus,
        tags:
          typeof data.tags === "string"
            ? data.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
            : data.tags,
      };

      if (mode === "create") {
        if (!thumbnailUrl || !fileUrl || !thumbnailPublicId || !filePublicId) {
          throw new Error("Please upload both a thumbnail and a product file.");
        }

        const createPayload: CreateProductDto = {
          ...commonData,
          thumbnailUrl,
          fileUrl,
          thumbnailPublicId,
          filePublicId,
        };

        await createProduct.mutateAsync(createPayload);
      } else {
        const productId = initialData?.id ?? initialData?._id;

        if (!productId) {
          throw new Error("Product ID not found.");
        }

        const updatePayload: UpdateProductDto = {
          ...commonData,
          productId,
        };

        // only update if new file uploaded
        if (thumbnailUrl) {
          updatePayload.thumbnailUrl = thumbnailUrl;
          updatePayload.thumbnailPublicId = thumbnailPublicId;
        }

        if (fileUrl) {
          updatePayload.fileUrl = fileUrl;
          updatePayload.filePublicId = filePublicId;
        }

        await updateProduct.mutateAsync({ id: productId, data: updatePayload });
      }

      setSubmitSuccess(true);

      if (mode === "create") {
        reset();
      }

      router.push("/seller/products");
    } catch (err) {
      setSubmitError(
        getApiErrorMessage(err, "Something went wrong. Please try again."),
      );
    }
  };

  const onInvalid = (formErrors: FieldErrors<ProductFormSchema>) => {
    const firstError = Object.values(formErrors)[0] as
      | { message?: string }
      | undefined;
    setSubmitError(
      firstError?.message ?? "Please fix the highlighted fields.",
    );
  };

  const submitWith = (status: "draft" | "published") => {
    void handleSubmit((data) => onSubmit(data, status), onInvalid)();
  };

  const formValues = watch();
  const displayThumbnail = thumbPreview || initialData?.thumbnailUrl;
  const displayProductFile = productFileName || initialData?.fileUrl;

  return (
    <>
      <form
        className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in-up"
        onSubmit={handleSubmit(
          (data) => onSubmit(data, getValues("status") ?? "draft"),
          onInvalid,
        )}
      >
        {/* ── Header / Sticky Action Bar ── */}
        <div className="sticky top-0 z-20 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between glass p-4 rounded-2xl border-card-border/60 shadow-sm gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="/seller/products"
                className="p-2 rounded-xl hover:bg-surface text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div>
                {mode === "edit" ? (
                  <>
                    <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                      Edit Product
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          formValues.status === "published"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-warning/10 text-warning"
                        }`}
                      >
                        {formValues.status}
                      </span>
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Last saved{" "}
                      {initialData?.updatedAt
                        ? new Date(initialData.updatedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                            },
                          )
                        : "recently"}
                    </p>
                  </>
                ) : (
                  <>
                    <h1 className="text-xl font-bold text-foreground">
                      Create New Product
                    </h1>
                    <p className="text-xs text-muted-foreground">
                      Save as a draft and publish when ready.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Button
                variant="ghost"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2"
                type="button"
                disabled={isSaving}
              >
                Preview
              </Button>
              <Button
                variant="secondary"
                onClick={() => submitWith("draft")}
                className="px-4 py-2"
                type="button"
                disabled={isSaving}
              >
                {formValues.status === "published" ? "Unpublish" : "Save Draft"}
              </Button>
              <Button
                variant="primary"
                onClick={() => submitWith("published")}
                className="px-4 py-2"
                type="button"
                isLoading={isSaving}
                loadingText={
                  isUploadingAll ? `Uploading… ${overallProgress}%` : "Saving…"
                }
              >
                <Save size={16} />
                {formValues.status === "draft" ? "Publish" : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* ── Progress & Alerts ── */}
          {isUploadingAll && (
            <div className="mt-2 rounded-xl overflow-hidden bg-surface/50 backdrop-blur-sm border border-card-border/40 h-1.5">
              <div
                className="h-full bg-linear-to-r from-accent to-purple-400 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          )}
          {activeError && (
            <div className="mt-2 p-3 rounded-xl border border-danger/30 bg-danger/10 backdrop-blur-sm text-danger text-sm flex items-center gap-2.5 animate-fade-in">
              <AlertCircle size={16} className="shrink-0" />
              <span className="flex-1">{activeError}</span>
              <button
                type="button"
                onClick={() => setSubmitError(null)}
                className="p-1 rounded-lg hover:bg-danger/20 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {submitSuccess && (
            <div className="mt-2 p-3 rounded-xl border border-success/30 bg-success/10 backdrop-blur-sm text-success text-sm flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 size={16} className="shrink-0" />
              Product saved successfully!
            </div>
          )}
        </div>

        <div className="space-y-8 mt-8">
          {/* ── Basic Info ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <FileText size={18} className="text-accent" /> Basic Info
              </h2>
              <p className="text-sm text-muted-foreground">
                The core details that define your product.
              </p>
            </div>
            <div className="space-y-5">
              <Input
                label="Product Title"
                {...register("title")}
                placeholder="e.g. Ultimate NextJS SaaS Starter"
                required
                variant="dashboard"
                error={errors.title?.message}
              />
              <Input
                label="Full Description"
                {...register("description")}
                placeholder="Describe what's included, features, and requirements..."
                required
                as="textarea"
                rows={8}
                variant="dashboard"
                error={errors.description?.message}
              />
            </div>
          </section>

          {/* ── Pricing ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <Tag size={18} className="text-accent" /> Pricing
              </h2>
              <p className="text-sm text-muted-foreground">
                Set your price for this product.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <Input
                label="Price (USD)"
                type="number"
                {...register("price", { valueAsNumber: true })}
                placeholder="29.00"
                required
                min={0}
                step="0.01"
                variant="dashboard"
                icon={<span>$</span>}
                error={errors.price?.message}
              />
            </div>
          </section>

          {/* ── Media ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <ImageIcon size={18} className="text-accent" /> Media
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload a thumbnail for your product.
              </p>
            </div>
            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">
                Product Thumbnail <span className="text-red-500">*</span>
              </label>

              <Input
                ref={thumbInputRef}
                type="file"
                hidden
                accept={UPLOAD_CONFIG.THUMBNAIL.ACCEPT_STR}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) handleThumbFile(file);
                }}
              />

              {displayThumbnail ? (
                <div className="relative rounded-2xl overflow-hidden group">
                  <Image
                    src={displayThumbnail}
                    alt="Thumbnail Preview"
                    width={1280}
                    height={720}
                    className="w-full aspect-video object-cover"
                  />
                  {thumbPreview && (
                    <Button
                      type="button"
                      variant="none"
                      onClick={removeThumb}
                      className="absolute top-3 right-3 p-0 w-9 h-9 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white/70 hover:text-white hover:bg-danger/20 hover:border-danger/30 transition-all flex items-center justify-center shadow-2xl group/remove"
                    >
                      <X
                        size={18}
                        className="group-hover/remove:rotate-90 transition-transform duration-300"
                      />
                    </Button>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <Button
                      type="button"
                      onClick={() => thumbInputRef.current?.click()}
                      className="text-sm px-4 py-2 rounded-xl bg-accent text-white hover:bg-primary/90 transition cursor-pointer"
                    >
                      Change
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => thumbInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleThumbFile(file);
                  }}
                  className="border-2 border-dashed border-card-border rounded-2xl p-10 flex flex-col items-center justify-center text-center bg-surface/30 hover:bg-surface/50 transition-all cursor-pointer group"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG, or WEBP (max.{" "}
                    {UPLOAD_CONFIG.THUMBNAIL.MAX_SIZE_MB}MB)
                  </p>
                </div>
              )}
              {thumbError && (
                <p className="text-danger text-[11px] font-medium mt-1.5 flex items-center gap-1.5 animate-fade-in">
                  <ShieldAlert size={13} className="shrink-0" /> {thumbError}
                </p>
              )}
            </div>
          </section>

          {/* ── Delivery Files ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <Download size={18} className="text-accent" /> Delivery Files
              </h2>
              <p className="text-sm text-muted-foreground">
                The actual file buyers will download.
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-foreground">
                Product File <span className="text-red-500">*</span>
              </label>

              <Input
                ref={fileInputRef}
                type="file"
                hidden
                accept={UPLOAD_CONFIG.PRODUCT_FILE.ACCEPT_STR}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) handleProductFile(file);
                }}
              />

              {displayProductFile ? (
                <div className="p-3 rounded-xl bg-surface border border-card-border flex items-center justify-between group animate-fade-in mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground truncate max-w-50">
                        {productFileName || "Current Uploaded File"}
                      </span>
                      <span className="text-[10px] text-success">Ready</span>
                    </div>
                  </div>
                  {productFileName && (
                    <Button
                      type="button"
                      variant="none"
                      onClick={removeProductFile}
                      className="text-xs text-muted-foreground hover:text-danger transition-colors"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ) : null}

              <Button
                type="button"
                variant="none"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleProductFile(file);
                }}
                className="w-full py-10 border-2 border-dashed border-card-border rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-surface/30 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-foreground">Upload Product File</span>
                  <span className="text-xs text-muted-foreground">
                    (.zip, .pdf, .mp4 up to{" "}
                    {UPLOAD_CONFIG.PRODUCT_FILE.MAX_SIZE_MB}MB)
                  </span>
                </div>
              </Button>
              {fileError && (
                <p className="text-danger text-[11px] font-medium mt-1.5 flex items-center gap-1.5 animate-fade-in">
                  <ShieldAlert size={13} className="shrink-0" /> {fileError}
                </p>
              )}
            </div>
          </section>

          {/* ── Tags ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <Plus size={18} className="text-accent" /> Tags
              </h2>
            </div>
            <Input
              label="Tags (comma separated)"
              {...register("tags")}
              placeholder="e.g. react, nextjs, tailwind"
              required
              variant="dashboard"
              error={errors.tags?.message}
            />
          </section>
        </div>
      </form>
      <PreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        data={{
          title: formValues.title,
          description: formValues.description,
          price: formValues.price,
          tags: formValues.tags,
          thumbnailUrl: displayThumbnail || undefined,
        }}
      />
    </>
  );
}
