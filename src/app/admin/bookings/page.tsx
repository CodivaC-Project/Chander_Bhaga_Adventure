"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Loader2, Search, Calendar, Plus, Edit2, Trash2, X } from "lucide-react";

interface Booking {
  id: string;
  bookingId: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  serviceType: string;
  serviceId: string;
  guests: number;
  date: string;
  totalAmount: number;
  finalAmount: number;
  status: string;
  paymentStatus: string;
  notes: string;
  createdAt: string;
}

const emptyForm: Partial<Booking> = {
  guestName: "",
  guestEmail: "",
  guestPhone: "",
  serviceType: "tour",
  serviceId: "",
  guests: 1,
  date: new Date().toISOString().split("T")[0],
  totalAmount: 0,
  finalAmount: 0,
  status: "pending",
  paymentStatus: "pending",
  notes: "",
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Booking>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [search, statusFilter]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (search) params.set("search", search);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const res = await fetch(`/api/admin/bookings?${params}`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, bookingId: `BK-${Date.now().toString(36).toUpperCase()}` });
    setShowModal(true);
  };

  const handleEdit = (booking: Booking) => {
    setEditingId(booking.id);
    // DB stores specialRequests; the form uses notes
    setForm({ ...booking, notes: (booking as any).specialRequests || booking.notes || "" });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.guestName || !form.guestEmail) return;
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/admin/bookings?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchBookings();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/bookings?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const statusColors: Record<string, string> = {
    pending: "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]",
    confirmed: "bg-[var(--color-pine)]/10 text-[var(--color-pine)]",
    cancelled: "bg-red-50 text-red-700",
    completed: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]",
  };

  const paymentColors: Record<string, string> = {
    pending: "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]",
    paid: "bg-[var(--color-pine)]/10 text-[var(--color-pine)]",
    failed: "bg-red-50 text-red-700",
    refunded: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]",
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Bookings</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder="Search bookings..."
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
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Booking
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      ) : bookings.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center">
          <Calendar className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">No bookings found</h3>
          <p className="text-[var(--color-ink-soft)]">Bookings will appear here once customers start booking.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Booking ID</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Guest</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Payment</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-[var(--color-paper)] transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-[var(--color-ink-soft)]">{booking.bookingId}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-[var(--color-ink)]">{booking.guestName}</div>
                      <div className="text-xs text-[var(--color-ink-soft)]">{booking.guestEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)] px-2 py-1 rounded-full capitalize">
                        {booking.serviceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-[var(--color-ink)]">₹{booking.finalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[booking.status] || "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]"}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${paymentColors[booking.paymentStatus] || "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]"}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(booking)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] hover:bg-[var(--color-pine)]/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(booking.id)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
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
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{editingId ? "Edit Booking" : "Add Booking"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Guest Name *</label>
                <input
                  type="text"
                  value={form.guestName || ""}
                  onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                  className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.guestEmail || ""}
                    onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.guestPhone || ""}
                    onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Service Type</label>
                  <select
                    value={form.serviceType || "tour"}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  >
                    <option value="tour">Tour</option>
                    <option value="adventure">Adventure</option>
                    <option value="hotel">Hotel</option>
                    <option value="taxi">Taxi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Guests</label>
                  <input
                    type="number"
                    value={form.guests || 1}
                    onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={form.date || ""}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Total Amount (₹)</label>
                  <input
                    type="number"
                    value={form.totalAmount || 0}
                    onChange={(e) => setForm({ ...form, totalAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Status</label>
                  <select
                    value={form.status || "pending"}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Payment Status</label>
                  <select
                    value={form.paymentStatus || "pending"}
                    onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Notes</label>
                <textarea
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
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
                disabled={saving || !form.guestName || !form.guestEmail}
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
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete Booking</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
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
