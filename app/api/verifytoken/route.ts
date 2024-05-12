import jwt, { JwtPayload } from 'jsonwebtoken';
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req:NextRequest){
    const token=req.cookies.get("token")
    if(!token) return NextResponse.json({message:"no token"},{status:401})
    const decoded = await jwt.verify(token.value, process.env.JWT_SECRET as string);
    if(!decoded) return NextResponse.json({message:"invalid token"},{status:401})
    return NextResponse.json({message:"ok",decoded},{status:200})

}