<template>
    <div class="max-w-xl mx-auto pb-20">
        <!-- Success state -->
        <div v-if="submitted" class="py-20 text-center space-y-4">
            <UIcon
                name="i-solar:check-circle-bold"
                class="size-16 text-primary mx-auto"
            />
            <div class="space-y-2">
                <h1 class="text-xl font-bold">Takk!</h1>
                <p class="text-muted">
                    Skjemaet er sendt inn. Jeg tar kontakt om jeg lurer på noe.
                    Gleder meg til bryllupet!
                </p>
            </div>
        </div>

        <template v-else>
            <!-- Progress header -->
            <div class="mb-10 space-y-3">
                <div class="flex items-center justify-between">
                    <span
                        class="text-xs font-mono uppercase tracking-widest text-muted"
                        >Bryllupsskjema</span
                    >
                    <span class="text-xs font-mono text-muted"
                        >{{ currentStep + 1 }} / {{ steps.length }}</span
                    >
                </div>
                <div class="flex gap-1.5">
                    <div
                        v-for="(_, i) in steps"
                        :key="i"
                        class="h-0.5 flex-1 rounded-full transition-all duration-500"
                        :class="
                            i <= currentStep
                                ? 'bg-gray-900 dark:bg-white'
                                : 'bg-gray-200 dark:bg-gray-800'
                        "
                    />
                </div>
                <Transition name="title-fade" mode="out-in">
                    <div :key="currentStep">
                        <h2 class="text-xl font-bold">
                            {{ steps[currentStep]!.title }}
                        </h2>
                        <p
                            v-if="steps[currentStep]!.subtitle"
                            class="text-sm text-muted mt-1"
                        >
                            {{ steps[currentStep]!.subtitle }}
                        </p>
                    </div>
                </Transition>
            </div>

            <!-- Step content -->
            <Transition :name="transitionName" mode="out-in">
                <div :key="currentStep" class="space-y-5">
                    <!-- Step 0: Kontaktinfo -->
                    <template v-if="currentStep === 0">
                        <p
                            class="text-xs font-mono uppercase tracking-widest text-muted"
                        >
                            Brud
                        </p>
                        <UFormField label="Fullt navn">
                            <UInput
                                v-model="form.brud.navn"
                                placeholder="Ola Nordmann"
                                class="w-full"
                            />
                        </UFormField>
                        <div class="grid grid-cols-2 gap-3">
                            <UFormField label="Telefon">
                                <UInput
                                    v-model="form.brud.telefon"
                                    type="tel"
                                    placeholder="+47 000 00 000"
                                    class="w-full"
                                />
                            </UFormField>
                            <UFormField label="E-post">
                                <UInput
                                    v-model="form.brud.epost"
                                    type="email"
                                    placeholder="navn@epost.no"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>
                        <UFormField label="Hjemadresse">
                            <UInput
                                v-model="form.brud.adresse"
                                placeholder="Gateveien 1, 5400 Stord"
                                class="w-full"
                            />
                        </UFormField>

                        <USeparator class="my-2" />

                        <p
                            class="text-xs font-mono uppercase tracking-widest text-muted"
                        >
                            Brudgom
                        </p>
                        <UFormField label="Fullt navn">
                            <UInput
                                v-model="form.brudgom.navn"
                                placeholder="Kari Nordmann"
                                class="w-full"
                            />
                        </UFormField>
                        <div class="grid grid-cols-2 gap-3">
                            <UFormField label="Telefon">
                                <UInput
                                    v-model="form.brudgom.telefon"
                                    type="tel"
                                    placeholder="+47 000 00 000"
                                    class="w-full"
                                />
                            </UFormField>
                            <UFormField label="E-post">
                                <UInput
                                    v-model="form.brudgom.epost"
                                    type="email"
                                    placeholder="navn@epost.no"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>
                        <UFormField label="Hjemadresse">
                            <UInput
                                v-model="form.brudgom.adresse"
                                placeholder="Gateveien 1, 5400 Stord"
                                class="w-full"
                            />
                        </UFormField>

                        <USeparator class="my-2" />

                        <p
                            class="text-xs font-mono uppercase tracking-widest text-muted"
                        >
                            Toastmaster / ansvarlig på dagen
                        </p>
                        <UFormField label="Fullt navn">
                            <UInput
                                v-model="form.toastmaster.navn"
                                placeholder="Ola Nordmann"
                                class="w-full"
                            />
                        </UFormField>
                        <div class="grid grid-cols-2 gap-3">
                            <UFormField label="Telefon">
                                <UInput
                                    v-model="form.toastmaster.telefon"
                                    type="tel"
                                    placeholder="+47 000 00 000"
                                    class="w-full"
                                />
                            </UFormField>
                            <UFormField label="E-post">
                                <UInput
                                    v-model="form.toastmaster.epost"
                                    type="email"
                                    placeholder="navn@epost.no"
                                    class="w-full"
                                />
                            </UFormField>
                        </div>
                    </template>

                    <!-- Step 1: Adresser -->
                    <template v-else-if="currentStep === 1">
                        <UFormField
                            label="Forberedelser — brud"
                            description="Hvor gjør bruden seg klar på bryllupsdagen?"
                        >
                            <UInput
                                v-model="form.adresser.forberedelseBrud"
                                placeholder="Hotel Rosendal, rom 204"
                                class="w-full"
                            />
                        </UFormField>
                        <UFormField
                            label="Forberedelser — brudgom"
                            description="Hvor gjør brudgommen seg klar?"
                        >
                            <UInput
                                v-model="form.adresser.forberedelseBrudgom"
                                placeholder="Hotel Rosendal, rom 105"
                                class="w-full"
                            />
                        </UFormField>

                        <USeparator class="my-2" />

                        <UFormField
                            label="Vielse"
                            description="Adresse og/eller navn på lokalet"
                        >
                            <UInput
                                v-model="form.adresser.vielse"
                                placeholder="Kvinnherad kirke, 5460 Rosendal"
                                class="w-full"
                            />
                        </UFormField>
                        <UFormField
                            label="Mottakelse"
                            description="Adresse og/eller navn på lokalet"
                        >
                            <UInput
                                v-model="form.adresser.mottakelse"
                                placeholder="Baroniet Rosendal, 5470 Rosendal"
                                class="w-full"
                            />
                        </UFormField>
                    </template>

                    <!-- Step 2: Bryllupsdagen -->
                    <template v-else-if="currentStep === 2">
                        <UFormField
                            label="Antall gjester"
                            description="Omtrent antall"
                        >
                            <UInput
                                v-model="form.antallGjester"
                                type="number"
                                min="0"
                                placeholder="80"
                                class="w-24"
                            />
                        </UFormField>

                        <USeparator class="my-2" />

                        <div class="space-y-3">
                            <div>
                                <p class="text-sm font-medium">
                                    Timeline for bryllupsdagen
                                </p>
                                <p class="text-xs text-muted mt-0.5">
                                    Skriv inn eller last opp et dokument
                                </p>
                            </div>
                            <div class="flex gap-2">
                                <UButton
                                    size="sm"
                                    :variant="
                                        timelineMode === 'text'
                                            ? 'solid'
                                            : 'outline'
                                    "
                                    color="neutral"
                                    @click="timelineMode = 'text'"
                                    >Skriv inn</UButton
                                >
                                <UButton
                                    size="sm"
                                    :variant="
                                        timelineMode === 'file'
                                            ? 'solid'
                                            : 'outline'
                                    "
                                    color="neutral"
                                    @click="timelineMode = 'file'"
                                    >Last opp fil</UButton
                                >
                            </div>

                            <UTextarea
                                v-if="timelineMode === 'text'"
                                v-model="form.timeline"
                                :rows="10"
                                placeholder="09:00 – Forberedelser starter&#10;13:00 – Vielse&#10;14:30 – Champagne og portretter&#10;17:00 – Middag&#10;..."
                                class="w-full font-mono text-sm"
                            />

                            <div v-else class="space-y-2">
                                <label class="block">
                                    <div
                                        class="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
                                        :class="
                                            timelineFile
                                                ? 'border-primary-400 bg-primary-50 dark:bg-primary-950/30'
                                                : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
                                        "
                                    >
                                        <UIcon
                                            :name="
                                                timelineFile
                                                    ? 'i-solar:file-check-outline'
                                                    : 'i-solar:upload-minimalistic-outline'
                                            "
                                            class="size-8 mx-auto mb-2"
                                            :class="
                                                timelineFile
                                                    ? 'text-primary'
                                                    : 'text-muted'
                                            "
                                        />
                                        <p
                                            class="text-sm"
                                            :class="
                                                timelineFile
                                                    ? 'font-medium'
                                                    : 'text-muted'
                                            "
                                        >
                                            {{
                                                timelineFile
                                                    ? timelineFile.name
                                                    : "Klikk for å velge fil"
                                            }}
                                        </p>
                                        <p
                                            v-if="!timelineFile"
                                            class="text-xs text-muted mt-1"
                                        >
                                            PDF, Word, Pages eller tekstfil
                                        </p>
                                        <input
                                            type="file"
                                            class="hidden"
                                            accept=".pdf,.doc,.docx,.txt,.pages"
                                            @change="handleFileChange"
                                        />
                                    </div>
                                </label>
                                <UButton
                                    v-if="timelineFile"
                                    size="xs"
                                    variant="ghost"
                                    color="error"
                                    icon="i-solar:trash-bin-minimalistic-outline"
                                    @click="clearFile"
                                    >Fjern fil</UButton
                                >
                            </div>
                        </div>
                    </template>

                    <!-- Step 3: Fotograferingen -->
                    <template v-else-if="currentStep === 3">
                        <UFormField
                            label="Portrettfotografering — ønsket lokasjon"
                            description="Beskriv ønsket sted for portrettbildene"
                        >
                            <UTextarea
                                v-model="form.foto.portrettLokasjon"
                                placeholder="Vi ønsker portrettbildene ved sjøen i Rosendal"
                                :rows="3"
                                class="w-full"
                            />
                        </UFormField>
                        <UFormField
                            label="Backup innendørs"
                            description="Oppgi et alternativ dersom dere foretrekker utendørs men det er dårlig vær"
                        >
                            <UInput
                                v-model="form.foto.portrettBackup"
                                placeholder="Innendørs i selskapslokal om det regner"
                                class="w-full"
                            />
                        </UFormField>

                        <USeparator class="my-2" />

                        <UFormField
                            label="Shot list — gruppefotografering"
                            description="List opp kombinasjoner og grupper dere ønsker bilder av"
                        >
                            <UTextarea
                                v-model="form.foto.shotList"
                                placeholder="– Brudeparet alene&#10;– Brudeparet + brudens familie&#10;– Brudeparet + brudgommens familie&#10;– Alle sammen&#10;..."
                                :rows="7"
                                class="w-full"
                            />
                        </UFormField>
                        <UFormField
                            label="Spesielt ønskede bilder"
                            description="Andre enkeltbilder eller øyeblikk som er spesielt viktige for dere"
                        >
                            <UTextarea
                                v-model="form.foto.spesielleOnsker"
                                placeholder="Vi ønsker gjerne et bilde av ringen på puta..."
                                :rows="3"
                                class="w-full"
                            />
                        </UFormField>

                        <USeparator class="my-2" />

                        <UFormField
                            label="Restriksjoner under vielsen"
                            description="Er det noen restriksjoner på stedet? Steder jeg ikke kan gå, bruk av blits, eller annet jeg bør vite om?"
                        >
                            <UTextarea
                                v-model="form.foto.restriksjoner"
                                placeholder="Presten ønsker ikke at fotografen beveger seg fritt under vielsen..."
                                :rows="3"
                                class="w-full"
                            />
                        </UFormField>

                        <div class="space-y-2">
                            <div>
                                <p class="text-sm font-medium">Blits</p>
                                <p class="text-xs text-muted mt-0.5">
                                    Jeg bruker blits om nødvendig, typisk under
                                    middag og taler
                                </p>
                            </div>
                            <URadioGroup
                                v-model="form.foto.blits"
                                :items="blitsOptions"
                            />
                        </div>
                    </template>

                    <!-- Step 4: Praktiske avklaringer -->
                    <template v-else-if="currentStep === 4">
                        <UAlert
                            icon="i-solar:info-circle-outline"
                            color="neutral"
                            variant="soft"
                            description="Les gjennom og bekreft at dere har lest og forstått hvert punkt."
                        />

                        <div
                            class="rounded-xl border p-4 space-y-3 transition-colors duration-200"
                            :class="
                                form.godkjenning.utstyr
                                    ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-950/30'
                                    : 'border-gray-200 dark:border-gray-800'
                            "
                        >
                            <div class="flex gap-3">
                                <UIcon
                                    name="i-solar:bag-4-outline"
                                    class="size-5 shrink-0 mt-0.5 text-muted"
                                />
                                <div class="space-y-1">
                                    <p class="font-medium text-sm">
                                        Utstyrsplass
                                    </p>
                                    <p
                                        class="text-sm text-muted leading-relaxed"
                                    >
                                        Jeg trenger et sted å oppbevare utstyr
                                        på lokalet. Det må være tilgang til
                                        strøm og sitteplass.
                                    </p>
                                </div>
                            </div>
                            <UCheckbox
                                v-model="form.godkjenning.utstyr"
                                label="Forstått og ordnet"
                            />
                        </div>

                        <div
                            class="rounded-xl border p-4 space-y-3 transition-colors duration-200"
                            :class="
                                form.godkjenning.mat
                                    ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-950/30'
                                    : 'border-gray-200 dark:border-gray-800'
                            "
                        >
                            <div class="flex gap-3">
                                <UIcon
                                    name="i-solar:cup-hot-outline"
                                    class="size-5 shrink-0 mt-0.5 text-muted"
                                />
                                <div class="space-y-1">
                                    <p class="font-medium text-sm">
                                        Mat og drikke
                                    </p>
                                    <p
                                        class="text-sm text-muted leading-relaxed"
                                    >
                                        Jeg ønsker mat og drikke under middag,
                                        og eventuelt annen servering gjennom
                                        dagen. Jeg trenger ikke sitte ved bordet
                                        på middagen, men det er en fordel om jeg
                                        er plassert i nærheten for å dekke taler
                                        osv. Jo tettere jeg er på selskapet, jo
                                        mer får jeg dekket. Dersom måltid ikke
                                        er mulig, faktureres ekstra for kost
                                        gjennom dagen.
                                    </p>
                                </div>
                            </div>
                            <UCheckbox
                                v-model="form.godkjenning.mat"
                                label="Forstått og ordnet"
                            />
                        </div>

                        <div
                            class="rounded-xl border p-4 space-y-3 transition-colors duration-200"
                            :class="
                                form.godkjenning.overtid
                                    ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-950/30'
                                    : 'border-gray-200 dark:border-gray-800'
                            "
                        >
                            <div class="flex gap-3">
                                <UIcon
                                    name="i-solar:clock-circle-outline"
                                    class="size-5 shrink-0 mt-0.5 text-muted"
                                />
                                <div class="space-y-1">
                                    <p class="font-medium text-sm">Overtid</p>
                                    <p
                                        class="text-sm text-muted leading-relaxed"
                                    >
                                        Utover den oppsatte tiden (i
                                        utgangspunktet 12 timer) faktureres hver
                                        påbegynte halvtime med kr 2 500,-. Dette
                                        gjelder forsinkelser eller om dere
                                        ønsker at jeg skal bli værende.
                                    </p>
                                </div>
                            </div>
                            <UCheckbox
                                v-model="form.godkjenning.overtid"
                                label="Forstått og akseptert"
                            />
                        </div>
                        <div
                            class="rounded-xl border p-4 space-y-3 transition-colors duration-200"
                            :class="
                                form.godkjenning.promotering
                                    ? 'border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-950/30'
                                    : 'border-gray-200 dark:border-gray-800'
                            "
                        >
                            <div class="flex gap-3">
                                <UIcon
                                    name="i-solar:clock-circle-outline"
                                    class="size-5 shrink-0 mt-0.5 text-muted"
                                />
                                <div class="space-y-1">
                                    <p class="font-medium text-sm">
                                        Bruk av bilder i promotering (frivillig)
                                    </p>
                                    <p
                                        class="text-sm text-muted leading-relaxed"
                                    >
                                        Jeg ønsker svært gjerne å bruke
                                        blinkskuddene fra dagen i egen
                                        markedsføring. Det vil i hovedsak
                                        omfatte publisering i min portfolio og
                                        sosiale medier, samt sende til
                                        potensielle klienter som ønsker å se
                                        mitt arbeid. Jeg vil alltid sjekke med
                                        dere før jeg publiserer bilder, og dere
                                        har siste ord i om dere ønsker bildene
                                        publisert eller ikke.
                                    </p>
                                </div>
                            </div>
                            <UCheckbox
                                v-model="form.godkjenning.promotering"
                                label="Forstått og akseptert"
                            />
                        </div>
                    </template>

                    <!-- Step 5: Oppsummering -->
                    <template v-else-if="currentStep === 5">
                        <UAlert
                            icon="i-solar:document-text-outline"
                            color="neutral"
                            variant="soft"
                            description="Se gjennom svarene dine og trykk «Send inn» for å sende skjemaet."
                        />

                        <div class="space-y-6 text-sm">
                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Brud
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted">Navn</span
                                    ><span>{{ form.brud.navn || "—" }}</span>
                                    <span class="text-muted">Telefon</span
                                    ><span>{{ form.brud.telefon || "—" }}</span>
                                    <span class="text-muted">E-post</span
                                    ><span>{{ form.brud.epost || "—" }}</span>
                                    <span class="text-muted">Adresse</span
                                    ><span>{{ form.brud.adresse || "—" }}</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Brudgom
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted">Navn</span
                                    ><span>{{ form.brudgom.navn || "—" }}</span>
                                    <span class="text-muted">Telefon</span
                                    ><span>{{
                                        form.brudgom.telefon || "—"
                                    }}</span>
                                    <span class="text-muted">E-post</span
                                    ><span>{{
                                        form.brudgom.epost || "—"
                                    }}</span>
                                    <span class="text-muted">Adresse</span
                                    ><span>{{
                                        form.brudgom.adresse || "—"
                                    }}</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Toastmaster
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted">Navn</span
                                    ><span>{{
                                        form.toastmaster.navn || "—"
                                    }}</span>
                                    <span class="text-muted">Telefon</span
                                    ><span>{{
                                        form.toastmaster.telefon || "—"
                                    }}</span>
                                    <span class="text-muted">E-post</span
                                    ><span>{{
                                        form.toastmaster.epost || "—"
                                    }}</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Adresser
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted"
                                        >Forberedelser brud</span
                                    ><span>{{
                                        form.adresser.forberedelseBrud || "—"
                                    }}</span>
                                    <span class="text-muted"
                                        >Forberedelser brudgom</span
                                    ><span>{{
                                        form.adresser.forberedelseBrudgom || "—"
                                    }}</span>
                                    <span class="text-muted">Vielse</span
                                    ><span>{{
                                        form.adresser.vielse || "—"
                                    }}</span>
                                    <span class="text-muted">Mottakelse</span
                                    ><span>{{
                                        form.adresser.mottakelse || "—"
                                    }}</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Bryllupsdagen
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted"
                                        >Antall gjester</span
                                    ><span>{{
                                        form.antallGjester || "—"
                                    }}</span>
                                    <span class="text-muted">Timeline</span>
                                    <span class="whitespace-pre-wrap">{{
                                        timelineMode === "file"
                                            ? (timelineFile?.name ?? "—")
                                            : form.timeline || "—"
                                    }}</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Fotograferingen
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted"
                                        >Portrettlokasjon</span
                                    >
                                    <span class="whitespace-pre-wrap">{{
                                        form.foto.portrettLokasjon || "—"
                                    }}</span>
                                    <span class="text-muted">Backup</span
                                    ><span>{{
                                        form.foto.portrettBackup || "—"
                                    }}</span>
                                    <span class="text-muted">Shot list</span>
                                    <span class="whitespace-pre-wrap">{{
                                        form.foto.shotList || "—"
                                    }}</span>
                                    <span class="text-muted"
                                        >Spesielle bilder</span
                                    >
                                    <span class="whitespace-pre-wrap">{{
                                        form.foto.spesielleOnsker || "—"
                                    }}</span>
                                    <span class="text-muted"
                                        >Restriksjoner</span
                                    >
                                    <span class="whitespace-pre-wrap">{{
                                        form.foto.restriksjoner || "—"
                                    }}</span>
                                    <span class="text-muted">Blits</span>
                                    <span>{{
                                        form.foto.blits === "ok"
                                            ? "Greit å bruke blits etter behov"
                                            : "Ønsker ikke bruk av blits"
                                    }}</span>
                                </div>
                            </div>

                            <div class="space-y-1">
                                <p
                                    class="text-xs font-mono uppercase tracking-widest text-muted mb-3"
                                >
                                    Godkjenninger
                                </p>
                                <div
                                    class="grid grid-cols-[10rem_1fr] gap-x-4 gap-y-2"
                                >
                                    <span class="text-muted">Utstyrsplass</span>
                                    <span
                                        :class="
                                            form.godkjenning.utstyr
                                                ? 'text-primary'
                                                : 'text-error'
                                        "
                                    >
                                        {{
                                            form.godkjenning.utstyr
                                                ? "✓ Bekreftet"
                                                : "✗ Ikke bekreftet"
                                        }}
                                    </span>
                                    <span class="text-muted"
                                        >Mat og drikke</span
                                    >
                                    <span
                                        :class="
                                            form.godkjenning.mat
                                                ? 'text-primary'
                                                : 'text-error'
                                        "
                                    >
                                        {{
                                            form.godkjenning.mat
                                                ? "✓ Bekreftet"
                                                : "✗ Ikke bekreftet"
                                        }}
                                    </span>
                                    <span class="text-muted">Overtid</span>
                                    <span
                                        :class="
                                            form.godkjenning.overtid
                                                ? 'text-primary'
                                                : 'text-error'
                                        "
                                    >
                                        {{
                                            form.godkjenning.overtid
                                                ? "✓ Bekreftet"
                                                : "✗ Ikke bekreftet"
                                        }}
                                    </span>
                                    <span class="text-muted">Promotering</span>
                                    <span
                                        :class="
                                            form.godkjenning.promotering
                                                ? 'text-primary'
                                                : 'text-error'
                                        "
                                    >
                                        {{
                                            form.godkjenning.promotering
                                                ? "✓ Bekreftet"
                                                : "✗ Ikke bekreftet"
                                        }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </Transition>

            <!-- Navigation -->
            <div
                class="flex items-center justify-between mt-10 pt-6 border-t border-gray-200 dark:border-gray-800"
            >
                <UButton
                    v-if="currentStep > 0"
                    variant="ghost"
                    color="neutral"
                    leading-icon="i-solar:arrow-left-linear"
                    @click="prevStep"
                    >Tilbake</UButton
                >
                <div v-else />

                <UButton
                    v-if="currentStep < steps.length - 1"
                    trailing-icon="i-solar:arrow-right-linear"
                    @click="nextStep"
                    >Neste
                </UButton>
                <UButton
                    v-else
                    trailing-icon="i-solar:paper-plane-2-linear"
                    :loading="submitting"
                    @click="submitForm"
                >
                    Send inn
                </UButton>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "standard",
});

