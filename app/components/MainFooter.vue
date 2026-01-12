<template>
    <footer class="mt-24 py-16 text-center font-mono bg-primary-700 text-white">
        <UContainer>
            <div class="text-2xl">
                La oss skape noe sammen!
            </div>
            <div class="hover:text-primary-400 transition-colors mt-2 cursor-pointer inline-block" @click="copyEmail">
                tobiastorjusen@icloud.com
                <UIcon name="i-pixelarticons:copy" />
            </div>
            <Teleport to="body">
                <Transition name="tooltip">
                    <div v-if="showTooltip" :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
                        class="fixed px-3 py-1 bg-white text-primary-700 text-sm rounded shadow-lg whitespace-nowrap pointer-events-none z-50 font-mono">
                        Kopiert!
                        <div
                            class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white">
                        </div>
                    </div>
                </Transition>
            </Teleport>
            <div class="flex justify-center items-center mt-4 pt-4 opacity-60 border-t-white border-t">
                <p class="text-sm">© 2025 Tobias Torjusen</p>
            </div>
        </UContainer>
    </footer>
</template>

<script setup lang="ts">

const showTooltip = ref(false);
const tooltipX = ref(0);
const tooltipY = ref(0);

function copyEmail(event: MouseEvent) {
    navigator.clipboard.writeText('tobiastorjusen@icloud.com');

    // Position tooltip at cursor with offset
    tooltipX.value = event.clientX - 30; // Center the tooltip
    tooltipY.value = event.clientY - 40; // Position above cursor

    showTooltip.value = true;
    setTimeout(() => {
        showTooltip.value = false;
    }, 2000);
}
</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.tooltip-enter-from {
    opacity: 0;
    transform: translateY(4px);
}

.tooltip-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
