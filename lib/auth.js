import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function getAuthUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token");
        if (!token) return null;
        return jwt.verify(token.value, process.env.JWT_SECRET);
    } catch {
        return null;
    }
}
