'use client'

import { useState } from 'react'
import { Session } from 'next-auth'
import PostJob from '../dashboard/post-job/page'
import Dashboard from './employer/dashboard'
import MyJobs from './employer/my-jobs'

export default function EmployerDashboard({ session }: { session: Session }) {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <div className="bg-[#1a1a1a] min-h-screen text-white">

      {/* Navbar */}
      <div className="bg-black h-16 flex justify-between items-center px-10">
        <p className="text-[22px] font-bold text-yellow-500">WorkBoard</p>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-sm">
            Welcome, {session.user?.name}
          </p>
          <a
            href="/login"
            className="border border-gray-600 text-gray-400 px-4 py-1.5 rounded-lg text-sm hover:border-red-500 hover:text-red-400 transition"
          >
            Logout
          </a>
        </div>
      </div>

      {/* Main Wrapper (adds spacing from navbar) */}
      <div className="p-6">

        {/* Card / Rectangle */}
        <div className="flex bg-[#111] rounded-xl border border-gray-800 overflow-hidden">

          {/* Sidebar */}
          <div className="w-64 p-6 border-r border-gray-800">
            <p className="text-gray-500 text-xs uppercase mb-4">Menu</p>

            <div className="space-y-2">

              <button
                onClick={() => setActivePage('dashboard')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                  activePage === 'dashboard'
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                📊 Dashboard
              </button>

              <button
                onClick={() => setActivePage('post-job')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                  activePage === 'post-job'
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                ➕ Post a Job
              </button>

              <button
                onClick={() => setActivePage('my-jobs')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                  activePage === 'my-jobs'
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                💼 My Jobs
              </button>

              <button
                onClick={() => setActivePage('applications')}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition ${
                  activePage === 'applications'
                    ? 'bg-yellow-500 text-black font-bold'
                    : 'text-gray-400 hover:bg-gray-800'
                }`}
              >
                📋 Applications
              </button>

            </div>
          </div>

          {/* Main Content (Scrollable) */}
          <div className="flex-1 p-8 h-[calc(100vh-100px)] overflow-y-auto">

            {activePage === 'dashboard' && (
              <Dashboard session={session} />
            )}

            {activePage === 'post-job' && (
              <PostJob />
            )}

            {activePage === 'my-jobs' && (
              <MyJobs />
            )}

            {activePage === 'applications' && (
              <div>
                <h1 className="text-2xl font-bold mb-2">Applications</h1>
                <p className="text-gray-400">
                  Applications list goes here
                </p>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}