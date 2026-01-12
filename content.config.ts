import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    prosjekter: defineCollection({
      type: "page",
      source: "prosjekter/*.json",
    }),
    fotoSessions: defineCollection({
      type: "page",
      source: "foto-sessions/*.md",
      schema: z.object({
        name: z.string().min(2).max(100),
        description: z.string().min(10).max(500),
        thumbnail: z.string().min(10).max(100),
        location: z.string(),
        images: z.array(z.string().url()).min(1).max(10),
        timeOfYear: z.string(),
        occasion: z.string(),
      }),
    }),
  },
});
