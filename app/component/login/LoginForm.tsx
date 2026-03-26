'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, // manual redirect
      })

      if (res?.ok) {
        // FORCE refresh so useSession() updates immediately
        router.refresh()
        router.push('/dashboard') // now redirect works
      } else {
        setError(res?.error || 'Invalid email or password')
      }
    } catch (err: any) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto mt-10">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
        />
      </div>

      <div>
        <label>Password</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 cursor-pointer"
          >
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <button type="submit" disabled={loading} className="w-full bg-yellow-500 p-2 rounded">
        {loading ? 'Signing in...' : 'Login'}
      </button>
    </form>
  )
}