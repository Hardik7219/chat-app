import { NextResponse }
from "next/server";

export function proxy(req) {

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

    // not logged in
    if (!token &&
        path === "/pages/dashboard"
    ) {

        return NextResponse.redirect(
            new URL(
                "/",
                req.url
            )
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/pages/dashboard"
    ],
};