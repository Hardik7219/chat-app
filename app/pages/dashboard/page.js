import React from 'react'
import { Search } from 'lucide-react'
import User from '@/componets/User'
function page() {
  return (
    <>
      <div className='h-screen w-full'>
        <div className='search-card'>
          <form className='p-1'>
            <div className='border-2 rounded-lg border-[#8707ff] justify-between flex'>
              <input className='s-input w-[90%] rounded-0' type="text" placeholder='Search the user...'></input>
              <button className='s-btn w-[10%] flex justify-center items-center'><Search></Search></button>
            </div>
          </form>
        </div>
        <div className='bg-amber-800 h-screen'>
          <User></User>
        </div>
      </div> 
    </>
  )
}

export default page
