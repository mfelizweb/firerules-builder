 
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function SessionSync() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createPagesBrowserClient();
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        console.error("⚠️ Supabase session error:", error.message);
        return;
      }
      if (data.session) {
        console.log("✅ Supabase session restored");
        router.replace("/account");
      }
    });
  }, []);

  return null;
}
