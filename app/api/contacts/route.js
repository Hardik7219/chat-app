import userModel from "@/lib/user.model";
import dbConnect from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
    try {
        const authUser = await getAuthUser();
        if (!authUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const user = await userModel
            .findById(authUser.id)
            .populate("contact", "username")
            .lean();

        if (!user?.contact?.length) {
            return NextResponse.json({ contacts: [] });
        }

        const contacts = user.contact
            .filter((c) => c?.username)
            .map((c) => ({
                id: c._id.toString(),
                name: c.username,
            }));

        return NextResponse.json({ contacts });
    } catch {
        return NextResponse.json({ message: "Failed to load contacts" }, { status: 500 });
    }
}
