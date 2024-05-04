import React from 'react'
import {User} from "@nextui-org/react";
const UserAvatar = () => {
  return (
   <main className=' flex justify-center items-center'>
    <User   
      name="Jane Doe"
      description="Product Designer"
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
      className=' m-3'
    />
        <button className=' hover:cursor-pointer  bg-customprimary-200 p-2 hover:bg-customprimary-300 rounded-full ' >Follow</button>
   </main>
  
  )
}

export default UserAvatar
