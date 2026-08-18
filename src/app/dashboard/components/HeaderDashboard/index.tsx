import SheetUser from "@/components/SheetUser"
import Image from "next/image"

const HeaderDashboard = () => {
  return (
    <header className="bg-cream flex w-full items-center justify-between gap-4 p-4">
      <Image
        src="/logo.svg"
        alt="Logo da Moni Fisioterapia"
        width={50}
        height={50}
      />

      <SheetUser />
    </header>
  )
}

export default HeaderDashboard
