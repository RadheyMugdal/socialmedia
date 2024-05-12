import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams
    console.log(params);
    const _id=params.get("_id")
    await dbConnect()
    const user=await UserModel.findById(_id)
    if(!user) return new Response("User not found",{status:404})
    return NextResponse.json({message:"User found",data:user},{status:200})
}