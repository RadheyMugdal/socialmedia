import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {imageUrl}=await req.json()
    if(!imageUrl){
        return new Response("No image url provided",{status:400})
    }
    dbConnect()
    await UserModel.findOneAndUpdate({},
        {
            imageUrl
        },
        {upsert:true}
    )


}