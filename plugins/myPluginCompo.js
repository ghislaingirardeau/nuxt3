import { defineAsyncComponent } from "vue"; // to lazy load the plugin

// TEST DANS LA PAGE SSR
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(
    "pluginCompo",
    defineAsyncComponent(() => import("./component/pluginCompo.vue")) // to lazy load the plugin
  );
});
