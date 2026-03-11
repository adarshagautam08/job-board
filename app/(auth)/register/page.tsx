"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [name, setname] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [role, setRole] = useState<string>("SEEKER")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const submitform = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role })
    })

    const data = await response.json()

    if (data.error) {
      setError(data.error)
      setLoading(false)
    } else {
      router.push('/login')
    }
  }

  return (
    <div className="h-screen bg-gray-950 flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md p-5 sm:p-6 bg-gray-900 rounded-2xl shadow-2xl border border-yellow-600">

        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-500">WorkBoard</h1>
          <p className="text-gray-400 text-sm mt-1">Create your account</p>
        </div>

        <form onSubmit={submitform} className="space-y-3">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              placeholder="john@example.com"
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              I am a
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 text-sm"
            >
              <option value="SEEKER">Job Seeker</option>
              <option value="EMPLOYER">Employer</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 cursor-pointer text-gray-400"
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-800 disabled:cursor-not-allowed text-gray-900 font-bold rounded-lg transition text-sm"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-gray-500 text-xs">or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-400 font-medium">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}