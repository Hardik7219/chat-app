import Chat from '@/componets/Chat'
import React from 'react'

function page() {
  return (
    <>
        <div>
            <div className='flex items-center gap-4 border'>
                <div className='bg-amber-50 rounded-full h-10 w-10'></div>
                <div>Username</div>
            </div>
            <div>
                <div>
                <Chat></Chat>
                </div>
            </div>
        </div>
    </>
  )
}

export default page
