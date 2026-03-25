import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateOTP } from "@/lib/otp";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      if (existingUser.isVerified) {
        // Verified user already exists → block registration
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
      } else {
        // Unverified user exists → delete old entry so we can re-register
        await prisma.user.delete({ where: { email } });
        await prisma.oTP.deleteMany({ where: { email } }); // remove old OTP
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with isVerified = false
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        isVerified: false,
      },
    });

    // Generate OTP and save in DB
    const otp = generateOTP();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);

    await prisma.oTP.create({ data: { email, otp, expiresAt } });

    // Send OTP email
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    }); 

    await transporter.sendMail({
      from: `"Job Board" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for Job Board registration",
      text: `Hi ${name},\n\nYour OTP is: ${otp}\nIt expires in 10 minutes.`,
    });

    return NextResponse.json({ message: "OTP sent to email" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
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
