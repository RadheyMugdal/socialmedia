"use client";
import { Avatar } from '@nextui-org/react';
import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Post } from '@/models/User';
import { Link } from 'next-view-transitions';
import { Skeleton } from '@mui/material';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  bio: string;
  posts: Post[];
  followers: User[];
  following: User[];
  savedPosts: Post[];
  profilePicture: string
  isFollowing: boolean;
}

const Page = ({ params }: { params: { profileId: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<any>();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const fetchUser = async (_id: any) => {
    if (_id === undefined || session===undefined || session===null){
      return;
    }
    const res = await axios.get(`/api/getuserprofile?_id=${session.user._id}&user_id=${_id}`);
    setUser(res.data.data.recipent);
    console.log(res.data.data);
    
    setIsFollowing(res.data.data.isFollowing);
    const posts = await axios.get(`/api/post/getposts?_id=${_id}`);
    setPosts(posts.data.data);
    setIsLoading(false)
  };
  const handleFollow=async ()=>{
    if(isFollowing===true){
      const res=await axios.post(`/api/unfollow`,{_id:session?.user?._id,user_id:user?._id})
      if(res.status===200){
        toast.success("Unfollowed successfully")
        setIsFollowing((prev)=>!prev)
      }else{
        toast.error("Something went wrong while unfollowing")
      }
    }
    if(isFollowing===false){
      const res=await axios.post(`/api/follow`,{_id:session?.user?._id,userId:user?._id})
      if(res.status===200){
        toast.success("Followed successfully")
        setIsFollowing((prev)=>!prev)
      }else{
        toast.error("Something went wrong while following")
      }
    }
  }
  useEffect(() => {
    fetchUser(params.profileId);
  
  }, [params.profileId,session]);

  useEffect(() => {
    if (session?.user?._id === params.profileId) {
      router.push('/myprofile');
    }
  }, [session]);
  if(isLoading){
    return (
      <main className=' w-[80%] h-screen mx-auto '>
      <div className=' flex p-10 flex-col md:flex-row  items-center' >
      <div className=' md:pr-16  ' >
        <Skeleton variant="circular" sx={{bgcolor:"darkslateblue"}} width={125} height={125}  />
      </div>
      <div className=' '>
        <div className='flex items-center justify-center md:justify-normal   gap-16'>
        <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} width={140} height={20} className=' w-7 '  />
      <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}} width={80} height={30}  />
        </div>
      <div className=' flex gap-3 mt-3 mx-auto '>
      <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}}  height={20} className='  w-24 md:w-32'  />
        <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} height={20} className='  w-24 md:w-32' />
        <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}}  height={20} className='  w-24 md:w-32'  />
      </div>
      <div className=' mt-4'>
      <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} width={300} height={20} className='  w-32 md:w-44'  />
      </div>
      </div>
      </div>
      <div className="flex  justify-center items-center  flex-col mx-auto">
        <div className=' flex '>
        <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} width={100} height={20}  className=' mx-2' />
      <Skeleton variant="text" sx={{bgcolor:"darkslateblue"}} width={100} height={20} className=' mx-2'  />
        </div>
        <div className=' w-full mt-3 '>
        <div className='  mx-auto flex flex-wrap gap-5 p-2 justify-center ' >
        <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}} width={200} height={250}   />
        <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}} width={200} height={250}   />
        <Skeleton variant="rectangular" sx={{bgcolor:"darkslateblue"}} width={200} height={250}   />
        </div>
        </div>
      </div>
      
    </main>
    )
  }
  return (
    <main className='w-[80%] h-screen mx-auto'>
      <div className='flex p-10 flex-col md:flex-row items-center'>
        <div className='md:pr-16'>
          <Avatar src={user?.profilePicture} className="w-32 h-32" />
        </div>
        <div className=''>
          <div className=' flex items-center   gap-16'>
          <h1 className='font-bold text-2xl'>
            {user?.name}
          </h1>
          {
            isFollowing ? (
              <button className=' bg-red-400 p-1.5 rounded-sm' onClick={handleFollow} >Unfollow</button>
            ) : (
              <button className=' bg-customprimary-300 p-1.5 rounded-sm'onClick={handleFollow}>Follow</button>
            )
          }

          </div>
          
          <div className='flex gap-3 mt-3 mx-auto'>
            <p><span className='font-bold mr-[4px]'>{user?.posts?.length}</span>Post</p>
            <p><span className='font-bold mr-[4px]'>{user?.followers.length}</span>Followers</p>
            <p><span className='font-bold mr-[4px]'>{user?.following.length}</span>Following</p>
          </div>
          <div className='mt-4'>
            <p>
              {user ? user?.bio : ''}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mx-auto">
        <Tabs
          aria-label="Options"
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider text-4xl",
            cursor: "w-full bg-[#22d3ee]",
            tab: "max-w-fit px-0 h-12",
            tabContent: "text-lg group-data-[selected=true]:text-customprimary-500"
          }}
        >
          <Tab
            key="Posts"
            title={
              <div className="flex items-center space-x-2">
                <span>posts</span>
              </div>
            }
          >
            <div className=''>
              <div className='mx-auto flex flex-wrap gap-5 p-2 justify-center'>
                {posts?.map((post: any) => (
                  <Link href={`/post/${post?._id}`} key={post?._id}>
                    <Image
                      className='w-32 h-64 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
                      alt={post.content}
                      src={post.imageUrl}
                    />
                  </Link>
                ))}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
};

export default Page;
