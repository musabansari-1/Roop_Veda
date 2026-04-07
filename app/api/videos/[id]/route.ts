import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth/current-user";
import { videoProvider } from "@/lib/videoProvider";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    if (!user.isPaid) {
      return NextResponse.json(
        { error: "Payment required." },
        { status: 403 }
      );
    }

    const url = await videoProvider.getVideoUrl(params.id, user.id);

    return NextResponse.json({
      url
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to generate signed URL." },
      { status: 400 }
    );
  }
}
