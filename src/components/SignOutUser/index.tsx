"use client"

import { signOut } from "next-auth/react"
import { Button } from "../ui/button"

const SignOutUser = () => {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/login" })}
      variant="destructive"
    >
      Sair da conta
    </Button>
  )
}

export default SignOutUser
