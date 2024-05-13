"use client";
import Post from "@/components/Post";
import PostSkeleton from "@/components/skeletons/PostSkeleton";
import UserSkeleton from "@/components/skeletons/UserSkeleton";
import { Skeleton } from "@mui/material";
import axios from "axios";
import { Session } from "inspector";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { post_id: string } }) => {
  const {data:session}=useSession()
  const [post, setPost] = useState<any>();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [isPostLiked, setIsPostLiked] = useState(false);
  const [timeDifference, setTimeDifference] = useState<string>("");

  const fetchPost = async (id: string) => {
    try {
      if (!session) {
        return;
      }
      const res = await axios.get(`/api/post/getpostdetail?id=${id}&user_id=${session.user._id}`);
      setPost(res.data.data);
      console.log(res.data.data);
      
      setUser(res.data.data.owner);
      if(post.likes.includes(user?._id)){
          setIsPostLiked(true)
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost(params.post_id);
  }, [params.post_id,session]);

  useEffect(() => {
    if (post) {
      const postCreatedAt: Date = new Date(post._doc.createdAt);
      const currentTime: Date = new Date();
      const differenceInMilliseconds: number = currentTime.getTime() - postCreatedAt.getTime();
      const differenceInMinutes: number = Math.floor(differenceInMilliseconds / (1000 * 60));

      if (differenceInMinutes < 60) {
        setTimeDifference(`${differenceInMinutes} min ago`);
      } else {
        const differenceInHours: number = Math.floor(differenceInMinutes / 60);
        setTimeDifference(`${differenceInHours} h ago`);
      }
      setLoading(false);
    }
  }, [post]);

  return (
    <main className="w-[100%] h-screen md:h-full md:w-[65%] mx-auto">
      {loading ?(
        <PostSkeleton/>
      ) : (
        <Post
          imageUrl={post._doc.imageUrl}
          posttime={timeDifference }
          id={post?._doc._id}
          key={post?._doc._id}
          description={post?._doc.content}
          username={user?.username}
          isLiked={post.isLiked}
          profilePicture={user?.profilePicture}
          isSaved={post.isSaved}
        />
      )}
    </main>
  );
};

export default Page;
