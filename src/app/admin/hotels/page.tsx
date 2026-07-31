"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { GalleryInput } from "@/components/admin/GalleryInput";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, Search, Star, X, Save } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  slug: string;
  location: string;
  stars: number;
  pricePerNight: number;
  featured: boolean;
  rating: number;
  reviewCount: number;
  amenities: string[];
  gallery: string[];
  description: string;
  shortDescription: string;
  address: string;
}

const emptyHotel: Partial<Hotel> = { name: "", slug: "", location: "", stars: 4, pricePerNight: 0, featured: false, amenities: [], gallery: [], description: "", shortDescription: "", address: "" };

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState<Partial<Hotel> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchHotels(); }, []);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/hotels?limit=100&search=${search}`);
      const data = await res.json();
      setHotels(data.hotels || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (!loading) fetchHotels(); }, [search]);

  const handleSave = async () => {
    if (!editingHotel?.name || !editingHotel?.slug) return;
    setSaving(true);
    try {
      const method = editingHotel.id ? "PUT" : "POST";
      const url = editingHotel.id ? `/api/admin/hotels?id=${editingHotel.id}` : "/api/admin/hotels";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingHotel) });
      if (res.ok) { setShowModal(false); setEditingHotel(null); fetchHotels(); }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/hotels?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchHotels();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Hotels ({hotels.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]" />
          </div>
          <button onClick={() => { setEditingHotel({ ...emptyHotel }); setShowModal(true); }}
            className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Hotel</button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" /></div>
      ) : hotels.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center"><p className="text-[var(--color-ink-soft)]">No hotels found.</p></div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Hotel</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Location</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Stars</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Price/Night</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Rating</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-[var(--color-paper)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--color-ink)]">{hotel.name}</div>
                      {hotel.featured && <span className="text-xs bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)] px-2 py-0.5 rounded-full">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{hotel.location}</td>
                    <td className="px-6 py-4"><div className="flex items-center gap-0.5">{Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-[var(--color-accent)] fill-[var(--color-accent)]" />)}</div></td>
                    <td className="px-6 py-4 text-sm font-medium text-[var(--color-ink)]">₹{hotel.pricePerNight.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{hotel.rating.toFixed(1)} ({hotel.reviewCount})</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingHotel(hotel); setShowModal(true); }} className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] hover:bg-[var(--color-pine)]/10 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(hotel.id)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-red-700 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && editingHotel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--color-line)]">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{editingHotel.id ? "Edit Hotel" : "Add New Hotel"}</h2>
              <button onClick={() => { setShowModal(false); setEditingHotel(null); }} className="p-1 hover:bg-[var(--color-paper)] rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Name</label>
                  <input value={editingHotel.name || ""} onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Slug</label>
                  <input value={editingHotel.slug || ""} onChange={(e) => setEditingHotel({ ...editingHotel, slug: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Location</label>
                  <input value={editingHotel.location || ""} onChange={(e) => setEditingHotel({ ...editingHotel, location: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Address</label>
                  <input value={editingHotel.address || ""} onChange={(e) => setEditingHotel({ ...editingHotel, address: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Stars</label>
                  <select value={editingHotel.stars || 4} onChange={(e) => setEditingHotel({ ...editingHotel, stars: Number(e.target.value) })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm">
                    {[1,2,3,4,5].map(s => <option key={s} value={s}>{s} Star</option>)}</select></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Price/Night (₹)</label>
                  <input type="number" value={editingHotel.pricePerNight || ""} onChange={(e) => setEditingHotel({ ...editingHotel, pricePerNight: Number(e.target.value) })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Short Description</label>
                <input value={editingHotel.shortDescription || ""} onChange={(e) => setEditingHotel({ ...editingHotel, shortDescription: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Description</label>
                <textarea rows={3} value={editingHotel.description || ""} onChange={(e) => setEditingHotel({ ...editingHotel, description: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              <GalleryInput
                value={editingHotel.gallery || []}
                onChange={(gallery) => setEditingHotel({ ...editingHotel, gallery })}
                label="Gallery Images"
              />
              <label className="flex items-center gap-2"><input type="checkbox" checked={editingHotel.featured || false} onChange={(e) => setEditingHotel({ ...editingHotel, featured: e.target.checked })} className="rounded" /><span className="text-sm text-[var(--color-ink)]">Featured</span></label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => { setShowModal(false); setEditingHotel(null); }} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 border border-[var(--color-line)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete Hotel</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">Are you sure you want to delete this hotel? This action cannot be undone.</p>
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
