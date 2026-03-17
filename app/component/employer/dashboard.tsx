'use client'

import { Session } from 'next-auth'

export default function Dashboard({ session }: { session: Session }) {
  return (
    <div>

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome back, {session.user?.name}! 👋
        </h1>
        <p className="text-gray-400 mt-1">
          Here is what is happening with your jobs today.
        </p>
      </div>

      {/* Quick Actions */}
      <a
        href="/dashboard/post-job"
        className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-sm"
      >
        ➕ Post a New Job
      </a>

    </div>
  )
}