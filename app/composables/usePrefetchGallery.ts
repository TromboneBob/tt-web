// Must match the <NuxtImg> usage in FotoGallery.vue so the browser reuses the
// prefetched response instead of downloading a second, differently-sized image.
const GALLERY_SIZES = '(max-width: 768px) 100vw, 620px'
// Only warm the first few above-the-fold images; the rest load lazily on scroll.
const PREFETCH_COUNT = 3

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
    } catch (error) {
      console.error('Error loading sessions:', error)
    } finally {
      isLoadingData = false
    }
  }

  const prefetchGalleryImages = (sessionPath: string) => {
    if (prefetchedSessions.value.has(sessionPath)) return

    const imageMetadata = sessionsData.value.get(sessionPath)
    if (!imageMetadata?.images) {
      console.warn(`No images found for ${sessionPath}`)
      return
    }

    // sessionPath is "/foto-sessions/martha-benjamin"; drop the leading slash
    // to reuse it as the public folder name.
    const folderName = sessionPath.replace(/^\//, '')
    const img = useImage()

    imageMetadata.images.slice(0, PREFETCH_COUNT).forEach((image: { filename: string }) => {
      const src = `/${folderName}/${image.filename}`
      // Generate the exact srcset NuxtImg will request (same src + sizes, default
      // modifiers) so the preload actually matches and isn't downloaded twice.
      const { srcset, sizes } = img.getSizes(src, { sizes: GALLERY_SIZES })

      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.setAttribute('imagesrcset', srcset)
      link.setAttribute('imagesizes', sizes)
      // Low priority so prefetching the next gallery never competes with the
      // current page's own requests.
      link.fetchPriority = 'low'
      document.head.appendChild(link)
    })

    prefetchedSessions.value.add(sessionPath)
  }

  return {
    initializeSessions,
    prefetchGalleryImages,
    sessionsData
  }
}
