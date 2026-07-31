"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, Search, Star, X, Save } from "lucide-react";

interface Tour {
  id: string;
  title: string;
  slug: string;
  destination: string;
  price: number;
  discountPrice?: number;
  duration: string;
  difficulty: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  maxGroupSize: number;
  description: string;
  shortDescription: string;
  createdAt: string;
}

const emptyTour: Partial<Tour> = { title: "", slug: "", destination: "", price: 0, duration: "", difficulty: "moderate", featured: false, maxGroupSize: 15, description: "", shortDescription: "" };

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<Tour> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchTours(); }, []);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/tours?limit=100&search=${search}`);
      const data = await res.json();
      setTours(data.packages || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (!loading) fetchTours(); }, [search]);

  const handleSave = async () => {
    if (!editingTour?.title || !editingTour?.slug) return;
    setSaving(true);
    try {
      const method = editingTour.id ? "PUT" : "POST";
      const url = editingTour.id ? `/api/admin/tours?id=${editingTour.id}` : "/api/admin/tours";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingTour) });
      if (res.ok) { setShowModal(false); setEditingTour(null); fetchTours(); }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/tours?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchTours();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Tour Packages ({tours.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]" />
          </div>
          <button onClick={() => { setEditingTour({ ...emptyTour }); setShowModal(true); }}
            className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Tour</button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" /></div>
      ) : tours.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center">
          <p className="text-[var(--color-ink-soft)]">No tours found. Create your first tour!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Tour</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Destination</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Price</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Duration</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Difficulty</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Rating</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-[var(--color-paper)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--color-ink)]">{tour.title}</div>
                      {tour.featured && <span className="text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)] px-2 py-0.5 rounded-full">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{tour.destination}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[var(--color-ink)]">₹{tour.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{tour.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${tour.difficulty === "easy" ? "bg-[var(--color-pine)]/10 text-[var(--color-pine)]" : tour.difficulty === "moderate" ? "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]" : "bg-red-50 text-red-700"}`}>{tour.difficulty}</span>
                    </td>
                    <td className="px-6 py-4"><div className="flex items-center gap-1"><Star className="w-4 h-4 text-[var(--color-accent)] fill-[var(--color-accent)]" /><span className="text-sm text-[var(--color-ink-soft)]">{tour.rating.toFixed(1)}</span></div></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingTour(tour); setShowModal(true); }} className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] hover:bg-[var(--color-pine)]/10 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(tour.id)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-red-700 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && editingTour && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--color-line)]">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{editingTour.id ? "Edit Tour" : "Add New Tour"}</h2>
              <button onClick={() => { setShowModal(false); setEditingTour(null); }} className="p-1 hover:bg-[var(--color-paper)] rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Title</label>
                  <input value={editingTour.title || ""} onChange={(e) => setEditingTour({ ...editingTour, title: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Slug</label>
                  <input value={editingTour.slug || ""} onChange={(e) => setEditingTour({ ...editingTour, slug: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Destination</label>
                  <input value={editingTour.destination || ""} onChange={(e) => setEditingTour({ ...editingTour, destination: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Duration</label>
                  <input value={editingTour.duration || ""} onChange={(e) => setEditingTour({ ...editingTour, duration: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Price (₹)</label>
                  <input type="number" value={editingTour.price || ""} onChange={(e) => setEditingTour({ ...editingTour, price: Number(e.target.value) })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Discount Price (₹)</label>
                  <input type="number" value={editingTour.discountPrice || ""} onChange={(e) => setEditingTour({ ...editingTour, discountPrice: Number(e.target.value) || undefined })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Difficulty</label>
                  <select value={editingTour.difficulty || "moderate"} onChange={(e) => setEditingTour({ ...editingTour, difficulty: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm">
                    <option value="easy">Easy</option><option value="moderate">Moderate</option><option value="challenging">Challenging</option></select></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Max Group Size</label>
                  <input type="number" value={editingTour.maxGroupSize || ""} onChange={(e) => setEditingTour({ ...editingTour, maxGroupSize: Number(e.target.value) })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Short Description</label>
                <input value={editingTour.shortDescription || ""} onChange={(e) => setEditingTour({ ...editingTour, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Description</label>
                <textarea rows={3} value={editingTour.description || ""} onChange={(e) => setEditingTour({ ...editingTour, description: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editingTour.featured || false} onChange={(e) => setEditingTour({ ...editingTour, featured: e.target.checked })} className="rounded" /><span className="text-sm text-[var(--color-ink)]">Featured</span></label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => { setShowModal(false); setEditingTour(null); }} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 border border-[var(--color-line)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete Tour Package</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">Are you sure you want to delete this tour? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">Cancel</button>
              <button onClick={() => { const id = deleteConfirm; setDeleteConfirm(null); if (id) handleDelete(id); }} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
