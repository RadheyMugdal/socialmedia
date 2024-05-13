"use client"
import FollowRequest from '@/components/FollowRequest'
import { User } from '@nextui-org/react'
import axios from 'axios'
import { Check, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const Notifications = () => {
  const [recentfollowers,setrecentfollowers]=useState<any[]>([])
  const {data:session}=useSession()
  const getrecentfollowers=async ()=>{
    if(!session) return
    const res= await axios.get(`/api/getrecentfollowers?_id=${session.user._id}`)
    setrecentfollowers(res.data.data)
    console.log(recentfollowers);
    
  }
  const handleFollowback=async (followerId:string)=>{
    if(!session) return
    const res= await axios.post('/api/followback',{followerId,_id:session.user._id})
    if(res.data.success){
      toast.success("Followed back successfully")
      setrecentfollowers(recentfollowers.filter((follower)=>follower._id!=followerId))
    }
    console.log(res)
  }
  const removeNotification=async (followerId:string)=>{
    if(!session) return
    const res= await axios.delete(`/api/removenotification?followerId=${followerId}&_id=${session.user._id}`)
    if(res.data.success){
      toast.success("removed successfully")
      setrecentfollowers(recentfollowers.filter((follower)=>follower._id!=followerId))
    }
    console.log(res)
  }
  useEffect(()=>{
    getrecentfollowers()

  },[session])
  if(recentfollowers.length==0) return <div className=' w-[100%] md:w-[60%]  mx-auto ' >
    <h1 className=' text-2xl font-extrabold text-center mt-5'>Follow requests</h1>
      <hr className=' w-[100%] mx-auto mt-4' />
      <div className='
      '>
        <div className=' w-full h-full flex justify-center items-center'>
        <h1 className=' text-2xl font-extrabold text-center mt-5'>No follow requests</h1>
        </div>
   
      </div>
  </div>
  return (
    <div className=' w-[100%] md:w-[60%]  h-screen md:h-full mx-auto ' >
      <h1 className=' text-2xl font-extrabold text-center mt-5'>Follow requests</h1>
      <hr className=' w-[100%] mx-auto mt-4' />
      {
        recentfollowers.map((follower:any)=>{
          return (
            <div className=' flex  items-center m-7 w-[100%] justify-between mx-auto' key={follower._id}>
            <div className=' flex  items-center'  >
          <User 
          classNames={
            {
              name: 'text-sm md:text-md lg:text-lg',
              base: 'text-sm md:text-md lg:text-lg',
            }
          }  
          name={follower.username}
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
          }}
          
        />
        <p  className=' ml-5   text-xs md:text-md lg:text-lg'> <span>&#8226;</span>Recentlly started following you</p>
            </div>
            <div className=' flex items-center justify-center gap-4'>

        <div className=' flex text-xs md:text-md'  >
          <button className='bg-green-500 rounded-full flex justify-center items-center gap-1 p-2 text-white' onClick={()=>handleFollowback(follower._id)}>
          <Check className=' h-7 w-5 md:h-5 md:w-5 bg-green-500 rounded-full' />
          Follow back
          </button >
        </div>
          <X className='  bg-red-400 rounded-full cursor-pointer hover:bg-red-500'  width={35} height={35} onClick={()=>removeNotification(follower._id)} />
            </div>
        
          </div>
          )

        })
      }
    </div>
  )
}

export default Notifications
