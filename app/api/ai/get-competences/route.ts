import { ChatGPT } from "@/lib/ChatGPT";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const profession = cookies().get("profession")?.value;

    if (!profession)
      return NextResponse.json(
        { error: "profession is required" },
        { status: 400 },
      );

    const prompt = `Generate 7 key competences or responsibilities whose profession is ${profession},in max 3 words`;

    const competences = await ChatGPT(prompt);

    const parsedCompetences =
      competences
        ?.replace(/\d+(\.\s*|\.)?/g, "")
        .split("\n")
        .filter((item: string) => item !== "") || [];

    return NextResponse.json(parsedCompetences, { status: 200 });
  } catch (e) {
    console.log(`Error in GET req ${e}`);
    return NextResponse.json(
      { error: `Error in GET req ${e}` },
      { status: 500 },
    );
  }
}
