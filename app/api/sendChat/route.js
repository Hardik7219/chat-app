import userModel from "@/lib/user.model";
import dbConnect from "@/lib/dbConnection";
import { NextResponse } from "next/server";
import msgModel from "@/lib/msg.model";

export async function POST(req) {
    try {
        const { _id, id, msg } = await req.json();
        if (!msg?.trim()) {

            return NextResponse.json({
                message: "Empty message"
            });
        }
        await dbConnect();
        const user = await userModel.findById(_id);
        const resUser = await userModel.findById(id);
        const newMsg = await msgModel.create({
            senderId: _id,
            receiId: id,
            message: msg,
        })
        user.messages.push(
            newMsg._id,
        );
        if (
            !user.contact.includes(id)
        ) {

            user.contact.push(id);
        }

        await user.save();


        resUser.messages.push(
            newMsg._id
        )
        await resUser.save()
        return NextResponse.json({ data: newMsg })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}   