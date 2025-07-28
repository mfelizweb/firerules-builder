 import { NextResponse } from "next/server";
import { generateRuleFromText } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      console.log("❌ No prompt received");
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    console.log("✅ Prompt received:", prompt);

    const rules = await generateRuleFromText(prompt);
    console.log("✅ Rules generated:", rules);

    return NextResponse.json({ rules });
  } catch (err: any) {
    console.error("❌ API Route Error:", err.message);
    return NextResponse.json({ error: "Failed to generate rules" }, { status: 500 });
  }
}
