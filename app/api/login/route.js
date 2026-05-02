import dbConnect from "@/lib/dbConnection";
import userModel from "@/lib/user.model";
import { NextResponse } from "next/server";


export async function  POST(req) {
    try {
        const {email,password} =await req.json();
        if(!email || !password) return NextResponse.json({message:"field are empty"})
        await dbConnect();
        const 
        const user = await userModel.findOne({email,})
    } catch (error) {
        
    }
}