import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {userId,_id} =await req.json()
    
    if(!userId || !_id) return NextResponse.json({message:"all fields are required"},{status:400})
    if(userId===_id) return NextResponse.json({message:"user can't follow themselves"},{status:400})
     await   dbConnect()
    const user=await UserModel.findById(_id)
    if(!user) return NextResponse.json({message:"user not found"},{status:404})
    
    const againstuser=await UserModel.findById(userId)
    if(!againstuser) return NextResponse.json({message:"user not found"},{status:404})
    user.following.push(userId)
    if(againstuser.following.includes(userId)) {
        againstuser.followers.push(_id)
        await againstuser.save()
        return NextResponse.json({message:"user added to follower list"},{status:200})
    }
    againstuser.recentFollowers.push(_id)
    againstuser.followers.push(_id)
    await againstuser.save()
    await user.save()
    return NextResponse.json({message:"user added to follower list"},{status:200})
    
}