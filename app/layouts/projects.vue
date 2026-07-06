<template>
    <UPage class="mt-42 px-8">
        <template #left>
            <div class="sticky top-0 bg-red-100">
                <div class="flex flex-row gap-2">
                    <UAvatar :src="project?.thumbnail" :ui="{ root: 'rounded-sm z-10 relative' }" size="sm"
                        :alt="project?.name" />
                    <h1 class="font-medium text-lg">{{ project?.name }}</h1>
                </div>

            </div>
        </template>

        <div class="h-dvh bg-green-100">
            <slot />
        </div>
        <template #right>
            <div class="sticky top-0 bg-blue-100">
                <div class="grid grid-cols-1 gap-2 p-4 ">

                    <ULink v-for="item in data[0].children" :key="item.id" class="flex flex-row gap-2" :to="item.path"
                        activeClass="font-medium text-black">
                        <UAvatar :src="item.thumbnail" :ui="{ root: 'rounded-sm z-10 relative' }" size="2xs"
                            :alt="item.title" class="transition-opacity"
                            :class="route.path === item.path ? 'opacity-100 ' : 'opacity-0'" />
                        <h2 class="transition-transform" :class="route.path === item.path ? '' : '-translate-x-7'">{{
                            item.title }}</h2>
                    </ULink>
                </div>
            </div>
        </template>
    </UPage>
</template>

<script setup lang="ts">

const route = useRoute();

const { data: project } = await useAsyncData(
    () => `prosjekt-${route.path}`,
    () => queryCollection("prosjekter").path(route.path).first(),
    { watch: [() => route.path] }
);

const { data } = await useAsyncData('navigation', () => {
    return queryCollectionNavigation('prosjekter', ['description', 'thumbnail'])
});

</script>

<style scoped></style>
