import { PostModel, UserModel } from "@/models/User";
import { NextRequest,NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {_id,post_id}=await req.json();
    if(!_id || !post_id) return NextResponse.json({message:"id or post_id is required",sucess:false},{status:400})
    const user=await UserModel.findById(_id);
    if(!user) return NextResponse.json({message:"user not found",sucess:false},{status:404})
    const post=await PostModel.findById(post_id);
    if(!post) return NextResponse.json({message:"post not found",sucess:false},{status:404})
    user.savedPosts.push(post)
    await user.save()
    return NextResponse.json({message:"post saved",sucess:true},{status:200})
}