import {prisma} from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest,NextResponse } from 'next/server'

export async function GET(request:NextRequest)
{
    const token=await getToken({
        req:request,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token)
    {
        return NextResponse.json(
            {error:'unauthorized'},
            {status:400}
        )
    }
    const employerId=token.sub
    const application=await prisma.application.findMany(
        {
            where:{
                job:{
                    userId:employerId as string
                }
            },
            include:{
                job:true,
                 user: true
            }
        }
    )
    return NextResponse.json(application)
}