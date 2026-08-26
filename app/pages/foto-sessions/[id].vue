<script setup lang="ts">
definePageMeta({
    layout: "standard",
});

const route = useRoute();
const sessionPath = computed(() => route.path);
const { data: page } = await useAsyncData(
    () => `foto-session:${sessionPath.value}`,
    () => queryCollection("fotoSessions").path(sessionPath.value).first(),
);

const withLeadingSlash = (path?: null | string) =>
    path ? (path.startsWith("/") ? path : `/${path}`) : undefined;
const pageTitle = computed(() =>
    page.value?.name
        ? `${page.value.name} %separator Foto`
        : "Bildegalleri ikke funnet",
);
const pageDescription = computed(
    () =>
        [
            page.value?.description,
            page.value?.location
                ? `Fotografert på ${page.value.location}.`
                : undefined,
        ]
            .filter(Boolean)
            .join(" ") || "Bildegalleri fra Tobias Torjusen.",
);
const pageImage = computed(
    () =>
        withLeadingSlash(page.value?.thumbnail) ??
        "/foto-sessions/thumbnails/iris.jpg",
);

useSeoMeta({
    title: () => pageTitle.value,
    description: () => pageDescription.value,
    ogTitle: () => page.value?.name ?? "Bildegalleri",
    ogDescription: () => pageDescription.value,
    ogImage: () => pageImage.value,
    twitterCard: "summary_large_image",
    robots: () => (page.value ? "index, follow" : "noindex, nofollow"),
});

const photos = computed(() =>
    page.value?.images?.map((img) => ({
        ...img,
        src: `${sessionPath.value}/${img.filename}`,
    })) ?? [],
);

// Lazy so it never blocks the page transition — it renders below the gallery.
const { data: surround } = useLazyAsyncData(
    () => `surround:${sessionPath.value}`,
    () =>
        queryCollectionItemSurroundings("fotoSessions", sessionPath.value, {
            fields: ["description"],
        }),
);
</script>

<template>
    <div v-if="page">
        <UButton
            to="/foto"
            label="Alle bilder"
            icon="i-solar:arrow-left-linear"
            variant="link"
            color="neutral"
        />
        <ContentRenderer :value="page" class="markdown mt-8" />
        <FotoGallery :photos="photos" />
        <UContentSurround
            v-if="surround"
            :surround="surround"
            class="mt-8"
        />
    </div>
    <div v-else>
        <p>Foto session not found</p>
    </div>
</template>
