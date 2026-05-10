import type { NextApiRequest, NextApiResponse } from "next";

const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

type AiChatResponse = {
  reply: string;
  error?: string;
};

function getClientIp(req: NextApiRequest) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (Array.isArray(forwardedFor)) return forwardedFor[0] ?? "unknown";
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return req.socket.remoteAddress ?? "unknown";
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const current = rateLimitStore.get(clientIp);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  current.count += 1;
  rateLimitStore.set(clientIp, current);

  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AiChatResponse>
) {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({
        reply: "Only POST requests are allowed.",
        error: "METHOD_NOT_ALLOWED",
      });
    }

    const clientIp = getClientIp(req);
    if (isRateLimited(clientIp)) {
      return res.status(429).json({
        reply: "Too many requests. Please try again later.",
        error: "RATE_LIMITED",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        reply: "AI service is not configured.",
        error: "MISSING_API_KEY",
      });
    }

    const { message } = req.body ?? {};

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Message is required.",
        error: "INVALID_MESSAGE",
      });
    }

    const normalizedMessage = message.trim();

    if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        reply: `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`,
        error: "MESSAGE_TOO_LONG",
      });
    }

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
            content: normalizedMessage,
            },
        ],
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        reply: "AI service is temporarily unavailable.",
        error: data?.error?.message ?? "UPSTREAM_ERROR",
      });
    }

    const reply =
      data.choices?.[0]?.message?.content || "AI javob bera olmadi";

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({
      reply: "AI server xatoligi",
      error: "AI_SERVER_ERROR",
    });
  }
}
