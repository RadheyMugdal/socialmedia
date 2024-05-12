import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const { _id,user_id } = await req.json()
    if(!_id || !user_id) return NextResponse.json({message:"all feilds are required",sucess:false},{status:400})
    await dbConnect()
    const own=await UserModel.findById(_id)
    if(!own) return NextResponse.json({message:"user not found",sucess:false},{status:404})
    const user=await UserModel.findById(user_id)
    if(!user) return NextResponse.json({message:"user not found",sucess:false},{status:404})
    await user.updateOne({$pull:{followers:_id}})
    await own.updateOne({$pull:{following:user_id}})
    return NextResponse.json({message:"unfollowed sucessfully",sucess:true},{status:200})
}