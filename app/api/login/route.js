import dbConnect from "@/lib/dbConnection";
import userModel from "@/lib/user.model";
import  jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');


export async function  POST(req) {
    try {
        const {email,password} =await req.json();
        if(!email || !password) return NextResponse.json({message:"field are empty"})
        await dbConnect();
        
        const user = await userModel.findOne({email})

        if(!user) return NextResponse.json({message:"user not exist"})

        
        const isMatch = await bcrypt.compare(
            password,
            user.password
        )
        if(!isMatch) return NextResponse.json({message:"email or password is wrong"})
        
        const token = jwt.sign({email:user.email,userName : user.username,id:user._id},process.env.JWT_SECRET);
        const response = NextResponse.json({message:"login succefull"})

        response.cookies.set(
            "token",
            token,
            {
                httpOnly: true,
                secure: false,
                sameSite: "strict",
                maxAge: 60 * 60 * 24 * 7,
            }
        );
        
        return response;
        
    } catch (error) {
        console.log(error)
    }
}