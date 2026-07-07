<template>
    <div class="h-dvh">Main content</div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "projects",
});

const route = useRoute();

const { data: project } = await useAsyncData(
    () => `prosjekt-${route.path}`,
    () => queryCollection("prosjekter").path(route.path).first(),
);

const projectTitle = computed(
    () => project.value?.name ?? "Prosjekt ikke funnet",
);
const projectDescription = computed(
    () =>
        project.value?.deliverable ??
        project.value?.description ??
        "Prosjekt fra Tobias Torjusen.",
);
const projectImage = computed(
    () =>
        project.value?.thumbnail ??
        project.value?.image ??
        "/projects/iris.png",
);

useSeoMeta({
    title: () =>
        project.value
            ? `${projectTitle.value} %separator Prosjekter`
            : projectTitle.value,
    description: projectDescription,
    ogTitle: projectTitle,
    ogDescription: projectDescription,
    ogImage: projectImage,
    twitterCard: "summary_large_image",
    robots: () => (project.value ? "index, follow" : "noindex, nofollow"),
});
</script>

<style scoped></style>
