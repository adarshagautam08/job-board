import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"


export async function POST(request:Request)
{
    const {name,email,password,role}=await request.json()
    if(!name ||!email||!password)
    {
        return NextResponse.json(
            {error:'All field are required '},
            {status:400}

        )
    }
    const existingUser=await prisma.user.findUnique(
        {
            where:{email}
        }
    )
    if(existingUser)
    {
        return NextResponse.json(
            {error:'Email already exists'},
            {status:400}
        )
    }

    const hashedPassword=await bcrypt.hash(password,10)

    const user=await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPassword,
            role
        }
    })

    return NextResponse.json(
        {message:'Account register sucessfully'},
        {status:200}
    )
}



























// export async function POST(request: Request) {
  
//   // get data from frontend
//   const { name, email, password, role } = await request.json()

//   // step 1 - check nothing is empty
//   if (!name || !email || !password || !role) {
//     return NextResponse.json(
//       { error: 'All fields are required' },
//       { status: 400 }
//     )
//   }

//   // step 2 - check if email already exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email }
//   })

//   if (existingUser) {
//     return NextResponse.json(
//       { error: 'Email already exists' },
//       { status: 400 }
//     )
//   }

//   // step 3 - hash the password
//   const hashedPassword = await bcrypt.hash(password, 10)

//   // step 4 - save user to database
//   const user = await prisma.user.create({
//     data: {
//       name,
//       email,
//       password: hashedPassword,
//       role
//     }
//   })

//   // step 5 - return success
//   return NextResponse.json(
//     { message: 'Account created successfully' },
//     { status: 201 }
//   )
// }
