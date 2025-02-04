import { NextRequest, NextResponse } from "next/server";
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

export async function GET(req: NextRequest, res: NextResponse) {
  const profession = req.nextUrl.searchParams.get("profession");
  const goal = req.nextUrl.searchParams.get("goal");

  try {
    if (!profession || profession === "")
      return NextResponse.json(
        { error: "profession is required" },
        { status: 400 },
      );
    if (!goal || goal === "")
      return NextResponse.json({ error: "goal is required" }, { status: 400 });

    const summaries = await getSummary({
      goal,
      profession,
    });

    const parsedSummaries =
      summaries
        ?.replace(/\d+(\.\s*|\.)?/g, "")
        .split("\n")
        .filter((item: string) => item !== "") || [];
    return NextResponse.json(parsedSummaries, { status: 200 });
  } catch (e) {
    console.log(`Error in GET summary req ${e}`);
    return NextResponse.json(
      { error: `Error in GET summary req ${e}` },
      { status: 500 },
    );
  }
}
