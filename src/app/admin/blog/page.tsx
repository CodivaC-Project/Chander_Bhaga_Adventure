"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Loader2, Search, FileText, X, Save } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  excerpt: string;
  content: string;
  published: boolean;
  views: number;
  createdAt: string;
}

const emptyPost: Partial<BlogPost> = {
  title: "", slug: "", author: "", category: "", excerpt: "", content: "", published: false,
};

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchPosts(); }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/blogs?limit=100&search=${search}`);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { if (!loading) fetchPosts(); }, [search]);

  const handleSave = async () => {
    if (!editing?.title || !editing?.slug) return;
    setSaving(true);
    try {
      const method = editing.id ? "PUT" : "POST";
      const url = editing.id ? `/api/admin/blogs?id=${editing.id}` : "/api/admin/blogs";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editing) });
      if (res.ok) { setShowModal(false); setEditing(null); fetchPosts(); }
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/blogs?id=${id}`, { method: "DELETE" });
      setDeleteConfirm(null);
      fetchPosts();
    } catch (err) { console.error(err); }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-ink)]">Blog Posts ({posts.length})</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-ink-soft)]" />
            <input type="text" placeholder="Search posts..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-[var(--color-line)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-pine)]" />
          </div>
          <button onClick={() => { setEditing({ ...emptyPost }); setShowModal(true); }}
            className="btn-primary flex items-center gap-2 text-sm"><Plus className="w-4 h-4" /> New Post</button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" /></div>
      ) : posts.length === 0 ? (
        <div className="bg-white rounded-lg border border-[var(--color-line)] p-12 text-center">
          <FileText className="w-16 h-16 text-[var(--color-line)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">No blog posts yet</h3>
          <p className="text-[var(--color-ink-soft)]">Create your first blog post to share travel stories.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[var(--color-line)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-paper)] border-b border-[var(--color-line)]">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Title</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Author</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Category</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-[var(--color-ink-soft)] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-line)]">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-[var(--color-paper)] transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-ink)]">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-[var(--color-ink-soft)]">{post.author}</td>
                    <td className="px-6 py-4"><span className="text-xs bg-[var(--color-paper)] text-[var(--color-ink-soft)] border border-[var(--color-line)] px-2 py-1 rounded-full">{post.category}</span></td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${post.published ? "bg-[var(--color-pine)]/10 text-[var(--color-pine)]" : "bg-[var(--color-accent)]/10 text-[var(--color-accent-deep)]"}`}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => { setEditing(post); setShowModal(true); }} className="p-1.5 text-[var(--color-ink-soft)] hover:text-[var(--color-pine)] hover:bg-[var(--color-pine)]/10 rounded-lg"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => setDeleteConfirm(post.id)} className="p-1.5 text-[var(--color-ink-soft)] hover:text-red-700 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[var(--color-line)]">
            <div className="flex items-center justify-between p-6 border-b border-[var(--color-line)]">
              <h2 className="text-lg font-semibold text-[var(--color-ink)]">{editing.id ? "Edit Post" : "New Blog Post"}</h2>
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="p-1 hover:bg-[var(--color-paper)] rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Title</label>
                  <input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Slug</label>
                  <input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Author</label>
                  <input value={editing.author || ""} onChange={(e) => setEditing({ ...editing, author: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
                <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Category</label>
                  <input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Excerpt</label>
                <input value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              <div><label className="block text-sm font-medium text-[var(--color-ink)] mb-1">Content</label>
                <textarea rows={6} value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="w-full px-4 py-2 border border-[var(--color-line)] rounded-lg text-sm" /></div>
              <label className="flex items-center gap-2"><input type="checkbox" checked={editing.published || false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="rounded" /><span className="text-sm text-[var(--color-ink)]">Published</span></label>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t">
              <button onClick={() => { setShowModal(false); setEditing(null); }} className="px-4 py-2 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] rounded-lg">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2 text-sm">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save</button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6 border border-[var(--color-line)]" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-2">Delete Blog Post</h3>
            <p className="text-sm text-[var(--color-ink-soft)] mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
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
