import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function Gemini(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    console.log(e);
    throw new Error("Unable to get response from Gemini");
  }
}
