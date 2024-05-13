"use client"
import React, { useEffect, useRef, useState } from 'react'
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';
import CreatePost from '@/components/CreatePost';


// Define the Create component
const Create = () => {

  const [uploadedImageUrl, setUploadedImageUrl] = useState<any>(null);
  if(uploadedImageUrl){
    return <CreatePost imgUrl={uploadedImageUrl}/>
  }

  return (
    <div className=' w-full h-screen md:h-full items-center justify-center flex  '>
    {/* <CldUploadButton uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}/> */}
    
    <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params" onSuccess={(result:any, { widget }) => {
      setUploadedImageUrl(result.info.url)
    widget.close();
  }}    >
  {({ open }) => {
    return (
      <button onClick={() => open()} className='p-4 text-2xl rounded-md 0  '  >
       Click here to upload an Image
      </button>
    );
  }}
</CldUploadWidget>
    </div>
  )
}

export default Create
