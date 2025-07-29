 "use client";

import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import AuthButton from "./AuthButton";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";  

export default function NavBar() {
  const user = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
         <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight select-none"
        >
          <span className="text-primary-600 dark:text-primary-400">Rule</span>
          <span className="text-black dark:text-white">Builder</span>
        </Link>

         <div className="hidden sm:flex items-center gap-4">
          <AuthButton />
          {user && (
            <Link href="/account">
              <Button variant="outline" size="sm">
                My Account
              </Button>
            </Link>
          )}
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
            <AuthButton />
            {user && (
              <Link href="/account" className="w-full flex justify-center">
                <Button variant="outline" size="sm" className="w-full max-w-xs">
                  My Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
