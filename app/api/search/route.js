import userModel from "@/lib/user.model";
import dbConnect from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function POST(req) {
    try {
        const authUser = await getAuthUser();
        if (!authUser) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { Suser, query } = await req.json();
        const searchTerm = (query ?? Suser ?? "").trim();

        if (!searchTerm) {
            return NextResponse.json({ message: "Enter a username to search" }, { status: 400 });
        }

        if (searchTerm.length < 2) {
            return NextResponse.json({ message: "Type at least 2 characters" }, { status: 400 });
        }

        await dbConnect();

        const users = await userModel
            .find({
                username: { $regex: escapeRegex(searchTerm), $options: "i" },
                _id: { $ne: authUser.id },
            })
            .select("username")
            .limit(10)
            .lean();

        if (!users.length) {
            return NextResponse.json({ message: "No users found", users: [] });
        }

        const results = users.map((u) => ({
            id: u._id.toString(),
            name: u.username,
        }));

        return NextResponse.json({ users: results });
    } catch {
        return NextResponse.json({ message: "Search failed" }, { status: 500 });
    }
}
