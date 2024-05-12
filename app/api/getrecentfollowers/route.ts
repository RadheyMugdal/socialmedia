import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const params= req.nextUrl.searchParams
    console.log(params);
    
    const _id=params.get('_id')

    await dbConnect()
    if(_id===undefined){
      return NextResponse.json({message:"No user found"},{status:404})
    }
    const user=await UserModel.findById(_id)
    const data=[]
    if(!user) return NextResponse.json({message:"No user found"},{status:404})
    for(let i=0;i<user.recentFollowers.length;i++){
      const refol=await UserModel.findById(user.recentFollowers[i].toString(),{_id:1,username:1,profilePicture:1})
      data.push(refol)
      }
    
    return NextResponse.json({message:"got recent followers",data:data},{status:200})
}