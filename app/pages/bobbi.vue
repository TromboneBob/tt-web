<template>
    <div>
        <div class="mb-8">
            <h1 class="text-xl text-center mb-4">Dette er <span class="italic font-serif">Bobbi</span></h1>
            <h2 class=" text-center">Han har etterhvert skjønt at når kamera og kostyme kommer frem er det gode
                muligheter for godbiter. Han er en svært ivrig fotomodell og posør.</h2>
        </div>
        <FotoGallery :photos="images" />
    </div>
</template>

<script setup lang="ts">
useSeoMeta({
    title: 'Bobbi',
});
const images = [
    { src: "/bobbi/img1.jpg" },
    { src: "/bobbi/img2.jpg" },
    { src: "/bobbi/img3.jpg" },
    { src: "/bobbi/img4.jpg" },
    { src: "/bobbi/img5.jpg" },
    { src: "/bobbi/img6.jpg" },
    { src: "/bobbi/img7.jpg" },
    { src: "/bobbi/img8.jpg" },
    { src: "/bobbi/img9.jpg" },
    { src: "/bobbi/img10.jpg" },
    { src: "/bobbi/img11.jpg" },
    { src: "/bobbi/img12.jpg" },
    { src: "/bobbi/img13.jpg" }
];
</script>

<style scoped></style>
