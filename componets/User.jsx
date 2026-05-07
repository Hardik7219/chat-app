import React from 'react'

function User({name}) {
  return (
    <>
        <div className='border p-1'>
            <div className='flex items-center gap-4'>
                <div className='bg-amber-50 h-10 w-10 rounded-full'>i</div>
                <div>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default User
