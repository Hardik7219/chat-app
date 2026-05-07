import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";


export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token");
        if (!token) {

            return NextResponse.json({
                loggedIn: false
            });
        }
        const decoded =
            jwt.verify(
                token.value,
                process.env.JWT_SECRET
            );
        return NextResponse.json({
            loggedIn: true,
            user: decoded,
        });

    } catch (error) {

        return NextResponse.json({
            loggedIn: false
        });
    }
}