import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req:NextRequest){
    const {token}=await req.json()
    if(!token) return NextResponse.json({success:false,message:"Missing token"},{status:400})
    const decoded=await jwt.verify(token,process.env.JWT_SECRET!)
    if(!decoded) return NextResponse.json({success:false,message:"Invalid token"},{status:400})
    return NextResponse.json({success:true,message:"Token verified"},{status:200})
}