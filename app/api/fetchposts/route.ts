import dbConnect from "@/lib/dbConnect";
import { PostModel } from "@/models/User";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const params=req.nextUrl.searchParams;
    const limit=parseInt(params.get('limit') as string);
    const page=parseInt(params.get('page') as string);
    const userId=params.get('userId');
    await dbConnect()
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

}

