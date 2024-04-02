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

    const skillPrompt = `give me only a list of 13 skills as a ${profession} to add in resume under the skills section of the resume without slash`;

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
