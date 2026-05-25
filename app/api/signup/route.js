import dbConnect from "@/lib/dbConnection";
import userModel from "@/lib/user.model";
import  jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
const bcrypt = require('bcrypt');

export async function POST(req)
{
    try {
        const {username,email,password} =await req.json();
        if(!username || !email || !password) return NextResponse.json({message:"field are empty"})
        await dbConnect();
        const existing = await userModel.findOne({
            $or: [{ email }, { username }],
        });
        if (existing) {
            const message =
                existing.email === email
                    ? "Email already registered"
                    : "Username already taken";
            return NextResponse.json({ message });
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await userModel.create ({
            username,
            email,
            password:hashedPassword
        })
        if(!newUser) return NextResponse.json({message:"something is wrong when creating user"})
        else return NextResponse.json({message:"user created"});
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"db something is wrong"})
    }
}