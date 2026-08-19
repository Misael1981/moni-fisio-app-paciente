import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VideoPlayer } from "./components/VideoPlayer"
import { getOptimizedVideoUrl } from "@/lib/cloudinary-url"
import { PrescriptionType } from "../VideoGrid"

type ModalPlayVideoProps = {
  prescription: PrescriptionType
  isOpen: boolean
  onClose: () => void
}

const ModalPlayVideo = ({
  prescription,
  isOpen,
  onClose,
}: ModalPlayVideoProps) => {
  if (!prescription.video) return null

  const videoSrc = getOptimizedVideoUrl(
    prescription.video.cloudinaryPublicId,
    prescription.video.url,
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] w-100 max-w-[95%] flex-col gap-3 overflow-y-auto rounded-md p-0 shadow-md sm:max-w-sm md:p-4">
        <DialogTitle className="sr-only">{prescription.video.name}</DialogTitle>

        <VideoPlayer
          src={videoSrc}
          poster={prescription.video.thumbnailUrl}
          key={prescription.video.id}
          videoDate={prescription.video.createdAt}
          videoDescription={prescription.video.description}
          videoTitle={prescription.video.name}
          prescription={prescription}
        />
      </DialogContent>
    </Dialog>
  )
}

export default ModalPlayVideo
