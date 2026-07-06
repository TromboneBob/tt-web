<template>
    <div class="grid grid-cols-1 gap-4">
        <div v-for="(photo, id) in props.photos" :key="id">
            <div class="flex flex-col items-center w-full">
                <NuxtImg :src="photo.src" :height="photo.height" :width="photo.width" :style="{
                    aspectRatio: `${photo.width} / ${photo.height}`
                }" sizes="(max-width: 768px) 100vw, 620px" alt="Thumbnail" class="rounded-lg object-cover w-full" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    photos: {
        type: Object,
        required: true,
    },
    gap: {
        type: Boolean,
        required: false,
    }
});


</script>

<style scoped></style>
