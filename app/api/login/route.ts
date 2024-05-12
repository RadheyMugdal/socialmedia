import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { UserModel } from '@/models/User';
import  bcryptjs  from 'bcryptjs';
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect';


export async function POST(req:NextRequest){
    await dbConnect()
    const {email,password} = await req.json();
    if(!email || !password){
        return NextResponse.json({massage:"email or password is empty"},{status:400});

    }
    const user=await UserModel.findOne({email});
    if(!user){
        return NextResponse.json({massage:"user not found"},{status:404});
    }
    const isvalid=await bcryptjs.compare(password,user.password);
    if(!isvalid){
        return NextResponse.json({massage:"password is wrong"},{status:401});
    }
    const token=await jwt.sign({name:user.name,username:user.username,email:user.email},process.env.JWT_SECRET!,{expiresIn:'1h'});
    await user.save();
    cookies().set("token",token,{secure:true,httpOnly:true,sameSite:'strict',})
    cookies().set("user",JSON.stringify({username:user.username,name:user.name,email:user.email,_id:user._id}),{secure:true,httpOnly:true,sameSite:'strict',})
    return NextResponse.json({massage:"login success"},{status:200});
}