import * as CANNON from "cannon-es";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      CANNON: CANNON,
    },
  };
});
