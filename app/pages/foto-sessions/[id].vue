<script setup lang="ts">
definePageMeta({
    layout: 'standard',
});

const route = useRoute();
const { sessionsData } = usePrefetchGallery();

// On client navigation the session is already in the prefetched cache, so we can
// render instantly without re-querying the content DB. On the server (cache empty
// during prerender/initial load) we fall back to a direct query.
const cached = sessionsData.value.get(route.path);
const page = cached ?? (await queryCollection("fotoSessions").path(route.path).first());
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

// Lazy so it never blocks the page transition — it renders below the gallery.
const { data: surround } = useLazyAsyncData(`surround-${route.path}`, () =>
    queryCollectionItemSurroundings("fotoSessions", `/foto-sessions/${route.params.id}`, {
        fields: ["description"],
    }),
);
</script>

<template>
    <div v-if="page">
        <UButton to="/foto" label="Alle bilder" icon="i-solar:arrow-left-linear" variant="link" color="neutral" />
        <ContentRenderer :value="page" class="markdown mt-8" />
        <FotoGallery :photos="photos" />
        <UContentSurround v-if="surround" :surround="surround" class="mt-8" />
    </div>
    <div v-else>
        <p>Foto session not found</p>
    </div>
</template>
