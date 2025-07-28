"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export async function syncUser() {
  const supabase = createPagesBrowserClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
    console.error("Error getting auth user:", authError.message);
    return;
  }

  if (!user) {
    console.warn("No user found in auth session.");
    return;
  }

  const { error: upsertError } = await supabase
    .from("users")
    .upsert({
      id: user.id,
      email: user.email,
      ispro: false,  
    });

  if (upsertError) {
    console.error("Error syncing user:", upsertError.message);
  } else {
    console.log("✅ User synced successfully");
  }
}
