import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getToken } from "next-auth/jwt"

export async function GET(request: NextRequest) {
  // 1️⃣ Get logged-in employer's ID from the token
  // const token = await getToken({
  //   req: request,
  //   secret: process.env.NEXTAUTH_SECRET
  // })
const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token"
})

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const employerId = token.sub

  try {
    // 2️⃣ Fetch all jobs posted by this employer, newest first
    const jobs = await prisma.job.findMany({
      where: { userId: employerId as string },  // your Job model's employer field
      orderBy: { createdAt: "desc" }
    })

    return NextResponse.json(jobs)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}