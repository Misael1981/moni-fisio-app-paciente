"use client"

import Image from "next/image"
import { Clock3, Play } from "lucide-react"
import { useState } from "react"
import ModalPlayVideo from "../ModalPlayVideo"
import { PrescriptionType } from "../VideoGrid"

type VideoCardProps = {
  prescription: PrescriptionType
}

export function VideoCard({ prescription }: VideoCardProps) {
  const [isOpenModalPlayVideo, setOpenModalPlayVideo] = useState(false)

  const handleOpenModalPlayVideo = () => {
    setOpenModalPlayVideo(true)
  }

  return (
    <article className="group bg-background w-75 max-w-[95%] overflow-hidden rounded-xl border transition hover:shadow-md">
      <div
        className="aspect relative h-60 w-full overflow-hidden bg-(--color-cream)"
        onClick={handleOpenModalPlayVideo}
      >
        <Image
          src={prescription.video?.thumbnailUrl || "/logo.svg"}
          alt={prescription.video?.name || "Capa do Video Treino"}
          fill
          className="object-contain p-2 transition duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover/btn:bg-black/40">
          <div className="text-primary flex h-12 w-12 items-center justify-center rounded-full bg-white/10 shadow-lg transition-transform duration-300 group-hover/btn:scale-110 group-hover/btn:bg-white">
            {/* Ícone de Play (Lucide React) */}
            <Play className="ml-1 h-6 w-6 fill-current" />
          </div>
        </div>
      </div>

      <div className="space-y-3 p-3">
        <div>
          <h3 className="line-clamp-2 font-medium">
            {prescription.video?.name}
          </h3>

          <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs">
            {prescription.video?.category && (
              <span>{prescription.video?.category}</span>
            )}

            {prescription.video?.durationSeconds && (
              <>
                <span>•</span>

                <span className="flex items-center gap-1">
                  <Clock3 className="size-3" />
                  {Math.floor(prescription.video?.durationSeconds / 60)}:
                  {(prescription.video?.durationSeconds % 60)
                    .toString()
                    .padStart(2, "0")}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <ModalPlayVideo
        prescription={prescription}
        isOpen={isOpenModalPlayVideo}
        onClose={() => setOpenModalPlayVideo(false)}
      />
    </article>
  )
}
