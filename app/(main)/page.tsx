import CardButton from "@/components/Card";
import Post from "@/components/Post";
import { Button, Card } from "@nextui-org/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" w-[100%] md:w-[65%]   mx-auto ">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      
    </main>
  );
}
