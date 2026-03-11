import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
  }
}
// ```

// ---

// **What this does:**
// ```
// Tells TypeScript:
// "Hey NextAuth User has a role field"
// "Hey NextAuth Session has a role field"
// "Hey NextAuth JWT has a role field"