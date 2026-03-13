'use client'

import { useState } from "react"

export default function Filter({ jobs }: { jobs: any[] }) {
  const filters = ['All', 'Full Time', 'Remote', 'Internship', 'Part Time']
  const [jobType, setJobType] = useState("All")

  const filteredJobs = jobType === "All"
    ? jobs
    : jobs.filter((job) => job.type === jobType)

  return (
    <div className="bg-[#1a1a1a] min-h-screen px-10 py-8">

      {/* Filter Bar */}
      <div className="flex gap-3 mb-8 border-b border-gray-700 pb-4 flex-wrap">
        <p className="text-white font-bold mt-1">Filter:</p>
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setJobType(item)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              jobType === item
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-white border border-gray-600 hover:border-yellow-500'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Job Count */}
      <p className="text-gray-400 text-sm mb-6">
        Showing {filteredJobs.length} jobs
      </p>

      {/* Job Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition"
          >
            {/* Job Type Badge */}
            <div className="flex justify-between items-start mb-3">
              <span className="bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-medium">
                {job.type}
              </span>
              <span className="text-gray-500 text-xs">{job.category}</span>
            </div>

            {/* Title */}
            <h3 className="text-white text-lg font-bold mb-1">{job.title}</h3>

            {/* Company */}
            <p className="text-gray-400 text-sm mb-1">{job.company}</p>

            {/* Location */}
            <p className="text-gray-500 text-sm mb-4">📍 {job.location}</p>

            {/* Salary and Button */}
            <div className="flex justify-between items-center">
              <p className="text-yellow-500 font-medium text-sm">
                ${job.salaryMin.toLocaleString()} - ${job.salaryMax.toLocaleString()}
              </p>

              <a
                href={`/jobs/${job.id}`}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-1.5 rounded-md text-sm font-medium"
              >
              
                View Job
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* No Jobs Found */}
      {filteredJobs.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No jobs found for this filter.</p>
        </div>
      )}


    </div>
  )
}
