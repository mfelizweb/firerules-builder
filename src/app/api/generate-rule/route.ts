 import { NextResponse } from "next/server";
import { generateRuleFromText } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
       return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

 
    const rules = await generateRuleFromText(prompt);
 
    return NextResponse.json({ rules });
  } catch (err: any) {
     return NextResponse.json({ error: "Failed to generate rules" }, { status: 500 });
  }
}
