<script setup lang="ts">
const route = useRoute();

// Use queryCollection directly instead of useAsyncData
// This works both during prerendering AND client-side hydration
const page = await queryCollection("fotoSessions").path(route.path).first();
const withLeadingSlash = (path?: null | string) => path ? (path.startsWith("/") ? path : `/${path}`) : undefined;
const pageTitle = page?.name ? `${page.name} %separator Foto` : "Bildegalleri ikke funnet";
const pageDescription = [
    page?.description,
    page?.location ? `Fotografert på ${page.location}.` : undefined,
].filter(Boolean).join(" ") || "Bildegalleri fra Tobias Torjusen.";
const pageImage = withLeadingSlash(page?.thumbnail) ?? "/foto-sessions/thumbnails/iris.jpg";

useSeoMeta({
    title: pageTitle,
    description: pageDescription,
    ogTitle: page?.name ?? "Bildegalleri",
    ogDescription: pageDescription,
    ogImage: pageImage,
    twitterCard: "summary_large_image",
    robots: page ? "index, follow" : "noindex, nofollow",
});

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
