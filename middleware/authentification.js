export default defineNuxtRouteMiddleware((to, from) => {
  // add route guards : exemple if not auth
  // return abortNavigation("You are not allowed to visit this page") will send a error on the page not allowed
  // return navigateTo("/login") if not connected for example
});

// TO MAKE IT GLOBAL :
// - name the file authenfication.global.js
// - remove the definePageMeta/middleware on the specific page
// = now it apply to all the pages
