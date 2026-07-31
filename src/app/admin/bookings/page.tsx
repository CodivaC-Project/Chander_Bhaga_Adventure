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
    setForm(booking);
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
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    completed: "bg-blue-100 text-blue-700",
  };

  const paymentColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-purple-100 text-purple-700",
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
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
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-500">Bookings will appear here once customers start booking.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Booking ID</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Guest</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Service</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Payment</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{booking.bookingId}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking.guestName}</div>
                      <div className="text-xs text-gray-500">{booking.guestEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
                        {booking.serviceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">₹{booking.finalAmount.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${statusColors[booking.status] || "bg-gray-100 text-gray-700"}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full capitalize ${paymentColors[booking.paymentStatus] || "bg-gray-100 text-gray-700"}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(booking)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(booking.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
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
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Booking" : "Add Booking"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guest Name *</label>
                <input
                  type="text"
                  value={form.guestName || ""}
                  onChange={(e) => setForm({ ...form, guestName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={form.guestEmail || ""}
                    onChange={(e) => setForm({ ...form, guestEmail: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.guestPhone || ""}
                    onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                  <select
                    value={form.serviceType || "tour"}
                    onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="tour">Tour</option>
                    <option value="adventure">Adventure</option>
                    <option value="hotel">Hotel</option>
                    <option value="taxi">Taxi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <input
                    type="number"
                    value={form.guests || 1}
                    onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value) || 1 })}
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                  <input
                    type="date"
                    value={form.date || ""}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₹)</label>
                  <input
                    type="number"
                    value={form.totalAmount || 0}
                    onChange={(e) => setForm({ ...form, totalAmount: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={form.status || "pending"}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    value={form.paymentStatus || "pending"}
                    onChange={(e) => setForm({ ...form, paymentStatus: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={form.notes || ""}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  rows={3}
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
          <div className="bg-white rounded-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Booking</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this booking? This action cannot be undone.</p>
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
