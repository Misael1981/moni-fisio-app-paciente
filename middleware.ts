import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  const isLoggedIn = Boolean(token) && !token?.invalid
  const isAuthPage = pathname === "/login"
  const isChangePinPage = pathname === "/trocar-pin"

  // Não logado tentando acessar área protegida
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Logado tentando acessar /login de novo
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // Logado, mas precisa trocar PIN, e tá tentando ir pra outro lugar
  if (isLoggedIn && token?.mustChangePin && !isChangePinPage) {
    return NextResponse.redirect(new URL("/trocar-pin", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
