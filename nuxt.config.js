// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [],
    },
  },
  css: [
    "vuetify/lib/styles/main.sass",
    /* "@mdi/font/css/materialdesignicons.min.css", */
  ],
  build: {
    transpile: ["vuetify"],
  },
  plugins: [
    { src: "~/plugins/datThree.js", mode: "client" },
    { src: "~/plugins/threeInteraction.js", mode: "client" },
    { src: "~/plugins/gsap.js", mode: "client" },
  ],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
      // CONFIG GLOBAL VARIABLES FOR SASS
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/_colors.scss" as *;',
        },
      },
    },
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "@vueuse/nuxt",
    "nuxt-icon",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore", // import { defineStore } from 'pinia'
          ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
  ],
  privateRuntimeConfig: {
    DATABASE: process.env.DATABASE, // can be overridden by NUXT_API_SECRET environment variable
  },
});
