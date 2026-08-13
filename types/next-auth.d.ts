import { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string
    mustChangePin: boolean
    tokenVersion: number
  }

  interface Session extends DefaultSession {
    user: {
      id: string
      role: string
      mustChangePin: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: string
    mustChangePin: boolean
    tokenVersion: number
    invalid?: boolean
  }
}
