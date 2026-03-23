'use client'
import { useRouter } from 'next/navigation'

export default function BackBtn()
{
    const router=useRouter()
    return(
   <button
      onClick={() => router.back()}
      className="text-gray-400 hover:text-yellow-500 text-sm mb-8 inline-block transition"
    >
      ← Back
    </button>
    )
}