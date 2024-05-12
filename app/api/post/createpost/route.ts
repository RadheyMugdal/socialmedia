import dbConnect from "@/lib/dbConnect";
import { PostModel, UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    await dbConnect()
    const {imageUrl,content,_id}=await req.json();

    if(!imageUrl || !content || !_id) return NextResponse.json({message:"Please fill all the required fields"},{status:404})
        const post = await PostModel.create({
            imageUrl,
            owner:_id,
            content
        })
        if(!post) return NextResponse.json({message:" something went wrong while creating post"},{status:500})
        const user= await UserModel.findById(_id)
        if(!user) return NextResponse.json({message:" something went wrong while creating post"},{status:500})
        user.posts.push(post)
        await user.save()
        return NextResponse.json({message:"post created successfully",data:post},{status:200})
    }

