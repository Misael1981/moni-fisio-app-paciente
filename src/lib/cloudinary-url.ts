export function getOptimizedVideoUrl(
  publicId: string | null,
  fallbackUrl: string,
) {
  if (!publicId) return fallbackUrl

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}`
}
