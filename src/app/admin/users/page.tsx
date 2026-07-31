"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Loader2, Search, Users as UsersIcon, Plus, Edit2, Trash2, X, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  createdAt: string;
  emailVerified: boolean;
}

const emptyForm: Partial<User> = {
  name: "",
  email: "",
  role: "user",
  phone: "",
  emailVerified: false,
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<User>>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [search, roleFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: "100" });
      if (search) params.set("search", search);
      if (roleFilter !== "all") params.set("role", roleFilter);
      const res = await fetch(`/api/admin/users?${params}`);
      const data = await res.json();
      setUsers(data.users || []);
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

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setForm(user);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) return;
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/admin/users?id=${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const roleColors: Record<string, string> = {
    admin: "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]",
    user: "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]",
  };

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Users</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center">
          <UsersIcon className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">No users found</h3>
          <p className="text-[var(--color-ink-soft)]">Registered users will appear here.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Phone</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Verified</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Joined</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-[var(--color-paper)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-[var(--color-primary)]">
                            {user.name?.charAt(0)?.toUpperCase() || "?"}
                          </span>
                        </div>
                        <span className="font-medium text-[var(--color-ink)]">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{user.phone || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${roleColors[user.role] || "bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)]"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.emailVerified ? (
                        <span className="text-xs bg-[var(--color-pine)]/10 text-[var(--color-pine)] px-2 py-1 rounded-full">Yes</span>
                      ) : (
                        <span className="text-xs bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)] px-2 py-1 rounded-full">No</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(user)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] hover:bg-[var(--color-pine)]/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteConfirm(user.id)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
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
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{editingId ? "Edit User" : "Add User"}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
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
                  <label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Role</label>
                  <select
                    value={form.role || "user"}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="emailVerified"
                  checked={form.emailVerified || false}
                  onChange={(e) => setForm({ ...form, emailVerified: e.target.checked })}
                  className="w-4 h-4 text-[var(--color-pine)] border-[var(--color-line)] rounded focus:ring-[var(--color-pine)]"
                />
                <label htmlFor="emailVerified" className="text-sm text-[var(--color-ink)]">
                  Email Verified
                </label>
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
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete User</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
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
