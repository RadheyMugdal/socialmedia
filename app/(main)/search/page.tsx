"use client"
import SearchUserPreview from '@/components/SearchUserPreview'

import axios from 'axios'
import { log } from 'console'
import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
const Search = () => {
  const [search,setSearch] = React.useState('')
  const [userdata,setUserData]=useState([])
  useEffect(()=>{
    if(search==='') return
    const data=setTimeout(async ()=>{
      const data=await axios.post("/api/searchuser",{data:{username:search}}).then((res:any)=>{
        console.log(search);
        setUserData(res.data.data);

        

      })
    },800)


    return ()=>clearTimeout(data)
  },[search])
  return (
    <div  className=' w-[100%] md:[80%] flex flex-col  items-center mx-auto h-screen ' >
      <div className=' flex justify-center items-center bg-darkPrimary w-[80%] md:w-[60%] rounded-3xl text-xl mt-4' >
        <SearchIcon  className='  w-12' />
      <input type="search" name="" value={search} onChange={(e)=>setSearch(e.target.value)} id="" placeholder='Enter username' className=' w-full h-full p-3 rounded-3xl bg-darkPrimary focus:outline-none  ' />
      </div>
      <div className=' w-[80%] md:w-[60%] flex flex-col  items-start'>
       { userdata.length!=0 &&
          userdata.map((user:any)=>(
            <SearchUserPreview key={user._id} username={user.username} name={user.name} />
          ))
        }
      </div>
    </div>
  )
}

export default Search
