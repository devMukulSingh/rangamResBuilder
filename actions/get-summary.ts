import { Gemini } from "@/lib/utils";

export const getSummary = async ({
  profession,
  goal,
}: {
  profession: string | undefined;
  goal: string | undefined;
}) => {
  if (goal === "Student") {
    const prompt = `Suggest 4 short bio for ${profession} for resume, he is a student`;
    const summaries = await Gemini(prompt);
    return summaries;
  }
  if (goal === "Young professional") {
    const prompt = `Suggest 4 short bio for ${profession} for resume, he is a fresher with 1-2 yrs of experince`;
    const summaries = await Gemini(prompt);
    return summaries;
  }
  if (goal === "Experienced") {
    const prompt = `Suggest 4 short bio for ${profession} for resume, he is an experienced professional`;
    const summaries = await Gemini(prompt);
    return summaries;
  }
  if (goal === "Others") {
    const prompt = `Suggest 4 short bio for ${profession} for resume`;
    const summaries = await Gemini(prompt);
    return summaries;
  }
  return "";
};
