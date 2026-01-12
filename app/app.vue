<template>
    <UApp>
        <ClientOnly>
            <NavigationBar />
        </ClientOnly>
        <UMain>
            <NuxtLayout :name="layout">
                <NuxtPage />
            </NuxtLayout>
        </UMain>

        <MainFooter />
    </UApp>
</template>

<script setup lang="ts">
const layout = "standard";
await preloadComponents('NavigationBar', 'ClientOnly')
defineOgImageComponent('TestOg', {
    title: 'Tobias Torjusen',
    description: 'Foto - design - utvikling',
    logo: '/logo.png'

})

</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: all 0.2s;
}

.page-leave-to {
    opacity: 0;
    transform: translateY(-5px);
}

.page-enter-from {
    opacity: 0;
    transform: translateY(5px);
}
</style>
