import { InteractionManager } from "three.interactive";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      InteractionManager: InteractionManager,
    },
  };
});
