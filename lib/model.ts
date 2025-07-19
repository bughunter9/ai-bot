"use server";

import { GoogleGenAI } from "@google/genai";

export const askModel = async (prompt: string) => {
  const model = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const response = await model.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
};
