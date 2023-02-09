<template>
  <div>
    <h1 class="title-color">Home page</h1>

    <Icon name="mdi:account-circle" size="34px" color="red" /><Icon name="🚀" />
    <Icon name="mdi:account-box" size="34px" color="blue" />

    <div class="container">
      <p>Define state: {{ stateData }}</p>
      <HeaderMenu />
    </div>
    <div class="container">
      <DynamicHeading level="1">Render component function</DynamicHeading>
      <DynamicHeading level="3">title smaller</DynamicHeading>
    </div>

    <div class="container">
      <h1>Pinia store</h1>
      <p>
        my store <br />
        {{ countStore.count }} and my name {{ countStore.name }} <br />
        getter: {{ countStore.doubleCount }}
      </p>
      <v-btn @click="countStore.$patch({ count: 24 })">change state</v-btn>
      <v-btn @click="countStore.$reset()">reset store</v-btn>
      <v-btn @click="countStore.increment">use action</v-btn>
      <v-btn @click="name">update name</v-btn>
    </div>
    <div class="container">
      <h2>Use reactive instead of ref for array or object</h2>
      <v-btn @click="reactiveObject.id++">Change ID</v-btn>
      {{ reactiveObject }}
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const countStore = useCounterStore();

    // ACCESS TO THE ENV DATA
    const config = useRuntimeConfig();
    console.log(config.DATABASE);

    // to share a data in all the app
    // if more complex = use pinia
    const stateData = useState("stateData", () =>
      Math.round(Math.random() * 1000)
    );

    definePageMeta({
      title: "Home Page",
    });

    // Use reactive to build object being reactive instead of array
    let reactiveObject = reactive({ name: "toto", id: 0 });

    return {
      reactiveObject,
      countStore,
      stateData,
    };
  },
  mounted() {},
  methods: {
    name() {
      this.countStore.updateName("ghsilain");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 2px solid rgb(7, 191, 212);
  margin-block: 20px;
  padding: 10px;
}
.title-color {
  color: $primary;
}
</style>
