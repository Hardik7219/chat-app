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
  const [userS,setUserS]= useState();
  const [data,setData]= useState();
  const [msg,setMsg]=useState();
  const {
        user,
        loading
    } = useUser();
    const searchUser = async (e)=>{
      e.preventDefault();

        const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Suser : userS
        })
      })
      const data= await res.json();
      setData(data.userData);
    }
  return (
    <>
    {loading && (
      <div className='flex h-screen bg-black w-full justify-center items-center z-50 absolute backdrop-blur-sm'>
        <Loading></Loading>
      </div>
    )}
      <div className='h-screen w-full'>
        <div className='search-card flex justify-between items-center'>
          <form className='p-1 w-full' onSubmit={searchUser}>
            <div className='border-2 rounded-lg border-[#8707ff] justify-between flex'>
              <input className='s-input w-[90%] rounded-0' onChange={(e)=>setUserS(e.target.value)} type="text" placeholder='Search the user...'></input>
              <button type="submit" className='s-btn w-[10%] flex justify-center items-center'><Search></Search></button>
            </div>
          </form>
          <div>
            {msg && <p>{msg}</p>} 
              <div className='w-20 h-10 bg-indigo-500 flex justify-center items-center rounded-lg'>
                <Link href="/pages/profile">Acoount</Link>
              </div>
          </div>
        </div>
        {data && (
          <div className='h-screen'>
          <Link href={`/pages/chatPage?id=${data.id}&name=${data.name}`}>
           <User name={data.name}></User>
          </Link>
        </div>
        )}


          {/* <div className='bg-amber-800 h-screen'>
           <Link href={`/pages/chatPage?id=${data.id}&name=${data.name}`}>
            <User name={data.name}></User>
          </Link>
        </div> */}
      
      </div> 
    </>
  )
}

export default Dashboard