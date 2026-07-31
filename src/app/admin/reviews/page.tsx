"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Loader2, Search, Star, Plus, Edit2, Trash2, X, ThumbsUp } from "lucide-react";

interface Review {
  id: string;
  serviceType: string;
  serviceId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  createdAt: string;
}

const emptyForm: Partial<Review> = {
  serviceType: "tour",
  serviceId: "",
  userName: "",
  userEmail: "",
  rating: 5,
  title: "",
  comment: "",
  verified: true,
  helpful: 0,
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Review>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [search, ratingFilter]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (search) params.set("search", search);
      if (ratingFilter !== 0) params.set("rating", String(ratingFilter));
      const res = await fetch(`/api/admin/reviews?${params}`);
      const data = await res.json();
      setReviews(data.reviews || []);
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

  const handleEdit = (review: Review) => {
    setEditingId(review.id);
    setForm(review);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.userName || !form.title || !form.comment) return;
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/admin/reviews?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchReviews();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/reviews?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>5 Stars</option>
            <option value={4}>4 Stars</option>
            <option value={3}>3 Stars</option>
            <option value={2}>2 Stars</option>
            <option value={1}>1 Star</option>
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add Review
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-500">Customer reviews will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-gray-100 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{review.userName}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>
                    )}
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{review.serviceType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-1">({review.rating}/5)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                  <button onClick={() => handleEdit(review)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => setDeleteConfirm(review.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{review.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{review.comment}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{review.helpful} found this helpful</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">{editingId ? "Edit Review" : "Add Review"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Name *</label>
                  <input
                    type="text"
                    value={form.userName || ""}
                    onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={form.userEmail || ""}
                    onChange={(e) => setForm({ ...form, userEmail: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                  <select
                    value={form.rating || 5}
                    onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Review headline"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment *</label>
                <textarea
                  value={form.comment || ""}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={4}
                  placeholder="Write the review..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="verified"
                  checked={form.verified || false}
                  onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-primary)] border-gray-300 rounded focus:ring-[var(--color-primary)]"
                />
                <label htmlFor="verified" className="text-sm text-gray-700">
                  Verified Purchase
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.userName || !form.title || !form.comment}
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Review</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this review? This action cannot be undone.</p>
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
