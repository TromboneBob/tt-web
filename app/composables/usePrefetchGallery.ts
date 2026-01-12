export const usePrefetchGallery = () => {
  const prefetchedSessions = ref(new Set())


  const prefetchGalleryImages = async (sessionId: string) => {

    // Avoid refetching
    if (prefetchedSessions.value.has(sessionId)) return

    try {


      const imageMetadata = await queryCollection("fotoSessions").where('id', '=', sessionId).first()


      const imageFolderPath = imageMetadata?.path

      if (imageMetadata?.images) {
        // Create prefetch links for each image
        imageMetadata.images.forEach((img) => {
          const link = document.createElement('link')
          link.rel = 'prefetch'
          link.as = 'image'
          link.href = `${imageFolderPath}/${img.filename}`
          document.head.appendChild(link)
        })

        prefetchedSessions.value.add(sessionId)
        // console.log(`✅ Prefetched ${imageMetadata.images.length} images for ${sessionId}`)
      }
    } catch (error) {
      console.error('Error prefetching images:', error)
    }
  }

  return {
    prefetchGalleryImages
  }
}
