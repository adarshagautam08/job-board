'use client'
import { useRouter } from 'next/navigation'
import {useState } from 'react'
export default function Application({params}:{params:{jobId:string}})
{
    const jobId=params.jobId
    const router=useRouter()
    const [form ,setForm]=useState({
        coverLetter:'',
        resumeUrl:''
    })

   const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!form.coverLetter || !form.resumeUrl) {
  alert('Please fill all fields')
  return
  }
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...form,
      jobId: jobId
    })
  })
  const data = await response.json()
  if (data.error) {
    alert(data.error)

  } else {
    alert('Application submitted successfully!')
    router.push('/dashboard')
  }
}

    return (
  <div className="bg-[#1a1a1a] min-h-screen text-white">

    {/* Navbar */}
    <div className="bg-black h-16 flex justify-between items-center px-10">
      <a href="/jobs" className="text-[22px] font-bold text-yellow-500">WorkBoard</a>
      <a href="/dashboard" className="text-gray-400 hover:text-white text-sm">← Back</a>
    </div>

    {/* Form */}
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Apply for Job</h1>
      <p className="text-gray-400 mb-8">Fill in your details to apply</p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Cover Letter */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Cover Letter
          </label>
          <textarea
            rows={6}
            placeholder="Write why you are a good fit for this job..."
            value={form.coverLetter}
            onChange={(e) => setForm({ ...form, coverLetter: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm resize-none"
            />
        </div>

        {/* Resume URL */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Resume URL
          </label>
          <input
            type="text"
            placeholder="Paste your resume link (Google Drive, Dropbox...)"
            value={form.resumeUrl}
            onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
            className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition text-sm"
        >
          Submit Application
        </button>

      </form>
    </div>
  </div>
)
    
}