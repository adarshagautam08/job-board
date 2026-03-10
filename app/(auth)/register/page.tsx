"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Register() {
  const router = useRouter()
  const [name, setname] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [role, setRole] = useState<string>("Seeker")
  const [showPassword, setShowPassword] = useState<boolean>(false)
  

  const submitform=async(e:React.FormEvent)=>
  {
    e.preventDefault()
   const response =await fetch("/api/register",{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,email,password,role
    })
    })
    const data = await response.json()
    if (data.error) {
        alert(data.error)
   } else {
     router.push('/login')
   }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

        <form onSubmit={submitform} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-lg   "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setemail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Select Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="Seeker">SEEKER</option>
              <option value="Employer">EMPLOYER</option>
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>

          <button className="w-full py-2 bg-green-500 text-white rounded-lg">
            Register
          </button>

          <Link
            href="/login"
             className="block w-full py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition text-center"
          >
            Login
          </Link>

        </form>
      </div>
    </div>
  )
}