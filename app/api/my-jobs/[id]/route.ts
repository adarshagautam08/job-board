import {prisma} from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'
import { NextRequest,NextResponse } from 'next/server'

export async function DELETE(request:NextRequest,{params}:{params:{id:string}})
{
    const token=await getToken({
        req:request,
        secret:process.env.NEXTAUTH_SECRET

    })
    
    if(!token)
        return NextResponse.json({error:'unauthorized'},
    {status:400})

    await prisma.job.delete(
        {where:{id:params.id}}
    )
    return NextResponse.json(
        {message:'job deleted sucessfully'},
        {status:200}
    )
}


export async function PATCH(request:NextRequest,{params}:{params:{id:string}})
{
    const token=await getToken({
        req:request,
        secret:process.env.NEXTAUTH_SECRET
    })
    if(!token)
    {
        return NextResponse.json(
            {error:'Unauthorized'},
            {status:401}
        )
    }
   
    const body=await request.json()
    const { title, description, company, location, type, salaryMin, salaryMax } = body

    const updateJob=await prisma.job.update({
        where:{id:params.id},
        data:{title,description,company,location,type,salaryMin:parseInt(salaryMin),salaryMax:parseInt(salaryMax)}
    })
    return NextResponse.json(
        {message:'the data is updated '}
    )

}