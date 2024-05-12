"use client"
import { User } from '@nextui-org/react'
import { Check, X } from 'lucide-react'
import React from 'react'

const FollowRequest = ({username,id}:{username:string,id:string}) => {
  return (
    <div className=' flex  items-center m-7 w-[100%] justify-between mx-auto'>
        <div className=' flex  items-center' >

      <User   
      name={username}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
      
    />
    <p  className=' ml-5  text-sm'> <span>&#8226;</span>Recentlly started following you</p>
        </div>
    <div className=' flex'  >
      <button className='bg-green-500 rounded-full flex justify-center items-center gap-1 p-2 text-white'>
      <Check className=' h-7 w-5 md:h-5 md:w-5 bg-green-500 rounded-full' />
      Follow back
      </button >
    </div>
    
      </div>
  )
}

export default FollowRequest
