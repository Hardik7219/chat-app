import { NextResponse }
from "next/server";

export function middleware(req) {

    const token =
        req.cookies.get("token");

    const path =
        req.nextUrl.pathname;

    // logged in user
    if (token && path === "/") {

        return NextResponse.redirect(
            new URL(
                "/pages/dashboard",
                req.url
            )
        );
    }

    const protectedPaths = [
        "/pages/dashboard",
        "/pages/profile",
        "/pages/chatPage",
    ];

    if (!token && protectedPaths.some((p) => path.startsWith(p))) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/pages/dashboard",
        "/pages/profile",
        "/pages/chatPage",
    ],
};