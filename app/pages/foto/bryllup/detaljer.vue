<template>
    <div class="max-w-xl mx-auto pb-20 space-y-16">

        <!-- Intro -->
        <div class="space-y-5">
            <p class="text-xs font-mono uppercase tracking-widest text-muted">Bryllupsfotografering</p>
            <h1 class="text-2xl font-bold tracking-tight">Ting dere kanskje lurer på</h1>
            <p class="text-muted leading-relaxed">
                Bryllupsdagen er deres. Jobben min er å være til stede uten å forstyrre,
                og å fange det som faktisk skjer: de stille øyeblikkene, de store følelsene og alt
                det morsomme som skjer mellom. Denne siden gir deg et innblikk i hvordan jeg jobber,
                og hva som gjør samarbeidet best mulig for begge parter.
            </p>
        </div>

        <USeparator />

        <!-- Hva kan du forvente av meg -->
        <div class="space-y-8">
            <div class="space-y-2">
                <p class="text-xs font-mono uppercase tracking-widest text-muted">Mitt ansvar</p>
                <h2 class="text-xl font-bold">Hva kan dere forvente av meg?</h2>
            </div>

            <div class="space-y-5">
                <div v-for="promise in myPromises" :key="promise.title" class="flex gap-4">
                    <div class="shrink-0 mt-0.5">
                        <UIcon :name="promise.icon" class="size-5 text-muted" />
                    </div>
                    <div class="space-y-1">
                        <p class="font-medium text-sm">{{ promise.title }}</p>
                        <p class="text-sm text-muted leading-relaxed">{{ promise.body }}</p>
                    </div>
                </div>
            </div>
        </div>

        <USeparator />

        <!-- Hva forventer jeg av deg -->
        <div class="space-y-8">
            <div class="space-y-2">
                <p class="text-xs font-mono uppercase tracking-widest text-muted">Deres ansvar</p>
                <h2 class="text-xl font-bold">Hva forventer jeg av dere?</h2>
                <p class="text-sm text-muted leading-relaxed">
                    Ikke mye — men noen praktiske ting gjør en stor forskjell for at jeg skal
                    kunne gjøre jobben min best mulig.
                </p>
            </div>

            <div class="space-y-5">
                <div v-for="expectation in myExpectations" :key="expectation.title" class="flex gap-4">
                    <div class="shrink-0 mt-0.5">
                        <UIcon :name="expectation.icon" class="size-5 text-muted" />
                    </div>
                    <div class="space-y-1">
                        <p class="font-medium text-sm">{{ expectation.title }}</p>
                        <p class="text-sm text-muted leading-relaxed">{{ expectation.body }}</p>
                    </div>
                </div>
            </div>

        </div>

        <USeparator />

        <!-- FAQ -->
        <div class="space-y-8">
            <div class="space-y-2">
                <p class="text-xs font-mono uppercase tracking-widest text-muted">Spørsmål og svar</p>
                <h2 class="text-xl font-bold">Du lurer kanskje på...</h2>
            </div>

            <UAccordion :items="faq" :ui="{ label: 'font-medium text-sm' }" />
        </div>

        <!-- CTA -->
        <USeparator />
        <div class="space-y-4">
            <p class="text-sm text-muted">Fortsatt spørsmål? Ta gjerne kontakt.</p>
            <div class="flex flex-wrap gap-3">
                <UButton to="mailto:tobiastorjusen@icloud.com" icon="i-solar:letter-outline" variant="outline"
                    color="neutral">
                    Send e-post
                </UButton>
                <UButton to="tel:+4793843251" icon="i-solar:phone-outline" variant="outline" color="neutral">
                    Ring meg
                </UButton>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'standard',
})

useSeoMeta({
    title: 'Detaljer — Bryllupsfotografering',
    description: 'Informasjon om hvordan Tobias Torjusen jobber som bryllupsfotograf — hva du kan forvente, og hva som gjør samarbeidet best mulig.',
})

