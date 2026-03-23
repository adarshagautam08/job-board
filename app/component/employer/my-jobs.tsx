'use client'

import { useState, useEffect } from "react"
import SpinLoader from "../SpinLoader"

export default function MyJobs() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salaryMin: '',
    salaryMax: '',
    description: ''
  })

  useEffect(() => {
    fetch('/api/my-jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-full">
                <SpinLoader /> {/* loader while switching */}
              </div>
  }

  const deleteJob = async (id: string) => {
    await fetch(`/api/my-jobs/${id}`, {
      method: 'DELETE'
    })
    setJobs(jobs.filter((job: any) => job.id !== id))
  }

  const startEdit = (job: any) => {
    setEditingId(job.id)
    setEditForm({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      description: job.description
    })
  }

  const saveEdit = async (id: string) => {
    const response = await fetch(`/api/my-jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm)
    })

    const data = await response.json()

    if (data.error) {
      alert(data.error)
    } else {
      setJobs(jobs.map((job: any) =>job.id === id ? { ...job, ...editForm } : job))
      setEditingId(null)
    }
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
          {jobs.map((job: any) => (
            <div key={job.id} className="bg-[#2a2a2a] border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition">

              {/* Job Info */}
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

              {/* Edit Form */}
              {editingId === job.id && (
                <div className="mt-6 space-y-3 border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Title</label>
                      <input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Company</label>
                      <input
                        value={editForm.company}
                        onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Location</label>
                      <input
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Type</label>
                      <select
                        value={editForm.type}
                        onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Remote">Remote</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Min Salary</label>
                      <input
                        type="number"
                        value={editForm.salaryMin}
                        onChange={(e) => setEditForm({ ...editForm, salaryMin: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 mb-1 block">Max Salary</label>
                      <input
                        type="number"
                        value={editForm.salaryMax}
                        onChange={(e) => setEditForm({ ...editForm, salaryMax: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Description</label>
                    <textarea
                      rows={3}
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 text-white rounded-lg text-sm focus:outline-none focus:border-yellow-500 resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => saveEdit(job.id)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg text-sm font-bold transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => startEdit(job)}
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

            </div>
          ))}
        </div>
      )}
    </div>
  )
}

