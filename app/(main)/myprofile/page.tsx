"use client"
import { Avatar } from '@nextui-org/react'
import { Chip} from "@nextui-org/react";
import {Image} from "@nextui-org/react";

import React from 'react'
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";

const page = () => {
  return (
    <main className=' w-[80%]  mx-auto '>
      <div className=' flex p-10 flex-col md:flex-row  items-center' >
        <div className=' md:pr-16  ' >
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-32 h-32 " />
        </div>
        <div className=' '>
            <h1 className=' font-bold text-2xl ' >Radhey Mugdal</h1>
            <div className=' flex gap-3 mt-3 mx-auto '>
                <p><span className=' font-bold mr-[4px]' >1</span>Post</p>
                <p><span className=' font-bold mr-[4px]'>100</span>Followers</p>
                <p><span className=' font-bold mr-[4px]'>111</span>Following</p>
            </div>
            <div className=' mt-4'>
                <p>
                Radhey Mugdal
                Shiv🔱❤💛
                </p>
            </div>
        </div>
    </div>
    <div className="flex  justify-center items-center  flex-col mx-auto">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider  text-4xl",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: " text-lg group-data-[selected=true]:text-customprimary-500"
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
            <div className=' '>
            <div className=' w-[90%] mx-auto flex flex-wrap gap-5 p-2 justify-center  ' >
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
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
            <div className=' w-full '>
            <div className=' w-full flex flex-wrap gap-5 p-2 items-center justify-center' >
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            <Image
            className=' w-32 md:w-48 lg:w-68 rounded-none hover:rounded-md cursor-pointer'
            alt="NextUI Fruit Image with Zoom"
            src="https://nextui-docs-v2.vercel.app/images/fruit-1.jpeg"
            />
            
            </div>
            
            </div>
        </Tab>
       
      </Tabs>
    </div>  

      </main>

  )
}

export default page
