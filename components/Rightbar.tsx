"use client"
import React, { useEffect, useState } from 'react'
import UserAvatar from './UserAvatar'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Skeleton } from '@mui/material'
import UserSkeleton from './skeletons/UserSkeleton'

const Rightbar = () => {
  const {data:session}=useSession()
  const [users,setUsers]=useState<any>([])
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      if (!session || users.length > 0) return;
      try {
        const res = await axios.get(`/api/getallusers?_id=${session?.user._id}`);
        setUsers(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

  }, [session, users.length]);
 
  return (
    <main className=' hidden sticky top-0 right-0 lg:flex flex-col items-center h-screen w-fit    bg-darkPrimary2' >
      <div className=' p-6 pt-3 pb-0'>
        <h1 className=' text-start text-xl' >Suggested for you</h1>
      </div>
      <div className=' p-6 pt-0 w-full h-screen flex flex-col  overflow-y-scroll '>
      {
        !isLoading  ? users.map((user:any)=>{
          return <UserAvatar key={user._id} name={user.name} profilePicture={"/user.png"} username={user.username} id={user._id} />
        })
        :
        <div className='p-6 pt-6 w-full h-screen flex flex-col  overflow-y-scroll'>
         <UserSkeleton/>
         <UserSkeleton/>
         <UserSkeleton/>
         <UserSkeleton/>
         <UserSkeleton/>
         <UserSkeleton/>
         <UserSkeleton/>
         <UserSkeleton/>
        </div>
        
      }
      <div className=' w-full h-screen flex flex-col items-center  justify-center '>
      {
        !isLoading && users.length===0 && <p>No suggestions found</p>
      }
      </div>
      </div>
      
      
    </main>
  )
}

export default Rightbar
