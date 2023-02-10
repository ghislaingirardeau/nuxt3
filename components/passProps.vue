<template>
  <div>
    <h1>{{ title }}</h1>
    <h2>props test {{ count }} and the result {{ movie }}</h2>
    <p>{{ test }}</p>
    <p>{{ route.path }}</p>
    <input type="text" v-model="movie" />
    <button @click="increase">increase</button>
  </div>
</template>

<script>
export default {
  setup() {
    const count = ref(0);
    const movie = ref();
    const route = useRoute();
    return {
      count,
      movie,
      route,
    };
  },
  data() {
    return {
      test: "Value",
    };
  },
  props: {
    title: String,
  },
  methods: {
    increase() {
      this.count++;
      this.$emit("custom-event-name", { message: "My custom message" });
    },
  },
  mounted() {
    console.log(this.route.path);
  },
};
</script>

<style lang="scss" scoped></style>
