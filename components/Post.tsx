"use client"
import { Avatar } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React, { useEffect, useState } from 'react'
import Comment from './Comment';
import { User } from 'next-auth';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { MessageCircle } from 'lucide-react';

const Post = ({imageUrl,description,username,posttime,id,isLiked,profilePicture,isSaved}:{imageUrl:string,description:string,username:string,posttime:string,id:string,isLiked:boolean,profilePicture:string,isSaved:boolean}) => {
  const [comment,setComment ]= useState(false)
  const {data:session}=useSession()
  const [liked,setLiked]=useState(isLiked)
  const [save,setSave]=useState(isSaved)
  const [comments,setComments]=useState<any[]>([])
  const [commenttext,setCommentText]=useState("")
  const handleSave=async ()=>{
    if(save===true) {
      const res=await axios.post(`/api/unsave`,{_id:session?.user?._id,post_id:id})
      if(res.status===200){
        toast.success("Unsaved successfully")
        setSave((prev)=>!prev)
      }else{
        toast.error("Something went wrong while unsaving post")
      }
    }
    if(save===false){
      const res=await axios.post(`/api/save`,{_id:session?.user?._id,post_id:id})
    if(res.status===200){
      toast.success("Saved successfully")
      setSave((prev)=>!prev)
    }else{
      toast.error("Something went wrong while saving post")
    }
    }
    
  }
  const handleComment=async ()=>{
    if(commenttext==="") return
    const res=await axios.post(`/api/comment`,{owner:session?.user?._id,post:id,text:commenttext})
    if(res.status===200){
      toast.success("Commented successfully")
      setComments((prev)=>[...prev,{username:session?.user.username,profilePicture:session?.user.profilePicture,name:session?.user.name,text:res.data.data.text,createdAt:res.data.data.createdAt,post:id,_id:session?.user?._id}])
      setCommentText("")
    }
  }
  const fetComments=async ()=>{
    const res=await axios.get(`/api/comment/getComments?_id=${id}`)
    setComments(res.data.data)
    console.log(res.data.data);
    
    
  }
  useEffect(()=>{
    if(comment===true){
      fetComments()
    }
    return
  },[comment])
  const handleLike=async ()=>{
        if(liked===true){
          const res=await axios.post(`/api/unlike`,{_id:session?.user?._id,post_id:id})
          if(res.status===200){
            toast.success("Unliked successfully")
            setLiked((prev)=>!prev)
          }else{
            toast.error("Something went wrong while unlikeing post")
          }
        }
        if(liked===false){
          const res=await axios.post(`/api/like`,{user_id:session?.user?._id,post_id:id})
          console.log(res);
          
          if(res.status===200){
            toast.success("Liked successfully")
            setLiked((prev)=>!prev)
          }else{
            toast.error("Something went wrong while liking post")
          }
        }
       
    
  }
  useEffect(()=>{
    
    return
  },[liked])
  return (
    <div className='w-[90%] h-[60%] md:w-[80%]  mx-auto mt-6  rounded-lg  bg-darkPrimary2 '>
      <div className=' flex gap-3 items-center p-2'>
      <Avatar src={profilePicture} />
      <p className=' text-md' >{username || ""}</p>
      <p className=' font-thin' >&#x2022; {posttime || ""}</p>
      </div>
      <div className=' w-full  mt-2'>
        <img src={imageUrl} alt="" className=' w-[100%]    h-[70vh] md:h-[70vh] ' />
      </div>
      <div className=' flex justify-between'>
        <div className=' m-1 p-3 flex items-center justify-center gap-7 pl-7'>
          {
            liked ? (
              <img src="/heart(3).png" alt="like" className=' w-6  h-6  hover:cursor-pointer' onClick={handleLike}  />
            ) : (
              <img src="/heart(4).png" alt="like" className=' w-6  h-6 invert hover:cursor-pointer' onClick={handleLike} />
            )
          }
          <MessageCircle strokeWidth={0.8} className=' w-7 h-7' onClick={()=>setComment((prev)=>!prev)}   />

          {/* <img src="/chat(1).png" alt="like" className=' w-7  h-7  my-auto invert hover:cursor-pointer' onClick={()=>setComment((prev)=>!prev)}  /> */}
        </div>
        <div className=' m-1 p-3 flex gap-7'>
          {
            save ? (
              <img src="/save-instagram.png" alt="like" className=' w-6  h-6   hover:cursor-pointer' onClick={handleSave} />
            ) : (
              <img src="/save.png" alt="like" className=' w-6  h-6 invert  hover:cursor-pointer' onClick={handleSave} />
            )
          }


        </div>
      </div> 
      {
        !comment ?
        <div className='m-2 px-6 pb-4' >
          <p  className='cutoff_text' >
          {description}
          </p>
        </div >
        : 
        <div className='m-4' >
          <div className=' flex items-center justify-center'>    
        <input  type="text" value={commenttext} onChange={(e)=>setCommentText(e.target.value)} placeholder='Enter you comment here' className=' p-2  w-[80%] bg-black text-white rounded-lg' />
        <span className=' text-blue-500 cursor-pointer hover:text-blue-300 inline ml-11'>
          <img src="/next.png" alt="" className=' w-8  h-8 invert hover:cursor-pointer inline' onClick={handleComment} />
        </span>
          </div>
          
            {
              comments.length >0 ?
              <div  className=' overflow-y-scroll .no-scrollbar::-webkit-scrollbar no-scrollbar p-4 '>
              {comments.map((comment:any)=>{
                return <Comment name={comment.username} time={comment.time} comment={comment.text} key={comment._id} profilePicture={comment.profilePicture} />
              })}
              </div>
              :
              <div className=' flex items-center justify-center h-[10%]'>
              <p className=' text-center font-bold   text-xl'>No comments yet</p>  
              </div>
            }
          {/* <Comment name='Jhon abrham' time='12m' comment='Hisfnsfvvsdj  ssf hshf sfsdfs fsdfhs sfsdjf hshfsf sjh sfhsdasdada adand a dabd amadasjd ahd adhas a adasdfadasdas dasdadas ddasdas yadashsjhfs sfsdfsfsfs sfsdfhsdfshsfhs gsfsafasfasfs sdjdk d sjk aaklsdj a al ljadlkasj adhasd ajsda adhasdas ad kasd adasdsddfsadfhasfjsf jkasdfasd sdfkasd fasdfjsd sdf' />
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/> */}
          
      </div>

      }
        
       
    </div>
  )
}

export default Post
