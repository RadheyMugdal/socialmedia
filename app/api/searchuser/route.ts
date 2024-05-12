import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {username}=await req.json();
    console.log(username);
    await dbConnect();
    
    const regexpattern=new RegExp(username,"i")
    
    const users=await UserModel.find({username:{$regex:regexpattern}})
    if(users.length===0) return NextResponse.json({success:false,message:"User not found"},{status:404})
    return NextResponse.json({success:true,message:"Search successful",data:users},{status:200})
}