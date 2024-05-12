import dbConnect from "@/lib/dbConnect";
import { CommentModel, UserModel } from "@/models/User";
import mongoose, { Mongoose } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
type commentresponse = {
    username: string;
    name: string;
    profilePicture: string;
    _id: string;
    text: string;
    createdAt: Date;
    post: string;
    time:string
};
export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    const post = params.get("_id");
    console.log(params);
    
    await dbConnect();
    const id=new mongoose.Types.ObjectId(post as string);
    console.log(id);
    

    // const comments =
    const comments=await CommentModel.find({post:id})
    console.log(comments);
    
    if(!comments) return NextResponse.json({message:"Something went wrong"},{status:500})
    const data: commentresponse[] = [];

    for (const comment of comments) {
        let postfulldata : commentresponse;
        
        // Ensure comment.owner is converted to ObjectId
        const ownerId = comment.owner; // Assuming comment.owner is a string
        const commentowner = await UserModel.findById({_id:ownerId}, { username: 1, name: 1, profilePicture: 1, _id: 1 });
        if(!commentowner) return NextResponse.json({message:"Something went wrong"},{status:500})
        let timedifference;
        const commentcreatedat=new Date(comment.createdAt);
        const currenttime=new Date();
        const differenceinmilliseconds=currenttime.getTime()-commentcreatedat.getTime();
        const differenceinminutes=Math.floor(differenceinmilliseconds/(1000*60));
        console.log(differenceinminutes);
        if(differenceinminutes<60){
            timedifference=`${differenceinminutes} min`
        }else{
            const differenceinhours=Math.floor(differenceinminutes/60);
            timedifference=`${differenceinhours} h`
        }
        postfulldata = {
            username: commentowner.username,
            name: commentowner.name,
            profilePicture: commentowner.profilePicture,
            _id: commentowner?._id.toHexString(),
            text: comment.text,
            createdAt: comment.createdAt,
            post: (comment.post).toString(),
            time: timedifference
        };
        data.push(postfulldata);

    }

    return NextResponse.json({ message: "Comments fetched", data: data });
}
