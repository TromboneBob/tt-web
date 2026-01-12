<template>
    <div>
        <UButton to="/foto" label="Alle bilder" icon="i-solar:arrow-left-linear" variant="link" color="neutral" />

        <ContentRenderer :value="page" class="markdown mt-8" />

        <FotoGallery :photos="photos" />
        <UContentSurround :surround="surround as any" class="mt-8" />
    </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(
    route.path,
    () => {
        return queryCollection("fotoSessions").path(route.path).first();
    },
    {
        lazy: false,
        default: () => null,
    },
);

const photos = computed(() =>
    page.value?.images?.map(img => ({
        ...img,
        src: `/foto-sessions/${route.params.id}/${img.filename}`
    })) ?? []
)

const { data: surround } = await useAsyncData(`/foto-sessions/${route.params.id}-surround`, () => {
    return queryCollectionItemSurroundings("fotoSessions", `/foto-sessions/${route.params.id}`, {
        fields: ["description"],
    });
});
</script>

<style scoped></style>
