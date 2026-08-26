import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  experimental: { prefetchPreloadTags: true },
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  routeRules: {
    "/foto-sessions/**": { prerender: true },
  },
  sitemap: {
    zeroRuntime: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/foto/bryllup/skjema"],
      ignore: ["/__og-image__/**"],
    },
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: "Tobias Torjusen",
      htmlAttrs: {
        lang: "no",
        class: "h-full",
      },
      templateParams: {
        separator: "·",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
    },
  },
  image: {
    format: ["webp", "jpg", "avif"],
    quality: 80,
    presets: {
      default: {
        modifiers: {
          quality: 80,
          format: "webp",
        },
      },
      listThumb: {
        modifiers: {
          format: "avif",
          width: 120,
          height: 120,
        },
      },
      sqThumb: {
        modifiers: {
          format: "jpg",
          width: 400,
          height: 400,
        },
      },
    },
  },
  ui: {
    colorMode: false,
    theme: {
      colors: [
        "primary",
        "secondary",
        "winter",
        "summer",
        "autumn",
        "spring",
        "info",
        "success",
        "warning",
        "error",
      ],
    },
  },
  css: ["~/assets/main.css"],
  fonts: {
    provider: "bunny",
    families: [
      {
        name: "Inter",
        weight: [400, 700],
        global: true,
      },
      {
        name: "Departure mono",
        weight: 400,
        src: "/fonts/DepartureMono-Regular.woff2",
        global: true,
      },
      {
        name: "Libre Baskerville",
        weight: 400,
        style: "normal",
        global: true,
      },
      {
        name: "Libre Baskerville",
        weight: 400,
        style: "italic",
        global: true,
      },
    ],
  },
  icon: {
    clientBundle: {
      scan: false,
      icons: [
        "solar:home-smile-outline",
        "solar:camera-outline",
        "solar:ruler-cross-pen-outline",
        "ph:dog",
      ],
    },
  },
  ogImage: {},
  site: {
    url: "https://tobiastorjusen.no",
    name: "Tobias Torjusen",
    description: "Personal website of Tobias Torjusen",
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image", // "@nuxt/hints",
    // "nuxt-studio",
    "@nuxtjs/device",
    "@nuxtjs/seo",
    "@vueuse/nuxt",
  ],
});
