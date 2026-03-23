'use client'

import { Session } from 'next-auth'
import { useEffect, useState } from 'react'

export default function Dashboard({ session }: { session: Session }) {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/applications')
      .then(res => res.json())
      .then(data => {
        setApplications(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-gray-400 text-center mt-20">Loading applications...</p>
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

  return (
    <div className="p-6 space-y-8">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {session.user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Here is an overview of your applications.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Total Applications</p>
          <p className="text-2xl font-bold text-yellow-500 mt-1">{applications.length}</p>
        </div>
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-500 mt-1">
            {applications.filter(app => app.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Reviewed</p>
          <p className="text-2xl font-bold text-blue-500 mt-1">
            {applications.filter(app => app.status === 'REVIEWING').length}
          </p>
        </div>
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 text-center">
          <p className="text-gray-400 text-sm">Shortlisted</p>
          <p className="text-2xl font-bold text-green-500 mt-1">
            {applications.filter(app => app.status === 'SHORTLISTED').length}
          </p>
        </div>
      </div>

      {/* Applications List */}
      {applications.length === 0 ? (
        <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-8 text-center">
          <p className="text-gray-400">You have no applications yet.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {applications.map(app => (
            <div
              key={app.id}
              className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 flex justify-between items-center hover:border-yellow-500 transition"
            >
              <div>
                <h2 className="text-white font-bold">{app.job?.title}</h2>
                <p className="text-gray-400 text-sm">{app.job?.company}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusColor(app.status)}`}>
                  {app.status}
                </span>
                <p className="text-gray-500 text-xs mt-1">
                  {new Date(app.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}