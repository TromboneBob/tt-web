<template>
    <div>
        <h2 class="uppercase text-xs font-semibold text-gray-400 mb-6">
            Noen favoritter
        </h2>
        <div class="grid grid-cols-1 gap-4 mb-4 font-mono">
            <div class="flex flex-row gap-2 items-center">
                <h3 class="text-muted">Anledning: </h3>
                <USelect placeholder="Velg anledning..." v-model="occasion" :items="occasions" variant="ghost" multiple
                    class="w-48" />
            </div>
            <div class="flex flex-row gap-2 items-center">
                <h3 class="text-muted">Årstid: </h3>
                <USelect placeholder="Velg årstid..." v-model="timeOfYear" :items="seasons" variant="ghost" multiple
                    class="w-48" />
            </div>
        </div>
        <div class="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
            <FotoSessionCard v-for="(session, id) in filteredPhotos" :key="id" :session="session" />
        </div>
    </div>
</template>

<script lang="ts" setup>
const { data: sessions } = await useAsyncData("fotoSessions", () => {
    return queryCollection("fotoSessions").all();
});

const filteredPhotos = computed(() => {
    return sessions.value.filter(photo => {
        const occasionMatch =
            occasion.value.length === 0 ||
            occasion.value.includes(photo.occasion);

        const timeOfYearMatch =
            timeOfYear.value.length === 0 ||
            timeOfYear.value.includes(photo.timeOfYear);

        return occasionMatch && timeOfYearMatch;
    });
});

const occasion = ref([]);
const occasions = computed(() => {
    if (!sessions.value)
        return [];
    return [...new Set(sessions.value.map(photo => photo.occasion))];
});

const timeOfYear = ref([]);
const seasons = ref(['Vinter', 'Vår', 'Sommer', 'Høst']);
</script>
