import FollowRequest from '@/components/FollowRequest'
import React from 'react'

const Notifications = () => {
  return (
    <div className=' w-[100%] md:w-[60%]  h-screen mx-auto ' >
      <h1 className=' text-2xl font-extrabold text-center mt-5'>Follow requests</h1>
      <hr className=' w-[70%] mx-auto mt-4' />
      <FollowRequest/>
      <FollowRequest/>
      <FollowRequest/>
      <FollowRequest/>
      <FollowRequest/>
    </div>
  )
}

export default Notifications
