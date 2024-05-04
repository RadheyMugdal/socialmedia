"use client";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { Input, Textarea } from "@nextui-org/react";
import { CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import React, { useRef, useState } from "react";

const Register = () => {

  const [uploadedImageUrl, setUploadedImageUrl] = useState<any>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return ( 
    <main className="  bg-darkPrimary  w-screen  flex items-center justify-center">
      <div className=" w-[40%] flex flex-col   items-center justify-center gap-4">
        <h1 className=" text-4xl font-extrabold ">Register</h1>
        <div className=" w-full">
          <form
            action=""
            className=" w-full p-4 flex flex-col items-center justify-center gap-4"
          >

           
            {
              uploadedImageUrl ? (
                <img src={uploadedImageUrl} alt="" className="  w-24 h-24 rounded-full object-cover" />
              ): 
              (
                <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={(result:any, { widget }) => {
                  setUploadedImageUrl(result.info.url)
                widget.close();
              }}    >
              {({ open }) => {
                return (
                  <button onClick={() => open()} className='p-4 text-2xl rounded-md 0  '  >
                  <img src="/upload.png" alt="" className="  w-24 h-24 invert" />
                  </button>
                );
              }}
            </CldUploadWidget>
                
              )
            }

            <Input
              isRequired
              type="text"
              label="Name"
              className=" w-[70%] bg-black "
            />
           
            <Input
              isRequired
              type="text"
              label="Username"
              className=" w-[70%] bg-black "
            />
            <Input
              isRequired
              type="email"
              label="Email"
              className=" w-[70%] bg-black "
            />
            <Input
              label="Password"
              isRequired
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="w-[70%]   bg-white rounded-xl focus:outline-none text-black"
            />
            <Textarea
              label="Bio"
              labelPlacement="inside"
              placeholder="Enter your bio"
              className=" w-[70%]"
            />

            <button className=" w-[70%] bg-customprimary-300 p-3 mt-5 rounded-md text-xl">Sign up</button>
          </form>
          <p className=" text-center">or</p>
          <p className=" text-center text-md  mt-2">Already have an account? <span className=" text-blue-500 cursor-pointer"><Link  href='/login' >Sign in</Link></span> </p>
        </div>
      </div>
    </main>
  );
};

export default Register;