const myPromises = [
    {
        icon: 'i-solar:clock-circle-outline',
        title: 'Punktlighet',
        body: 'Jeg møter opp i god tid og er klar lenge før dere trenger meg. Forsinkelser på min side er aldri et alternativ.',
    },
    {
        icon: 'i-solar:chat-dots-outline',
        title: 'God kommunikasjon i forkant',
        body: 'Vi går gjennom dagen i detalj før bryllupet. Jeg stiller spørsmål, gir råd om timing og hjelper dere å lage en plan som gir gode fotomuligheter uten at det går på bekostning av flyten.',
    },
    {
        icon: 'i-solar:eye-outline',
        title: 'Dokumentarisk tilnærming',
        body: 'Jeg stiller meg i bakgrunnen og lar dagene utfolde seg naturlig. Dere trenger ikke tenke på meg — jeg fanger øyeblikkene etter hvert som de oppstår.',
    },
    {
        icon: 'i-solar:shield-check-outline',
        title: 'Backup-utstyr',
        body: 'Jeg stiller alltid med to kameraer og ekstra linser, batterier og minnekort. Teknisk svikt er noe vi ikke trenger å bekymre oss for.',
    },
    {
        icon: 'i-solar:gallery-favourite-outline',
        title: 'Komplett digitalt galleri',
        body: 'Dere mottar et komplett galleri med alle de ferdige bildene uten begrensning på antall. Dere kan laste ned og dele fritt.',
    },
    {
        icon: 'i-solar:lock-outline',
        title: 'Respekt for personvern',
        body: 'Jeg publiserer aldri bilder av dere uten at dere har godkjent det. Dere har alltid siste ord.',
    },
]

const myExpectations = [
    {
        icon: 'i-solar:list-outline',
        title: 'Timeline i forkant',
        body: 'Send meg en detaljert oversikt over bryllupsdagen senest én uke før. Jo mer detaljer, jo bedre kan jeg forberede meg og sørge for å være på rett sted til rett tid. Jeg har også vært med på mange ulike løsninger, og kommer gjerne med tips eller kommentarer på hvordan dagen er lagt opp. Ofte kan bare noen få minutters justering gi mye bedre flyt, både for bilder og for dagen generelt.',
    },
    {
        icon: 'i-solar:chat-dots-outline',
        title: 'En kontaktperson på dagen',
        body: 'Utpek én person, gjerne toastmaster eller en i familien, som jeg kan gå til om jeg lurer på noe underveis. Det frigjør dere til å nyte dagen uten avbrudd.',
    },
    {
        icon: 'i-solar:home-2-outline',
        title: 'Plass til utstyr og tilgang til strøm',
        body: 'Jeg trenger et fast sted å sette fra meg utstyret på lokalet med tilgang til strøm. Et lite bord eller en krok holder.',
    },
    {
        icon: 'i-solar:cup-hot-outline',
        title: 'Mat og drikke',
        body: 'Lange dager krever energi. Jeg setter stor pris på et måltid under middagen. Jeg trenger ikke sitte ved bordet, men jo nærmere jeg er der det skjer, jo bedre muligheter har jeg til å dekke talene og annet som skjer under middagen. Om det ikke lar seg gjøre, finner vi en løsning, men gi beskjed i forkant.',
    },
    {
        icon: 'i-solar:camera-outline',
        title: 'Tillit og rom til å jobbe',
        body: 'Jeg er erfaren og vet hva som fungerer. La meg bevege meg fritt og stole på at jeg fanger det som betyr noe.',
    },
    {
        icon: 'i-solar:gallery-favourite-outline',
        title: 'Respekt for bildene',
        body: 'Dere får tilgang til alle de redigerte bildene i etterkant av bryllupet. Dere står fritt til å laste ned, printe og dele så mange dere ønsker. Men jeg ber om at dere respekterer bildene slik de er. Ikke rediger videre på bildene, ikke selg dem videre, og ikke bruk dem på en måte som kan være til skade for meg og min profesjon. Om dere ønsker endringer, ta gjerne kontakt, så finner vi en løsning.',
    },
    {
        icon: 'i-solar:gallery-check-outline',
        title: 'Kreditering',
        body: 'Jeg setter veldig pris på om dere krediterer meg som fotograf der det er mulig. Det er ikke et absolutt krav, men en enkel gest som betyr veldig mye for meg. ',
    },
    {
        icon: 'i-solar:chat-round-money-outline',
        title: 'Betaling',
        body: 'Jeg fakturerer 30% av den totale prisen når dere booker. Dette for å holde av datoen, samt alt arbeidet som inngår i planlegging før bryllupet. Dette er ikke refunderbart, skulle dere ønske å avbestille. De resterende 70% forfaller senest 2 uker etter bryllupet. Dere får først bildene når honoraret er betalt i sin helhet. ',
    },
]

