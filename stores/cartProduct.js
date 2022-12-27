export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: 200,
    by: "gigi",
    movies: [],
  }),
  getters: {
    doubleCount: (state) => state.cart * 2,
  },
  actions: {
    increment() {
      this.cart++;
    },
    updateName(a) {
      console.log(a);
      this.by = a;
    },
    async getMovies() {
      // useApi = $fetch wrapper
      const data = await useApi(
        `http://www.omdbapi.com/?apikey=8e3f600b&s=batman`,
        {
          method: "GET",
        }
      );

      this.movies = [...data];
    },
  },
});
