import React from 'react'
import {
  
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Input } from "@/components/ui/input"

const Navbar = () => {
  return (
    <div className=' bg-gray-200 flex justify-between  px-[5rem]'>

        <div className=' font-extrabold text-3xl my-auto'>Discuss</div>

        <div className=' w-[30rem] my-auto'><Input type='text' placeholder='Search Posts...' /></div>
        
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