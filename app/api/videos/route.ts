import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { videoProvider } from "@/lib/videoProvider";

export const runtime = "nodejs";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (!user.isPaid) {
    return NextResponse.json({ error: "Payment required." }, { status: 403 });
  }

  const videos = await videoProvider.listVideos();

  return NextResponse.json({
    videos
  });
}
