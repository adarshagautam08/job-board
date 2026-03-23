'use client'

import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import SpinLoader from '../SpinLoader'

export default function EmployerOverview({ session }: { session: Session }) {
  const [jobs, setJobs] = useState<any[]>([])
  const [applicants, setApplicants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    Promise.all([
      fetch('/api/my-jobs').then(res => res.json()),
      fetch('/api/applicants').then(res => res.json())
    ]).then(([jobsData, applicantsData]) => {
      setJobs(jobsData)
      setApplicants(applicantsData)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-full">
                <SpinLoader  /> {/* loader while switching */}
              </div>
  }

  return (
    <div className="p-6 space-y-8">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white">
          Welcome back, {session.user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-2">
          Here is what is happening with your jobs today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
          <p className="text-gray-100 text-sm font-medium">Total Jobs Posted</p>
          <p className="text-4xl font-extrabold text-white mt-2">{jobs.length}</p>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
          <p className="text-gray-100 text-sm font-medium">Total Applications</p>
          <p className="text-4xl font-extrabold text-white mt-2">{applicants.length}</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-400 border border-gray-700 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform">
          <p className="text-gray-100 text-sm font-medium">Pending Review</p>
          <p className="text-4xl font-extrabold text-white mt-2">
            {applicants.filter((a: any) => a.status === 'PENDING').length}
          </p>
        </div>
      </div>

      {/* Quick Action */}
      <div className="mb-8">
        <a
          href="/dashboard/post-job"
          className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition"
        >
          ➕ Post a New Job
        </a>
      </div>

      {/* Recent Jobs & Applications */}
      <div className='flex flex-col lg:flex-row gap-8'>

        {/* Recent Jobs */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Jobs</h2>
          {jobs.length === 0 ? (
            <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-8 text-center">
              <p className="text-gray-400">No jobs posted yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.slice(0, 3).map((job: any) => (
                <div
                  key={job.id}
                  className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 flex justify-between items-center hover:border-yellow-500 transition"
                >
                  <div>
                    <h3 className="font-bold text-white text-lg">{job.title}</h3>
                    <p className="text-gray-400 text-sm mt-1">{job.company} · {job.location}</p>
                  </div>
                  <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-medium">
                    {job.type}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-4">Recent Applications</h2>
          {applicants.length === 0 ? (
            <div className="bg-[#1f1f1f] border border-gray-700 rounded-xl p-8 text-center">
              <p className="text-gray-400">No applications yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {applicants.slice(0, 3).map((app: any) => (
                <div
                  key={app.id}
                  className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-5 flex justify-between items-center hover:border-blue-500 transition"
                >
                  <div>
                    <h3 className="font-bold text-white">{app.user?.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Applied for: {app.job?.title}
                    </p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${
                    app.status === 'PENDING' ? 'bg-yellow-500 text-black' :
                    app.status === 'REVIEWING' ? 'bg-blue-500 text-white' :
                    app.status === 'SHORTLISTED' ? 'bg-green-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  )
}