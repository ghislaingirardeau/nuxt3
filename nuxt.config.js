require("dotenv").config();

export default defineNuxtConfig({
  ssr: true, // DEFAULT
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",
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
  routeRules: {
    // ssr est true par defaut
    // tuto : C:\Users\ghisl\OneDrive\Documents\Formation\Memo global\vuejs
    "/swr": { swr: true }, // WORK ON DEPLOY NETLIFY
    "/static": { static: true }, // WORK ON DEPLOY NETLIFY
    "/spa": { ssr: false },
    // Add redirect headers
    /* '/old-page': { redirect: '/new-page' },
    '/old-page2': { redirect: { to: '/new-page', statusCode: 302 } } */
  },

  plugins: [
    { src: "~/plugins/datThree.js", mode: "client" },
    { src: "~/plugins/threeInteraction.js", mode: "client" },
    { src: "~/plugins/gsap.js", mode: "client" },
    { src: "~/plugins/moment.js" },
    { src: "~/plugins/myPluginCompo.js" },
  ],
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
    css: {
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
    XRAPIDAPIHOSTTTS: process.env.XRAPIDAPIHOSTTTS,
  },
});
