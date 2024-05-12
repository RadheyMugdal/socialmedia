import { UserModel } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
export async function POST( req:NextRequest ) {
    const {_id,post_id}=await req.json()
    if(!_id || !post_id) return NextResponse.json({message:"All fields are required",sucess:false},{status:400})
    const user= await UserModel.findById(_id);
    if(!user) return NextResponse.json({message:"User not found",sucess:false},{status:400})
    const savedPosts=user.savedPosts.filter((post)=>post!=post_id)
    user.savedPosts=savedPosts
    await user.save()
    return NextResponse.json({message:"post unsaved successfully",sucess:true},{status:200})
}