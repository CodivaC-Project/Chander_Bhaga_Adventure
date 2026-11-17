"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { useSessionContext } from "@/components/auth/SessionProvider";
import { signOut } from "@/lib/auth-client";
import Image from "next/image";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MapPin,
  Mountain,
  Plane,
  Hotel,
  Car,
  BookOpen,
  Camera,
  MessageCircle,
  User,
  LogOut,
  Shield,
} from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  "/tours": <Mountain className="w-5 h-5" />,
  "/adventures": <Plane className="w-5 h-5" />,
  "/hotels": <Hotel className="w-5 h-5" />,
  "/taxi": <Car className="w-5 h-5" />,
  "/blog": <BookOpen className="w-5 h-5" />,
  "/gallery": <Camera className="w-5 h-5" />,
  "/contact": <MessageCircle className="w-5 h-5" />,
};

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isPending, isAuthenticated } = useSessionContext();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClick = () => setShowUserMenu(false);
    if (showUserMenu) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [showUserMenu]);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await signOut();
    setShowUserMenu(false);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[var(--color-pine-deep)] text-white/70 text-sm py-2 hidden md:block">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.phone.replace("91", "+91 ")}
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {siteConfig.address}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-60">License: {siteConfig.license}</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 bg-white transition-all duration-300 border-b ${
          scrolled ? "border-[var(--color-line-strong)] py-2" : "border-[var(--color-line)] py-4"
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpeg"
                alt="Shri Mata Vaishno Devi Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-[var(--color-primary)]">
                Shri Mata Vaishno Devi
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {siteConfig.navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === link.href
                      ? "text-[var(--color-primary)] bg-[var(--color-primary)]/5"
                      : "text-gray-700 hover:text-[var(--color-primary)]"
                  }`}
                >
                  {link.label}
                  {link.children && <ChevronDown className="w-3.5 h-3.5" />}
                </Link>

                {/* Dropdown */}
                {link.children && activeDropdown === link.href && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white hairline shadow-[var(--shadow-soft)] p-3 min-w-[220px] rounded-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-3 px-3 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] hover:text-[var(--color-pine)] rounded-md transition-all"
                        >
                          <span className="text-[var(--color-accent)]">
                            {serviceIcons[link.href] || serviceIcons[child.href] || (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Auth buttons */}
            {!isPending && (
              <>
                {isAuthenticated && user ? (
                  /* User menu */
                  <div className="relative hidden sm:block">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserMenu(!showUserMenu);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                        {user.name || "User"}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
                    </button>

                    {/* Dropdown menu */}
                    {showUserMenu && (
                      <div className="absolute top-full right-0 mt-2 w-56 bg-white hairline shadow-[var(--shadow-soft)] p-2 rounded-lg z-50">
                        <div className="px-4 py-3 border-b border-[var(--color-line)] mb-1">
                          <div className="font-medium text-[var(--color-ink)] text-sm">{user.name}</div>
                          <div className="text-xs text-[var(--color-ink-faint)] truncate">{user.email}</div>
                        </div>
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] rounded-md transition-colors"
                          >
                            <Shield className="w-4 h-4" />
                            Admin Panel
                          </Link>
                        )}
                        <hr className="my-1 border-[var(--color-line)]" />
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-danger)] hover:bg-[var(--color-paper)] rounded-md transition-colors w-full"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Login/Register buttons */
                  <div className="hidden sm:flex items-center gap-2">
                    <Link
                      href="/login"
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[var(--color-primary)] rounded-lg transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </>
            )}

            <Link
              href="/consultation"
              className="hidden sm:inline-flex btn-secondary text-sm px-4 py-2"
            >
              Book Consultation
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="container-custom py-4 space-y-1">
              {siteConfig.navLinks.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <span className="text-[var(--color-primary)]">
                      {serviceIcons[link.href] || <ChevronDown className="w-4 h-4" />}
                    </span>
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-12">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-500 hover:text-[var(--color-primary)] transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {!isPending && !isAuthenticated && (
                  <div className="flex gap-2">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center px-4 py-2.5 border border-[var(--color-line)] rounded-md text-sm font-medium text-[var(--color-ink-soft)] hover:bg-[var(--color-paper)] transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex-1 text-center btn-primary text-sm"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
                {!isPending && isAuthenticated && (
                  <>
                    <button
                      onClick={(e) => {
                        handleSignOut(e);
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full"
                    >
                      <LogOut className="w-5 h-5" />
                      Sign Out
                    </button>
                  </>
                )}
                <Link
                  href="/consultation"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary w-full text-center text-sm"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
