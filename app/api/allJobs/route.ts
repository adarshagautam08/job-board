import { NextRequest,NextResponse } from "next/server";
import{prisma} from "@/lib/prisma"
import { getToken } from "next-auth/jwt";

export async function GET(request:NextRequest)
{   
  const token=await getToken({
    req:request,
    secret:process.env.NEXTAUTH_SECRET
  })
    try {
    const jobs = await prisma.job.findMany(

        {
        orderBy:{
                createdAt:'desc'
            }
        }
    )
    return NextResponse.json(jobs)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}