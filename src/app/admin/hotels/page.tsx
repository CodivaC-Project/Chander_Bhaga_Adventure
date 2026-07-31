"use client";

import AdminLayout from "@/components/admin/AdminLayout";
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
  description: string;
  shortDescription: string;
  address: string;
}

const emptyHotel: Partial<Hotel> = { name: "", slug: "", location: "", stars: 4, pricePerNight: 0, featured: false, amenities: [], description: "", shortDescription: "", address: "" };

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
        <h1 className="text-2xl font-bold text-gray-900">Hotels ({hotels.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <button onClick={() => { setEditingHotel({ ...emptyHotel }); setShowModal(true); }}
            className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Hotel</button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" /></div>
      ) : hotels.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center"><p className="text-gray-500">No hotels found.</p></div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Hotel</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Stars</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price/Night</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Rating</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {hotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{hotel.name}</div>
                      {hotel.featured && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Featured</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{hotel.location}</td>
                    <td className="px-6 py-4"><div className="flex items-center gap-0.5">{Array.from({ length: hotel.stars }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />)}</div></td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{hotel.pricePerNight.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{hotel.rating.toFixed(1)} ({hotel.reviewCount})</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditingHotel(hotel); setShowModal(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(hotel.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">{editingHotel.id ? "Edit Hotel" : "Add New Hotel"}</h2>
              <button onClick={() => { setShowModal(false); setEditingHotel(null); }} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input value={editingHotel.name || ""} onChange={(e) => setEditingHotel({ ...editingHotel, name: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input value={editingHotel.slug || ""} onChange={(e) => setEditingHotel({ ...editingHotel, slug: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input value={editingHotel.location || ""} onChange={(e) => setEditingHotel({ ...editingHotel, location: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input value={editingHotel.address || ""} onChange={(e) => setEditingHotel({ ...editingHotel, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Stars</label>
                  <select value={editingHotel.stars || 4} onChange={(e) => setEditingHotel({ ...editingHotel, stars: Number(e.target.value) })} className="w-full px-4 py-2 border rounded-lg text-sm">
                    {[1,2,3,4,5].map(s => <option key={s} value={s}>{s} Star</option>)}</select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price/Night (₹)</label>
                  <input type="number" value={editingHotel.pricePerNight || ""} onChange={(e) => setEditingHotel({ ...editingHotel, pricePerNight: Number(e.target.value) })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input value={editingHotel.shortDescription || ""} onChange={(e) => setEditingHotel({ ...editingHotel, shortDescription: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={editingHotel.description || ""} onChange={(e) => setEditingHotel({ ...editingHotel, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editingHotel.featured || false} onChange={(e) => setEditingHotel({ ...editingHotel, featured: e.target.checked })} className="rounded" /><span className="text-sm text-gray-700">Featured</span></label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => { setShowModal(false); setEditingHotel(null); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Hotel</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this hotel? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</button>
              <button onClick={() => { const id = deleteConfirm; setDeleteConfirm(null); if (id) handleDelete(id); }} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
