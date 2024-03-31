import { ChatGPT } from "@/lib/ChatGPT";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    // const profession = cookies().get("profession")?.value;
    const profession = req.nextUrl.searchParams.get("profession");
    if (!profession)
      return NextResponse.json(
        { error: "profession is required" },
        { status: 400 },
      );

    const skillPrompt = `My profession is ${profession}, give me a list of 13 technology names, or skills relevant to this profession in maximum 3 words, and exclude slash`;
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
