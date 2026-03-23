'use client'

import LoginForm from '@/app/component/login/LoginForm'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="h-screen bg-gray-950 flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md p-5 sm:p-6 bg-gray-900 rounded-2xl shadow-2xl border border-yellow-600">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-yellow-500">WorkBoard</h1>
          <p className="text-gray-400 text-sm mt-1">Welcome back</p>
        </div>

        {/* Login Form */}
        <LoginForm />
      </div>
    </div>
  )
}