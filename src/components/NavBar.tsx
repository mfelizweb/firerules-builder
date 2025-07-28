"use client";

import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import AuthButton from "./AuthButton";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const user = useUser();

  return (
    <nav className="w-full border-b border-gray-200 dark:border-zinc-800 px-4 py-3 bg-white dark:bg-zinc-900">
      <div className="max-w-full mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold text-black dark:text-white">
          FireRules
        </Link>

        <div className="flex items-center gap-4">
 
          <AuthButton />

          
          {user && (
            <Link href="/account">
              <Button variant="outline" size="sm">
                My Account
              </Button>
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
}
