import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();
    console.log("Verifying:", { email, otp });
    const trimmedOtp = otp.trim();

    // 1️⃣ Find OTP
    const record = await prisma.oTP.findFirst({
      where: { email, otp: trimmedOtp},
      orderBy: { createdAt: "desc" },
    });

    if (!record) return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });

    if (new Date() > record.expiresAt) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // 2️⃣ Update user verified status
    await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    // 3️⃣ Delete OTP
    await prisma.oTP.deleteMany({ where: { email } });

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}