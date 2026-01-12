<template>
    <div>
        <div class="space-y-6">
            <UButton to="/foto" label="Tilbake" icon="i-solar:arrow-left-linear" variant="link" color="neutral" />
            <h1 class="text-xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
                Fotografering
            </h1>

            <p class="text-gray-900 dark:text-gray-400">
                Jeg er åpen for de aller fleste typer fotooppdrag, fra
                familiefoto og bryllupsfoto, til alle former for bedrifts- og
                produktfoto. Under finner du litt informasjon om priser og
                tjenester.
            </p>
            <UPageCard title="Klikk for å ta kontakt!"
                description="Jeg tar gjerne en prat om du lurer på noe. Enten angående booking, eller om du bare har noen spørsmål."
                icon="i-solar:chat-dots-outline" to="mailto:tobiastorjusen@icloud.com" />
        </div>
        <div class="space-y-6 mt-12">
            <UTabs :items="tabs" :ui="{ trigger: 'font-mono' }">
                <template #wedding>
                    <div class="space-y-6 mt-6">
                        <h2 class="font-bold text-lg">Bryllup</h2>
                        <p>
                            Å ta bilder i et bryllup handler om mye mer enn å
                            bare ta pene bilder av brudeparet. Det handler om å
                            fange alle de små øyeblikkene, følelsene og
                            stemningene gjennom dagen. Selv om brudeparet
                            spiller hovedrollen, er gjestene og omgivelsene en
                            svært viktig del av det som skaper magien.
                        </p>
                        <p>
                            Jeg fotograferer i dokumentariske stil. Jeg blander
                            meg ikke, men følger dagen og tar bilder etterhvert
                            som øyeblikkene oppstår. Det vil selvsagt bli tid
                            til tradisjonelle brude- og familiebilder,men
                            fokuset er å fortelle den ekte historien fra dagen
                            deres.
                        </p>
                        <USeparator class="my-8" />
                        <h3 class="font-bold mt-6">
                            Hvordan ser prosessen ut?
                        </h3>
                        <div v-for="(item, id) in stepperItems" :key="id" class="space-y-4 mb-10">
                            <div class="w-full flex flex-col items-start gap-1">
                                <div class="flex flex-row items-center gap-2 w-full">
                                    <UIcon :name="item.icon" class="size-5" />
                                    <h4 class="font-semibold">
                                        {{ item.title }}
                                    </h4>
                                    <div class="grow border-t border-t-gray-300" />
                                    <UBadge variant="subtle">{{
                                        item.date
                                    }}</UBadge>
                                </div>
                            </div>
                            <div class="text-pretty text-muted">
                                {{ item.description }}
                            </div>
                        </div>
                        <USeparator class="my-8" />
                        <h3 class="font-bold">Hva koster det egentlig?</h3>
                        <UPricingPlans :plans="weddingPlans" class="gap-2" />
                        <p>
                            Begge pakkene inkluderer etterarbeid og et komplett
                            digitalt galleri, uten begrensninger på antall
                            bilder.
                        </p>
                        <div>
                            <h3 class="font-bold">Prøvefotografering</h3>
                            <p>
                                Dette er en god mulighet for oss til å bli bedre
                                kjent, og passer spesielt godt for dem som
                                kanskje ikke er vant med å stå foran kamera.
                                Noen kan føle det voldsomt å skulle være
                                midtpunkt en hel dag, og da kan det være greit å
                                ha fått senket skuldrene litt på forhånd.
                            </p>

                        </div>
                    </div>
                </template>
                <template #family>
                    <div class="space-y-6 mt-6">
                        <h2 class="font-bold text-lg">Familie og portretter</h2>
                        <p>
                            Jeg møter dere et sted der dere er komfortable og trygge, slik at barna føler de kan være
                            seg selv og dere som foreldre kan slappe av og bare nyte. På den måten kan vi fange de
                            ekte øyeblikkene som oppstår i samhandling mellom dere alle sammen.
                        </p>
                        <p>
                            Det er viktig for meg at det hele skal oppleves naturlig og avslappet. Minst mulig stivt og
                            oppstilt. Mest mulig lek, glede og latter.
                        </p>
                        <h3 class="font-bold">Hva koster det egentlig?</h3>
                        <UPricingPlans :plans="portraitPlans" class="gap-2" />
                        <div class="my-12">
                            <h3 class="font-bold mb-4">Du lurer kanskje på...</h3>
                            <UAccordion :items="portraitFAQ" :ui="{ label: 'font-medium' }" />
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <NuxtLink v-for="(portraitSession, index) in portraitFotos" :key="index"
                                :to="portraitSession.path">

                                <NuxtImg :src="portraitSession.thumbnail"
                                    class="aspect-square object-cover rounded-sm" />
                            </NuxtLink>
                        </div>
                    </div>

                </template>
            </UTabs>
        </div>
    </div>
</template>

<script setup>
useSeoMeta({
    title: "Info %separator Foto",
    description: "Fotograf basert i Rosendal, Kvinnherad. Bryllup, familie, konfirmant og nyfødt, med fokus på å fange de små øyeblikkene.",
});

