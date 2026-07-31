"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useSessionContext } from "@/components/auth/SessionProvider";
import { signOut } from "@/lib/auth-client";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Hotel,
  Car,
  Calendar,
  Users,
  MessageCircle,
  Star,
  Settings,
  LogOut,
  FileText,
  Loader2,
  Menu,
  X,
  Images,
} from "lucide-react";

const adminLinks = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Tour Packages", href: "/admin/tours", icon: Package },
  { label: "Adventures", href: "/admin/adventures", icon: MapPin },
  { label: "Hotels", href: "/admin/hotels", icon: Hotel },
  { label: "Taxi Fleet", href: "/admin/taxi", icon: Car },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Bookings", href: "/admin/bookings", icon: Calendar },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Consultations", href: "/admin/consultations", icon: MessageCircle },
  { label: "Reviews", href: "/admin/reviews", icon: Star },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isPending, isAuthenticated } = useSessionContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isPending && (!isAuthenticated || (user as any)?.role !== "admin")) {
      router.push("/login");
    }
  }, [isPending, isAuthenticated, user, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <Loader2 className="animate-spin h-8 w-8 text-[var(--color-primary)]" />
      </div>
    );
  }

  if (!isAuthenticated || (user as any)?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-paper)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--color-ink)] mb-4">Access Denied</h1>
          <p className="text-[var(--color-ink-soft)] mb-8">You don&apos;t have permission to access the admin panel.</p>
          <Link href="/" className="btn-primary">Go Home</Link>
        </div>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[var(--color-paper)]">
      {/* Top bar */}
      <div className="bg-[var(--color-primary-dark)] text-white py-3 sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-1">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="font-semibold">Admin Panel — Shri Mata Vaishno Devi</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/70 hidden sm:inline">{(user as any)?.email}</span>
            <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <aside className={`lg:col-span-1 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <div className="bg-white rounded-lg border border-[var(--color-line)] p-3 space-y-1 sticky top-20">
              {adminLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "bg-[var(--color-primary)] text-white"
                      : "text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)]"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
