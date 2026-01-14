<script setup lang="ts">
const route = useRoute();

// Use queryCollection directly instead of useAsyncData
// This works both during prerendering AND client-side hydration
const page = await queryCollection("fotoSessions").path(route.path).first();

const photos = computed(() =>
    page?.images?.map(img => ({
        ...img,
        src: `/foto-sessions/${route.params.id}/${img.filename}`
    })) ?? []
)

const surround = await queryCollectionItemSurroundings("fotoSessions", `/foto-sessions/${route.params.id}`, {
    fields: ["description"],
});
</script>

<template>
    <div v-if="page">
        <UButton to="/foto" label="Alle bilder" icon="i-solar:arrow-left-linear" variant="link" color="neutral" />
        <ContentRenderer :value="page" class="markdown mt-8" />
        <FotoGallery :photos="photos" />
        <UContentSurround :surround="surround" class="mt-8" />
    </div>
    <div v-else>
        <p>Foto session not found</p>
    </div>
</template>
