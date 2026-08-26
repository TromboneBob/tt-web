<template>
    <div class="grid grid-cols-1 gap-4">
        <div v-for="(photo, index) in props.photos" :key="photo.src">
            <div class="flex flex-col items-center w-full">
                <NuxtImg
                    :src="photo.src"
                    :height="photo.height"
                    :width="photo.width"
                    :style="{
                        aspectRatio: `${photo.width} / ${photo.height}`,
                    }"
                    sizes="(max-width: 768px) 100vw, 620px"
                    alt="Thumbnail"
                    class="rounded-lg object-cover w-full"
                    :preload="index < 2"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
type GalleryPhoto = {
    src: string;
    filename: string;
    span: number;
    width: number;
    height: number;
};

const props = defineProps<{
    photos: GalleryPhoto[];
    gap?: boolean;
}>();
</script>

<style scoped></style>
