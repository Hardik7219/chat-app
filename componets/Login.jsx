'use client'
import React from 'react'
import { useState } from 'react';
import '@/style/login.css'
import Loading from './Loading';
import { useRouter } from 'next/navigation'

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState()
  const [pas, setPas] = useState();
  const [msg, setMsg] = useState();
  const router = useRouter()
  const login = async (e) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: pas
        })
      })

      const data = await res.json()
      setMsg(data.message)
if (data.message === "login succefull") { 
    router.push('/pages/dashboard')
}
    } catch (error) {
      setMsg('Something went wrong')
    } finally {
      setLoading(false)
    }
  }
  return ( 
    <>
      <div className='login-card'>
        <h1 className='login-title'>Enter the detail</h1>
        <form onSubmit={login} className='form-card'>
          <div className='input-base'>
            <h1 className='input-lable'>Enter Email</h1>
            <input onChange={(e) => setEmail(e.target.value)} className='t-input' type="text"></input>
          </div>
          <div className='input-base'>
            <h1 className='input-lable'>Enter Password</h1>
            <input onChange={(e) => setPas(e.target.value)} className='t-input' type="password"></input>
          </div>
          <button type="submit" className='form-btn'>Log in</button>
          {msg && <p className={`form-msg ${msg.includes('succefull') ? '' : 'form-msg-error'}`}>{msg}</p>}
        </form>
      </div>
            {loading && (
        <div className='flex h-screen w-full justify-center items-center z-50 absolute backdrop-blur-sm'>
        <Loading></Loading>
        </div>
      )
      }
    </>
  )
}

export default Login