const faq = [
    {
        label: 'Når får vi bildene?',
        icon: 'i-solar:clock-circle-outline',
        content: 'Dere kan forvente det ferdige galleriet innen 3–4 uker etter bryllupet. Har dere et ønske om raskere levering, gi beskjed tidlig i prosessen, så finner vi en løsning.',
    },
    {
        label: 'Hvor mange bilder leverer du?',
        icon: 'i-solar:gallery-outline',
        content: 'Det er ingen fastsatt grense. Et typisk heldagsbryllup gir et sted mellom 500 og 1000 ferdig redigerte bilder. Alle bildene i galleriet er gjennomgått og redigert — ikke råfiler.',
    },
    {
        label: 'Kan vi be om spesielle bilder?',
        icon: 'i-solar:list-check-outline',
        content: 'Absolutt. En «shot list» med ønskede gruppebilder og spesielle øyeblikk er svært nyttig. Send den til meg i forkant, så er vi godt forberedt. Jo kortere listen er, jo mer tid har vi til de naturlige øyeblikkene.',
    },
    {
        label: 'Hva skjer om det er dårlig vær?',
        icon: 'i-solar:cloud-outline',
        content: 'Dårlig vær gir ofte de mest stemningsfulle bildene. Grå himmel og regn kan være fantastisk — og vi kan alltid finne gode løsninger innendørs. Forbered gjerne en backup-lokasjon for portrettene, i tilfelle.',
    },
    {
        label: 'Kan du reise?',
        icon: 'i-solar:map-point-outline',
        content: 'Ja, jeg stiller gjerne opp over hele landet. Reisekostnader (transport, overnatting ved behov) faktureres i tillegg til pakkeprisen og avtales i forkant.',
    },
    {
        label: 'Hva med rettighetene til bildene?',
        icon: 'i-solar:copyright-outline',
        content: 'Dere har full rett til å bruke bildene privat — dele, skrive ut og lagre fritt. Jeg beholder fotografretten og kan bruke bildene i min portfolio og markedsføring, men alltid etter avtale med dere.',
    },
    {
        label: 'Bruker du blits?',
        icon: 'i-solar:sun-outline',
        content: 'Jeg jobber primært med naturlig lys. Under middagen og taler bruker jeg gjerne blits for å sikre skarpe og godt eksponerte bilder. Er det restriksjoner på lokalet, tar vi det med i planleggingen.',
    },
    {
        label: 'Hva skjer om du blir syk?',
        icon: 'i-solar:heart-pulse-outline',
        content: 'Jeg har et nettverk av dyktige fotografer jeg kan kontakte i en nødsituasjon. I det usannsynlige tilfellet at jeg ikke kan møte opp, vil jeg alltid sørge for at noen med tilsvarende kompetanse tar over — og vi finner en løsning som fungerer for dere.',
    },
]
</script>
