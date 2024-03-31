import { ChatGPT } from "@/lib/ChatGPT";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const competence = req.nextUrl.searchParams.get("competence");
    const profession = req.nextUrl.searchParams.get("profession");

    if (!competence)
      return NextResponse.json(
        { error: "competence is required" },
        { status: 400 },
      );

    if (!profession)
      return NextResponse.json(
        { error: "profession is required" },
        { status: 400 },
      );

    const prompt = `i have worked as a ${profession} to add highlights in my resume elaborate ${competence} in a single line as point`;

    const description = await ChatGPT(prompt);

    return NextResponse.json(description, { status: 200 });
  } catch (e) {
    console.log(`Error in GET competence Description REQ ${e}`);
    return NextResponse.json(
      { error: `Error in GET competence Description REQ ${e}` },
      { status: 500 },
    );
  }
}
