import React from 'react'
import { Link, User } from '@nextui-org/react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { set } from 'mongoose'
const SearchUserPreview = ({username,name,following,id}:{username:string,name:string,following:boolean,id:string}) => {
  const {data:session} = useSession()
  const [follows,setFollows]=React.useState(following)
  const handleFollow= async (id:string)=>{
    const res=await axios.post(`/api/follow`,{_id:session?.user?._id,userId:id})
    if(res.status===200){
      console.log("followed sucessfully")
      setFollows(true)
    }
    }
  
  return (
    <div className=' flex justify-between w-[100%] p-unit-3.5' >
        <Link href={`/profile/${id}`} size="sm" >
        <User   
        className=' '
        name={name}
        description={`@${username}`}
        avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
        }}
      />
      </Link>
        {
          follows ? (
            <div className='text-white text-sm'>Following</div>
          ) : (
            <button className=' hover:cursor-pointer  bg-customprimary-200 p-2 hover:bg-customprimary-300 rounded-full ' onClick={()=>handleFollow(id)} >Follow</button>
          )
        }
        </div>
  )
}

export default SearchUserPreview
