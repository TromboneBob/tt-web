<template>
    <NuxtLink class="flex items-end gap-4 group p-2 -m-2 rounded-lg" :to="project.body.url" target="_blank" external>
        <div class="max-w-sm">
            <h3 class="text-sm font-medium group-hover:text-primary-600">
                {{ project.title }}
            </h3>

            <p class="text-gray-400 text-sm">{{ project.body.deliverable }}</p>
        </div>
        <div class="flex-1 border-b border-dashed border-gray-300 dark:border-gray-800 group-hover:border-primary" />
        <UAvatar :src="project.body.thumbnail" :ui="{ root: 'rounded-sm z-10 relative' }" size="md"
            :alt="project.title" />
    </NuxtLink>
</template>

<script setup>
defineProps({
    project: {
        type: Object,
        required: true,
    },
});
</script>
