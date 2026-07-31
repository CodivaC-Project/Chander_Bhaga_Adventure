"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Loader2, Star, X, Check, ImageOff } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  featured: boolean;
  order: number;
  createdAt: string;
}

const emptyForm: Partial<GalleryItem> = {
  title: "",
  description: "",
  imageUrl: "",
  category: "",
  featured: false,
  order: 0,
};

export default function GalleryAdminPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const categories = [
    "All",
    ...Array.from(new Set(items.map((i) => i.category).filter((c): c is string => !!c))),
  ];

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (categoryFilter !== "All") params.set("category", categoryFilter);
      const res = await fetch(`/api/admin/gallery?${params}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, order: items.length });
    setShowModal(true);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.imageUrl) return;
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        description: form.description || "",
        imageUrl: form.imageUrl,
        category: form.category || "",
        featured: !!form.featured,
        order: form.order ?? 0,
      };
      const res = editingId
        ? await fetch(`/api/admin/gallery?id=${editingId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/gallery", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setShowModal(false);
      showToast(editingId ? "Image updated" : "Image added to gallery");
      fetchItems();
    } catch (err: any) {
      showToast(err?.message || "Failed to save image");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setDeleteConfirm(null);
      showToast("Image removed from gallery");
      fetchItems();
    } catch (err: any) {
      showToast(err?.message || "Failed to delete image");
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Gallery ({items.length})</h1>
        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  categoryFilter === cat
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)] hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Upload Image
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[var(--color-ink)] text-white px-4 py-3 rounded-lg shadow-lg text-sm">
          <Check className="w-4 h-4 text-[var(--color-pine)]" />
          {toast}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center">
          <ImageOff className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">No images yet</h3>
          <p className="text-[var(--color-ink-soft)] mb-6">Upload your first image to showcase Kashmir&apos;s beauty on the public gallery.</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Upload Image
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg border border-[var(--color-line)] overflow-hidden hover:border-[var(--color-ink-soft)] transition-colors"
            >
              <div className="relative aspect-square">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='12' x='50' y='55' text-anchor='middle'%3EBroken%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 bg-white text-[var(--color-ink)] rounded-lg hover:bg-gray-100 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(item.id)}
                    className="p-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {item.featured && (
                  <span className="absolute top-2 left-2 flex items-center gap-1 bg-[var(--color-brass)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Star className="w-3 h-3 fill-current" /> Featured
                  </span>
                )}
                <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full">
                  #{idx + 1}
                </span>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-[var(--color-ink)] truncate">{item.title || "Untitled"}</p>
                <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">{item.category || "Uncategorized"}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[var(--color-line)]">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                {editingId ? "Edit Image" : "Upload Image"}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <ImageUploader
                value={form.imageUrl || ""}
                onChange={(url) => setForm({ ...form, imageUrl: url })}
                label="Image *"
              />
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Dal Lake Sunset"
                  className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category || ""}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    placeholder="e.g., Srinagar, Gulmarg"
                    list="gallery-categories"
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                  <datalist id="gallery-categories">
                    {categories.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order ?? 0}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Description</label>
                <textarea
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  placeholder="Optional caption for this photo…"
                  className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured || false}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-pine)] border-[var(--color-line)] rounded focus:ring-[var(--color-pine)]"
                />
                <span className="text-sm text-[var(--color-ink)]">Feature this image</span>
              </label>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--color-line)]">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.title || !form.imageUrl}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {saving ? "Saving..." : editingId ? "Save Changes" : "Add to Gallery"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 border border-[var(--color-line)]">
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete Image</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">
              Are you sure you want to remove this image from the gallery? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                Cancel
              </button>
              <button
                onClick={() => {
                  const id = deleteConfirm;
                  setDeleteConfirm(null);
                  if (id) handleDelete(id);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
