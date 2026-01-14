export const usePrefetchGallery = () => {
  const prefetchedSessions = useState<Set<string>>('prefetchedSessions',
    () => new Set<string>()
  )

  const sessionsData = useState<Map<string, any>>('sessionsData',
    () => new Map()
  )

  let isLoadingData = false

  const initializeSessions = async () => {
    if (sessionsData.value.size > 0 || isLoadingData) return

    isLoadingData = true
    try {
      const allSessions = await queryCollection("fotoSessions").all()

      allSessions.forEach(session => {
        // Use path as the session ID (e.g., "/foto-sessions/martha-benjamin")
        const sessionId = session.path
        sessionsData.value.set(sessionId, session)
      })

      console.log(`✅ Loaded ${allSessions.length} sessions`)
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      isLoadingData = false
    }
  }

  const prefetchGalleryImages = (sessionPath: string) => {
    if (prefetchedSessions.value.has(sessionPath)) {
      console.log(`⏭️ Already prefetched ${sessionPath}`)
      return
    }

    const imageMetadata = sessionsData.value.get(sessionPath)
    if (!imageMetadata?.images) {
      console.warn(`No images found for ${sessionPath}`)
      return
    }

    // Construct path: sessionPath is "/foto-sessions/martha-benjamin"
    // Remove leading slash and use as folder name
    const folderName = sessionPath.replace(/^\//, '')

    imageMetadata.images.forEach((img) => {
      const imageUrl = `/${folderName}/${img.filename}`

      const link = document.createElement('link')
      link.rel = 'prefetch'
      link.as = 'image'
      link.href = imageUrl
      document.head.appendChild(link)
    })

    prefetchedSessions.value.add(sessionPath)
    console.log(`✅ Prefetched ${imageMetadata.images.length} images for ${sessionPath}`)
  }

  return {
    initializeSessions,
    prefetchGalleryImages
  }
}
