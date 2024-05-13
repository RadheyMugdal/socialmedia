"use client"
import Image from 'next/image'

import React, { useEffect } from 'react'
import UserAvatar from './UserAvatar'
import { Modal, useDisclosure } from '@nextui-org/react'
import {User,Link as LinkUI} from "@nextui-org/react";

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Skeleton } from '@mui/material'
import UserSkeleton from './skeletons/UserSkeleton'
import { useRouter } from 'next/navigation'


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
  const { data: session } = useSession()
  const router=useRouter()
  const handleLogout =async () => {
    await signOut({redirect:false})
    router.push('/login')
  }
  // const session=undefined
  const pathname = usePathname()
  return (
    <main className=' hidden md:flex   sticky top-0 right-0  flex-col items-center justify-between h-screen w-fit border-r-1/2 p-1 pt-5 bg-darkPrimary2' >
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
      {
        session===undefined ?
        <UserSkeleton/>
        :

        
          <div className='  flex justify-center md:flex-col lg:flex-row items-center gap-5 mb-5' >
       <Link href='/myprofile' className=' '> 
        <User 
        classNames={
          {
            description:"md:hidden lg:block",
            name:"md:hidden lg:block",
          }
        }  
       name={session?.user.name}
       description={(
         <LinkUI href="/myprofile" size="sm" >
           {`@${session?.user?.username}`}
         </LinkUI>
       )}
       avatarProps={{
         src: session?.user?.profilePicture,
       }}
 
 
     />
     </Link>
         <Image src='/logout.png' width={25} height={10} alt="Logout" className=' invert cursor-pointer ' onClick={handleLogout}  />
         <p className=' hidden xl:block'>
         </p>

         
        </div>
        
        
      }
     
      
  
    </main>
  )
}

export default Leftbar
