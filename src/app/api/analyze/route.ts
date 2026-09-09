import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { question, analyticsSummary, mode = "chat" } = await req.json();

    if (!process.env.AI_API_KEY) {
      return NextResponse.json(
        { error: "AI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const apiKey = process.env.AI_API_KEY;
    const model = process.env.AI_MODEL || "llama-3.3-70b-versatile";

    let systemPrompt = "";
    let userPrompt = question;

    if (mode === "recommendations") {
      systemPrompt = `You are a world-class small business growth consultant and financial analyst.
You must ONLY analyze and reason from the exact numbers provided in the JSON data below.
NEVER invent, guess, or assume financial figures, revenues, or percentages that do not exist in the data.

Provide exactly 3 to 4 high-impact, practical, and grounded business recommendations for this small business owner.
Format your output as a valid JSON array of objects with keys:
- "title": A short punchy action (e.g. "Increase stock for [Product]", "Review supplier margin on [Product]")
- "impact": Estimated financial or operational impact based on their actual numbers (e.g. "+Rs. 18,500/mo revenue", "Save ~Rs. 12,000 in costs")
- "reason": A crisp 1-2 sentence explanation referencing their actual numbers (e.g. "This item drives 34% of your total profit with a healthy 52% margin.")
- "confidence": A percentage integer between 80 and 96 reflecting data strength.
- "actionType": One of "inventory", "pricing", "cost_cut", "marketing"

Output ONLY raw JSON (no markdown ticks, no conversational filler).

BUSINESS DATA:
${JSON.stringify(analyticsSummary)}`;

      userPrompt = "Generate 3-4 grounded recommendations based on my real performance data.";
    } else if (mode === "health_narration") {
      systemPrompt = `You are an expert small business financial advisor.
Given the Business Health Score and analytics summary below, explain in 1 or 2 concise, reassuring, and practical sentences why the business received this score and the single most critical lever to improve it.
Do NOT invent numbers. Stick strictly to the provided score and trends.

BUSINESS DATA:
${JSON.stringify(analyticsSummary)}`;

      userPrompt = "Explain my business health score concisely.";
    } else {
      // Standard chat mode
      systemPrompt = `You are an expert business analyst and CFO copilot for a small business owner (retail shop, cafe, salon, or online store).
You speak in warm, clear, plain-English terms without confusing corporate jargon.
RULE: Only reason from the exact business data provided below. Never guess or fabricate numbers.
If the data does not contain the answer, politely state what data is missing.
Use Sri Lankan Rupees ("Rs.") whenever discussing currency.
Keep responses concise, actionable, and structured with bullet points where helpful.

CURRENT BUSINESS DATA:
${JSON.stringify(analyticsSummary)}`;
    }

    // Call Groq Cloud API (OpenAI compatible)
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: mode === "recommendations" ? 0.2 : 0.5,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Groq API error:", errText);
      return NextResponse.json(
        { error: "Failed to fetch response from AI provider.", details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No response received.";

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("AI Route Exception:", error);
    return NextResponse.json(
      { error: "Server error processing analysis.", details: message },
      { status: 500 }
    );
  }
}
