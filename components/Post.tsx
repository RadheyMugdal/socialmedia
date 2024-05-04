"use client"
import { Avatar } from '@nextui-org/react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import React, { useState } from 'react'
import Comment from './Comment';

const Post = () => {
  const [comment,setComment ]= useState(false)
  return (
    <div className='w-[90%] md:w-[80%]  mx-auto mt-6  rounded-lg  bg-darkPrimary '>
      <div className=' flex gap-3 items-center p-2'>
      <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
      <p className=' text-md' >Kevin Peter</p>
      <p className=' font-thin' >&#x2022; 12m</p>
      </div>
      <div className=' w-full  mt-2'>
        <img src="https://images.unsplash.com/photo-1710769509812-1b5cf1605362?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className=' w-[100%]  h-[30vh] md:h-[70vh] ' />
      </div>
      <div className=' flex justify-between'>
        <div className=' m-1 p-3 flex gap-7 pl-7'>
          <img src="/heart.png" alt="like" className=' w-6  h-6 invert hover:cursor-pointer' />
          <img src="/comment.png" alt="like" className=' w-6  h-6 invert hover:cursor-pointer'onClick={()=>setComment((prev)=>!prev)}  />
        </div>
        <div className=' m-1 p-3 flex gap-7'>
          <img src="/save.png" alt="like" className=' w-6  h-6 invert hover:cursor-pointer ' />

        </div>
      </div> 
      {
        !comment ?
        <div className='m-2 px-6 pb-4' >
          <p  className='cutoff_text' >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          </p>
        </div >
        : 
        <div className='m-4' >
          <div>    
        <input  type="text" placeholder='Enter you comment here' className=' p-2 focus-visible:outline-none w-[80%] bg-black text-white rounded-lg' />
        <span className=' text-blue-500 cursor-pointer hover:text-blue-300'>Comment</span>
          </div>
          <div  className=' overflow-y-scroll h-[40vh] p-2 '>
          <Comment name='Jhon abrham' time='12m' comment='Hisfnsfvvsdj  ssf hshf sfsdfs fsdfhs sfsdjf hshfsf sjh sfhsdasdada adand a dabd amadasjd ahd adhas a adasdfadasdas dasdadas ddasdas yadashsjhfs sfsdfsfsfs sfsdfhsdfshsfhs gsfsafasfasfs sdjdk d sjk aaklsdj a al ljadlkasj adhasd ajsda adhasdas ad kasd adasdsddfsadfhasfjsf jkasdfasd sdfkasd fasdfjsd sdf' />
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          <Comment name="Rashid musin" time='32m' comment='nice thoughts'/>
          </div>
      </div>

      }
        
       
    </div>
  )
}

export default Post
