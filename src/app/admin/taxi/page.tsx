"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Loader2, Search, Car, Plus, Edit2, Trash2, X, CheckCircle, XCircle } from "lucide-react";

interface Taxi {
  id: string;
  vehicleName: string;
  slug: string;
  type: string;
  capacity: number;
  pricePerKm: number;
  pricePerDay: number;
  features: string[];
  gallery: string[];
  available: boolean;
  description: string;
  createdAt: string;
}

const emptyForm: Partial<Taxi> = {
  vehicleName: "",
  slug: "",
  type: "sedan",
  capacity: 4,
  pricePerKm: 0,
  pricePerDay: 0,
  features: [],
  gallery: [],
  available: true,
  description: "",
};

const vehicleTypes = ["sedan", "suv", "tempo", "bus", "innova", "ertiga", "swift dzire", "auto"];

export default function TaxiPage() {
  const [taxis, setTaxis] = useState<Taxi[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Taxi>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");

  useEffect(() => {
    fetchTaxis();
  }, [search, typeFilter]);

  const fetchTaxis = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (search) params.set("search", search);
      if (typeFilter !== "all") params.set("type", typeFilter);
      const res = await fetch(`/api/admin/taxis?${params}`);
      const data = await res.json();
      setTaxis(data.taxis || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setShowModal(true);
  };

  const handleEdit = (taxi: Taxi) => {
    setEditingId(taxi.id);
    setForm({ ...taxi });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.vehicleName || !form.description) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: form.slug || form.vehicleName?.toLowerCase().replace(/\s+/g, "-") || "",
        features: form.features || [],
      };
      if (editingId) {
        await fetch(`/api/admin/taxis?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/admin/taxis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setShowModal(false);
      fetchTaxis();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/taxis?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchTaxis();
    } catch (err) {
      console.error(err);
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && form.features) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    if (form.features) {
      setForm({ ...form, features: form.features.filter((_, i) => i !== index) });
    }
  };

  const addGalleryImage = () => {
    if (galleryInput.trim() && form.gallery) {
      setForm({ ...form, gallery: [...form.gallery, galleryInput.trim()] });
      setGalleryInput("");
    }
  };

  const removeGalleryImage = (index: number) => {
    if (form.gallery) {
      setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== index) });
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Taxi Fleet ({taxis.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All Types</option>
            {vehicleTypes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Vehicle
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      ) : taxis.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vehicles in fleet</h3>
          <p className="text-gray-500">Add vehicles to your fleet to enable taxi bookings.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Capacity</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price/Km</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Price/Day</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Features</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Gallery</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {taxis.map((taxi) => (
                  <tr key={taxi.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                          <Car className="w-5 h-5 text-[var(--color-primary)]" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{taxi.vehicleName}</div>
                          <div className="text-xs text-gray-500">{taxi.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">{taxi.type}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{taxi.capacity} seats</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{taxi.pricePerKm}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{taxi.pricePerDay.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {taxi.features?.slice(0, 2).map((f, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            {f}
                          </span>
                        ))}
                        {taxi.features && taxi.features.length > 2 && (
                          <span className="text-xs text-gray-400">+{taxi.features.length - 2}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{taxi.gallery?.length || 0} images</span>
                    </td>
                    <td className="px-6 py-4">
                      {taxi.available ? (
                        <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          <CheckCircle className="w-3 h-3" /> Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          <XCircle className="w-3 h-3" /> Unavailable
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(taxi)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(taxi.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Vehicle" : "Add Vehicle"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name *</label>
                <input
                  type="text"
                  value={form.vehicleName || ""}
                  onChange={(e) => setForm({ ...form, vehicleName: e.target.value })}
                  placeholder="e.g., Toyota Innova Crysta"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                  <select
                    value={form.type || "sedan"}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    {vehicleTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={form.capacity || 4}
                    onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 4 })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Km (₹)</label>
                  <input
                    type="number"
                    value={form.pricePerKm || 0}
                    onChange={(e) => setForm({ ...form, pricePerKm: parseFloat(e.target.value) || 0 })}
                    min="0"
                    step="0.5"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Day (₹)</label>
                  <input
                    type="number"
                    value={form.pricePerDay || 0}
                    onChange={(e) => setForm({ ...form, pricePerDay: parseFloat(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  value={form.description || ""}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  placeholder="Describe the vehicle..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                    placeholder="Add feature (e.g., AC, GPS)"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <button onClick={addFeature} type="button" className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {form.features?.map((f, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {f}
                      <button onClick={() => removeFeature(i)} className="hover:text-blue-900">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gallery Images</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={galleryInput}
                    onChange={(e) => setGalleryInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGalleryImage())}
                    placeholder="Paste image URL and press Enter"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                  <button onClick={addGalleryImage} type="button" className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200">
                    Add
                  </button>
                </div>
                {form.gallery && form.gallery.length > 0 && (
                  <div className="grid grid-cols-3 gap-2">
                    {form.gallery.map((url, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={url}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23f3f4f6' width='100' height='100'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='12' x='50' y='55' text-anchor='middle'%3EBroken%3C/text%3E%3C/svg%3E";
                          }}
                        />
                        <button
                          onClick={() => removeGalleryImage(i)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {(!form.gallery || form.gallery.length === 0) && (
                  <p className="text-xs text-gray-400 mt-1">No images added yet. Paste an image URL above.</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="available"
                  checked={form.available ?? true}
                  onChange={(e) => setForm({ ...form, available: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)]"
                />
                <label htmlFor="available" className="text-sm text-gray-700">
                  Available for booking
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.vehicleName || !form.description}
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                {saving ? "Saving..." : editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Vehicle</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to remove this vehicle from the fleet? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
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
