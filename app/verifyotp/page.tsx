'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function VerifyOTP() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get('email') // this gets "illumanati008@gmail.com"
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, otp }),
    })

    const data = await res.json()

    if (data.error) {
      setError(data.error)
      setLoading(false)
    } else {
      router.push('/login') // OTP verified successfully
    }
  }

  return (
    <form onSubmit={handleVerify} className="flex flex-col items-center gap-4 mt-10">
      <h2 className="text-xl font-bold">Verify OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border px-4 py-2 rounded"
      />
      <button
        type="submit"
        className="bg-yellow-500 px-6 py-2 rounded font-semibold text-black"
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}