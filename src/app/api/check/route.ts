import { NextResponse } from "next/server";
import eligible from "@/data/eligible.json";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { handle } = await req.json();

    if (!handle || handle.trim() === "") {
      return NextResponse.json(
        { error: "Handle is required" },
        { status: 400 }
      );
    }

    const normalized = handle.replace("@", "").trim().toLowerCase();

    // cek di list
    const found = (eligible as any[]).find((item) => {
      return item.handle.toLowerCase() === normalized;
    });

    if (!found) {
      return NextResponse.json({
        eligible: false,
        handle: normalized,
        message: "Not in leaderboard",
      });
    }

    // kalau ditemukan
    return NextResponse.json({
      eligible: true,
      handle: found.handle,
      rank: found.rank,
      allocation: found.allocation,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
