"use client"
import React from 'react'
import {User} from "@nextui-org/react";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
const UserAvatar = ({name,username,id,profilePicture}:{name:string,username:string,id:string,profilePicture:string}) => {
  const {data:session}=useSession()
  const [following,setFollowing]=React.useState(false)
  const router=useRouter()
  const handleFollow =async () => {
    if(!session) return
   const res=await axios.post(`/api/follow`,{userId:id,_id:session?.user?._id})
   if(res.status===200){
    toast.success("Followed successfully")
    setFollowing(true)
   }
  }
  const handleClick = () => {
    if(!session) return
    router.push(`/profile/${id}`)
  }
  return (
   <main className=' flex items-center justify-between w-full'>
    
    <User 
      name={name}
      description={username}
      avatarProps={{
        style:{objectFit:'contain'},
        src: profilePicture
      }}
      className=' m-3 cursor-pointer'

      onClick={handleClick}
    />
        {
          following ? <p>Following</p>
          :
          
        <button className=' hover:cursor-pointer text-sm  bg-customprimary-200 p-2 hover:bg-customprimary-300 rounded-full ' onClick={handleFollow} >Follow</button>
        }
   </main>
  
  )
}

export default UserAvatar
