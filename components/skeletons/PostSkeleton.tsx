import { Skeleton } from '@mui/material'
import React from 'react'

const PostSkeleton = () => {
  return (
    <div className="w-[90%] md:w-[80%]  mx-auto mt-6 no-scrollbar no-scrollbar::-webkit-scrollbar rounded-lg  bg-darkPrimary ">
          <div className="flex gap-3  items-center p-2">
          <Skeleton variant="circular" sx={{bgcolor:"darkslateblue"}}   width={50} height={45} />
          <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}}   width={80} height={20} />
          <Skeleton variant="circular" sx={{bgcolor:"darkslateblue"}}   width={10} height={8} />
          <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}}   width={90} height={20} />
          </div>
          <div className=' w-full  mt-2'>
            <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}}  width={"100%"} height={"70vh"} />
          </div>
          <div className=' flex justify-between'>
          <div className=' m-1 p-3 flex gap-7 pl-7'>
          <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}}   width={30} height={30} />
          <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}}   width={30} height={30} />
          </div>
          <div className=' m-1 p-3 flex gap-7'>
          <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}}   width={30} height={30} />
          </div>
            
          </div>
          <div className='m-2 px-6 pb-4' >
          <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}}   width={400} height={20} />
          <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}}   width={300} height={20} />
          </div>
        </div>
  )
}

export default PostSkeleton
