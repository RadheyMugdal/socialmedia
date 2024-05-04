import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import exp from "constants";

export async function POST(req:NextRequest){
    await dbConnect()
    const {name,email,username,password,bio}=await req.json()
    if (!name || !email || !username || !password) {
        return NextResponse.json({success:false,message:"Missing required fields"}, {status:400});
    }
    const user=await UserModel.findOne({email,username})
    if(user) {
        return NextResponse.json({success:false,message:"Username or email already taken"},{status:400})
    }
    const encryptedpassword=await bcrypt.hash(password,10)
    
    const newUser=await UserModel.create({name,email,username,password:encryptedpassword,bio})
    const token =await jwt.sign({name,email,username,_id:newUser._id},process.env.JWT_SECRET!,{expiresIn:"1d"})

    if(!newUser) return NextResponse.json({success:false,message:"Something went wrong"},{status:500})
        const userres={name:newUser.name,email:newUser.email,username:newUser.username,_id:newUser._id}
    return NextResponse.json({success:true,message:"User created successfully",user:userres},{status:201})
}