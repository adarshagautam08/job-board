
import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
//always take this 5 files
//-lib/auth.ts
//-app/api/auth/[...nextauth]/route.ts
//-component/provider.ts
//-.env file with nextauth secret
//-prisma shortcut setup in the lib/prisma.ts so that we can use it globally 
