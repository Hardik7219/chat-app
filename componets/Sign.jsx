'use client'
import React ,{useState} from 'react'
import '@/style/login.css'
import Loading from './Loading';


function Sign() {
  const [loading,setLoading] = useState(false);
  const [name,setName]= useState();
  const [email,setEmail] = useState()
  const [pas,setPas]= useState();
  const [msg,setMsg] = useState();

    const signup = async(e)=>{
      e.preventDefault()
      if(loading) return 
      setLoading(true)

    if (loading) return
    setLoading(true)

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: name,
          email: email,
          password: pas
        })
      })

      const data = await res.json()
      setMsg(data.message)
    } catch (error) {
      setMsg('Something went wrong')
      console.log(error)
    } finally {
      setLoading(false)
    }
    } 
  return (
    <>
      <div className='login-card'>
        <h1 className='login-title'>Enter the detail</h1>
        <form onSubmit={signup} className='form-card'>
          <div className='input-base'>
            <h1 className='input-lable'>Enter UserName</h1>
            <input onChange={(e)=>setName(e.target.value)} className='t-input' type="text"></input>
          </div>
          <div className='input-base'>
            <h1 className='input-lable'>Enter Email</h1>
            <input onChange={(e)=>setEmail(e.target.value)}  className='t-input' type="text"></input>
          </div>
          <div className='input-base'>
            <h1 className='input-lable'>Enter Password</h1>
            <input onChange={(e)=>setPas(e.target.value)} className='t-input' type="text"></input>
          </div>
          <button type="submit" className='form-btn'>Submit</button>
          {msg && <p>{msg}</p>}
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

export default Sign
