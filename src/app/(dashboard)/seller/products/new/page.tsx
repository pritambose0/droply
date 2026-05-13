"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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
} from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { ProductAPI } from "@/lib/apiClient";
import Image from "next/image";
import { UPLOAD_CONFIG } from "@/constants/fileUpload";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateProductDto,
  productFormSchema,
  ProductFormSchema,
} from "@/schemas/productSchema";
import { useForm } from "react-hook-form";
import PreviewModal from "@/components/PreviewModal";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
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

  const router = useRouter();

  const {
    uploadFile,
    deleteFile,
    isLoading: isUploading,
    progress,
    error: uploadError,
  } = useCloudinaryUpload();

  // Auto-dismiss success message after 5s
  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => setSubmitSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess]);

  // Combine all error sources into one
  const activeError = submitError || uploadError || null;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProductFormSchema>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      currency: "USD",
      tags: "",
      status: "published",
    },
  });

  const onSubmit = async (data: ProductFormSchema) => {
    setSubmitError(null);
    setSubmitSuccess(false);
    console.log("DATA", data);

    // Upload thumbnail
    if (!thumbFile) {
      setSubmitError("Please select a product thumbnail.");
      return;
    }
    if (!productFile) {
      setSubmitError("Please select a product file.");
      return;
    }

    const thumbResult = await uploadFile(thumbFile);
    if (!thumbResult) return;

    const fileResult = await uploadFile(productFile);
    if (!fileResult) {
      await deleteFile(thumbResult.publicId, thumbResult.resourceType);
      return;
    }

    // Submit to backend
    const payload: CreateProductDto = {
      ...data,
      thumbnailUrl: thumbResult.secureUrl,
      fileUrl: fileResult.secureUrl,
      status: data.status as "draft" | "published",
      tags:
        typeof data.tags === "string"
          ? data.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : data.tags,
    };

    try {
      const res = await ProductAPI.create(payload);
      if (!res.success)
        throw new Error(res.message || "Failed to create product.");
      setSubmitSuccess(true);
      reset();
      router.replace("/seller/products");
    } catch (err: any) {
      await Promise.all([
        deleteFile(thumbResult.publicId, thumbResult.resourceType),
        deleteFile(fileResult.publicId, fileResult.resourceType),
      ]);
      setSubmitError(
        err.response?.data?.message || err.message || "Something went wrong.",
      );
    }
  };

  const formValues = watch();

  return (
    <>
      <form
        className="max-w-4xl mx-auto space-y-6 pb-24 animate-fade-in-up"
        onSubmit={handleSubmit(onSubmit, (error) => {
          console.log("FORM ERROR:", error);
        })}
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
                <h1 className="text-xl font-bold text-foreground">
                  Create New Product
                </h1>
                <p className="text-xs text-muted-foreground">
                  Draft mode automatically saved.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end sm:self-auto">
              <Button
                variant="ghost"
                onClick={() => setShowPreview(true)}
                className="px-4 py-2"
                type="button"
                disabled={isUploading}
              >
                Preview
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setValue("status", "draft");
                  handleSubmit(onSubmit)();
                }}
                className="px-4 py-2"
                type="button"
                disabled={isUploading}
              >
                Save Draft
              </Button>
              <Button
                variant="primary"
                className="px-4 py-2"
                type="submit"
                isLoading={isUploading}
                loadingText={`Uploading… ${progress}%`}
              >
                <Save size={16} />
                Publish
              </Button>
            </div>
          </div>

          {/* ── Upload Progress Bar ── */}
          {isUploading && (
            <div className="mt-2 rounded-xl overflow-hidden bg-surface/50 backdrop-blur-sm border border-card-border/40 h-1.5">
              <div
                className="h-full bg-linear-to-r from-accent to-purple-400 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* ── Error Toast (always visible in sticky header) ── */}
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

          {/* ── Success Toast ── */}
          {submitSuccess && (
            <div className="mt-2 p-3 rounded-xl border border-success/30 bg-success/10 backdrop-blur-sm text-success text-sm flex items-center gap-2.5 animate-fade-in">
              <CheckCircle2 size={16} className="shrink-0" />
              Product published successfully!
            </div>
          )}
        </div>

        <div className="space-y-8 mt-8">
          {/* ── Section: Basic Info ── */}
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

          {/* ── Section: Pricing ── */}
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

          {/* ── Section: Media ── */}
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
                Product Thumbnail
                <span className="text-red-500"> *</span>
              </label>

              {thumbPreview && (
                <p className="text-xs text-muted-foreground mb-2">
                  Product Thumbnail Preview
                </p>
              )}

              <Input
                ref={thumbInputRef}
                type="file"
                hidden
                accept={UPLOAD_CONFIG.THUMBNAIL.ACCEPT_STR}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleThumbFile(file);
                  }
                }}
              />

              {!thumbPreview ? (
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
                    {UPLOAD_CONFIG.THUMBNAIL.MAX_SIZE_MB}
                    MB)
                  </p>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden group">
                  <Image
                    src={thumbPreview}
                    alt="Thumbnail Preview"
                    width={1280}
                    height={720}
                    className="w-full aspect-video object-cover"
                  />

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
              )}

              {thumbError && (
                <p className="text-danger text-[11px] font-medium mt-1.5 flex items-center gap-1.5 animate-fade-in">
                  <ShieldAlert size={13} className="shrink-0" /> {thumbError}
                </p>
              )}
            </div>
          </section>

          {/* ── Section: Delivery Files ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <Download size={18} className="text-accent" /> Delivery Files
              </h2>
              <p className="text-sm text-muted-foreground">
                The actual file buyers will download after purchase.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-accent/20 bg-accent/5 flex items-start gap-4">
              <ShieldAlert className="text-accent shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Secure Delivery
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Files are encrypted and securely delivered to buyers
                  post-purchase via signed URLs.
                </p>
              </div>
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
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleProductFile(file);
                }}
              />

              <Button
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

              {productFileName && (
                <div className="p-3 rounded-xl bg-surface border border-card-border flex items-center justify-between group animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground truncate max-w-[200px]">
                        {productFileName}
                      </span>
                      <span className="text-[10px] text-success">
                        Ready to upload
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="none"
                    onClick={removeProductFile}
                    className="text-xs text-muted-foreground hover:text-danger transition-colors"
                  >
                    Remove
                  </Button>
                </div>
              )}

              {fileError && (
                <p className="text-danger text-[11px] font-medium mt-1.5 flex items-center gap-1.5 animate-fade-in">
                  <ShieldAlert size={13} className="shrink-0" /> {fileError}
                </p>
              )}
            </div>
          </section>

          {/* ── Section: Tags ── */}
          <section className="glass rounded-2xl p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-1">
                <Plus size={18} className="text-accent" /> Tags
              </h2>
              <p className="text-sm text-muted-foreground">
                Add up to 10 tags to help buyers find your product.
              </p>
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
          thumbnailUrl: thumbPreview || undefined,
        }}
      />
    </>
  );
}
