import { db } from "@/lib/prisma"
import { Prisma } from "@misael1981/physio-database"

export async function getEvolutionsByPatientId(id: string) {
  try {
    const evolutions = await db.evolution.findMany({
      where: { patientId: id },
      orderBy: { createdAt: "desc" },
      include: {
        prescriptions: {
          include: {
            video: true,
          },
        },
      },
    })

    return evolutions
  } catch (error) {
    console.error("Erro ao buscar sessões do paciente:", error)
    return null
  }
}

export type EvolutionsType = Prisma.EvolutionGetPayload<{
  include: {
    prescriptions: {
      include: {
        video: true
      }
    }
  }
}>
