import SheetUser from "@/components/SheetUser"
import { PatientWithEvolutionsType } from "@/data/get-patient-data-by-id.queries"
import Image from "next/image"

type HeaderDashboardProps = {
  patient: PatientWithEvolutionsType | null
}

const HeaderDashboard = ({ patient }: HeaderDashboardProps) => {
  return (
    <header className="bg-cream flex w-full items-center justify-between gap-4 p-4">
      <Image
        src="/logo.svg"
        alt="Logo da Moni Fisioterapia"
        width={50}
        height={50}
      />

      <SheetUser patient={patient} />
    </header>
  )
}

export default HeaderDashboard
