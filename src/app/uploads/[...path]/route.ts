import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

/**
 * Proxy uploaded portfolio images from the backend so the frontend can use
 * stable paths like /uploads/projects/... in <img src>.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const targetUrl = `${BACKEND_URL}/uploads/${path.join("/")}`;

  try {
    const backendRes = await fetch(targetUrl, { cache: "no-store" });
    if (!backendRes.ok) {
      return new NextResponse("Not found", { status: backendRes.status });
    }

    const contentType =
      backendRes.headers.get("Content-Type") || "application/octet-stream";
    const buffer = await backendRes.arrayBuffer();

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error(`[uploads proxy] Failed to reach ${targetUrl}:`, err);
    return new NextResponse("Backend unavailable", { status: 502 });
  }
}
