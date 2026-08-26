// Must match the <NuxtImg> usage in FotoGallery.vue so the browser reuses the
// prefetched response instead of downloading a second, differently-sized image.
const GALLERY_SIZES = "(max-width: 768px) 100vw, 620px";
// Only warm the first few above-the-fold images; the rest load lazily on scroll.
const PREFETCH_COUNT = 3;

type GalleryImage = {
  filename: string;
};

const prefetchedSessions = new Set<string>();

export const usePrefetchGallery = () => {
  const img = useImage();

  const prefetchGalleryImages = (
    sessionPath: string,
    images: readonly GalleryImage[],
  ) => {
    if (
      import.meta.server ||
      prefetchedSessions.has(sessionPath) ||
      images.length === 0
    ) {
      return;
    }

    // sessionPath is "/foto-sessions/martha-benjamin"; drop the leading slash
    // to reuse it as the public folder name.
    const folderName = sessionPath.replace(/^\//, "");

    images.slice(0, PREFETCH_COUNT).forEach((image) => {
      const src = `/${folderName}/${image.filename}`;
      // Generate the exact srcset NuxtImg will request (same src + sizes, default
      // modifiers) so the preload actually matches and isn't downloaded twice.
      const { srcset, sizes } = img.getSizes(src, { sizes: GALLERY_SIZES });

      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.setAttribute("imagesrcset", srcset);
      link.setAttribute("imagesizes", sizes);
      // Low priority so prefetching the next gallery never competes with the
      // current page's own requests.
      link.fetchPriority = "low";
      document.head.appendChild(link);
    });

    prefetchedSessions.add(sessionPath);
  };

  return {
    prefetchGalleryImages,
  };
};
