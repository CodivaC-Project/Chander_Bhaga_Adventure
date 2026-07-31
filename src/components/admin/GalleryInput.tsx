"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, X, Link2 } from "lucide-react";

interface GalleryInputProps {
  value: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  max?: number;
}

export function GalleryInput({ value, onChange, label = "Gallery Images", max = 10 }: GalleryInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const addUrl = (url: string) => {
    if (!url || value.length >= max) return;
    onChange([...value, url]);
  };

  const uploadFile = async (file: File) => {
    if (uploading) return; // prevent concurrent uploads racing on stale `value`
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB.");
      return;
    }
    if (value.length >= max) {
      setError(`You can add up to ${max} images.`);
      return;
    }
    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      addUrl(data.url);
    } catch (err: any) {
      setError(err?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const handleUrlAdd = () => {
    const url = urlValue.trim();
    if (!url) return;
    addUrl(url);
    setUrlValue("");
    setShowUrl(false);
    setError("");
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">{label}</label>}

      {/* Hidden file input — always mounted so uploads work from anywhere in the component */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) uploadFile(f);
          e.target.value = "";
        }}
      />

      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-2">
          {value.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Gallery ${i + 1}`}
                className="w-full h-20 object-cover rounded-lg border border-[var(--color-line)]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='12' x='50' y='55' text-anchor='middle'%3EBroken%3C/text%3E%3C/svg%3E";
                }}
              />
              <button
                onClick={() => remove(i)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
            : "border-[var(--color-line)] hover:border-[var(--color-ink-soft)]"
        }`}
      >
        {uploading ? (
          <div className="py-2 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-[var(--color-primary)]" />
            <p className="text-sm text-[var(--color-ink-soft)]">Uploading…</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-1.5 text-sm text-[var(--color-ink)] font-medium">
              <ImagePlus className="w-4 h-4" />
              Click to upload or drag &amp; drop
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowUrl(!showUrl);
              }}
              className="mt-1.5 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
            >
              <Link2 className="w-3 h-3" /> Or paste an image URL
            </button>
          </>
        )}
      </div>

      {showUrl && (
        <div className="flex gap-2 mt-2">
          <input
            type="url"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleUrlAdd()}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
          />
          <button
            type="button"
            onClick={handleUrlAdd}
            className="px-3 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Add
          </button>
        </div>
      )}

      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}
