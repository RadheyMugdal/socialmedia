import { Avatar } from '@nextui-org/react'
import {User} from "@nextui-org/react";
import React from 'react'

const Comment = ({name,time,comment,profilePicture}:{name:string,time:string,comment:string,profilePicture:string}) => {
  return (
    <div  className=' flex w-full  items-center justify-between  m-1' >
    <div className=' flex gap-2 items-center justify-center w-[100%] '>
    {/* <div className=' w-[40% ]  '>

      <User   
      name={name}
      description={time}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
      className=' '
    />
    </div> */}
    <div className=' flex gap-3 items-center p-2'>
      <Avatar src={profilePicture} className=' w-7 h-7 md:w-9 md:h-9'/>
      <p className=' text-sm md:text-md' >{name || ""}</p>
      <p className='  text-xs font-thin' >&#x2022; {time || ""}</p>
      </div>
    <div  className=' flex-1 flex  p-1'>

    <span className=' ml-2  '>&#x2022;</span>
    <p className=' text-sm md:text-md ml-1'>{comment}</p>
    </div>
    </div>


    </div>
  )
}

export default Comment
