require("dotenv").config();

export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "My App",
      meta: [{ name: "description", content: "My amazing site." }],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js",
          type: "text/javascript",
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/locale/fr.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  plugins: [
    { src: "~/plugins/datThree.js", mode: "client" },
    { src: "~/plugins/threeInteraction.js", mode: "client" },
    { src: "~/plugins/gsap.js", mode: "client" },
    { src: "~/plugins/moment.js" },
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
    /* "@nuxtjs/tailwindcss", */
    "@element-plus/nuxt",
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
  publicRuntimeConfig: {
    DATABASE: process.env.DATABASE, // can be overridden by NUXT_API_SECRET environment variable
    XRAPIDAPIKEY: process.env.XRAPIDAPIKEY,
    XRAPIDAPIHOST: process.env.XRAPIDAPIHOST,
  },
});
