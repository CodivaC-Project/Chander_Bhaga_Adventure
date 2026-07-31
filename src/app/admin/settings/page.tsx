"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { useEffect, useState } from "react";
import { Save, Loader2, Check, X } from "lucide-react";

interface SettingsMap {
  [key: string]: string;
}

const defaultSettings: SettingsMap = {
  siteName: "Chander Bhaga Adventure",
  tagline: "Your Gateway to Kashmir's Untouched Beauty",
  phone: "+91 6006465184",
  email: "Sharmasidhant129@gmail.com",
  address: "Katra, Vaishno Devi, Jammu & Kashmir",
  currency: "INR",
  taxRate: "18",
  emailNotificationsBookings: "true",
  emailNotificationsConsultations: "true",
  smsNotifications: "false",
  whatsappNumber: "+916006465184",
  instagramUrl: "",
  facebookUrl: "",
  twitterUrl: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsMap>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.settings) {
        setSettings({ ...defaultSettings, ...data.settings });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save");
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Site Settings */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Site Settings</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
              <input
                type="text"
                value={settings.siteName || ""}
                onChange={(e) => updateSetting("siteName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline || ""}
                onChange={(e) => updateSetting("tagline", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => updateSetting("phone", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => updateSetting("email", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => updateSetting("address", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Settings</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Currency</label>
              <select
                value={settings.currency || "INR"}
                onChange={(e) => updateSetting("currency", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate || "18"}
                onChange={(e) => updateSetting("taxRate", e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input
                type="text"
                value={settings.whatsappNumber || ""}
                onChange={(e) => updateSetting("whatsappNumber", e.target.value)}
                placeholder="+91XXXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.emailNotificationsBookings === "true"}
                onChange={(e) => updateSetting("emailNotificationsBookings", String(e.target.checked))}
                className="rounded border-gray-300 text-[var(--color-primary)]"
              />
              <span className="text-sm text-gray-700">Email notifications for new bookings</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.emailNotificationsConsultations === "true"}
                onChange={(e) => updateSetting("emailNotificationsConsultations", String(e.target.checked))}
                className="rounded border-gray-300 text-[var(--color-primary)]"
              />
              <span className="text-sm text-gray-700">Email notifications for new consultations</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.smsNotifications === "true"}
                onChange={(e) => updateSetting("smsNotifications", String(e.target.checked))}
                className="rounded border-gray-300 text-[var(--color-primary)]"
              />
              <span className="text-sm text-gray-700">SMS notifications for bookings</span>
            </label>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input
                type="url"
                value={settings.instagramUrl || ""}
                onChange={(e) => updateSetting("instagramUrl", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                value={settings.facebookUrl || ""}
                onChange={(e) => updateSetting("facebookUrl", e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
              <input
                type="url"
                value={settings.twitterUrl || ""}
                onChange={(e) => updateSetting("twitterUrl", e.target.value)}
                placeholder="https://twitter.com/..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
