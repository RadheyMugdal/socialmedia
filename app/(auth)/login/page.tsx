"use client";
import { EyeFilledIcon } from "@/components/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/components/EyeSlashFilledIcon";
import { Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import Cookies from 'js-cookie';

import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { FormEvent } from "react";

const Login = () => {
  const router =useRouter()
  const [isVisible, setIsVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit= async (e:FormEvent)=>{
    e.preventDefault();
    const res= await  axios.post("/api/login",{
      email,
      password
    })
    if(!res.data.success){
      alert("Invalid email or password")
      return
    }
    Cookies.set('token', res.data.token);
    Cookies.set('user', res.data.data);
    router.push("/")
    setEmail("")
    setPassword("")
  
  }
  return (
    <main className="  bg-darkPrimary  w-screen h-screen flex items-center justify-center">
      <div className=" w-[40%] flex flex-col   items-center justify-center gap-4">
        <h1 className=" text-4xl font-extrabold ">Login</h1>
        <div className=" w-full">
          <form
            onSubmit={(e)=>handleSubmit(e)}
            action=""
            className=" w-full p-4 flex flex-col items-center justify-center gap-4"
          >
            <Input
              isRequired
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className=" w-[70%] bg-black "
            />
            <Input
              label="Password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
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

            <button className=" w-[70%] bg-customprimary-300 p-3 mt-5 rounded-md text-xl">Sign in</button>
          </form>
          <p className=" text-center">or</p>
          <p className=" text-center text-md  mt-2">Don't have an account? <span className=" text-blue-500 cursor-pointer"> <Link  href='/register' >Sign up</Link> </span> </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
