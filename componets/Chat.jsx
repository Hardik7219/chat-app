'use client'
import socket from "@/lib/socket"
import { useUser } from "@/context/UserContext"
import { useEffect, useState, useRef, useCallback } from "react"
import { Send } from "lucide-react"

function normalizeId(value) {
  return value?.toString?.() ?? String(value ?? "")
}

function isChatMessage(data, myId, peerId) {
  const sender = normalizeId(data.senderId)
  const receiver = normalizeId(data.receiId)
  return (
    (sender === myId && receiver === peerId) ||
    (sender === peerId && receiver === myId)
  )
}

function Chat({ id }) {
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState("")
  const [sending, setSending] = useState(false)
  const { user } = useUser()
  const bottomRef = useRef(null)
  const myId = normalizeId(user?.id)
  const peerId = normalizeId(id)

  const appendMessage = useCallback((data) => {
    if (!isChatMessage(data, myId, peerId)) return
    const msgId = normalizeId(data._id)
    setMessages((prev) =>
      prev.some((msg) => normalizeId(msg._id) === msgId) ? prev : [...prev, data]
    )
  }, [myId, peerId])

  useEffect(() => {
    if (!myId) return
    socket.emit("join", myId)
  }, [myId])

  useEffect(() => {
    if (!myId || !peerId) return
    const loadMsg = async () => {
      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ myId, otherId: peerId }),
      })
      const data = await res.json()
      setMessages(data.messages || [])
    }
    loadMsg()
  }, [myId, peerId])

  useEffect(() => {
    if (!myId) return
    const handleMessage = (data) => appendMessage(data)
    socket.on("receive-message", handleMessage)
    return () => socket.off("receive-message", handleMessage)
  }, [myId, appendMessage])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    const trimmed = draft.trim()
    if (!trimmed || !myId || !peerId || sending) return

    setSending(true)
    try {
      const res = await fetch("/api/sendChat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: myId, id: peerId, msg: trimmed }),
      })
      const data = await res.json()
      if (!data.data) return

      appendMessage(data.data)
      socket.emit("send-message", data.data)
      setDraft("")
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="empty-state">No messages yet. Say hello!</div>
        )}
        {messages.map((msg) => {
          const isSent = normalizeId(msg.senderId) === myId
          return (
            <div
              key={normalizeId(msg._id)}
              className={`message-bubble ${isSent ? "message-sent" : "message-received"}`}
            >
              {msg.message}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <form onSubmit={sendMessage}>
          <div className="search-bar">
            <input
              className="search-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              type="text"
              placeholder="Type a message..."
              disabled={sending}
            />
            <button type="submit" className="search-btn" disabled={sending} aria-label="Send">
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Chat
