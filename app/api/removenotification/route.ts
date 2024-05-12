import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest){
    const params= req.nextUrl.searchParams
    const _id=params.get('_id')
    const followerId=params.get('followerId')
    if(!_id || !followerId) return NextResponse.json({message:"All feilds are required"},{status:404})
    await dbConnect();
    const user=await UserModel.findByIdAndUpdate(_id,{$pull:{recentFollowers:new mongoose.Types.ObjectId(followerId)}})
    if(!user) return NextResponse.json({message:"No user found"},{status:404})
    return NextResponse.json({message:"removed sucessfully",success:true},{status:200})
}