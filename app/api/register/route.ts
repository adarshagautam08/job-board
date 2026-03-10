import { NextResponse } from "next/server"

export async function POST(request:Request)
{
    const {name,email,password,role}=await request.json()
    console.log(name,email,password,role)
    return NextResponse.json({message:'success'})


}