import { Badge } from "@/components/ui/badge"
import { VideoCard } from "../VideoCard"

export type VideoType = {
  cloudinaryPublicId: string | null
  url: string
  createdAt: Date
  description: string | null
  id: string
  name: string
  updatedAt: Date
  category: string | null
  durationSeconds: number | null
  thumbnailUrl: string | null
}

export type PrescriptionType = {
  id: string
  createdAt: Date
  updatedAt: Date
  patientId: string
  isActive: boolean
  videoId: string
  evolutionId: string | null
  order: number
  sets: number | null
  reps: number | null
  holdTimeSec: number | null
  frequency: string | null
  video: VideoType
}

type VideoGridProps = {
  prescriptions: PrescriptionType[]
}

const VideoGrid = ({ prescriptions }: VideoGridProps) => {
  return (
    <section className="bg-background space-y-4">
      <div className="flex w-full items-center justify-between gap-4 lg:justify-center">
        <h2 className="font-heading text-lg font-semibold lg:text-xl">
          Lista de vídeos treinos
        </h2>

        <Badge variant="outline">{prescriptions?.length}</Badge>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        {prescriptions?.map((prescription) => (
          <VideoCard key={prescription.id} prescription={prescription} />
        ))}
      </div>
    </section>
  )
}

export default VideoGrid
