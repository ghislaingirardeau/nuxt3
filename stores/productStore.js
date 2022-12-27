export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 2,
    name: "Eduardo",
    movies: [],
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    updateName(a) {
      console.log(a);
      this.name = a;
    },
    async getMovies() {
      // useApi = $fetch wrapper
      /* const { Search } = await $fetch(
        `http://www.omdbapi.com/?apikey=8e3f600b&s=batman`
      );
      console.log("load", Search);
      this.movies = [...Search]; */
    },
  },
});
