<template>
  <div>
    <h2>Fetch datas</h2>
    <h3>voici les changements {{ message }}</h3>
    <p>Using state from parents(index): {{ stateData }}</p>
    <div class="preview">
      <div v-for="item in movieFromFetch" :key="item.imdbID">
        <NuxtLink :to="{ name: 'post-id', params: { id: item.imdbID } }"
          >{{ item.Title }}
          <img :src="item.Poster" alt="" />
        </NuxtLink>
      </div>
    </div>
    <v-btn color="secondary" @click="search">load movies</v-btn>
  </div>
</template>

<script>
export default {
  setup() {
    const message = ref();
    message.value = "mon messages";
    const movie = ref([]);
    const movieFromFetch = ref([]);
    const stateData = useState("stateData");

    /* const { data } = useAsyncData(() => {
      return $fetch(`http://www.omdbapi.com/?apikey=8e3f600b&s=batman`);
    });
    console.log(data); */

    return {
      message,
      movie,
      movieFromFetch,
      stateData,
    };
  },
  mounted() {},
  methods: {
    doThis(payload) {
      console.log(payload);
    },
    async search() {
      const { Search } = await $fetch(
        `http://www.omdbapi.com/?apikey=8e3f600b&s=batman`
      );
      this.movieFromFetch = Search;
    },
  },
};
</script>

<style scoped>
.preview {
  width: 200px;
}
</style>
