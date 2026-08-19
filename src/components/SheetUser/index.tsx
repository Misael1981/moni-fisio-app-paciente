"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BiMenuAltRight } from "react-icons/bi"
import SignOutUser from "../SignOutUser"
import { PatientWithEvolutionsType } from "@/data/get-patient-data-by-id.queries"
import { todayFormatted } from "@/helpers/today-formatted"

type SheetUserProps = {
  patient: PatientWithEvolutionsType | null
}

const SheetUser = ({ patient }: SheetUserProps) => {
  const displayName =
    patient?.nickname || patient?.name?.split(" ")[0] || "Paciente"

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon-lg">
            <BiMenuAltRight className="text-blue-custom size-8" />
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Olá, {displayName}!</SheetTitle>
          <SheetDescription>{todayFormatted}</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4"></div>
        <SheetFooter>
          <SignOutUser />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default SheetUser
