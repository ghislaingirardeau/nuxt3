<template>
  <div>
    <h1>Home page</h1>
    <HeaderMenu />
    <NuxtLink to="about">About </NuxtLink>
    <DynamicHeading level="1">titre</DynamicHeading>
    <DynamicHeading level="2">titre</DynamicHeading>
    <div>
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
  </div>
</template>

<script>
export default {
  setup() {
    const countStore = useCounterStore();

    definePageMeta({
      title: "Home Page",
    });
    return {
      countStore,
    };
  },
  methods: {
    name() {
      this.countStore.updateName("ghsilain");
    },
  },
};
</script>

<style lang="scss" scoped></style>
