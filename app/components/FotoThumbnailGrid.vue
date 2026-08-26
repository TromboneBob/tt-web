<template>
    <div class="flex flex-wrap">
        <div
            v-for="image of thumbnails"
            :key="image.path"
            class="w-1/4 saturate-0 hover:saturate-100 transition-all"
        >
            <ULink
                to="/foto"
                :aria-label="`Se bilder fra ${image.name}`"
            >
                <img
                    :src="image.src"
                    :srcset="image.srcset"
                    sizes="(min-width: 640px) 160px, 25vw"
                    :alt="`Bilder fra ${image.name}`"
                    class="block aspect-square w-full object-cover"
                    width="160"
                    height="160"
                    loading="lazy"
                    decoding="async"
                >
            </ULink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { fotos } = useFotoCollection();

const thumbnails = computed(() =>
    fotos.value.map((image) => {
        const filename = image.thumbnail.split("/").at(-1) ?? image.thumbnail;
        const stem = filename.replace(/\.[^.]+$/, "");
        const base = `/generated/foto-thumbnails/${encodeURIComponent(stem)}`;

        return {
            ...image,
            src: `${base}-160.webp`,
            srcset: `${base}-160.webp 160w, ${base}-320.webp 320w`,
        };
    }),
);
</script>

<style scoped></style>
