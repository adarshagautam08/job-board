'use client'

import { useEffect, useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { io, Socket } from "socket.io-client"
import { useRouter } from "next/navigation"

interface Message {
  id: string
  content: string
  senderId: string
  sender: { id: string; name: string }
  createdAt: string
}

export default function ChatPage({
  params
}: {
  params: { conversationId: string }
}) {
  const { conversationId } = params
  const { data: session } = useSession()
  const socketRef = useRef<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [connected, setConnected] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    fetch(`/api/conversations/${conversationId}/messages`)
      .then(res => res.json())
      .then(setMessages)
  }, [conversationId])

  useEffect(() => {
    const socket = io()
    socketRef.current = socket

    socket.on("connect", () => {
      setConnected(true)
      socket.emit("join_conversation", conversationId)
    })

    socket.on("disconnect", () => setConnected(false))

    socket.on("receive_message", (message: Message) => {
      setMessages(prev => [...prev, message])
    })

    return () => { socket.disconnect() }
  }, [conversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || !socketRef.current) return

    const res = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: input })
    })
    const message = await res.json()

    setMessages(prev => [...prev, message])
    socketRef.current.emit("send_message", { conversationId, message })
    setInput("")
  }

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-screen bg-[#111111]">

      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 bg-[#1a1a1a] border-b border-gray-800">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-gray-400 hover:text-white transition"
        >
          ←
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold text-sm">
            💼
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Job Chat</p>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-500'}`} />
              <p className="text-xs text-gray-400">{connected ? 'Online' : 'Connecting...'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-3">
            <div className="text-4xl">💬</div>
            <p className="text-gray-500 text-sm">No messages yet. Say hello!</p>
          </div>
        )}

        {messages.map((msg) => {
          const isMe = msg.senderId === session?.user?.id
          return (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}
            >
              {/* Avatar for other user */}
              {!isMe && (
                <div className="w-7 h-7 rounded-full bg-[#2a2a2a] border border-gray-700 flex items-center justify-center text-xs text-yellow-500 font-bold flex-shrink-0">
                  {msg.sender.name?.charAt(0).toUpperCase()}
                </div>
              )}

              <div className={`flex flex-col gap-1 max-w-xs ${isMe ? "items-end" : "items-start"}`}>
                {!isMe && (
                  <p className="text-xs text-gray-500 px-1">{msg.sender.name}</p>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? "bg-yellow-500 text-black rounded-br-sm font-medium"
                      : "bg-[#2a2a2a] text-white border border-gray-700 rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                <p className="text-xs text-gray-600 px-1">
                  {formatTime(msg.createdAt)}
                </p>
              </div>

              {/* Avatar for me */}
              {isMe && (
                <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-xs text-black font-bold flex-shrink-0">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 bg-[#1a1a1a] border-t border-gray-800">
        <div className="flex items-center gap-3 bg-[#2a2a2a] border border-gray-700 rounded-2xl px-4 py-2 focus-within:border-yellow-500 transition">
          <input
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder-gray-500"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim()}
            className="w-8 h-8 bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-700 disabled:text-gray-500 text-black rounded-xl flex items-center justify-center transition text-sm font-bold"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  )
}