import userModel from "@/lib/user.model";
import dbConnect from "@/lib/dbConnection";
import { NextResponse } from "next/server";

export async function POST(req)
{
    try {
        const {Suser} = await req.json(); 

        await dbConnect();
        const user = await userModel.findOne({username:Suser});
        if(!user) return NextResponse.json({message:"no user found"});
        const userData={
            id:user._id,
            name:user.username
        }
        return NextResponse.json({userData});
    } catch (error) {
        return NextResponse.json({message:"error search user"});
    }
}