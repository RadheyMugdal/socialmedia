import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const _id = params.get("_id");
    console.log(params);
    
    await dbConnect();
    
    const users = await UserModel.find(
        {},
        { followers: 0, posts: 0, savedPosts: 0, recentFollowers: 0, bio: 0, likedPosts: 0, password: 0 }
    );

    // Filter out users based on the specified criteria
    const filteredUsers = users.filter((user:any) => {
        return user._id != _id && !user.following.includes(_id);
    });

    return NextResponse.json({ message: "Users fetched successfully", data: filteredUsers }, { status: 200 });
}
