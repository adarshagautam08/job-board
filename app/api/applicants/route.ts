import {prisma} from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest,NextResponse } from 'next/server'

export async function GET(request:NextRequest)
{
    // const token=await getToken({
    //     req:request,
    //     secret:process.env.NEXTAUTH_SECRET
    // })

    const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token"
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