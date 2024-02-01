import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    const [_, route] = request.nextUrl.pathname.split("/api");
    return NextResponse.rewrite(
      new URL(`http://149.102.249.204:3333${route}`).toString()
    );
  }
}
