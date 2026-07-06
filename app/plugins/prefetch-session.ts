// plugins/prefetch-sessions.ts
export default defineNuxtPlugin(() => {
  const { initializeSessions } = usePrefetchGallery()
  // Fire-and-forget: this only feeds hover prefetching, so don't block hydration
  // on the full collection query.
  initializeSessions()
})
