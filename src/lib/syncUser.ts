"use client";

import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export async function syncUser() {
  const supabase = createPagesBrowserClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) {
     return;
  }

  if (!user) {
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
   } else {
   }
}
