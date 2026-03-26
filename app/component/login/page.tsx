'use client'

import LoginForm from './LoginForm'  // make sure path is correct
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function LoginPageWrapper() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')  // redirect if already logged in
    } else if (status === 'unauthenticated') {
      setLoading(false)  // show login form
    }
  }, [status, router])

  if (loading) return <div>Loading...</div>

  return <LoginForm />
}