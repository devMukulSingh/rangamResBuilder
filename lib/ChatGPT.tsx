import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function ChatGPT(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0].message.content;
  } catch (e) {
    console.log(`Error in CHATGPT api ${e}`);
  }
}
