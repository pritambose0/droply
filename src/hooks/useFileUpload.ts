import { useRef, useState, ChangeEvent, RefObject, useEffect } from "react";

type UseFileUploadReturn = {
  inputRef: RefObject<HTMLInputElement | null>;
  preview: string | null;
  fileName: string;
  file: File | null;
  handleFile: (file: File | null) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  error: string | null;
};

type UploadOptions = {
  maxSizeMB?: number;
  allowedTypes?: string[];
  generatePreview?: boolean;
};

export const useFileUpload = ({
  maxSizeMB = 5,
  allowedTypes = [],
  generatePreview = true,
}: UploadOptions = {}): UseFileUploadReturn => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (fileData: File | null) => {
    setError(null);
    if (!fileData) return;

    // Validation
    if (allowedTypes.length > 0 && !allowedTypes.includes(fileData.type)) {
      setError(`Only ${allowedTypes.join(", ")} files are allowed.`);
      return;
    }

    if (fileData.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds the ${maxSizeMB}MB limit.`);
      return;
    }

    setFile(fileData);
    setFileName(fileData.name);

    if (generatePreview && fileData.type.startsWith("image/")) {
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(fileData));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (selected) {
      handleFile(selected);
    }
  };

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFileName("");
    setFile(null);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return {
    inputRef,
    preview,
    fileName,
    file,
    handleFile,
    handleChange,
    removeFile,
    error,
  };
};
