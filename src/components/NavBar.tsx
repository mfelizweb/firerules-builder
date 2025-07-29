"use client";

import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import AuthButton from "./AuthButton";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const user = useUser();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <div className="flex justify-between items-center w-full sm:w-auto">
          
          <Link
            href="/"
            className="text-lg font-semibold text-black dark:text-white"
          >
            
            FireRules
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <AuthButton />

          {user && (
            <Link href="/account" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                My Account
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
