"use client";
import CardButton from "@/components/Card";
import Post from "@/components/Post";
import { Button, Card } from "@nextui-org/react";
import Skeleton from '@mui/material/Skeleton';
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import { useSession } from "next-auth/react";
export default function Home() {
  const {data:session}=useSession()
  const [posts, setPosts] = useState<any>([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
            if(!session) return
            axios.get(`/api/fetchposts?limit=3&page=${index}&userId=${session.user._id}`).then((res) => {
                  setPosts(res.data.data);
                  if(res.data.data.length === 0) setHasMore(false)
                  setLoading(false);
                   // Set loading to false after fetching data
              }).catch((err) => {
                  console.log(err);
              })
      

  }, [session]); // Include index in dependencies to trigger effect on index change

  const fetchMoreData = async () => {
      await axios.get(`/api/fetchposts?limit=3&page=${index}`).then((res) => {
          
          setPosts((prev:any)=>[...prev, ...res.data.data]);
          res.data.data.length === 0 ? setHasMore(false) : setHasMore(true);
      }).catch((err) => {
          console.log(err);
      })
      setIndex(prev => prev + 1);
  }

  if (loading) {
      return (
        <main className="w-[100%] h-full md:w-[65%] overflow-y-scroll no-scrollbar
         mx-auto">

          <PostSkeleton />
        </main>
      
      )// Render skeleton loader while loading
  }

  return (

      <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          endMessage={<p className=" text-center">No more posts</p>}
          className="w-[100%] h-screen md:w-[65%] overflow-y-scroll no-scrollbar mx-auto"
          hasMore={hasMore}
          loader={<Skeleton variant="rectangular"   height={200} />}
      >         

              {

                  posts.length>0 ?posts?.map((post: any) => {
                      return <Post description={post.content} imageUrl={post.imageUrl} id={post._id} isLiked={false} key={post._id} isSaved={false} posttime={post.timeDifference} username={post.owner.username} profilePicture={post.owner.profilePicture} />
                  })
                  :
                  <main className="w-full h-screen flex items-center justify-center ">
                    <h1 className="  font-extrabold text-3xl">No post to show</h1>
                 </main>

              }

      </InfiniteScroll>

  );
}
