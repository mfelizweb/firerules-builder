"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  isPro: boolean;
  aiUsesThisMonth: number;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  isPro: false,
  aiUsesThisMonth: 0,
  loading: true,
  refreshUser: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [aiUsesThisMonth, setAiUsesThisMonth] = useState(0);
  const [loading, setLoading] = useState(true);

  const supabase = createPagesBrowserClient();

  const fetchUser = async () => {
    setLoading(true);
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
      setUser(null);
      setIsPro(false);
      setAiUsesThisMonth(0);
      setLoading(false);
      return;
    }
    setUser(user);

    const { data } = await supabase
      .from("users")
      .select("ispro, ai_uses_this_month")
      .eq("id", user.id)
      .single();

    setIsPro(data?.ispro ?? false);
    setAiUsesThisMonth(data?.ai_uses_this_month ?? 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
   }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isPro,
        aiUsesThisMonth,
        loading,
        refreshUser: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserInfo() {
  return useContext(UserContext);
}
