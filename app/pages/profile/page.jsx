'use client'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Search } from 'lucide-react'
import User from '@/componets/User'
import Link from 'next/link'
import {
    useUser
} from "@/context/UserContext";
import Loading from '@/componets/Loading'
function Profile() {

    const {
          user,
          loading
      } = useUser();
    const logout=async ()=>{
      await fetch('/api/logout')
    }
  return (
    <>
      {loading && (
      <div className='flex h-screen bg-black w-full justify-center items-center z-50 absolute backdrop-blur-sm'>
        <Loading></Loading>
      </div>
    )}
      <div className='h-screen flex justify-between w-full p-2'>
        <div>
        <p className='text-2xl font-bold'>{user?.userName}</p>
        <p>{user?.email}</p>
        </div>
        <div>
          <button onClick={logout} className='bg-red-600 rounded-lg text-2xl font-extrabold p-1 hover:cursor-pointer'>Logout</button>
        </div>
      </div> 
    </>
  )
}

export default Profile