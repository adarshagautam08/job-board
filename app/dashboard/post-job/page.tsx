'use client'

import { useState,useEffect } from 'react'
import { useRouter } from "next/navigation"

export default function PostJob() {
 
  const router = useRouter()
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salaryMin: '',
    salaryMax: '',
    category: '',
    description: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

   useEffect(() => {
  if (error) {
    const timer = setTimeout(() => {
      setError('')
    }, 1000)
    return () => clearTimeout(timer)
  }
}, [error])

useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      setSuccess(false)
    }, 2000)
    return () => clearTimeout(timer)
  }
}, [success])


  const postJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const response = await fetch("/api/job-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    const data = await response.json()

    if (data.error) {
      setError(data.error)
      setLoading(false)
    } else {
      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    }
  }
  

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">

      {/* Navbar */}
      <div className="bg-black h-16 flex justify-between items-center px-10">
        <a href="/jobs" className="text-[22px] font-bold text-yellow-500">
          WorkBoard
        </a>
        <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">
          ← Back to Dashboard
        </a>
      </div>

      {/* Success Alert */}
      {success && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-green-900 border border-green-500 text-green-300 px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="text-2xl">✅</span>
          <div>
            <p className="font-bold text-white">Job Posted Successfully!</p>
            <p className="text-sm text-green-400">Redirecting to dashboard...</p>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-900 border border-red-500 text-red-300 px-8 py-4 rounded-xl shadow-2xl flex items-center gap-3">
          <span className="text-2xl">❌</span>
          <div>
            <p className="font-bold text-white">Something went wrong!</p>
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
        <p className="text-gray-400 mb-8">Fill in the details to post a new job listing</p>

        <form onSubmit={postJob} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Job Title</label>
            <input
              type="text"
              placeholder="e.g. Frontend Developer"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="e.g. Tech Nepal"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
            <input
              type="text"
              placeholder="e.g. Kathmandu / Remote"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Type and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Job Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
              >
                <option value="">Select type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
              >
                <option value="">Select category</option>
                <option value="Technology">Technology</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Min Salary</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={form.salaryMin}
                onChange={(e) => setForm({ ...form, salaryMin: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Max Salary</label>
              <input
                type="number"
                placeholder="e.g. 80000"
                value={form.salaryMax}
                onChange={(e) => setForm({ ...form, salaryMax: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Job Description</label>
            <textarea
              rows={5}
              placeholder="Describe the job role, requirements, and responsibilities..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-800 disabled:cursor-not-allowed text-black font-bold rounded-lg transition text-sm"
          >
            {loading ? 'Posting...' : 'Post Job'}
          </button>

        </form>
      </div>
    </div>
  )
}
