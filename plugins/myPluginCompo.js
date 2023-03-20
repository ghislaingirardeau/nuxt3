import { defineAsyncComponent } from "vue"; // to lazy load the plugin

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(
    "pluginCompo",
    defineAsyncComponent(() => import("./component/pluginCompo.vue")) // to lazy load the plugin
  );
  const storePinia = useCardsStore();
  console.log(storePinia.languages);
});
