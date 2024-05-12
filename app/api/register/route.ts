import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/dbConnect";
import exp from "constants";
import { cookies } from "next/headers";

export async function POST(req:NextRequest){
    await dbConnect()
    const {name,email,username,password,bio,profilePicture}=await req.json()
    if (!name || !email || !username || !password) {
        return NextResponse.json({success:false,message:"Missing required fields"}, {status:400});
    }
    const user=await UserModel.findOne({email,username})
    if(user) {
        return NextResponse.json({success:false,message:"Username or email already taken"},{status:400})
    }
    const encryptedpassword=await bcryptjs.hash(password,10)
    
    const token =await jwt.sign({name,email,username},process.env.JWT_SECRET!,{expiresIn:"1d"})
    if(profilePicture!=""){
        const newUser=await UserModel.create({name,email,username,password:encryptedpassword,bio,profilePicture})
        if(!newUser) return NextResponse.json({success:false,message:"Something went wrong"},{status:500})
        const userres={name:newUser.name,email:newUser.email,username:newUser.username,_id:newUser._id,profilePicture:newUser.profilePicture}
            return NextResponse.json({success:true,message:"User created successfully",user:userres},{status:200})
    }
    const newUser=await UserModel.create({name,email,username,password:encryptedpassword,bio})
    if(!newUser) return NextResponse.json({success:false,message:"Something went wrong"},{status:500})
    const userres={name:newUser.name,email:newUser.email,username:newUser.username,_id:newUser._id}
    cookies().set("token",token,{secure:true,httpOnly:true,sameSite:'strict',})
    cookies().set("user",JSON.stringify(userres),{secure:true,httpOnly:true,sameSite:'strict',})

    return NextResponse.json({success:true,message:"User created successfully",user:userres},{status:200})
}