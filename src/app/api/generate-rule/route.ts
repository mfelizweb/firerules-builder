import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { generateRuleFromText } from "@/lib/openai";

const MAX_AI_FREE = 10;
const MAX_AI_PRO = 500;

export async function POST(req: NextRequest) {
  try {
     const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

     const { data: user, error } = await supabase
      .from("users")
      .select("ispro, ai_uses_this_month")
      .eq("id", userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

     const maxAllowed = user.ispro ? MAX_AI_PRO : MAX_AI_FREE;
    if ((user.ai_uses_this_month ?? 0) >= maxAllowed) {
      return NextResponse.json(
        {
          error: user.ispro
            ? "You have reached your monthly AI usage limit. Contact support for more."
            : "Free AI limit reached. Upgrade to Pro for more AI generations.",
        },
        { status: 403 }
      );
    }

     const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

     const rules = await generateRuleFromText(prompt);

     await supabase
      .from("users")
      .update({ ai_uses_this_month: (user.ai_uses_this_month ?? 0) + 1 })
      .eq("id", userId);

     return NextResponse.json({ rules });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to generate rules" }, { status: 500 });
  }
}
