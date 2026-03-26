import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

// GET - fetch all conversations for logged in user
export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const userId = session.user.id
  const role = session.user.role

  const conversations = await prisma.conversation.findMany({
    where: role === "EMPLOYER"
      ? { employerId: userId }
      : { seekerId: userId },
    include: {
      employer: { select: { id: true, name: true } },
      seeker:   { select: { id: true, name: true } },
      job:      { select: { id: true, title: true } },
      messages: { orderBy: { createdAt: "desc" }, take: 1 },
    },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json(conversations)
}

// POST - create a new conversation when employer accepts seeker
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { jobId, seekerId } = await req.json()
  const employerId = session.user.id

  // check if conversation already exists
  const existing = await prisma.conversation.findFirst({
    where: { jobId, employerId, seekerId }
  })

  if (existing) return NextResponse.json(existing)

  // create new conversation
  const conversation = await prisma.conversation.create({
    data: { jobId, employerId, seekerId }
  })

  return NextResponse.json(conversation, { status: 201 })
}