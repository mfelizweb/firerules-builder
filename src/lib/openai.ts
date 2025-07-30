 export async function generateRuleFromText(userInput: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
     throw new Error("Missing OpenAI API key");
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
     model: "gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content: "You generate Firestore security rules from natural language. Respond only with rules, no explanation."
        },
        {
          role: "user",
          content: userInput
        }
      ],
      temperature: 0.2
    })
  });

  if (!response.ok) {
    const errText = await response.text();
     throw new Error(`OpenAI error: ${errText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}
