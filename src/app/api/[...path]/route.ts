import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://localhost:5000";

/**
 * Catch-all proxy route: forwards every /api/* request to the backend at runtime.
 * Reading BACKEND_API_URL here (not in next.config.ts) ensures it works on Vercel
 * without requiring a redeploy when the env var changes.
 */
async function proxyRequest(req: NextRequest, segments: string[]) {
  const path = segments.join("/");
  const search = req.nextUrl.search || "";
  const targetUrl = `${BACKEND_URL}/api/${path}${search}`;

  const headers = new Headers(req.headers);
  headers.delete("host");
  // Let fetch set Content-Length from the body we pass
  headers.delete("content-length");

  const init: RequestInit = {
    method: req.method,
    headers,
  };

  if (!["GET", "HEAD"].includes(req.method)) {
    const contentType = req.headers.get("content-type") || "";
    // Preserve multipart boundaries for file uploads; use binary for everything else.
    if (contentType.includes("multipart/form-data")) {
      init.body = await req.arrayBuffer();
    } else {
      init.body = await req.arrayBuffer();
    }
  }

  try {
    const backendRes = await fetch(targetUrl, init);
    const contentType =
      backendRes.headers.get("Content-Type") || "application/json";

    // Binary responses (rare via /api) vs text/json
    if (
      contentType.startsWith("image/") ||
      contentType.includes("octet-stream")
    ) {
      const buffer = await backendRes.arrayBuffer();
      return new NextResponse(buffer, {
        status: backendRes.status,
        headers: { "Content-Type": contentType },
      });
    }

    const body = await backendRes.text();
    return new NextResponse(body, {
      status: backendRes.status,
      headers: { "Content-Type": contentType },
    });
  } catch (err) {
    console.error(`[proxy] Failed to reach backend at ${targetUrl}:`, err);
    return NextResponse.json(
      { error: "Backend unavailable. Please try again later." },
      { status: 502 }
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  return proxyRequest(req, path);
}
