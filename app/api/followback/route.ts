import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {_id,followerId}=await req.json()
    if(!_id || !followerId) return NextResponse.json({message:"All fields are required",success:false},{status:400})
    const user= await UserModel.findById(_id);
    if(!user) return NextResponse.json({message:"User not found",success:false},{status:400})
    const follower= await UserModel.findById(followerId);
    if(!follower) return NextResponse.json({message:"User not found",success:false},{status:400})
    user.following.push(follower)
    follower.followers.push(user)
    await follower.save()
    user.recentFollowers=user.recentFollowers.filter((follower)=>follower.toString()!=followerId.toString())
    await user.save()
    return NextResponse.json({message:"followback successfully",success:true},{status:200})
}