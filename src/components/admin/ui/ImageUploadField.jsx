"use client";

import { useRef } from "react";
import Image from "next/image";

export default function ImageUploadField({
  label,
  description,
  image,
  onChange,
}) {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    onChange?.(imageUrl);
  };

  return (
    <div>
      {label && (
        <label
          className="
            mb-2
            block
            text-sm
            font-medium
            text-heading
            dark:text-heading-dark
          "
        >
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onClick={() => inputRef.current?.click()}
        className="
          relative
          flex
          min-h-60
          cursor-pointer
          items-center
          justify-center
          overflow-hidden
          rounded-3xl
          border-2
          border-dashed
          border-border
          bg-background
          transition
          hover:border-brand-primary
        "
      >
        {image ? (
          <Image src={image} alt="Preview" fill className="object-cover" />
        ) : (
          <div className="text-center">
            <p className="font-medium">Click to upload image</p>

            {description && (
              <p className="mt-2 text-sm text-text dark:text-text-dark">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
