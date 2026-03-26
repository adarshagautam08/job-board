'use client'

import { useEffect, useState } from "react"
import SpinLoader from "../SpinLoader"

export default function Applicants() {
  const [applicants, setApplicants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/applicants')
      .then(res => res.json())
      .then(data => {
        setApplicants(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-full">
                <SpinLoader /> {/* loader while switching */}
              </div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':     return 'bg-yellow-500 text-black'
      case 'REVIEWING':   return 'bg-blue-500 text-white'
      case 'SHORTLISTED': return 'bg-green-500 text-white'
      case 'REJECTED':    return 'bg-red-500 text-white'
      case 'ACCEPTED':    return 'bg-yellow-500 text-white'
      default:            return 'bg-gray-500 text-white'
    }
  }

  // 1. updateStatus first
const updateStatus = async (id: string, status: string) => {
  await fetch(`/api/applicants/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })

  setApplicants(applicants.map((app: any) =>
    app.id === id ? { ...app, status } : app
  ))
}

// 2. handleAccept second (uses updateStatus so must come after)
const handleAccept = async (applicant: any) => {
  await updateStatus(applicant.id, 'ACCEPTED')
  const res = await fetch('/api/conversations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jobId: applicant.job.id,
      seekerId: applicant.user.id
    })
  })

  const conversation = await res.json()
  window.location.href = `/chat/${conversation.id}`
}

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        <span className="text-gray-400 text-sm">
          {applicants.length} total applications
        </span>
      </div>

      {applicants.length === 0 ? (
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No applications yet</p>
          <p className="text-gray-600 text-sm mt-2">
            Applications will appear here when seekers apply
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant: any) => (
            <div
              key={applicant.id}
              className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {applicant.user?.name}
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {applicant.user?.email}
                  </p>
                  <p className="text-yellow-500 text-sm mt-1">
                    Applied for: {applicant.job?.title}
                  </p>
                </div>
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(applicant.status)}`}>
                  {applicant.status}
                </span>
              </div>

              {/* Cover Letter */}
              <div className="bg-[#1a1a1a] rounded-lg p-4 mb-4">
                <p className="text-gray-500 text-xs mb-1">Cover Letter:</p>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {applicant.coverLetter}
                </p>
              </div>

              {/* Resume */}
              <a
                href={applicant.resumeUrl}
                target="_blank"
                className="text-yellow-500 text-sm hover:underline"
              >
                📄 View Resume
              </a>

              {/* Status Buttons */}
              <div className="flex gap-2 mt-4 flex-wrap">
                <p className="text-gray-500 text-xs mt-1">Update Status:</p>
                <button
                  onClick={() => updateStatus(applicant.id, 'REVIEWING')}
                  className="bg-blue-900 hover:bg-blue-800 text-blue-300 px-3 py-1 rounded-lg text-xs transition"
                >
                  Reviewing
                </button>
                <button
                  onClick={() => updateStatus(applicant.id, 'SHORTLISTED')}
                  className="bg-green-900 hover:bg-green-800 text-green-300 px-3 py-1 rounded-lg text-xs transition"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => updateStatus(applicant.id, 'REJECTED')}
                  className="bg-red-900 hover:bg-red-800 text-red-300 px-3 py-1 rounded-lg text-xs transition"
                >
                  Reject
                </button>

                <div>
                 <button
  onClick={() => handleAccept(applicant)}
  className="bg-yellow-300 hover:bg-yellow-500 text-black px-3 py-1 rounded-lg text-xs transition"
>
  Accept
</button>
                </div>
              </div>

              {/* Applied Date */}
              <p className="text-gray-600 text-xs mt-3">
                Applied on {new Date(applicant.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
