"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";
import Button from "./Button";

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
}) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(
    typeof value === "string" ? value : value?.preview || null,
  );

  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
    } else if (value?.preview) {
      setPreview(value.preview);
    } else {
      setPreview(null);
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > maxSize) {
      alert("Image is too large.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setPreview((oldPreview) => {
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

    setPreview(null);

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

      <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-border bg-background">
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          className="flex min-h-72 cursor-pointer items-center justify-center transition hover:border-brand-primary"
        >
          {preview ? (
            <div className="relative h-72 w-full">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="space-y-3 text-center">
              <ImagePlus className="mx-auto h-10 w-10 text-brand-primary" />

              <div>
                <p className="font-medium">Click to upload an image</p>

                {description && (
                  <p className="mt-1 text-sm text-text dark:text-text-dark">
                    {description}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {preview && (
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
