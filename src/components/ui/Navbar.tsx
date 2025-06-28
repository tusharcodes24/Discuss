import React from 'react'
import {
  
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import SearchInput from './search-input'
import Link from 'next/link'


const Navbar = () => {
  return (
    <div className=' bg-gray-200 flex justify-between  px-[5rem]'>

        <Link href='/' className=' my-auto'><div className=' font-extrabold text-3xl '>Discuss</div></Link>

        <div className=' w-[25rem] my-auto'><SearchInput></SearchInput></div>
        
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
    </div>
  )
}

export default Navbar