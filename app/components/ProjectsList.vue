<template>
    <div>
        <h2 class="uppercase text-sm font-mono text-muted mb-6">
            Utvalgte prosjekter
        </h2>
        <div class="space-y-4">
            <AppProjectCard v-for="(project, id) in projects" :key="id" :project="project" />
        </div>
        <div class="flex items-center justify-center mt-6 text-sm">
            <UButton label="Alle prosjekter &rarr;" to="/prosjekter" variant="link" color="neutral" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { projects, pending, error } = useProjectCollection()
</script>
