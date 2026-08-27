<template>
    <div :data-intro="intro ? '' : undefined">
        <div class="space-y-6">
            <NuxtImg
                src="/TLT_1813.jpg"
                alt="Tobias Torjusen"
                height="160px"
                width="160px"
                class="intro-item rounded-md aspect-square size-40 object-cover mb-12"
                style="--i: 0"
            />
            <div class="intro-item" style="--i: 1">
                <h1
                    class="text-xl font-medium text-gray-800 dark:text-gray-100"
                >
                    <span class="tracking-tight">Fotograf</span> -
                    <span class="font-mono text-primary-700">Webutvikler</span>
                    -
                    <span
                        class="font-serif italic bg-linear-to-tr from-neutral-300 to-neutral-800 bg-clip-text text-transparent"
                        >kreativ sjel</span
                    >
                </h1>
            </div>
            <p class="intro-item" style="--i: 2">
                Hei! Jeg heter Tobias og jeg elsker å være kreativ. Jeg jobber
                med foto, video, webutvikling og design, og jeg brenner for å
                skape løsninger som både fungerer og ser bra ut. Uansett medium
                handler det om å fortelle gode historier og levere arbeid som
                gjør en reell forskjell. Her finner du noen av mine prosjekter
                og tanker rundt kreativt arbeid.
            </p>
            <!-- <p class="text-gray-900 dark:text-gray-400">
                Til daglig jobber jeg på
                <NuxtLink to="https://www.salmoneye.no"
                    class="underline hover:text-primary transition-colors font-mono tracking-tighter">Salmon
                    Eye &nearrow;</NuxtLink>, der jeg får holde på
                med alt fra innholdsproduksjon til
                systemutvikling.
            </p> -->
        </div>

        <div class="my-24" />
        <div class="space-y-6">
            <!-- <h2 class="text-lg font-medium tracking-tight text-gray-800 dark:text-gray-100">
                Interessert i foto?
            </h2> -->
            <FotoThumbnailGrid />
            <div class="intro-item" style="--i: 8">
                <UButton
                    label="Se bilder &rarr;"
                    variant="link"
                    color="neutral"
                    to="/foto"
                    class="hover:text-primary transition-colors"
                />
            </div>
            <!-- <p class="text-gray-900 dark:text-gray-400">
                Jeg liker å ta bilder. Både for meg selv og for andre. Det er
                noe nesten magisk ved å fange øyeblikk. Fryse dem i tiden, og
                bevare stemningen og alle følelsene.
            </p> -->
        </div>

        <div class="my-24" />
        <div class="intro-item" style="--i: 9">
            <ProjectsList />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    layout: "standard",
});

// Intro animation runs only on the first load of the site, not when
// navigating back to the home page. The flag lives in useState so it survives
// client-side navigation. It is read once (non-reactively) so that flipping
// it in onMounted doesn't remove the animation mid-play. On the server the
// flag is always false, so the prerendered HTML carries `data-intro` and the
// CSS keyframes start on first paint without waiting for hydration.
const introPlayed = useState("home-intro-played", () => false);
const intro = !introPlayed.value;
onMounted(() => {
    introPlayed.value = true;
});

const description =
    "Tobias Torjusen er fotograf, webutvikler og kreativ historieforteller i Rosendal. Se fotoarbeid, webprosjekter og kreative prosjekter.";

useSeoMeta({
    title: "Fotograf, webutvikler og kreativ sjel",
    description,
    ogTitle: "Tobias Torjusen",
    ogDescription: description,
    ogImage: "/TLT_1813.jpg",
    twitterCard: "summary_large_image",
});
</script>

<style>
/*
 * First-load intro. Pure CSS keyframes so it runs off the main thread while
 * the browser is still busy hydrating and decoding images. Only opacity and
 * transform are animated. `both` fill keeps items hidden during their delay.
 *
 * Timeline (ms):  hero 0 · title 60 · text 120 · gallery 180–500 (random per
 * tile) · button 480 · projects 540. Everything settles around 850ms.
 */
[data-intro] {
    --intro-ease: cubic-bezier(0.23, 1, 0.32, 1);
    --intro-step: 60ms;
    --intro-gallery-start: 180ms;
}

[data-intro] .intro-item {
    animation: intro-rise 380ms var(--intro-ease) both;
    animation-delay: calc(var(--i, 0) * var(--intro-step));
}

/* Gallery tiles: a quick pure fade, each with its own pseudo-random delay
   (--d is set inline by FotoThumbnailGrid, 0–1). */
[data-intro] .intro-tile {
    animation: intro-fade 220ms ease-out both;
    animation-delay: calc(var(--intro-gallery-start) + var(--d, 0) * 450ms);
}

@keyframes intro-rise {
    from {
        opacity: 0;
        transform: translateY(6px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes intro-fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@media (prefers-reduced-motion: reduce) {
    [data-intro] .intro-item {
        animation-name: intro-fade;
    }
}
</style>
