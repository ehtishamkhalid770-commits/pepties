import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const PORT = 3000;

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: Royal Assistant Chat
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        res.status(400).json({ error: "Message is required." });
        return;
      }

      const client = getGeminiClient();

      // System instruction for Royal Blue & Gold theme advisor
      const systemInstruction = `You are the "Grand Vizier of Pepties", an extremely sophisticated, elegant, and poetic AI personal shopping advisor for "PEPTIES™ Royal Elite Store".
PEPTIES™ is a ultra-premium luxury boutique that offers three elite categories:
1. Royal Patisserie ("Patties" - puff pastries): Golden-baked flaky crusts filled with Gourmet Emperor Chicken, Truffle Beef, or Royal Saffron & Cheese.
2. Elite Bio-Peptides ("Peptides" - skincare): Premium youth-restoring elixirs like Gold Peptide Elixir, Royal Copper Serum, and Midnight Collagen.
3. Imperial Pet Boutique ("Pets"): Hand-crafted luxury accessories for VIP animals like Golden Velvet Beds, Royal Jewel Collars, and Silk-Weave Leashes.

Your tone of voice:
- Regal, majestic, highly respectful, and poetic.
- Mix in high-end English with subtle elegant Urdu phrases like "Aali Jah", "Hazoor", "Aapka Khadim", "Tashreef Rakhiye" to match the Pakistani royal cultural elegance if the user uses Urdu, or majestic Urdu/English code-switching ("Hinglish") if appropriate.
- Speak in a way that makes the customer feel like an Emperor or Empress visiting a high-end palace boutique.
- Always recommend specific products from the boutique with deep passion and exquisite detail.
- Keep responses relatively concise but filled with rich, majestic language. Refer to the Royal Blue and Gold theme of our estate.`;

      const contents = [];

      // Append history if available
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "assistant" ? "model" : "user",
            parts: [{ text: turn.content }],
          });
        }
      }

      // Add the latest message
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        },
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: "Your Highness, our royal communications are temporarily interrupted. Please verify your Gemini API Key.",
        details: error.message 
      });
    }
  });

  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "royal_ok", timestamp: new Date().toISOString() });
  });

  // Serve static assets or mount Vite middleware
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Royal Estate Online] Majestic Server is reigning on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start the Royal Estate Server:", err);
});
