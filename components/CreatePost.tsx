"use client";
import { Textarea } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";

const CreatePost = ({ imgUrl }: { imgUrl: string }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [description, setDescription] = React.useState<string>("");
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
     await axios.post("/api/post/createpost", {
      content: description,
      imageUrl: imgUrl,
      _id: session?.user?._id,
    }).then((res) => {
      console.log(res.data.data);
      toast.success("Post created successfully");
      router.push(`/post/${res.data.data._id}`);
    })
    router.back();
  };

  

  return (
    <div className=" flex w-full h-screen overflow-x-scroll gap-5 p-5 items-center justify-center flex-col ">
      <form
        action=""
        onSubmit={(e) => handleSubmit(e)}
        className=" w-full h-full mx-auto flex flex-col gap-5  items-center"
      >
        <img src={imgUrl} alt="" className=" w-[50%] h-[70%] object-fit" />

        <Textarea
          required
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your description"
          className="w-[50%]"
        />

        <button
          type="submit"
          className="bg-customprimary-300 p-3 text-xl rounded-md hover:bg-customprimary-400 m-5 w-[50%]"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
