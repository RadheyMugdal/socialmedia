import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";  
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id:"credentials",
            name:"Credentials",
            credentials:{
                email:{label:"Email",type:"text"},
                password:{label:"Password",type:"password"}

            },
            async authorize(credentials:any) : Promise<any> {
                console.log(credentials);
                
                await dbConnect();
                try {
                    const user=await UserModel.findOne({email:credentials?.email})
                    if(!user) throw new Error("User not found");
                    const isValid=await bcrypt.compare(credentials.password,user.password)
                    if(!isValid) throw new Error("Invalid password");
                    return user;
                } catch (error:any) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    pages:{
        signIn:"/login",
    },
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXT_AUTH_SECRET,
    callbacks:{
        async jwt({token,user}) {
            if(user){
                token._id=user._id?.toString();
                token.name=user.name
                token.email=user.email
                token.username=user.username
                token.profilePicture=user.profilePicture
            }
            return token;
        }, 
        async session({session,token}) {
            if(token){
                session.user._id=token._id;
                session.user.name=token.name
                session.user.email=token.email
                session.user.username=token.username
                session.user.profilePicture=token.profilePicture

            }
            return session;
        },
    }
}