// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "My App",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "My amazing site." },
      ],
      script: [
        /* {
          src: "https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js",
          integrity:
            "sha512-avLcnGxl5mqAX/wIKERdb1gFNkOLHh2W5JNCfJm5OugpEPBz7LNXJJ3BDjjwO00AxEY1MqdNjtEmiYhKC0ld7g==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        }, */
      ],
    },
  },
  css: ["vuetify/lib/styles/main.sass"],
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
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "@vueuse/nuxt",
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
});
