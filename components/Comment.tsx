import { Avatar } from '@nextui-org/react'
import {User} from "@nextui-org/react";
import React from 'react'

const Comment = ({name,time,comment}:{name:string,time:string,comment:string}) => {
  return (
    <div  className=' flex w-full  items-center justify-between ' >
    <div className=' flex gap-2 items-center justify-center w-[90%] '>
    <div className=' w-[40% ]  '>

      <User   
      name={name}
      description={time}
      avatarProps={{
        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
      }}
      className=' '
    />
    </div>
    <div  className=' flex-1 flex  p-1'>

    <span className=' ml-2  my-auto'>&#x2022;</span>
    <p className=' ml-1'>{comment}</p>
    </div>
    </div>
    <div className='w-[5%]'>

    <img src="/heart.png" alt="like" className=' w-5  h-5 invert hover:cursor-pointer' />
    </div>

    </div>
  )
}

export default Comment
