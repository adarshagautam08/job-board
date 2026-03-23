'use client'

import { useEffect, useState } from "react"

export default function MyApplications() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchApplications = () => {
    setLoading(true)
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data)
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  if (loading) {
    return <p className="text-gray-400">Loading applications...</p>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':     return 'bg-yellow-500 text-black'
      case 'REVIEWING':   return 'bg-blue-500 text-white'
      case 'SHORTLISTED': return 'bg-green-500 text-white'
      case 'REJECTED':    return 'bg-red-500 text-white'
      default:            return 'bg-gray-500 text-white'
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'PENDING':     return 'Your application is waiting to be reviewed'
      case 'REVIEWING':   return 'Employer is reviewing your application'
      case 'SHORTLISTED': return 'Congratulations! You have been shortlisted'
      case 'REJECTED':    return 'Unfortunately your application was not selected'
      default:            return ''
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Applications</h1>
          <p className="text-gray-400 text-sm mt-1">
            {applications.length} applications submitted
          </p>
        </div>
        <button
          onClick={fetchApplications}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition flex items-center gap-2"
        >
          🔄 Refresh
        </button>
      </div>

      {applications.length === 0 ? (
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No applications yet</p>
          <p className="text-gray-600 text-sm mt-2">
            Browse jobs and apply to get started
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((application: any) => (
            <div
              key={application.id}
              className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition"
            >
              {/* Job Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    {application.job.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-1">
                    {application.job.company}
                  </p>
                  <p className="text-gray-500 text-sm">
                    📍 {application.job.location}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(application.status)}`}>
                    {application.status}
                  </span>
                </div>
              </div>

              {/* Status Message */}
              <div className="mt-3 bg-[#1a1a1a] rounded-lg px-4 py-2">
                <p className="text-gray-400 text-xs">
                  {getStatusMessage(application.status)}
                </p>
              </div>

              {/* Job Details */}
              <div className="flex gap-4 mt-4">
                <span className="bg-[#1a1a1a] text-gray-400 text-xs px-3 py-1 rounded-lg">
                  {application.job.type}
                </span>
                <span className="text-yellow-500 text-xs px-3 py-1 rounded-lg bg-[#1a1a1a]">
                  💰 ${application.job.salaryMin.toLocaleString()} - ${application.job.salaryMax.toLocaleString()}
                </span>
              </div>

              {/* Cover Letter */}
              <div className="mt-4 bg-[#1a1a1a] rounded-lg p-4">
                <p className="text-gray-500 text-xs mb-1">Your Cover Letter:</p>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {application.coverLetter}
                </p>
              </div>

              {/* Resume Link */}
              <a
                href={application.resumeUrl}
                target="_blank"
                className="text-yellow-500 text-xs hover:underline mt-2 inline-block"
              >
                📄 View Resume
              </a>

              {/* Applied Date */}
              <p className="text-gray-600 text-xs mt-3">
                Applied on {new Date(application.createdAt).toLocaleDateString()}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  )
}
