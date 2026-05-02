import React from 'react'
import '@/style/login.css'

function Login() {
  return (
    <>
      <div className='login-card'>
        <h1 className='login-title'>Enter the detail</h1>
        <form className='form-card'>
          <div className='input-base'>
            <h1 className='input-lable'>Enter UserName</h1>
            <input className='t-input' type="text"></input>
          </div>
          <div className='input-base'>
            <h1 className='input-lable'>Enter UserName</h1>
            <input className='t-input' type="text"></input>
          </div>
          <div className='input-base'>
            <h1 className='input-lable'>Enter UserName</h1>
            <input className='t-input' type="text"></input>
          </div>
          <button type="submit" className='form-btn'>Submit</button>
        </form>
      </div>
    </>
  )
}

export default Login
