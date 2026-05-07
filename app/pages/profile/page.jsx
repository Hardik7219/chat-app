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

  return (
    <>
      {loading && (
      <div className='z-50 bg-black h-screen w-full'>
        <Loading></Loading>
      </div>
    )}
      <div className='h-screen w-full'>
        <p>{user?.userName}</p>
        <p>{user?.email}</p>
      </div> 
    </>
  )
}

export default Profile