<template>
    <div>
        <div class="space-y-6">
            <h1 class="text-xl font-mono tracking-tight text-gray-800 dark:text-gray-100">
                Prosjekter
            </h1>

            <p class="text-gray-900 dark:text-gray-400">
                Jeg elsker å finne kreative løsninger som både formidler på en god måte, og som ser fine ut. Under er et
                utvalg prosjekter jeg har jobbet med den siste tiden.
            </p>
            <UPageCard title="Har du et prosjekt på gang?"
                description="Jeg vil veldig gjerne høre mer om ditt prosjekt, og hvordan vi kan bygge sammen."
                icon="i-solar:code-outline" to="mailto:tobiastorjusen@icloud.com" variant="subtle" />
        </div>
        <div class="mt-8">
            <ProjectsGrid />
        </div>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Prosjekter",
    description: "Designer og webutvikler. Jeg skaper moderne, responsive løsninger for små og mellomstore bedrifter. Rask prosess, fleksibel tilnærming, profesjonelle resultat.",
});
</script>
