'use client'

import { useSession, signOut } from "next-auth/react"

export default function Settings() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-screen bg-gray-950 flex items-center justify-center overflow-hidden">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-950 flex  justify-center overflow-hidden px-4">
     <div className="w-full max-w-sm bg-gray-900 border border-yellow-600 rounded-2xl shadow-2xl p-6">

        <h1 className="text-2xl font-bold text-yellow-500 mb-4 text-center">Account Settings</h1>

        
         <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-gray-900 text-3xl font-bold">
            {session?.user?.name?.charAt(0).toUpperCase() ?? "?"}
          </div>
        </div>  

        {/* User Info */}
        <div className="space-y-3 ">
          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-400 mb-1">Full Name</p>
            <p className="text-white font-medium">{session?.user?.name ?? "—"}</p>
          </div>

          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-400 mb-1">Email Address</p>
            <p className="text-white font-medium">{session?.user?.email ?? "—"}</p>
          </div>

          <div className="bg-gray-800 rounded-lg px-4 py-2">
            <p className="text-xs text-gray-400 mb-1">Role</p>
            <p className="text-white font-medium capitalize">
              {(session?.user as any)?.role?.toLowerCase() ?? "—"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full py-3 mt-4 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  )
}