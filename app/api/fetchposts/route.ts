import { PostModel } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const params=req.nextUrl.searchParams;
    const limit=parseInt(params.get('limit') || '10');
    const page=parseInt(params.get('page') || '1');
    const userId=params.get('userId');

    try {
        const posts = await PostModel.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "owner",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $unwind: "$owner" // Unwind the likes array
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "likes",
                    foreignField: "_id",
                    as: "likes" // Rename the result array as "likes"
                }
            },

            {
                $match: {
                    "likes.user_id": { $nin: [new  mongoose.Types.ObjectId(userId as string)] }, // User has not liked the post
                    "owner._id": { $ne: new mongoose.Types.ObjectId(userId as string) } // Not the owner's own post
                }
            },
            {
                $skip: (page - 1) * limit
            },
            {
                $limit: limit
            }
        ]);

        console.log(posts); // Check if the posts are retrieved properly
        return NextResponse.json({ message: "Posts fetched", data: posts, success: true }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching posts", success: false }, { status: 500 });
    }
}
