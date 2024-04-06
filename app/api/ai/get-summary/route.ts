import { getSummary } from "@/actions/get-summary";
import { NextRequest, NextResponse } from "next/server";

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
