<template>
    <div class="fixed top-0 w-full z-50 flex justify-center">
        <nav class="px-4 sm:px-6 lg:px-8">
            <ul
                class="flex items-center my-4 px-3 text-sm font-medium text-gray-800 rounded-xl shadow-lg bg-white/90 shadow-gray-800/5 ring-1 backdrop-blur dark:bg-gray-800/90 dark:text-gray-200 dark:ring-white/20 ring-gray-900/5">
                <li v-for="item in items" :key="item.path">
                    <UTooltip :text="item.name" :ui="{ popper: { strategy: 'absolute' } }">
                        <ULink :to="item.path"
                            class="relative px-3 py-4 flex items-center justify-center transition hover:text-primary-500 dark:hover:text-primary-400"
                            active-class="text-primary-600 dark:text-primary-400">
                            <div class="flex flex-col items-center justify-center">
                                <Icon aria-hidden="true" :name="item.icon" class="w-5 h-5 z-10" />
                                <!-- <h4 v-if="isMobile" class="text-xs z-10">
                                    {{ item.name }}
                                </h4> -->
                            </div>
                            <span v-if="isActive(item.path)"
                                class="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-primary-500/0 via-primary-500/70 to-primary-500/0 dark:from-primary-400/0 dark:via-primary-400/40 dark:to-primary-400/0" />
                            <span v-if="isActive(item.path)"
                                class="absolute sm:h-8 sm:w-8 h-8 w-8 z-0 rounded-xl bg-gray-100 dark:bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                            <span class="sr-only">{{ item.name }}</span>
                        </ULink>
                    </UTooltip>
                </li>
                <li class="flex-1" />
            </ul>
        </nav>
    </div>
</template>

<script setup>
const items = [
    { name: "Hjem", path: "/", icon: "solar:home-smile-outline" },
    {
        name: "Foto",
        path: "/foto",
        icon: "solar:camera-outline",
    },
    {
        name: "Prosjekter",
        path: "/prosjekter",
        icon: "solar:ruler-cross-pen-outline",
    },
    // {
    //     name: "Favoritter",
    //     path: "/favoritter",
    //     icon: "solar:star-outline",
    // },
    {
        name: "Bobbi",
        path: "/bobbi",
        icon: "ph:dog",
    },
];

const route = useRoute();

const isActive = (itemPath) => {
    if (itemPath === "/") {
        return route.path === "/";
    }
    return route.path.startsWith(itemPath);
};
</script>
