"use client"
import { Avatar } from '@nextui-org/react'
import { useSession } from 'next-auth/react'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React from 'react'
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
  {
    link:'/myprofile',
    icon:'/user(1).png',
    label:"Profile"
  },
]
const Bottombar = () => {
  const {data:session}=useSession()
  const pathname = usePathname()
  const active= pathname==="/myprofile" ? 'bg-customprimary-400 text-white' : ''
  return (
    <main className=' bg-darkPrimary2 sticky bottom-0 right-0 md:hidden'> 
      <div className=' flex gap-3 w-full justify-between'>
        {
          
          links.map((link)=>{

           const active= pathname===link.link ? 'bg-customprimary-400 text-white' : ''
           return(
            <Link  href={link.link} key={link.label} className=  {` items-center p-4 rounded-md ${active} ` } >
              {/* <Image src={link.icon} width={40} height={20} className=' invert' alt={link.label} /> */}
              <img src={link.icon} className=' w-8 h-8 invert'  />

            </Link>
            
            
           )
          
})
        }
         

      </div>
    </main>
  )
}

export default Bottombar
