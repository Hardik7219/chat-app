import dbConnect from "@/lib/dbConnection";
import userModel from "@/lib/user.model";
import msgModel from "@/lib/msg.model";
import { NextResponse } from "next/server";


export async function  POST(req) {
 try {

        const {
            myId,
            otherId
        } = await req.json();

        await dbConnect();

         const messages =
            await msgModel.find({

                $or: [

                    {
                        senderId: myId,
                        receiId: otherId,
                    },

                    {
                        senderId: otherId,
                        receiId: myId,
                    },

                ],

            }).sort({
                createdAt: 1
            });


        return NextResponse.json({
            messages
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json({
            message: "Server error"
        });
    }
}