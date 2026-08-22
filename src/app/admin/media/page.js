"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import PageContainer from "@/components/admin/layout/PageContainer";

import PageHeader from "@/components/admin/ui/PageHeader";
import Card from "@/components/admin/ui/Card";
import Button from "@/components/admin/ui/Button";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";

import { toast } from "@/components/admin/ui/Toast";

export default function MediaPage() {
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch("/api/admin/media")
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setMedia(result.data ?? []);
      })
      .catch((error) => toast.error(error.message));
  }, []);

  const filteredMedia = useMemo(() => {
    return media.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [media, search]);

  const handleCopy = async (url) => {
    await navigator.clipboard.writeText(url);
    toast.success("File URL copied.");
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/admin/media/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) return toast.error("Unable to delete media.");
    setMedia((items) => items.filter((item) => item.id !== id));
    toast.success("Media deleted.");
  };

  const handleUpload = async (event) => {
    const input = event.currentTarget;
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;

    setUploading(true);
    let uploadedCount = 0;

    try {
      for (const file of files) {
        const body = new FormData();
        body.append("file", file);

        const response = await fetch("/api/admin/uploads", {
          method: "POST",
          body,
        });
        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || `Unable to upload ${file.name}.`);
        }

        setMedia((current) => [result.data, ...current]);
        uploadedCount += 1;
      }

      toast.success(
        `${uploadedCount} media file${uploadedCount === 1 ? "" : "s"} uploaded.`,
      );
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Media Library"
        description="Manage uploaded media files."
        actions={
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
              multiple
              className="sr-only"
              onChange={handleUpload}
            />
            <Button
              loading={uploading}
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              Upload Media
            </Button>
          </>
        }
      />

      <Card>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search media..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-2 outline-none focus:border-brand-primary dark:border-border-dark dark:bg-background-dark"
          />
        </div>

        {filteredMedia.length === 0 ? (
          <div className="py-16 text-center text-text dark:text-text-dark">
            No media found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredMedia.map((item) => (
              <Card key={item.id}>
                <div className="space-y-4">
                  <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="truncate font-medium text-heading dark:text-heading-dark">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-text dark:text-text-dark">
                      {Math.round(item.sizeBytes / 1024)} KB
                    </p>

                    <p className="text-xs text-text-muted dark:text-text-dark">
                      {new Date(item.uploadedAt).toLocaleDateString("en-US")}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <ConfirmDialog
                      title="Delete Media"
                      description={`Delete "${item.name}"? This action cannot be undone.`}
                      confirmText="Delete"
                      onConfirm={() => handleDelete(item.id)}
                    >
                      <Button
                        size="sm"
                        variant="destructive"
                        className="w-full text-red-400 px-4 py-2 rounded-lg border border-red-200 dark:border-gray-600 hover:border-red-400"
                      >
                        Delete
                      </Button>
                    </ConfirmDialog>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </PageContainer>
  );
}
