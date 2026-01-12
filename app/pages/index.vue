<template>
    <div>
        <div class="space-y-6">
            <NuxtImg src="/TLT_1813.jpg" alt="Tobias Torjusen"
                class="rounded-md aspect-square size-40 object-cover mb-12" />
            <div>

                <h1 class="text-xl font-medium text-gray-800 dark:text-gray-100">
                    <span class="tracking-tight">Fotograf</span> - <span
                        class="font-mono text-primary-700">Webutvikler</span> - <span class="font-serif italic">kreativ
                        sjel</span>
                </h1>

            </div>
            <p class="text-gray-900 dark:text-gray-400">
                Hei! Jeg heter Tobias og jeg elsker å være kreativ. Jeg jobber med
                foto, video, webutvikling og design, og jeg brenner for å skape
                løsninger som både fungerer og ser bra ut. Uansett medium
                handler det om å fortelle gode historier og levere arbeid som
                gjør en reell forskjell. Her finner du noen av mine prosjekter
                og tanker rundt kreativt arbeid.
            </p>
            <p class="text-gray-900 dark:text-gray-400">
                Til daglig jobber jeg på
                <NuxtLink to="https://www.salmoneye.no"
                    class="underline hover:text-primary transition-colors font-mono tracking-tighter">Salmon
                    Eye &nearrow;</NuxtLink>, der jeg får holde på
                med alt fra innholdsproduksjon til
                systemutvikling.
            </p>
        </div>

        <div class="my-24" />
        <div class="space-y-6">
            <!-- <h2 class="text-lg font-medium tracking-tight text-gray-800 dark:text-gray-100">
                Interessert i foto?
            </h2> -->
            <FotoThumbnailGrid />
            <UButton label="Se bilder &rarr;" variant="link" color="neutral" to="/foto"
                class="hover:text-primary transition-colors" />
            <!-- <p class="text-gray-900 dark:text-gray-400">
                Jeg liker å ta bilder. Både for meg selv og for andre. Det er
                noe nesten magisk ved å fange øyeblikk. Fryse dem i tiden, og
                bevare stemningen og alle følelsene.
            </p> -->
        </div>

        <div class="my-24" />
        <ProjectsList />
    </div>
</template>
as

<script setup>
useSeoMeta({
    title: "Hjem",
    description: "",
});
</script>
