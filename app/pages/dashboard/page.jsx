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

function Dashboard() {
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
        <div className='search-card flex justify-between items-center'>
          <form className='p-1 w-full'>
            <div className='border-2 rounded-lg border-[#8707ff] justify-between flex'>
              <input className='s-input w-[90%] rounded-0' type="text" placeholder='Search the user...'></input>
              <button className='s-btn w-[10%] flex justify-center items-center'><Search></Search></button>
            </div>
          </form>
          <div>
              <div className='bg-amber-50 w-10 h-10'>
                <Link href="/pages/profile">s</Link>
              </div>
          </div>
        </div>
        <div className='bg-amber-800 h-screen'>
          <Link href='/pages/chatPage'>
            <User></User>
          </Link>
        </div>
      </div> 
    </>
  )
}

export default Dashboard