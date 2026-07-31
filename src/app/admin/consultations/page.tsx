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
    new: "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]",
    contacted: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]",
    booked: "bg-[var(--color-pine)]/10 text-[var(--color-pine)]",
    closed: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]",
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Consultations</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
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
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center">
          <MessageCircle className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">No consultations yet</h3>
          <p className="text-[var(--color-ink-soft)]">Consultation requests will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Contact</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Travel Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Group Size</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Budget</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {consultations.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--color-paper)] transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{c.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[var(--color-ink-soft)]">{c.email}</div>
                      <div className="text-xs text-[var(--color-ink-soft)]">{c.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{new Date(c.travelDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{c.groupSize}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{c.budget || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[c.status] || "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(c)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] hover:bg-[var(--color-pine)]/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(c.id)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
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
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[var(--color-line)]">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{editingId ? "Edit Consultation" : "Add Consultation"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Name *</label>
                  <input
                    type="text"
                    value={form.name || ""}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone || ""}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={form.travelDate || ""}
                    onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Group Size</label>
                  <input
                    type="number"
                    value={form.groupSize || 2}
                    onChange={(e) => setForm({ ...form, groupSize: parseInt(e.target.value) || 2 })}
                    min="1"
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Budget</label>
                  <input
                    type="text"
                    value={form.budget || ""}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    placeholder="e.g., ₹50,000 - ₹1,00,000"
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Status</label>
                <select
                  value={form.status || "new"}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="booked">Booked</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Message</label>
                <textarea
                  value={form.message || ""}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Admin Notes</label>
                <textarea
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={2}
                  placeholder="Internal notes..."
                  className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--color-line)]">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
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
          <div className="bg-white rounded-lg w-full max-w-sm p-6 border border-[var(--color-line)]">
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete Consultation</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">Are you sure you want to delete this consultation? This action cannot be undone.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
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
