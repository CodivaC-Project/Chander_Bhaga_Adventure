"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, RefreshCcw, X, Link2 } from "lucide-react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be under 10MB.");
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
      onChange(data.url);
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
    onChange(url);
    setUrlValue("");
    setShowUrl(false);
    setError("");
  };

  return (
    <div>
      {label && <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">{label}</label>}

      {/* Hidden file input — always mounted so Replace works once an image is set */}
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

      {value ? (
        <div className="relative group overflow-hidden rounded-lg border border-[var(--color-line)]">
          <img src={value} alt="" className="w-full h-44 object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-sm rounded-lg hover:bg-gray-100 transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" /> Replace
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-sm rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            dragOver
              ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
              : "border-[var(--color-line)] hover:border-[var(--color-ink-soft)]"
          }`}
        >
          {uploading ? (
            <div className="py-4 flex flex-col items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--color-primary)]" />
              <p className="text-sm text-[var(--color-ink-soft)]">Uploading…</p>
            </div>
          ) : (
            <>
              <ImagePlus className="w-8 h-8 mx-auto mb-2 text-[var(--color-ink-soft)]" />
              <p className="text-sm text-[var(--color-ink)] font-medium">Click to upload or drag &amp; drop</p>
              <p className="text-xs text-[var(--color-ink-soft)] mt-1">PNG, JPG, WebP, GIF · up to 10MB</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUrl(!showUrl);
                }}
                className="mt-3 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
              >
                <Link2 className="w-3 h-3" /> Or paste an image URL
              </button>
            </>
          )}
        </div>
      )}

      {showUrl && !value && (
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
