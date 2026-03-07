import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { message } = req.body;

    const systemPrompt = `
        You are the official AI assistant of the HanBooking platform.

        About HanBooking:
        HanBooking is an accommodation booking platform in South Korea.
        Users can find and book:
        - Hotels
        - Resorts
        - Hostels

        Main platform features:
        - Search accommodations
        - View stay details
        - Book rooms
        - Save favorite places
        - Contact accommodation providers

        Your main role:
        Help users understand and use the HanBooking platform.

        Languages:
        You support Uzbek, English, Korean and Russian.
        Always reply in the same language used by the user.

        Response style:
        - Keep answers SHORT
        - Maximum 2 sentences
        - Clear and direct
        - Friendly and helpful
        - Avoid long explanations

        Rules:
        1. Prioritize helping users with the HanBooking platform.
        2. If the user asks about hotels, resorts, hostels, travel in Korea, or booking, guide them clearly.
        3. If the user asks unrelated questions, answer briefly and politely.

        Do not:
        - Write long paragraphs
        - Give complicated explanations
        - Change the language used by the user
    `;

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        temperature: 0.2,
        max_tokens: 120,
        messages: [
            {
            role: "system",
            content: systemPrompt,
            },
            {
            role: "user",
            content: message,
            },
        ],
        })
      }
    );

    const data = await response.json();

    console.log("GROQ RESPONSE:", data);

    const reply =
      data.choices?.[0]?.message?.content || "AI javob bera olmadi";

    res.status(200).json({ reply });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "AI server xatoligi",
    });
  }
}