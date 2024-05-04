import React from 'react'
import UserAvatar from './UserAvatar'

const Rightbar = () => {
  return (
    <main className=' hidden sticky top-0 right-0 lg:flex flex-col items-center h-screen w-fit  p-6  bg-darkPrimary' >
      <div className=' p-4 pt-3'>
        <h1 className=' text-start text-xl' >Suggested for you</h1>
      </div>
      <UserAvatar />
      <UserAvatar/>
      <UserAvatar/>
      <UserAvatar/>
      <UserAvatar/>
      <UserAvatar/>
      <UserAvatar/>
    </main>
  )
}

export default Rightbar
