import dbConnect from "@/lib/dbConnect";
import { PostModel, UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const params=req.nextUrl.searchParams
    await dbConnect()
    const user = await UserModel.findById(params.get("_id"));
    if(!user) return NextResponse.json({message:"User not found",data:[]},{status:404})
    const posts=await PostModel.find({owner:user._id})
    return NextResponse.json({message:"Posts fetched",data:posts},{status:200})
}