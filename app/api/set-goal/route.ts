import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { goal } = await req.json();

    if (!goal)
      return NextResponse.json(
        { error: "goal is requuired" },
        { status: 400 },
      );

    cookies().set("goal", goal);

    return NextResponse.json({ msg: "cookie set" }, { status: 200 });
  } catch (e) {
    console.log(`Error in POST req set-goal ${e}`);
    return NextResponse.json(
      { error: `Error in POST req set-goal ${e}` },
      { status: 500 },
    );
  }
}
