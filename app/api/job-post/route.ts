import {prisma} from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextResponse ,NextRequest } from 'next/server'


export async function POST(request:NextRequest)
{
    // const token =await getToken({
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
            {error:'Unauthorizes'},
            {status:401}
        )
    }

    const userId=token.sub
    const body=await request.json()

    const { title, company, location, type,salaryMin, salaryMax, category, description } = body

    if(!title||!company||!location||!type||!salaryMin||!salaryMax||!category||!description)
    {
        return NextResponse.json(
            {error:"All field are required"},
            {status:400}
        )
    }
    const job=await prisma.job.create({
        data:{
            ...body,
            salaryMin:parseInt(body.salaryMin),
            salaryMax:parseInt (body.salaryMax),
            userId:userId as string
        }
        
    });
    return NextResponse.json(
        {message:'Job posted successfully'},
        {status:200}
    )
    



}