// TO SIMULATE AN API SERVER RESPONSE = await $fetch('/api/hello/ghislain')
// https://nuxt.com/docs/guide/directory-structure/server#example

export default defineEventHandler(
  (event) => `Hello, ${event.context.params.name}!`
);
