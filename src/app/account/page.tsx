"use client";

import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { Badge } from "@/components/ui/badge";
 import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
 
export default function AccountPage() {
  
  const user = useUser();
  const [ispro, setIspro] = useState(false);
  const supabase = createPagesBrowserClient();
const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      if (!user?.email) return;

      const { data, error } = await supabase
        .from("users")
        .select("ispro")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      setIspro(data?.ispro ?? false);
    };

    fetchUser();
  }, [user]);

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-zinc-950">
<Button onClick={() => router.push("/builder")} variant="outline">
  ← Back to Builder
</Button>
       <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          My Account
        </h1>
        {user ? (
          <>
         <div className="mt-2 text-gray-700 dark:text-gray-300">
  <span>Status: </span>
{ispro ? (
  <Badge variant="default" className="animate-pulse">🔥 Pro User</Badge>
) : (
  <Badge variant="secondary">Free</Badge>
)}

</div>

          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">Not logged in.</p>
        )}
      </div>
    </main>
  );
}
