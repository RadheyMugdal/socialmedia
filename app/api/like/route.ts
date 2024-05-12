import dbConnect from "@/lib/dbConnect";
import { LikeModel, PostModel, UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {post_id,user_id} = await req.json();
    if(!post_id || !user_id) return NextResponse.json({message: "Missing parameters"}, {status: 400});

    await dbConnect();

    try {
        const user=await UserModel.findById(user_id);
        if(!user) return NextResponse.json({message: "User not found"}, {status: 404});
        const like = await LikeModel.create({post_id,user_id});
        if(!like) return NextResponse.json({message: "Like failed"}, {status: 500});

        let post = await PostModel.findById(post_id);
        if(!post) return NextResponse.json({message: "Post not found"}, {status: 404});

        // Ensure post.likes is an array before pushing
        if (!post.likes || !Array.isArray(post.likes)) {
            post.likes = [];
        }
        user.likedPosts.push(post);
        await user.save();
        post.likes.push(like);
        await post.save();

        return NextResponse.json({message: "Liked", data: like}, {status: 200});
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}
