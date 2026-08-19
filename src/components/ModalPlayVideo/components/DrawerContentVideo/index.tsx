import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { PrescriptionType } from "@/components/VideoGrid"

type DrawerContentVideoProps = {
  videoTitle: string
  videoDescription: string | null
  videoDate: Date
  isOpen: boolean
  onClose: () => void
  prescription: PrescriptionType
}

const DrawerContentVideo = ({
  videoDate,
  videoDescription,
  videoTitle,
  isOpen,
  onClose,
  prescription,
}: DrawerContentVideoProps) => {
  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[70vh] border-0 sm:inset-x-auto! sm:left-1/2! sm:w-full! sm:max-w-md! sm:-translate-x-1/2! sm:rounded-2xl!">
        <DrawerHeader>
          <DrawerTitle>{videoTitle}</DrawerTitle>
          <DrawerDescription>
            {new Date(videoDate).toLocaleDateString("pt-BR")}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="flex w-full flex-wrap gap-2">
            {prescription.sets != null && (
              <Badge variant="secondary">{prescription.sets} séries</Badge>
            )}

            {prescription.reps != null && (
              <Badge variant="secondary">{prescription.reps} reps</Badge>
            )}

            {prescription.holdTimeSec != null && (
              <Badge variant="secondary">{prescription.holdTimeSec}s</Badge>
            )}

            {prescription.frequency && (
              <Badge variant="outline">{prescription.frequency}</Badge>
            )}
          </div>

          {videoDescription && (
            <p className="text-sm whitespace-pre-line">{videoDescription}</p>
          )}
        </div>

        <DrawerFooter>
          <DrawerClose render={<Button variant="destructive">Fechar</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DrawerContentVideo
