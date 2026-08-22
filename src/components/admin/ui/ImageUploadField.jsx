"use client";

import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { HardDriveUpload, ImagePlus, Images, Loader2, Trash2, X } from "lucide-react";
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
  const [chooserOpen, setChooserOpen] = useState(false);
  const [library, setLibrary] = useState([]);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [libraryError, setLibraryError] = useState("");
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
    setChooserOpen(false);
  };

  const loadLibrary = async () => {
    if (library.length || libraryLoading) return;
    setLibraryLoading(true);
    setLibraryError("");

    try {
      const response = await fetch("/api/admin/media");
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to load media library.");
      setLibrary(result.data ?? []);
    } catch (error) {
      setLibraryError(error.message);
    } finally {
      setLibraryLoading(false);
    }
  };

  const openChooser = () => {
    if (!disabled) {
      setChooserOpen(true);
      void loadLibrary();
    }
  };

  const chooseLocalFile = () => {
    setChooserOpen(false);
    window.setTimeout(() => inputRef.current?.click(), 0);
  };

  const chooseLibraryImage = (item) => {
    setLocalPreview(null);
    if (inputRef.current) inputRef.current.value = "";
    onChange?.({ url: item.url, preview: item.url, media: item });
    setChooserOpen(false);
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
          onClick={openChooser}
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
              onClick={(event) => {
                event.stopPropagation();
                openChooser();
              }}
            >
              Replace
            </Button>

            <Button
              type="button"
              size="sm"
              variant="danger"
              leftIcon={Trash2}
              onClick={(event) => {
                event.stopPropagation();
                removeImage();
              }}
            >
              Remove
            </Button>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Dialog.Root open={chooserOpen} onOpenChange={setChooserOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-60 bg-black/55 backdrop-blur-sm animate-in fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-60 flex max-h-[85vh] w-[92vw] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl outline-none dark:bg-gray-900">
            <div className="flex items-start justify-between gap-4 border-b border-border bg-card px-5 py-4 dark:bg-gray-800 sm:px-6">
              <div>
                <Dialog.Title className="font-heading text-xl font-semibold text-heading dark:text-heading-dark">Choose an image</Dialog.Title>
                <Dialog.Description className="mt-1 text-sm text-text dark:text-text-dark">Use an uploaded image or select a new file from your computer.</Dialog.Description>
              </div>
              <Dialog.Close asChild>
                <button type="button" aria-label="Close image chooser" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text transition hover:bg-brand-primary/10 hover:text-brand-primary dark:text-text-dark"><X className="h-5 w-5" /></button>
              </Dialog.Close>
            </div>

            <div className="overflow-y-auto p-5 sm:p-6">
              <button type="button" onClick={chooseLocalFile} className="mb-6 flex w-full items-center gap-4 rounded-2xl border border-dashed border-brand-primary/40 bg-brand-primary/5 p-4 text-left transition hover:border-brand-primary hover:bg-brand-primary/10">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-white"><HardDriveUpload className="h-5 w-5" /></span>
                <span><span className="block font-medium text-heading dark:text-heading-dark">Choose from computer</span><span className="mt-1 block text-sm text-text dark:text-text-dark">Upload a new image from local storage.</span></span>
              </button>

              <div className="mb-4 flex items-center gap-2">
                <Images className="h-5 w-5 text-brand-primary" />
                <h3 className="font-semibold text-heading dark:text-heading-dark">Media Library</h3>
              </div>

              {libraryLoading ? (
                <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-text dark:text-text-dark"><Loader2 className="h-5 w-5 animate-spin text-brand-primary" /> Loading media...</div>
              ) : libraryError ? (
                <div className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">{libraryError}</div>
              ) : library.length ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {library.map((item) => (
                    <button key={item.id} type="button" onClick={() => chooseLibraryImage(item)} className="group/library overflow-hidden rounded-2xl border border-border bg-card text-left transition hover:border-brand-primary hover:ring-2 hover:ring-brand-primary/20 dark:bg-gray-800">
                      <span className="block aspect-4/3 overflow-hidden bg-muted">
                        {/* Media URLs can point to user-uploaded files. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.url} alt={item.name} className="h-full w-full object-cover transition duration-300 group-hover/library:scale-105" />
                      </span>
                      <span className="block truncate px-3 py-2 text-sm text-heading dark:text-heading-dark">{item.name}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center"><Images className="mb-3 h-8 w-8 text-text-muted" /><p className="font-medium text-heading dark:text-heading-dark">No uploaded images yet</p><p className="mt-1 text-sm text-text dark:text-text-dark">Choose a file from your computer to add one.</p></div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
