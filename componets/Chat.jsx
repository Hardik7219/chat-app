'use client'
import socket from "@/lib/socket"
import { useUser } from "@/context/UserContext"
import { useEffect, useState, useRef } from "react"

function Chat({ id }) {
  const [messages, setMessages] = useState([])
  const { user } = useUser()
  const bottomRef = useRef(null)

  useEffect(() => {
    if (!user?.id) return
    socket.emit("join", user.id)
  }, [user?.id])

  useEffect(() => {
    if (!user?.id || !id) return
    const loadMsg = async () => {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId: user.id, otherId: id }),
      })
      const data = await res.json()
      setMessages(data.messages || [])
    }
    loadMsg()
  }, [user?.id, id])

  useEffect(() => {
    if (!user?.id) return

    const handleMessage = (data) => {
      setMessages((prev) =>
        prev.some((msg) => msg._id === data._id) ? prev : [...prev, data]
      )
    }

    socket.on("receive-message", handleMessage)
    return () => socket.off("receive-message", handleMessage)
  }, [user?.id, id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="chat-messages">
      {messages.length === 0 && (
        <div className="empty-state">No messages yet. Say hello!</div>
      )}
      {messages.map((msg) => {
        const isSent = msg.senderId.toString() === user?.id
        return (
          <div
            key={msg._id}
            className={`message-bubble ${isSent ? "message-sent" : "message-received"}`}
          >
            {msg.message}
          </div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}

export default Chat