const { fotos } = useFotoCollection()

const weddingFotos = computed(() => {
    return fotos.value.filter((foto) => foto.occasion == "Bryllup")
})

const portraitFotos = computed(() => {
    return fotos.value?.filter((foto) =>
        ["Julekort", "Familie", "Nyfødt", "Konfirmasjon"].includes(foto.occasion)
    ) ?? []
})

const contactLinks = ref([
    [
        {
            label: "Mobil",
            icon: "i-solar-phone-outline",
            to: "tel:+4793843251",
        },
        {
            label: "E-post",
            icon: "i-solar-letter-outline",
            to: "mailto:tobiastorjusen@icloud.com",
        },
    ],
]);

const tabs = [
    {
        label: "Bryllup",
        icon: "i-solar:heart-outline",
        slot: "wedding",
    },
    {
        label: "Familie og portretter",
        icon: "i-solar:user-heart-rounded-outline",
        slot: "family",
    },
];

const weddingPlans = ref([
    {
        title: "Halvdag",
        description:
            "Perfekt for dere som ønsker fotografering av vielse, portretter og noen fine øyeblikk rundt. Varighet ca. 5 timer. Fleksibelt opplegg før eller etter vielsen.",
        price: "fra kr 15 000,-",
        features: [
            "Portretter på ønsket lokasjon",
            "Vielse",
            "Familiebilder",
            "Mottakelse eller forberedelser",
            "Bilder i online galleri",
            "Maks 5 timer",
        ],

        ui: {
            root: "p-4 lg:p-6 gap-4",
            title: "sm:text-xl",
            price: "text-xl sm:text-xl",
        },
    },
    {
        title: "Heldag",
        description:
            "For dere som ønsker at hele historien skal med: forberedelser, vielse, portretter, middag, dans og fest. Inntil 12 timer",
        price: "fra kr 21 000,-",
        features: [
            "Alt i halvdag",
            "Forberedelser",
            "Middag",
            "Dans",
            "Maks 12 timer",
        ],

        ui: {
            root: "p-4 lg:p-6 gap-4",
            title: "sm:text-xl",
            price: "text-xl sm:text-xl",
        },
    },
]);

const portraitPlans = ref([
    {
        title: "Familie / portrett",
        description:
            "Ta vare på de magiske øyeblikkene med minner som kjennes naturlige og ekte.",
        price: "fra kr 3 000,-",
        features: [
            "Fotografering på ønsket lokasjon",
            "Bilder i online galleri",
            "ca 1 time (men ingen hastverk)",
        ],

        ui: {
            root: "p-4 lg:p-6 gap-4",
            title: "sm:text-xl",
            price: "text-xl sm:text-xl",
        },
    },

]);

const portraitFAQ = ref([

    {
        label: 'Hva bør vi ha på oss?',
        icon: 'i-solar:t-shirt-outline',
        content: 'Tenk naturlige og myke farger. Unngå store logoer, skarpe farger eller masete mønster. Det er ofte lurt å velge klær som går godt sammen, men prøv også å unngå at alle stiller i "uniform". Om dere er usikre på om det dere har valgt ut fungerer kan dere sende meg et bilde, så hjelper jeg gjerne med forslag og idéer.'
    },
    {
        label: 'Når får jeg bildene?',
        icon: 'solar:clock-circle-outline',
        content: 'Det tar vanligvis 3-4 uker å ferdigstille bildene. Har du hastverk med å få dem kan du gi beskjed ved booking, så kan vi prøve å finne en løsning.'
    }
])

const stepperItems = ref([
    {
        date: "Før bryllupet",
        title: "Første kontakt",
        description:
            "Dere tar kontakt med eventuelle spørsmål, og vi avklarer hva dere ønsker ut av fotograferingen.",
        icon: "i-solar:phone-outline",
    },
    {
        date: "Før bryllupet",
        title: "Planlegging",
        description:
            "Vi legger en plan for dagen og jeg kommer med råd som sikrer best mulig flyt og gode fotomuligheter.",
        icon: "i-solar:document-add-outline",
    },
    {
        date: "Før bryllupet",
        title: "Prøvefotografering (valgfritt)",
        description:
            "Vi møtes for en liten shoot før bryllupet. Det hjelper oss å bli kjent, og gjør at dere blir trygge foran kamera og vet litt hva som venter.",
        icon: "i-solar:stars-minimalistic-outline",
    },
    {
        date: "Selve dagen",
        title: "Bryllup!",
        description: "Dere nyter dagen, jeg fanger alle øyeblikkene.",
        icon: "i-solar:camera-outline",
    },
    {
        date: "Etter bryllupet",
        title: "Redigering",
        description:
            "Dere minnes alle øyeblikkene og venter i spenning mens bildene blir redigert og klargjort.",
        icon: "i-solar:gallery-edit-outline",
    },
    {
        date: "2-3 uker etter bryllupet",
        title: "Leveranse",
        description:
            "Bildene er klare og leveres i sin helhet i digitalt galleri.",
        icon: "i-solar:gallery-favourite-outline",
    },
]);
</script>