useSeoMeta({
    title: "Bryllupsskjema",
    robots: "noindex, nofollow",
});

const currentStep = ref(0);
const direction = ref<"forward" | "back">("forward");
const submitted = ref(false);
const submitting = ref(false);
const timelineMode = ref<"text" | "file">("text");
const timelineFile = ref<File | null>(null);

const form = reactive({
    brud: { navn: "", telefon: "", epost: "", adresse: "" },
    brudgom: { navn: "", telefon: "", epost: "", adresse: "" },
    toastmaster: { navn: "", telefon: "", epost: "" },
    adresser: {
        forberedelseBrud: "",
        forberedelseBrudgom: "",
        vielse: "",
        mottakelse: "",
    },
    antallGjester: "",
    timeline: "",
    foto: {
        portrettLokasjon: "",
        portrettBackup: "",
        shotList: "",
        spesielleOnsker: "",
        restriksjoner: "",
        blits: "ok",
    },
    godkjenning: {
        utstyr: false,
        mat: false,
        overtid: false,
        promotering: false,
    },
});

const steps = [
    {
        title: "Kontaktinfo",
        subtitle: "Informasjon om brudepar og toastmaster",
    },
    {
        title: "Adresser",
        subtitle: "Steder for forberedelser, vielse og mottakelse",
    },
    { title: "Bryllupsdagen", subtitle: "Antall gjester og timeline" },
    {
        title: "Fotograferingen",
        subtitle: "Portrett, shot list og praktisk info",
    },
    {
        title: "Praktiske avklaringer",
        subtitle: "Les gjennom og bekreft punktene under",
    },
    {
        title: "Oppsummering",
        subtitle: "Se gjennom svarene dine før du sender inn",
    },
];

