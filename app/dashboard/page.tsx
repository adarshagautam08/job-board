"use client"
import{useSession} from 'next-auth/react'



export default function Dashboard() {
    const {data:session,status}=useSession()

    if(status==="loading")
    {
        return(
            <p>....loading</p>
        )
    }

    if(session?.user?.role==='EMPLOYER')
    {
        return(
            <>
        <h1>hello employer</h1>
         <a href='/dashboard/post-job' >Post a job</a>
         </>
        )
    }
    if(session?.user?.role==='SEEKER')
    {
        return(
            <h1>hello seeker </h1>
        )
    }
  return (
    <div>
      <h1>Dashboard</h1>
     
    </div>
  )
}