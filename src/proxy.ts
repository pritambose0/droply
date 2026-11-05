import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_PAGES } from "./config/auth.config";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));

  // Redirect authenticated users away from auth pages
  if (token && isAuthPage) {
    const role = token.role;

    const redirectPath =
      role === "creator" ? "/seller" : role === "buyer" ? "/buyer" : "/sign-in";

    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  // Protect application routes
  if (!token && !isAuthPage) {
    const signInUrl = new URL("/sign-in", req.url);

    signInUrl.searchParams.set("callbackUrl", pathname + req.nextUrl.search);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/seller/:path*",
    "/buyer/:path*",
    "/settings/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/verify",
  ],
};
