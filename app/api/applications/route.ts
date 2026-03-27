import { NextRequest,NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import{prisma} from '@/lib/prisma'

export  async function POST(request:NextRequest)
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
            {error:'Unauthorized'},
            {status:400})
    }
    const body=await request.json()
     
    const{coverLetter ,resumeUrl,jobId}=body
     
    if(!coverLetter||!resumeUrl||!jobId)
    {
        return NextResponse.json({message:"fill up the form "})
    }
    const seekerId=token.sub 
    const application =await prisma.application.create({
        data:{
            coverLetter,
            resumeUrl,
             jobId,
            seekerId:seekerId as string,
           
        }
    })
    
    return NextResponse.json(
        {message:'application posted'},
        {status:201} 
    )
}



export async function GET(request:NextRequest) {
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
    const seekerId=token.sub
    const application=await prisma.application.findMany(
        {
            where:{seekerId:seekerId as  string },
            include:{
                job:true
            },
            orderBy:{
                createdAt:'desc'
            }

        }
    )
    return NextResponse.json(application)


}