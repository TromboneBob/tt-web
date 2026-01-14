// plugins/prefetch-sessions.ts
export default defineNuxtPlugin(async () => {
  const { initializeSessions } = usePrefetchGallery()
  await initializeSessions()
})
