"use client"
import{useSession} from 'next-auth/react'
import EmployerDashboard from '../component/EmployerDashboard'
import SeekerDashboard from '../component/SeekerDashboard'
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
        <EmployerDashboard session={session} />
         </>
        )
    }
    if(session?.user?.role==='SEEKER')
    {
        return(
            <SeekerDashboard/>
        )
    }
  
}