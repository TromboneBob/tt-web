<template>
    <div></div>
</template>

<script setup lang="ts">
const route = useRoute();
const project = await queryCollection("prosjekter").path(route.path).first();

const projectContent = project?.body;
const projectTitle = projectContent?.name ?? "Prosjekt ikke funnet";
const projectDescription = projectContent?.deliverable ?? projectContent?.description ?? "Prosjekt fra Tobias Torjusen.";
const projectImage = projectContent?.thumbnail ?? projectContent?.image ?? "/projects/iris.png";

useSeoMeta({
    title: project ? `${projectTitle} %separator Prosjekter` : projectTitle,
    description: projectDescription,
    ogTitle: projectTitle,
    ogDescription: projectDescription,
    ogImage: projectImage,
    twitterCard: "summary_large_image",
    robots: project ? "index, follow" : "noindex, nofollow",
});
</script>

<style scoped></style>
