import mongoose from "mongoose";
import { Model,Schema } from "mongoose";
export interface Post extends Document{
    owner:User,
    imageUrl:string,
    comments:Comment[]
    content:string,
    likes:number
}
export interface Comment extends Document{
    owner:User,
    post:Post,
    text:string,
    createdAt:Date
}
export interface User extends Document{
    name:string,
    email:string,
    password:string,
    username:string,
    followers:User[],
    following:User[],
    bio:string,
    savedPosts:Post[]
    likedPosts:Post[]
    posts:Post[]

}
const UserSchema: Schema<User> =new Schema({
    name:{
        type:String,
        reuired:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid e-mail address"]
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    followers:[{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    following:[{
        type:Schema.Types.ObjectId,
        ref:"User",
        default:[]
    }],
    bio:{
        type:String,
        default:""
    },
    savedPosts:[{
        type:Schema.Types.ObjectId,
        ref:"Post",
        default:[]
    }],
    likedPosts:[
        {
            type:Schema.Types.ObjectId,
            ref:"Post",
            default:[]
        }
    ],
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:"Post",
            default:[]
        }
    ],
    

},{createdAt:true,timestamps:true})
export const UserModel= (mongoose.models.User as Model<User>) || mongoose.model("User",UserSchema); 

const CommentSchema :Schema<Comment>=new Schema({
    owner :{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },
    text:{
        type:String,
        required:true
    }
},{createdAt:true,timestamps:true})

export const CommentModel=(mongoose.models.Comment as Model<Comment> ) || mongoose.model("Comment",CommentSchema)


const PostSchema:Schema<Post>=new Schema({
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    imageUrl:{
        type:String,
        required:true
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    content:{
        type:String,
        required:true
    }
},{ createdAt:true,timestamps:true})
export const PostModel=(mongoose.models.Post as Model<Post>) || mongoose.model("Post",PostSchema)


