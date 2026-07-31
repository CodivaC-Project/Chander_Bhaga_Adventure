"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, Search, Mountain, X, Save } from "lucide-react";

interface Adventure {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  price: number;
  duration: string;
  difficulty: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  createdAt: string;
}

const emptyAdventure: Partial<Adventure> = {
  title: "", slug: "", category: "", location: "", price: 0,
  duration: "", difficulty: "moderate", featured: false,
  description: "", shortDescription: "",
};

export default function AdventuresPage() {
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Adventure> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchAdventures(); }, []);

  const fetchAdventures = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/adventures?limit=100&search=${search}`);
      const data = await res.json();
      setAdventures(data.adventures || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (!loading) fetchAdventures(); }, [search]);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) return;
    setSaving(true);
    try {
      const method = editing.id ? "PUT" : "POST";
      const url = editing.id ? `/api/admin/adventures?id=${editing.id}` : "/api/admin/adventures";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      if (res.ok) { setShowModal(false); setEditing(null); fetchAdventures(); }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/adventures?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchAdventures();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Adventures ({adventures.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" />
          </div>
          <button onClick={() => { setEditing({ ...emptyAdventure }); setShowModal(true); }}
            className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> Add Adventure</button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" /></div>
      ) : adventures.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Mountain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No adventures found</h3>
          <p className="text-gray-500">Create your first adventure to get started.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Adventure</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Location</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Duration</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Difficulty</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {adventures.map((adv) => (
                  <tr key={adv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{adv.title}</div>
                      {adv.featured && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Featured</span>}
                    </td>
                    <td className="px-6 py-4"><span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{adv.category}</span></td>
                    <td className="px-6 py-4 text-sm text-gray-600">{adv.location}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{adv.price.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{adv.duration}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${adv.difficulty === "easy" ? "bg-green-100 text-green-700" : adv.difficulty === "moderate" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>{adv.difficulty}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditing(adv); setShowModal(true); }} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(adv.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold">{editing.id ? "Edit Adventure" : "Add New Adventure"}</h2>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="p-1 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input type="number" value={editing.price || ""} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input value={editing.duration || ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select value={editing.difficulty || "moderate"} onChange={(e) => setEditing({ ...editing, difficulty: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm">
                    <option value="easy">Easy</option><option value="moderate">Moderate</option><option value="challenging">Challenging</option></select></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
                <input value={editing.shortDescription || ""} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows={3} value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg text-sm" /></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.featured || false} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })} className="rounded" /><span className="text-sm text-gray-700">Featured</span></label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Adventure</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this adventure? This action cannot be undone.</p>
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
