"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import Button from "./Button";

function isValidPreviewSource(source) {
  if (typeof source !== "string" || !source.trim()) return false;
  if (source.startsWith("/") || source.startsWith("blob:") || source.startsWith("data:image/")) return true;

  try {
    const url = new URL(source);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ImageUploadField({
  id,
  label,
  description,
  value,
  onChange,
  error,
  disabled = false,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  compact = false,
}) {
  const inputRef = useRef(null);

  const [localPreview, setLocalPreview] = useState(null);
  const preview = localPreview ??
    (typeof value === "string" ? value : value?.preview || null);
  const validPreview = isValidPreviewSource(preview);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > maxSize) {
      alert("Image is too large.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setLocalPreview((oldPreview) => {
      if (oldPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(oldPreview);
      }

      return previewUrl;
    });

    onChange?.({
      file,
      preview: previewUrl,
    });
  };

  const removeImage = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setLocalPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-heading dark:text-heading-dark"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="group relative overflow-hidden rounded-3xl border-2 border-dashed border-border bg-background transition-colors hover:border-brand-primary focus-within:border-brand-primary">
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className={`${compact ? "min-h-36" : "min-h-72"} flex cursor-pointer items-center justify-center`}
        >
          {validPreview ? (
            <div className={`relative w-full ${compact ? "h-36" : "h-72"}`}>
              {/* Upload previews can be blob URLs or user-configured remote URLs. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="space-y-3 px-3 text-center">
              <ImagePlus className="mx-auto h-10 w-10 text-brand-primary" />

              <div>
                <p className="font-medium">{preview ? "Current image path is invalid" : "Click to upload an image"}</p>

                {description && (
                  <p className="mt-1 text-sm text-text dark:text-text-dark">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {preview && !compact && (
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </Button>

            <Button
              type="button"
              size="sm"
              variant="danger"
              leftIcon={Trash2}
              onClick={removeImage}
            >
              Remove
            </Button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
