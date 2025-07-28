"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export async function syncUser() {
  const supabase = createPagesBrowserClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) return;

   const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("ispro")
    .eq("id", user.id)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking user:", fetchError);
    return;
  }

  const { error: upsertError } = await supabase.from("users").upsert({
    id: user.id,
    email: user.email,
    ispro: existingUser?.ispro ?? false,
  });

  if (upsertError) {
    console.error("Error upserting user:", upsertError);
  }
}
