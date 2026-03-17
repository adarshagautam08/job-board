import { NextRequest,NextResponse } from "next/server";
import{prisma} from "@/lib/prisma"
import { getToken } from "next-auth/jwt";

export async function GET(request:NextRequest)
{   
    const token=await getToken(
        {
            req:request,
            secret:process.env.NEXTAUTH_SECRET
        }
    )
    if(!token)
    {
       return NextResponse.json({error:'Unauthorizes'},{status:401})
    }
    
    const userId=token.sub
    const job=await prisma.job.findMany(
        {
            where:{userId:userId as string }
        }
    )
    return NextResponse.json(job)
}