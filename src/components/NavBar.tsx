"use client";

import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import AuthButton from "./AuthButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

   function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

   const linkBase = "text-sm font-medium transition  ";
  const linkActive = "text-blue-600 dark:text-blue-400  ";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-gray-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight select-none"
        >
          <span className="text-primary-600 dark:text-primary-400">Rule</span>
          <span className="text-black dark:text-white">Builder</span>
        </Link>

        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/builder"
            className={`${linkBase} ${isActive("/builder") ? linkActive : ""}`}
          >
            Builder
          </Link>
          <Link
            href="/pricing"
            className={`${linkBase} ${isActive("/pricing") ? linkActive : ""}`}
          >
            Pricing
          </Link>
       {user && (
  <Button asChild variant="outline" size="sm" className={isActive("/account") ? linkActive : linkBase}>
    <Link href="/account">
      My Account
    </Link>
  </Button>
)}
          {!user && <AuthButton />}
        </div>

        <button
          className="sm:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden absolute left-0 right-0 top-16 z-50 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 shadow-lg animate-fade-down">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              href="/builder"
              className={`${linkBase} ${isActive("/builder") ? linkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Builder
            </Link>
            <Link
              href="/pricing"
              className={`${linkBase} ${isActive("/pricing") ? linkActive : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              Pricing
            </Link>
            {user && (
              <Link
                href="/account"
                className={`w-full flex justify-center ${isActive("/account") ? linkActive : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                <Button variant="outline" size="sm" className="w-full max-w-xs">
                  My Account
                </Button>
              </Link>
            )}
            {!user && <AuthButton />}
          </div>
        </div>
      )}
    </nav>
  );
}
