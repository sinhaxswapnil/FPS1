import { GoogleGenAI, GenerateContentStreamResult } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are the Sentinel AI Emergency Assistant. Your role is to assist users in a fire protection and emergency management system.
You have expertise in:
- Fire safety procedures (classes of fire, extinguisher types, evacuation protocols).
- Medical first aid (CPR, treating burns, bleeding, shock).
- Hazardous material handling.
- Emergency resource allocation logic.

Guidelines:
- Be concise, clear, and authoritative but calm.
- Prioritize human safety above all else.
- If a user reports an immediate life-threatening emergency, tell them to call local emergency services (911/112) immediately, then offer immediate first-aid advice.
- Format responses using Markdown (lists, bold text for key steps).
- If asked about location-specific services, use the 'googleMaps' tool to find real places if available, or explain you are simulating a database connection.

You have access to a simulated database of services (Police, Fire, Hospital, Water, etc.). If the user asks about the specific mock data in the app (like "Which fire station is offline?"), you won't know unless they provide that context, so generalize your answer or ask for the data.
`;

export async function streamGeminiResponse(
  history: { role: 'user' | 'model'; text: string }[],
  currentMessage: string
): Promise<GenerateContentStreamResult> {
  
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.4, // Lower temperature for more deterministic/safe answers
      tools: [{ googleMaps: {} }],
    },
    history: history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }))
  });

  return chat.sendMessageStream({ message: currentMessage });
}