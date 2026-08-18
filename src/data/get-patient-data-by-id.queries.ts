import { db } from "@/lib/prisma"
import { Prisma } from "@misael1981/physio-database"

export async function getPatientWithEvolutions(patientId: string) {
  try {
    const patient = await db.patient.findUnique({
      where: { id: patientId },
      select: {
        id: true,
        name: true,
        nickname: true,
        avatarUrl: true,
        phone: true,
        cpf: true,
        // Traz as evoluções direto dentro do paciente
        evolution: {
          orderBy: { createdAt: "desc" },
          include: {
            prescriptions: {
              include: {
                video: true,
              },
            },
          },
        },
      },
    })

    return patient
  } catch (error) {
    console.error("Erro ao buscar prontuário do paciente:", error)
    return null
  }
}

// Tipagem simples para essa opção
export type PatientWithEvolutionsType = Prisma.PatientGetPayload<{
  select: {
    id: true
    name: true
    nickname: true
    avatarUrl: true
    phone: true
    cpf: true
    evolution: {
      include: {
        prescriptions: {
          include: {
            video: true
          }
        }
      }
    }
  }
}>
