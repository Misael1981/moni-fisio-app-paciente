import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import HeaderDashboard from "./components/HeaderDashboard"
import { getPatientWithEvolutions } from "@/data/get-patient-data-by-id.queries"
import { Calendar, CirclePlay, ClipboardList, Clock } from "lucide-react"
import { formatDate } from "@/helpers/format-date"
import StatCard from "./components/StatCard"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const [patient] = await Promise.all([
    getPatientWithEvolutions(session.user.id),
  ])

  const displayName =
    patient?.nickname || patient?.name?.split(" ")[0] || "Paciente"

  return (
    <div>
      <HeaderDashboard />
      <section className="text-blue-custom py-2 text-center font-semibold">
        <h1 className="font-fancy text-2xl">Letícia Moni Fisio</h1>
        <p className="text-sm"> App do Paciente</p>
      </section>
      <div className="space-y-4 px-4">
        <section className="bg-card rounded-lg py-4 shadow-sm">
          <h2 className="text-blue-custom text-2xl font-bold tracking-tight">
            Olá, {displayName}!
          </h2>

          <p className="text-muted-foreground text-sm">
            Cuidar da sua saúde é um passo de cada vez.
          </p>
        </section>

        <div className="space-y-4">
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <StatCard
              icon={<Calendar className="text-blue-custom h-5 w-5" />}
              title="Última sessão"
              value={formatDate(patient?.evolution[0].createdAt) || "N/A"}
            />
            <StatCard
              icon={<ClipboardList className="text-blue-custom h-5 w-5" />}
              title="Exercícios"
              value={patient?.evolution[0].prescriptions.length ?? 0}
            />
            <StatCard
              icon={<Clock className="text-blue-custom h-5 w-5" />}
              title="Tempo Total"
              value="48 min"
            />
          </section>
          <div className="flex justify-center">
            <Button className="w-full max-w-md text-lg" size="lg">
              <CirclePlay className="size-5" />
              Iniciar Exercícios
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
