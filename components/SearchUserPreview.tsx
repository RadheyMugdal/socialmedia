import React from 'react'
import { Link, User } from '@nextui-org/react'
const SearchUserPreview = ({username,name}:{username:string,name:string}) => {
  return (
    <div className=' flex justify-between w-[100%] p-unit-3.5' >
        <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
        <User   
        className=' '
        name={name}
        description={`@${username}`}
        avatarProps={{
        src: "https://avatars.githubusercontent.com/u/30373425?v=4"
        }}
      />
      </Link>
        <button className=' hover:cursor-pointer  bg-customprimary-200 p-2 hover:bg-customprimary-300 rounded-full ' >Follow</button>
        </div>
  )
}

export default SearchUserPreview
