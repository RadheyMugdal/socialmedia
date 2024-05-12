import { LikeModel, PostModel } from "@/models/User";
import { user } from "@nextui-org/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {_id,post_id}=await req.json()
    if(!_id || !_id.length) return NextResponse.json({message:"All feilds are required",success:false},{status:400})
    const likeres = await LikeModel.findOne({user_id:_id,post_id})
    if(!likeres) return NextResponse.json({message:"Like not found",success:false},{status:404})
    const post=await PostModel.findById(post_id)
    if(!post) return NextResponse.json({message:"Post not found",success:false},{status:404})
    post.likes=post.likes.filter((like:any)=>like!==likeres._id)
    await post.save()
    await LikeModel.deleteOne({_id:likeres._id})
    return NextResponse.json({message:"like removed",success:true},{status:200})


}