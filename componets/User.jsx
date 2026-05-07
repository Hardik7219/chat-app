import React from 'react'

function User({name}) {
  return (
    <>
        <div className='border rounded-lg p-1'>
            <div className='flex items-center gap-4'>
                <div>
                    <p>{name}</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default User
