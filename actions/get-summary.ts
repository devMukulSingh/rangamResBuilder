import { ChatGPT } from "@/lib/ChatGPT";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSummary = cache(
  async ({
    profession,
    goal,
  }: {
    profession: string | undefined;
    goal: string | undefined;
  }) => {
    if (goal === "Student") {
      const prompt = `Suggest 4 short bio for ${profession} for resume, he is a student`;
      const summaries = await ChatGPT(prompt);
      return summaries;
    }
    if (goal === "Young professional") {
      const prompt = `Suggest 4 short bio for ${profession} for resume, he is a fresher with 1-2 yrs of experince`;
      const summaries = await ChatGPT(prompt);
      return summaries;
    }
    if (goal === "Experienced") {
      const prompt = `Suggest 4 short bio for ${profession} for resume, he is an experienced professional`;
      const summaries = await ChatGPT(prompt);
      return summaries;
    }
    if (goal === "Others") {
      const prompt = `Suggest 4 short bio for ${profession} for resume`;
      const summaries = await ChatGPT(prompt);
      return summaries;
    }
    return "";
  },
);