const blitsOptions = [
    { value: "ok", label: "Greit å bruke blits etter behov" },
    { value: "ikke_onsket", label: "Ønsker ikke bruk av blits" },
];

const transitionName = computed(() =>
    direction.value === "forward" ? "step-forward" : "step-back",
);

function nextStep() {
    direction.value = "forward";
    currentStep.value++;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function prevStep() {
    direction.value = "back";
    currentStep.value--;
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    timelineFile.value = input.files?.[0] ?? null;
}

function clearFile() {
    timelineFile.value = null;
}

async function submitForm() {
    submitting.value = true;
    try {
        const data = new FormData();
        data.append("form-name", "bryllup-skjema");
        data.append("brud-navn", form.brud.navn);
        data.append("brud-telefon", form.brud.telefon);
        data.append("brud-epost", form.brud.epost);
        data.append("brud-adresse", form.brud.adresse);
        data.append("brudgom-navn", form.brudgom.navn);
        data.append("brudgom-telefon", form.brudgom.telefon);
        data.append("brudgom-epost", form.brudgom.epost);
        data.append("brudgom-adresse", form.brudgom.adresse);
        data.append("toastmaster-navn", form.toastmaster.navn);
        data.append("toastmaster-telefon", form.toastmaster.telefon);
        data.append("toastmaster-epost", form.toastmaster.epost);
        data.append("forberedelse-brud", form.adresser.forberedelseBrud);
        data.append("forberedelse-brudgom", form.adresser.forberedelseBrudgom);
        data.append("vielse", form.adresser.vielse);
        data.append("mottakelse", form.adresser.mottakelse);
        data.append("antall-gjester", form.antallGjester);
        if (timelineMode.value === "text") {
            data.append("timeline", form.timeline);
        } else if (timelineFile.value) {
            data.append("timeline-fil", timelineFile.value);
        }
        data.append("portrett-lokasjon", form.foto.portrettLokasjon);
        data.append("portrett-backup", form.foto.portrettBackup);
        data.append("shot-list", form.foto.shotList);
        data.append("spesielle-onsker", form.foto.spesielleOnsker);
        data.append("restriksjoner", form.foto.restriksjoner);
        data.append("blits", form.foto.blits);
        data.append("godkjenning-utstyr", String(form.godkjenning.utstyr));
        data.append("godkjenning-mat", String(form.godkjenning.mat));
        data.append("godkjenning-overtid", String(form.godkjenning.overtid));
        data.append(
            "godkjenning-promotering",
            String(form.godkjenning.promotering),
        );

        await fetch("/", { method: "POST", body: data });
        submitted.value = true;
    } catch {
        // TODO: show error state
    } finally {
        submitting.value = false;
    }
}
</script>

<style scoped>
.step-forward-enter-active,
.step-forward-leave-active,
.step-back-enter-active,
.step-back-leave-active {
    transition:
        opacity 0.2s ease,
        transform 0.2s ease;
}

.step-forward-enter-from {
    opacity: 0;
    transform: translateX(16px);
}

.step-forward-leave-to {
    opacity: 0;
    transform: translateX(-16px);
}

.step-back-enter-from {
    opacity: 0;
    transform: translateX(-16px);
}

.step-back-leave-to {
    opacity: 0;
    transform: translateX(16px);
}

.title-fade-enter-active,
.title-fade-leave-active {
    transition: opacity 0.15s ease;
}

.title-fade-enter-from,
.title-fade-leave-to {
    opacity: 0;
}
</style>
