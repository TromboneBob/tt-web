<template>
    <div class="flex flex-wrap">
        <div v-for="(image, id) of fotos" :key="id" class="w-1/5 saturate-0 hover:saturate-100 transition-all">
            <ULink to="/foto">
                <NuxtImg :src="image.thumbnail" class="aspect-square object-cover" quality="50" width="128"
                    height="128" />
            </ULink>
        </div>
    </div>
</template>

<script setup lang="ts">
const { fotos, pending, error } = useFotoCollection()


</script>

<style scoped></style>
