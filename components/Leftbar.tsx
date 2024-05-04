"use client"
import Image from 'next/image'

import React from 'react'
import UserAvatar from './UserAvatar'
import { Modal, useDisclosure } from '@nextui-org/react'
import {User,Link as LinkUI} from "@nextui-org/react";

import Link from 'next/link'
import { usePathname } from 'next/navigation'


const links=[
  {
    link:'/',
    icon:'/home.png',
    label:"Home"
  },
  {
    link:'/search',
    icon:'/search.png',
    label:"Search"
  },
  {
    link:'/notifications',
    icon:'/heart.png',
    label:"Notifications"
  },
  {
    link:'/create',
    icon:'/create.png',
    label:"Create"
  },
]

const Leftbar = () => {
  const pathname = usePathname()
  return (
    <main className=' hidden md:flex   sticky top-0 right-0  flex-col items-center justify-between h-screen w-fit border-r-1/2 p-1 pt-5 bg-darkPrimary' >
      <div className=' font-extrabold text-3xl mt-2 text-center'>
        <h1 className='hidden xl:block'>
        Instagram
        </h1>
      
      <div>
        {
          
          links.map((link)=>{

           const active= pathname===link.link ? 'bg-customprimary-400 text-white' : ''
           return(
            <Link  href={link.link} key={link.label} className=  {`flex text-xl gap-3 m-6 p-4  rounded-md ${active} ` } >
              <Image src={link.icon} width={30} height={10} alt={link.label} className=' invert ' />
              <p className='hidden xl:block'>
              {link.label}
              </p>
              </Link>
           )
            
})
        }
      </div>
      </div>
      <div className=' flex justify-center items-center gap-5 mb-5' >
       <User   
      name="Junior Garcia"
      description={(
        <LinkUI href="/myprofile" size="sm" >
          @jrgarciadev
        </LinkUI>
      )}
      avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
      }}


    />
        <Link href='/logout' className=' '>
        <Image src='/logout.png' width={25} height={10} alt="Logout" className=' invert ' />
        <p className=' hidden xl:block'>
        
        </p>
      
        </Link>
        
      </div>
      
  
    </main>
  )
}

export default Leftbar
