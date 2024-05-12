import { Skeleton } from '@mui/material'
import React from 'react'

const UserSkeleton = () => {
  return (
    <div className='  flex justify-center items-center gap-5 mb-5' >
        <Skeleton variant="circular" sx={{bgcolor:"darkslateblue"}} width={40} height={40} />
        <div className='flex flex-col'>
        <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} width={100} height={20} />
        <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} width={100} height={20} />
        </div>
    </div>
  )
}

export default UserSkeleton
