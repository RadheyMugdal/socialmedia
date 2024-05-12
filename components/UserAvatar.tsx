import React from 'react'
import {User} from "@nextui-org/react";
const UserAvatar = ({name,username,id,profilePicture}:{name:string,username:string,id:string,profilePicture:string}) => {
  return (
   <main className=' flex items-center justify-between w-full'>
    
    <User 
      name={name}
      description={username}
      avatarProps={{
        style:{objectFit:'contain'},
        src: profilePicture
      }}
      className=' m-3'
    />
        <button className=' hover:cursor-pointer text-sm  bg-customprimary-200 p-2 hover:bg-customprimary-300 rounded-full ' >Follow</button>
   </main>
  
  )
}

export default UserAvatar
