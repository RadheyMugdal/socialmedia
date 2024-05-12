import dbConnect from "@/lib/dbConnect";
import { CommentModel, PostModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {owner,post,text}=await req.json()
    if(!owner || !post || !text){
        return NextResponse.json({message:"Please fill all the fields"},{status:400})
    }
    await dbConnect();
    const comment=await CommentModel.create({owner,post,text})
    if(!comment) return NextResponse.json({message:"Something went wrong"},{status:500})
    const postmd=await PostModel.findById(post)
    if(!postmd) return NextResponse.json({message:"Something went wrong"},{status:500})
    postmd.comments.push(comment)
    await postmd.save()
    
    return NextResponse.json({message:"Comment created successfully",data:comment},{status:200})
}