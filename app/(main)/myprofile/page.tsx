import { Avatar } from '@nextui-org/react';
import { Chip } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Post } from '@/models/User';
import { Link } from 'next-view-transitions';
import { Skeleton } from '@mui/material';

interface User {
  _id: string;
  name: string;
  bio: string;
  posts: Post[];
  followers: User[];
  following: User[];
  savedPosts: Post[];
}

const Page: React.FC = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>();
  const [savedPosts, setSavedPosts] = useState<any>();

  const fetchUser = async (_id: any) => {
    if (_id === undefined) {
      return;
    }
    const res = await axios.get(`/api/getuser?_id=${_id}`);
    setUser(res.data.data);
    const respost = await axios.get(`/api/post/getposts?_id=${session?.user?._id}`);
    setPosts(respost.data.data);
    const savedpost = await axios.get(`/api/post/getsavedpost?_id=${session?.user?._id}`);
    setSavedPosts(savedpost.data.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser(session?.user?._id);
  }, [session]);

  if (isLoading) {
    return (
      <main className='w-[80%] h-screen mx-auto'>
        {/* Skeleton loading UI */}
      </main>
    );
  }

  return (
    <main className='w-[80%] h-screen mx-auto'>
      <div className='flex p-10 flex-col md:flex-row items-center'>
        <div className='md:pr-16'>
          <Avatar src={session?.user?.profilePicture} className="w-32 h-32 " />
        </div>
        <div className=''>
          <h1 className='font-bold text-2xl text-center md:text-start'>
            {session?.user?.name}
          </h1>
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
            <div className='w-full'>
              <div className='mx-auto flex flex-wrap gap-5 p-2 justify-center'>
                {posts !== undefined && posts !== null && posts?.length > 0 && posts?.map((post: any) => {
                  return (
                    <Link href={`/post/${post?._id}`} key={post?._id}>
                      <Image
                        className='w-36 h-44 md:h-64 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
                        alt={post?.content}
                        src={post?.imageUrl}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Tab>
          <Tab
            key="Saved"
            title={
              <div className="flex items-center space-x-2">
                <span>saved</span>
              </div>
            }
          >
            <div className='w-full'>
              <div className='w-full flex flex-wrap gap-5 p-2 items-center justify-center'>
                {savedPosts !== undefined && savedPosts !== null && savedPosts?.length > 0 && savedPosts?.map((post: any) => {
                  return (
                    <Link href={`/post/${post?._id}`} key={post?._id}>
                      <Image
                        className='w-36 h-44 md:h-64 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
                        alt={post?.content}
                        src={post?.imageUrl}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </main>
  );
};

export default Page;
