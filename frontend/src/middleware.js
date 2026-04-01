import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("github_token");
  const isEditorPage = request.nextUrl.pathname.startsWith("/editor");

  // If trying to access editor without a token, redirect to login
  if (isEditorPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Only run this middleware on the editor route
export const config = {
  matcher: ["/editor/:path*"],
};
