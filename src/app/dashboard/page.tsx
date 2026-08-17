import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null // middleware já garante isso, é só type-safety

  const evolutions = await db.evolution.findMany({
    where: { patientId: session.user.id },
    orderBy: { createdAt: "desc" },
  })

  return <div>{/* renderiza os exercícios do paciente */}</div>
}
