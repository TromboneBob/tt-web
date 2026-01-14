<template>
    <NuxtLink :to="session.path" class="mb-0" @mouseenter="prefetchGalleryImages(session.path)">
        <div class="flex flex-col items-center w-full">
            <NuxtImg :src="session.thumbnail" alt="Thumbnail" class="rounded-lg aspect-square object-cover w-full"
                quality="50" width="600" />
            <div class="flex flex-row justify-between items-center w-full mt-2">
                <div class="mt-1">
                    <h2 class="font-bold">{{ session.name }}</h2>
                    <h2 class="text-sm text-muted">{{ session.location }}</h2>
                </div>
                <div class="flex flex-col gap-1 items-end">
                    <UBadge v-if="session.occasion" variant="subtle" class="rounded-full" color="neutral" size="sm">{{
                        session.occasion }}</UBadge>
                    <UBadge v-if="session.timeOfYear" variant="subtle" class="rounded-full" :color="timeOfYearColor"
                        size="sm">{{
                            session.timeOfYear }}</UBadge>
                </div>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
const { prefetchGalleryImages } = usePrefetchGallery()

const props = defineProps({
    session: {
        type: Object,
        required: true,
    },
});

const timeOfYearColor = computed(() => {
    switch (props.session.timeOfYear) {
        case 'Vinter':
            return 'winter';
        case 'Vår':
            return 'spring';
        case 'Sommer':
            return 'summer';
        case 'Høst':
            return 'autumn';
        default:
            return 'neutral';
    }
});
</script>
