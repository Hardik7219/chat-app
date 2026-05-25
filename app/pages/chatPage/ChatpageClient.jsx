'use client'
import Chat from '@/componets/Chat'
import { Send, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from "next/navigation"
import { useUser } from "@/context/UserContext"
import socket from "@/lib/socket"
import React, { useState, useEffect } from 'react'
import Loading from '@/componets/Loading'

function Chatpage() {
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('')
  const id = searchParams.get('id')
  const name = searchParams.get('name')
  const { user, loading } = useUser()

  const sendChat = async (e) => {
    e.preventDefault()
    if (!message.trim() || !user?.id || !id) return

    const res = await fetch('/api/sendChat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id: user.id,
        id: id,
        msg: message,
      }),
    })
    const data = await res.json()
    if (data.data) {
      socket.emit("send-message", data.data)
    }
    setMessage("")
  }

  useEffect(() => {
    if (!user?.id) return
    socket.emit("join", user.id)
  }, [user?.id])

  if (!id || !name) {
    return (
      <div className="app-shell">
        <div className="empty-state" style={{ marginTop: '4rem' }}>
          <p>Invalid chat link.</p>
          <Link href="/pages/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Back to search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell" style={{ maxWidth: '100%' }}>
      {loading && (
        <div className="loading-overlay">
          <Loading />
        </div>
      )}
      <header className="chat-header">
        <Link href="/pages/dashboard" className="chat-back">
          <ArrowLeft size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
          Back
        </Link>
        <div className="user-avatar" style={{ width: '2rem', height: '2rem', fontSize: '0.75rem' }}>
          {name.charAt(0).toUpperCase()}
        </div>
        <span className="chat-peer-name">{name}</span>
      </header>

      <Chat id={id} />

      <div className="chat-input-bar">
        <form onSubmit={sendChat}>
          <div className="search-bar">
            <input
              className="search-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Type a message..."
            />
            <button type="submit" className="search-btn" aria-label="Send">
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Chatpage
