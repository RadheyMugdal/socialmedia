import dbConnect from "@/lib/dbConnect";
import { PostModel, UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const params=req.nextUrl.searchParams
    await dbConnect()
    const user = await UserModel.findById(params.get("_id"));
    if(!user) return NextResponse.json({message:"User not found",data:[]},{status:404})
    let posts=await PostModel.find({owner:user._id})
    posts=posts.map((post:any)=>{
            let timeDifference;
            if (post) {
              const postCreatedAt: Date = new Date(post?.createdAt);
              const currentTime: Date = new Date();
              const differenceInMilliseconds: number = currentTime.getTime() - postCreatedAt.getTime();
              const differenceInMinutes: number = Math.floor(differenceInMilliseconds / (1000 * 60));
        
              if (differenceInMinutes < 60) {
                timeDifference=`${differenceInMinutes} min ago`
              } else {
                const differenceInHours: number = Math.floor(differenceInMinutes / 60);
               timeDifference=`${differenceInHours} h ago`;
              }
            
            }
            return {...post,timeDifference}
    })
    return NextResponse.json({message:"Posts fetched",data:posts},{status:200})
}