import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import jwt from "jsonwebtoken";
export async function POST(req:NextRequest){
    await dbConnect()
    const {email,password}=await req.json()
    const user=await UserModel.findOne({email})
    if(!user) return NextResponse.json({success:false,message:"User not found"},{status:404})
    const isValid=await bcrypt.compare(password,user.password)
    if(!isValid) return NextResponse.json({success:false,message:"Invalid password"},{status:401})
    const token =await jwt.sign({username:user.username,email:user.email,_id:user._id},process.env.JWT_SECRET!,{expiresIn:"24h"})

    req.cookies.set("token",token)
    await user.save()
    const userres={name:user.name,email:user.email,username:user.username,_id:user._id}
    return NextResponse.json({success:true,message:"Login successful",data:userres,token},{status:200})
}