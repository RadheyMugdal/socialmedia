import { User } from '@nextui-org/react'
import { Check, X } from 'lucide-react'
import React from 'react'

const FollowRequest = () => {
  return (
    <div className=' flex  items-center m-7 w-[80%] justify-between mx-auto'>
        <div className=' flex  items-center' >

      <User   
      name="Jane Doe"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
      
    />
    <p  className=' ml-5  text-sm'> <span>&#8226;</span> Requested you to follow</p>
        </div>
    <div className=' flex'  >
    <Check className='p-2 h-7 w-7 md:h-10 md:w-10 bg-green-500 rounded-full' />
    <X  className='p-2 h-7 w-7 md:h-10 ml-4 md:w-10 bg-red-500 rounded-full' />
    </div>
    
      </div>
  )
}

export default FollowRequest
