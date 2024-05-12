import dbConnect from "@/lib/dbConnect";
import { LikeModel, PostModel, UserModel } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    await dbConnect()
    const params=req.nextUrl.searchParams
    console.log(params);
    
    let isLiked;
    let isSaved=false;
    const post=await PostModel.findById({_id:params.get('id')})
    if(!post ) return NextResponse.json({message:"Post not found"},{status:404})
    const owner=await UserModel.findById({_id:post.owner})
    if(!owner) return NextResponse.json({message:"User not found"},{status:404})   
    const like=await LikeModel.findOne({post_id:post._id,user_id:new mongoose.Types.ObjectId(params.get('user_id') as string)})
    console.log(like);
    if(!like) {
        isLiked=false
    }else{
        isLiked=true
    }
    const user=await UserModel.findById({_id:params.get('user_id')})
    if(!user) return NextResponse.json({message:"User not found"},{status:404})
    for(let i=0;i<user.savedPosts.length;i++){ 
        const id=user.savedPosts[i].toString()
        if(id === post._id.toString()){
            isSaved=true
            continue
        }
    }
    console.log(isSaved);
    
    const postres={...post,isLiked,isSaved,owner}
    console.log(postres);
  
    return NextResponse.json({message:"Post found",data:postres},{status:200})
}