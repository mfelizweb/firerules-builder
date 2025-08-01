"use client";

import { UserProvider } from "@/components/UserProvider";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
       <UserProvider>
           {children}
       </UserProvider>
   
    </SessionContextProvider>
  );
}
