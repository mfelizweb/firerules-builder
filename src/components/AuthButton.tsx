"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { syncUser } from "@/lib/syncUser"; 

export default function AuthButton() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
        await syncUser();  
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/builder`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return session ? (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 dark:text-gray-300">
        {session.user.email}
      </span>
      <Button variant="outline" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  ) : (
    <Button onClick={handleLogin}>Log in with Google</Button>
  );
}
