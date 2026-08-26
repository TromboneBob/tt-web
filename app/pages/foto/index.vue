<template>
  <div>
    <div class="space-y-5">
      <h1 class="text-xl font-medium tracking-tight text-highlighted">Foto</h1>

      <p class="">
        Fotografering handler om å fange følelser og historier i ett enkelt øyeblikk. Et bilde kan
        romme mye, men setter man flere sammen oppstår det magi. Et helt hav av følelser og
        opplevelser kan fanges i en håndfull nøkkeløyeblikk. Som fotograf er det min jobb, og
        lidenskap, å jakte akkurat disse øyeblikkene og sørge for at historien din blir fortalt på
        best mulig måte.
      </p>
      <UPageCard
        title="Vil du bevare øyeblikkene dine?"
        description="Jeg vil veldig gjerne hjelpe deg å bevare historiene dine. Les mer om hvordan vi kan jobbe sammen her."
        icon="i-solar:camera-outline"
        to="/foto/info"
        variant="subtle"
        class="active:scale-99 mt-12"
      />
      <!-- <p class="text-gray-900 dark:text-gray-400">
                Jeg har også de siste årene vært så heldig å få ta bilder til
                <NuxtLink to="https://www.restaurantiris.no" target="_blank" class="underline">Iris</NuxtLink>. Sammen
                med Chef Anika og teamet på Iris har jeg fått jobbe
                fritt kreativt i å formidle historiene restauranten ønsker å
                fortelle.
                 <NuxtLink to="/foto/case-studies" class="underline">Her</NuxtLink>
                forteller jeg litt om noen av favorittene mine, og hvordan de er
                tatt.
            </p> -->
    </div>
    <div class="h-16" />
    <FotoSessionList />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "standard",
});

const description =
  "Fotograf basert i Rosendal, Kvinnherad. Bryllup, familie, konfirmant, nyfødt og bedriftsfoto med fokus på ekte øyeblikk.";
const ogImage = withSiteUrl("/foto-sessions/thumbnails/iris.jpg");

useSeoMeta({
  title: "Foto",
  description,
  ogTitle: "Foto",
  ogDescription: description,
  ogImage: () => ogImage.value,
  ogImageWidth: 1638,
  ogImageHeight: 2048,
  ogImageAlt: "Hel fisk vendt i mel mot svart bakgrunn",
  twitterCard: "summary_large_image",
});
</script>
