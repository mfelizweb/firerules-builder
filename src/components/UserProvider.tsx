"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  isPro: boolean;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isPro: false,
  loading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  const supabase = createPagesBrowserClient();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        setUser(null);
        setIsPro(false);
        setLoading(false);
        return;
      }

      setUser(user);

      const { data, error: dbError } = await supabase
        .from("users")
        .select("ispro")
        .eq("id", user.id)
        .single();

      setIsPro(data?.ispro ?? false);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isPro, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserInfo() {
  return useContext(UserContext);
}
