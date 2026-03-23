import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { prisma } from "@/lib/prisma"
import nodemailer from "nodemailer"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 1️⃣ Get logged-in employer
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    })

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const employerId = token.sub

    // 2️⃣ Get status from body
    const { status } = await request.json()
    console.log(status)

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      )
    }

    // 3️⃣ Check if application belongs to this employer
    const existingApplication = await prisma.application.findFirst({
  where: {
    id: params.id,
    job: {
      userId: employerId as string,
    },
  },
  include: {
    user: true,
    job: true,
  },
})

    if (!existingApplication) {
      return NextResponse.json(
        { error: "Application not found or not authorized" },
        { status: 404 }
      )
    }

    // 4️⃣ Update the application
    const updatedApplication = await prisma.application.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    })

    if(status==="ACCEPTED")
    {
      try{
        const transpoter=nodemailer.createTransport({
          host:process.env.SMTP_HOST,
          port:Number(process.env.SMTP_PORT),
          auth:{
            user:process.env.SMTP_USER,
            pass:process.env.SMTP_PASS
          },
        })
        await transpoter.sendMail({
         from: '"Job Board" <gautamadarsha@gmail.com>',
          to: existingApplication.user.email, // applicant email
          subject: "Congratulations! Your application was accepted",
          text: `Hi ${existingApplication.user.name},\n\nYour application for "${existingApplication.job.title}" has been accepted!`,
        })
      }
      catch(emailError)
      {
         console.error("Failed to send acceptance email:", emailError)
      }
    }

    // 5️⃣ Return updated data
    return NextResponse.json(updatedApplication)

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to update status" },
      { status: 500 }
    )
  }
}