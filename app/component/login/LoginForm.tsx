'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Only runs on client
 

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError(''); // clear previous error

  try {
    console.log("Attempting sign in...");

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    console.log("signIn response:", res);

    if (res?.error) {
      // Authentication failed
      setError(res.error || 'Invalid email or password');
      console.log("Sign-in failed:", res.error);
    } else {
      // Success
      console.log("Sign-in successful", res);
      router.push("/dashboard");
    }
  } catch (err: any) {
    // Network error, NextAuth crash, etc.
    console.error("Unexpected error during signIn:", err);
    setError('Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="john@example.com"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-500 text-sm"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 cursor-pointer text-gray-400"
          >
            {showPassword ? '🙈' : '👁'}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-800 disabled:cursor-not-allowed text-gray-900 font-bold rounded-lg transition text-sm"
      >
        {loading ? 'Signing in...' : 'Login'}
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-700" />
        <span className="text-gray-500 text-xs">or</span>
        <div className="flex-1 h-px bg-gray-700" />
      </div>

      <p className="text-center text-gray-400 text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-yellow-500 hover:text-yellow-400 font-medium">
          Create one
        </Link>
      </p>
    </form>
  )
}