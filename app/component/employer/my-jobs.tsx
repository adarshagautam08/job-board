'use client'

import { useState, useEffect } from "react"

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salaryMin: number
  salaryMax: number
}

export default function MyJobs() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [editingJobId, setEditingJobId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Job>>({})

  useEffect(() => {
    fetch('/api/my-jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p className="text-gray-400">Loading jobs...</p>
  }

  const deleteJob = async (id: string) => {
    const res = await fetch(`/api/my-jobs/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setJobs(jobs.filter(job => job.id !== id))
    } else {
      const data = await res.json()
      console.error(data.error)
    }
  }

  const startEditing = (job: Job) => {
    setEditingJobId(job.id)
    setFormData({ ...job })
  }

  const cancelEditing = () => {
    setEditingJobId(null)
    setFormData({})
  }

  const saveJob = async () => {
    if (!editingJobId) return
    const res = await fetch(`/api/my-jobs/${editingJobId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      const updatedJob = await res.json()
      setJobs(jobs.map(job => job.id === editingJobId ? updatedJob : job))
      setEditingJobId(null)
      setFormData({})
    } else {
      const data = await res.json()
      console.error(data.error)
    }
  }

  const handleChange = (field: keyof Job, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <span className="text-gray-400 text-sm">{jobs.length} jobs posted</span>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No jobs posted yet</p>
          <p className="text-gray-600 text-sm mt-2">Click Post a Job to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map(job => (
            <div key={job.id} className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition">
              {editingJobId === job.id ? (
                // EDIT FORM
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => handleChange('title', e.target.value)}
                    placeholder="Job Title"
                    className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 text-white"
                  />
                  <input
                    type="text"
                    value={formData.company || ''}
                    onChange={(e) => handleChange('company', e.target.value)}
                    placeholder="Company"
                    className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 text-white"
                  />
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => handleChange('location', e.target.value)}
                    placeholder="Location"
                    className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 text-white"
                  />
                  <input
                    type="text"
                    value={formData.type || ''}
                    onChange={(e) => handleChange('type', e.target.value)}
                    placeholder="Job Type"
                    className="w-full p-2 rounded bg-[#1a1a1a] border border-gray-600 text-white"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={formData.salaryMin || 0}
                      onChange={(e) => handleChange('salaryMin', Number(e.target.value))}
                      placeholder="Salary Min"
                      className="w-1/2 p-2 rounded bg-[#1a1a1a] border border-gray-600 text-white"
                    />
                    <input
                      type="number"
                      value={formData.salaryMax || 0}
                      onChange={(e) => handleChange('salaryMax', Number(e.target.value))}
                      placeholder="Salary Max"
                      className="w-1/2 p-2 rounded bg-[#1a1a1a] border border-gray-600 text-white"
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={saveJob}
                      className="bg-yellow-500 text-black px-4 py-1.5 rounded-lg text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-700 text-white px-4 py-1.5 rounded-lg text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // DISPLAY MODE
                <>
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
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => startEditing(job)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteJob(job.id)}
                      className="bg-red-900 hover:bg-red-800 text-red-300 px-4 py-1.5 rounded-lg text-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}