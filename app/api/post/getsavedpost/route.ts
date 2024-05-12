import dbConnect from "@/lib/dbConnect";
import { PostModel, UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const params=req.nextUrl.searchParams
    await dbConnect()
    const user = await UserModel.findById(params.get("_id"));
    if(!user) return NextResponse.json({message:"User not found",data:[]},{status:404})
    const posts=user.savedPosts;
    let postsdetails=[]
    for(let i=0;i<posts.length;i++){
        const post=await PostModel.findById(posts[i])
        postsdetails.push(post)
    }
    
    return NextResponse.json({message:"Posts fetched",data:postsdetails},{status:200})
}