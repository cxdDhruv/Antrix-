import { NextResponse } from "next/server";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";

// Issues short-lived tokens so the browser can upload large models straight to Vercel Blob
// (Vercel functions reject request bodies over 4.5MB).
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!/^print-orders\/[^/]+\.(stl|obj|3mf)$/i.test(pathname)) {
          throw new Error("Only STL, OBJ or 3MF uploads are allowed.");
        }
        return {
          allowedContentTypes: ["application/octet-stream"],
          maximumSizeInBytes: 100 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
    });
    return NextResponse.json(result);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload failed." },
      { status: 400 },
    );
  }
}
