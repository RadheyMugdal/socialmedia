import Bottombar from '@/components/Bottombar'
import Leftbar from '@/components/Leftbar'
import Rightbar from '@/components/Rightbar'
import React, { ReactNode } from 'react'

const layout = ({children}:{children:ReactNode}) => {
  return (
    <main className=" flex flex-col  md:flex-row   bg-darkPrimary">

    <Leftbar/>
    <main className=" flex-1 ">
    {children}
    </main>
    <Bottombar/>

    <Rightbar />
    </main>
  )
}

export default layout
