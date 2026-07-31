"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Loader2, Search, MessageCircle, Plus, Edit2, Trash2, X } from "lucide-react";

interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  groupSize: number;
  budget: string;
  interests: string[];
  message: string;
  status: string;
  notes: string;
  createdAt: string;
}

const emptyForm: Partial<Consultation> = {
  name: "",
  email: "",
  phone: "",
  travelDate: new Date().toISOString().split("T")[0],
  groupSize: 2,
  budget: "",
  interests: [],
  message: "",
  status: "new",
  notes: "",
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Consultation>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, [search, statusFilter]);

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/consultations?${params}`);
      const data = await res.json();
      setConsultations(data.consultations || []);
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

  const handleEdit = (consultation: Consultation) => {
    setEditingId(consultation.id);
    setForm(consultation);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/admin/consultations?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/consultations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchConsultations();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/consultations?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchConsultations();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-yellow-100 text-yellow-700",
    booked: "bg-green-100 text-green-700",
    closed: "bg-gray-100 text-gray-700",
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="booked">Booked</option>
            <option value="closed">Closed</option>
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Consultation
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      ) : consultations.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No consultations yet</h3>
          <p className="text-gray-500">Consultation requests will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Travel Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Group Size</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Budget</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {consultations.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{c.email}</div>
                      <div className="text-xs text-gray-500">{c.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(c.travelDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.groupSize}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{c.budget || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[c.status] || "bg-gray-100 text-gray-700"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(c)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(c.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
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
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Consultation" : "Add Consultation"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name || ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone || ""}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={form.travelDate || ""}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                  <input
                    type="number"
                    value={form.groupSize || 2}
                    onChange={(e) => setForm({ ...form, groupSize: parseInt(e.target.value) || 2 })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <input
                    type="text"
                    value={form.budget || ""}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="e.g., ₹50,000 - ₹1,00,000"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={form.status || "new"}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="booked">Booked</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={form.message || ""}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                <textarea
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  placeholder="Internal notes..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.email}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Consultation</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this consultation? This action cannot be undone.</p>
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
