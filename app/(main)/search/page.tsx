"use client"
import SearchUserPreview from '@/components/SearchUserPreview'

import axios from 'axios'
import { log } from 'console'
import { SearchIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
const Search = () => {
  const [search,setSearch] = React.useState('')
  const {data:session} = useSession()
  const [userdata,setUserData]=useState<any>([])
  const [user,setUser]=useState<any>()
  const fetchuser=async(_id:any)=>{
  await axios.get(`/api/getuser?_id=${_id}`).then((res:any)=>{
    setUser(res.data.data)
    console.log(res.data.data)
    
  })
  }
  useEffect(()=>{
    if(search==='') return
    const data=setTimeout(async ()=>{
      const data=await axios.post("/api/searchuser",{username:search}).then((res:any)=>{
        console.log(search);
        fetchuser(session?.user?._id)
        setUserData(res.data.data);
      })
    },500)


    return ()=>clearTimeout(data)
  },[search])
  return (
    <div  className=' w-[100%] md:[80%] flex flex-col  items-center mx-auto h-screen ' >
      <div className=' flex justify-center items-center bg-darkPrimary w-[80%] md:w-[60%] rounded-3xl text-xl mt-4' >
        <SearchIcon  className='  w-12' />
      <input type="search" name="" value={search} onChange={(e)=>setSearch(e.target.value)} id="" placeholder='Enter username' className=' w-full h-full p-3 rounded-3xl bg-darkPrimary focus:outline-none  ' />
      </div>
      <div className=' w-[80%] md:w-[60%] overflow-y-scroll flex flex-col  items-start'>
       { userdata.length!=0 &&
          userdata.map((userFW:any)=>{
           if(user){
            for(let i=0;i<user.following.length;i++){
              if(userFW._id===user._id){
                return
              }
              if(userFW._id===user.following[i]){
                return (
                  <SearchUserPreview key={userFW._id} username={userFW.username} name={userFW.name} following={true} id={userFW._id} />
                )
              }
            }
            return (
              <SearchUserPreview key={userFW._id} username={userFW.username} name={userFW.name} following={false} id={userFW._id} />
            )
           }
            
            
 
    })
        }
      </div>
    </div>
  )
}

export default Search
