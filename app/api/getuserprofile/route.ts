import { UserModel } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const params=req.nextUrl.searchParams
    const _id=params.get("_id")
    const user_id=params.get("user_id")
    let isFollowing=false
    if(!_id || !user_id) return NextResponse.json({message:"all feilds are required",sucess:false},{status:400})
    const user=await UserModel.findById(_id.toString())
    if(!user) return NextResponse.json({message:"user not found",sucess:false},{status:404})
    const recipent=await UserModel.findById(user_id.toString())
    if(!recipent) return NextResponse.json({message:"user not found",sucess:false},{status:404})
    if(user.following.includes(recipent._id)) {
        isFollowing=true
    }
    console.log({recipent,isFollowing});
    
    return NextResponse.json({message:"fetched user successfully",sucess:true,data:{recipent,isFollowing}}, {status:200})
}