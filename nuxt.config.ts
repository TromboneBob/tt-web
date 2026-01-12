import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      title: 'Tobias Torjusen',
      htmlAttrs: {
        lang: "no",
        class: "h-full",
      },
      templateParams: {
        separator: '·',
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
    },
  },
  image: {
    format: ['webp', 'jpg', 'avif'],
    quality: 80,
    presets: {
      default: {
        modifiers: {
          quality: 80,
          format: 'webp'
        }
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
  css: ["./app/assets/main.css"],
  fonts: {
    provider: "bunny",
  },
  ogImage: {
    fonts: [
      'Inter:400',
      'Inter:700',
      { name: 'Departure mono', weight: 400, path: '/fonts/DepartureMono-Regular.otf' },
      { name: 'Libre Baskerville', weight: 400, style: 'normal', path: '/fonts/LibreBaskerville-Regular.ttf' },
      { name: 'Libre Baskerville', weight: 400, style: 'italic', path: '/fonts/LibreBaskerville-Italic.ttf' },
    ],
  },
  site: {
    url: 'https://tobiastorjusen.no',
    name: 'Tobias Torjusen',
    description: 'Personal website of Tobias Torjusen',
  },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    // "@nuxt/hints",
    // "nuxt-studio",
    "@nuxtjs/device",
    "@nuxtjs/seo",
  ],
});
