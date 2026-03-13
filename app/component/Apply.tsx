'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Apply ({jobId}:{jobId:string})  {
    const router=useRouter()
    const {data:session}=useSession()
    const applyClick=()=>
    {
        if(session)
        {
            router.push('/dashboard')
            
        }
        else{
            router.push(`/login?callbackUrl=/jobs/${jobId}`)
        }
    }
  return (
    <div>
        <button className='bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold transition text-sm' onClick={applyClick}  >Apply--</button>
    </div>
  )
}
