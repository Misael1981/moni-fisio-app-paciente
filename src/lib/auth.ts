import { NextAuthOptions } from "next-auth"
import { db } from "./prisma"
import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 90 * 24 * 60 * 60, // 90 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Paciente",
      credentials: {
        cpf: { label: "CPF", type: "text" },
        pin: { label: "PIN", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.cpf || !credentials.pin) {
          return null
        }

        const cleanCpf = credentials.cpf.replace(/\D/g, "")

        const patient = await db.patient.findUnique({
          where: { cpf: cleanCpf },
          include: { auth: true },
        })

        if (!patient || !patient.auth) return null

        const { auth } = patient

        if (auth.lockedUntil && auth.lockedUntil > new Date()) {
          throw new Error("ACCOUNT_LOCKED")
        }

        const isValid = await bcrypt.compare(credentials.pin, auth.pinHash)

        if (!isValid) {
          await db.patientAuth.update({
            where: { patientId: patient.id },
            data: {
              failedAttempts: { increment: 1 },
              lockedUntil:
                auth.failedAttempts + 1 >= 5
                  ? new Date(Date.now() + 15 * 60 * 1000)
                  : null,
            },
          })
          return null
        }

        await db.patientAuth.update({
          where: { patientId: patient.id },
          data: {
            failedAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          },
        })

        return {
          id: patient.id,
          role: "patient",
          name: patient.name,
          mustChangePin: auth.mustChangePin,
          tokenVersion: auth.tokenVersion,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Login recém-feito: popula o token com os dados do authorize()
      if (user) {
        token.id = user.id
        token.role = user.role
        token.mustChangePin = user.mustChangePin
        token.tokenVersion = user.tokenVersion
        return token
      }

      // Requisições seguintes: revalida contra o banco (permite revogação)
      if (token.role === "patient") {
        const auth = await db.patientAuth.findUnique({
          where: { patientId: token.id as string },
          select: { tokenVersion: true, mustChangePin: true },
        })

        // Conta deletada ou versão diferente = sessão inválida
        if (!auth || auth.tokenVersion !== token.tokenVersion) {
          return { ...token, invalid: true }
        }

        token.mustChangePin = auth.mustChangePin
      }

      return token
    },
    async session({ session, token }) {
      if (token.invalid) {
        return { ...session, user: undefined, expires: session.expires }
      }

      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.mustChangePin = token.mustChangePin as boolean
      }

      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
