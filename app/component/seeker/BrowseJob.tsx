'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SpinLoader from "../SpinLoader"

export default function BrowseJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const filters = ['All', 'Full Time', 'Part Time', 'Remote', 'Internship', 'Contract']
  const [selected, setSelected] = useState('All')
  const router=useRouter()

  useEffect(() => {
    fetch('/api/allJobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return<div className="flex justify-center items-center h-full">
                <SpinLoader  /> {/* loader while switching */}
              </div>
  }

  const filteredJobs = selected === 'All'
    ? jobs
    : jobs.filter((job: any) => job.type === selected)

  return (
    <div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Browse Jobs</h1>
          <p className="text-gray-400 text-sm mt-1">{filteredJobs.length} jobs available</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selected === item
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-white border border-gray-600 hover:border-yellow-500'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-lg">No jobs found</p>
          </div>
        ) : (
          filteredJobs.map((job: any) => (
            <div
              key={job.id}
              className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-white">{job.title}</h2>
                  <p className="text-gray-400 text-sm mt-1">{job.company}</p>
                  <p className="text-gray-500 text-sm">📍 {job.location}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-medium">
                    {job.type}
                  </span>
                  <span className="text-yellow-500 text-sm font-medium">
                    ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-500 text-sm mt-3 line-clamp-2">{job.description}</p>

              <div className="flex gap-3 mt-4">
                <a
                  href={`/jobs/${job.id}`}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                >
                  View Details
                </a>
                <button
                onClick={()=>router.push(`/apply/${job.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}
