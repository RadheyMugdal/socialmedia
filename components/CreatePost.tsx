"use client"
import { Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const CreatePost = ({imgUrl}:{imgUrl:string}) => {
    const router=useRouter()
  return (

    <div className=' flex w-full h-screen overflow-x-scroll gap-5 p-5 items-center justify-center flex-col '>

     <img src={imgUrl} alt="" className=' w-[50%] h-[70%] object-fit' />
      <Textarea
      label="Description"
      placeholder="Enter your description"
      className="w-[50%]"
    />
    <div className=' w-[50%] flex  justify-center items-center '>
    <button className='bg-customprimary-300 p-3 text-xl rounded-md hover:bg-customprimary-400 m-5  w-[50%]' onClick={()=>router.back()}>Back</button>
    <button className='bg-customprimary-300 p-3 text-xl rounded-md hover:bg-customprimary-400 m-5 w-[50%]'>Post</button>
    </div>
    
   
    </div>
  )
}

export default CreatePost
