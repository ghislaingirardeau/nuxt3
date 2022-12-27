<template>
  <div>
    <NuxtLayout name="default">
      <NuxtPage />
      <!-- <p v-if="fetchMovies.loading">loading...</p>
      <p v-else>movies from pinia: {{ fetchMovies.movies }}</p> -->
      <!-- movies from page: {{ moviesApp }} -->
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>

<script>
export default {
  async setup() {
    const fetchMovies = useDataFetch();
    fetchMovies.nuxtServerInit(); // fetch inside pinia

    /* const { data: moviesApp } = await useLazyFetch(
      // Fetch in the app
      "http://www.omdbapi.com/?apikey=8e3f600b&s=batman"
    ); */
    return {
      fetchMovies,
      /* moviesApp, */
    };
  },
  mounted() {
    /* this.fetchMovies.getMoviesAfterFetch(this.moviesApp); */
    // After app fetch send to the store
  },
};
</script>
