export const useDataFetch = defineStore("dataFetch", {
  state: () => ({
    movies: [],
    loading: true,
  }),
  actions: {
    async nuxtServerInit() {
      // fectch in the store
      const { data } = await useFetch(
        "http://www.omdbapi.com/?apikey=8e3f600b&s=batman"
      );
      if (data._value.Response) {
        this.loading = false;
        this.movies = data._value.Search;
      }
    },
    getMoviesAfterFetch(datas) {
      // save in the store from fetch app
      console.log(datas);
      datas.Response ? (this.loading = false) : "";
      this.movies = datas.Search;
    },
  },
});
