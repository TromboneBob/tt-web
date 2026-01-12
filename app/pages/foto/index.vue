<template>
    <div>
        <div class="space-y-6">
            <h1 class="text-xl font-medium tracking-tight text-gray-800 dark:text-gray-100">
                Foto
            </h1>

            <p class="text-gray-900 dark:text-gray-400">
                Fotografering handler om å fange følelser og historier i ett
                enkelt øyeblikk. Et bilde kan romme mye, men setter man flere
                sammen oppstår det magi. Et helt hav av følelser og opplevelser
                kan fanges i en håndfull nøkkeløyeblikk. Som fotograf er det min
                jobb, og lidenskap, å jakte akkurat disse øyeblikkene og sørge
                for at historien din blir fortalt på best mulig måte.
            </p>
            <UPageCard title="Vil du bevare øyeblikkene dine?"
                description="Jeg vil veldig gjerne hjelpe deg å bevare historiene dine. Les mer om hvordan vi kan jobbe sammen her."
                icon="i-solar:camera-outline" to="/foto/info" variant="subtle" />
            <p class="text-gray-900 dark:text-gray-400">
                Jeg har også de siste årene vært så heldig å få ta bilder til
                <NuxtLink to="https://www.restaurantiris.no" target="_blank" class="underline">Iris</NuxtLink>. Sammen
                med Chef Anika og teamet på Iris har jeg fått jobbe
                fritt kreativt i å formidle historiene restaruanten ønsker å
                fortelle.
                <!-- <NuxtLink to="/foto/case-studies" class="underline">Her</NuxtLink>
                forteller jeg litt om noen av favorittene mine, og hvordan de er
                tatt. -->
            </p>
        </div>
        <div class="h-16" />
        <FotoSessionList />
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Foto",
    description: "Fotograf basert i Rosendal, Kvinnherad. Bryllup, familie, konfirmant og nyfødt, med fokus på å fange de små øyeblikkene.",
});
</script>
