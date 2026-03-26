'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Conversation {
  id: string
  job: { id: string; title: string }
  employer: { id: string; name: string }
  seeker: { id: string; name: string }
  messages: { content: string }[]
}

export default function ChatInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/conversations')
      .then(res => res.json())
      .then(data => {
        setConversations(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-white p-8">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>

      {conversations.length === 0 ? (
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400">No conversations yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => router.push(`/chat/${conv.id}`)}
              className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-4 hover:border-yellow-500 cursor-pointer transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-yellow-500 font-bold">{conv.job.title}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    {conv.employer.name} → {conv.seeker.name}
                  </p>
                </div>
              </div>
              {conv.messages[0] && (
                <p className="text-gray-500 text-xs mt-2 line-clamp-1">
                  {conv.messages[0].content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}