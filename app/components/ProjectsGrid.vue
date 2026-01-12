<template>
    <div class="flex flex-col gap-4">
        <div v-for="(project, id) of projects" :key="id"
            class="border border-default p-2 rounded-xl shadow-xs relative">
            <ULink :to="project.body.url" :label="project.body.url" external target="_blank" class="relative z-10">
                <div>
                    <!-- <NuxtImg :src="project.body.image" class="rounded-lg aspect-3/2 object-cover" /> -->
                    <NuxtImg :src="project.body.image"
                        class="rounded-lg aspect-3/2 object-cover border border-default shadow-xs" />
                </div>
                <div class="flex md:flex-row flex-col justify-between md:items-center p-1 mt-1">
                    <h2 class="font-semibold">
                        {{ project.body.description }}
                    </h2>
                    <div class="text-muted text-sm mt-2 font-mono">
                        <p>{{ project.body.url }} &nearrow;
                        </p>
                    </div>
                </div>
            </ULink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { projects, pending, error } = useProjectCollection()

</script>

<style scoped></style>
