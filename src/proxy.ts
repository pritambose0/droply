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

    // Logged-in users shouldn't see auth pages
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Unauthenticated users can't access protected routes
    if (!token && !isAuthPage) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/profile/:path*",
        "/orders/:path*",
        "/products/:path*",
        ...AUTH_PAGES,
    ],
};
