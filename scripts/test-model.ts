import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({
  path: ".env.local",
});

async function main() {
  console.log(
    "API KEY:",
    process.env.GEMINI_API_KEY ? "TERBACA ✅" : "TIDAK TERBACA ❌"
  );

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY!,
  });

  const response = await ai.models.generateContent({
    model: "gemini-flash-latest",
    contents: "Balas hanya dengan kata: Halo",
  });

  console.log("HASIL:");
  console.log(response.text);
}

main().catch(console.error);