import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { profession } = await req.json();

    console.log(profession);

    if (!profession)
      return NextResponse.json(
        { error: "Profession is requuired" },
        { status: 400 },
      );

    cookies().set("profession", profession);

    return NextResponse.json({ msg: "cookie set" }, { status: 200 });
  } catch (e) {
    console.log(`Error in POST req set-profession ${e}`);
    return NextResponse.json(
      { error: `Error in POST req set-profession ${e}` },
      { status: 500 },
    );
  }
}
