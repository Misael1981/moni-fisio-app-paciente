"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import bcrypt from "bcrypt"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function changePinAction(newPin: string) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: "UNAUTHORIZED" }

  try {
    const pinHash = await bcrypt.hash(newPin, 10)

    await db.patientAuth.update({
      where: { patientId: session.user.id },
      data: { pinHash, mustChangePin: false },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Erro ao trocar PIN:", error)
    return { error: "UPDATE_FAILED" }
  }
}
