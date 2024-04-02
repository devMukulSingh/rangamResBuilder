import { ChatGPT } from "@/lib/ChatGPT";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const profession = cookies().get("profession")?.value;
    if (!profession || profession === "")
      return NextResponse.json(
        { error: "profession is required" },
        { status: 400 },
      );

    const skillPrompt = `My profession is ${profession}, give me a list of 13 skills used in this profession to add in resume in max 3 words and exclude slashes and brackets`;

    const skills = await ChatGPT(skillPrompt);
    const parsedSkills =
      skills
        ?.replace(/\d+(\.\s*|\.)?/g, "")
        .split("\n")
        .filter((item: string) => item !== "") || [];

    return NextResponse.json(parsedSkills, { status: 200 });
  } catch (e) {
    console.log(`Error in GET skills req ${e}`);
    return NextResponse.json(
      { error: `Error in GET skills req ${e}` },
      { status: 500 },
    );
  }
}
