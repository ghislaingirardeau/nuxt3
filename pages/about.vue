<template>
  <div>
    <h1>{{ title }}</h1>
    <PassProps title="My props title" @custom-event-name="doThis" />
    <NuxtLink to="/">home</NuxtLink>
    <div>
      <p>name: {{ pageTitle.name }} / value: {{ pageTitle.value }}</p>
      <ChildComponent v-model="pageTitle" />
      <v-btn @click="send">send new data</v-btn>
    </div>
    <button @click="router.back()">Go back</button>
  </div>
</template>

<script>
export default {
  setup() {
    useHead({
      titleTemplate: "%s - Site Title",
    });
    return {};
  },
  data() {
    return {
      about: "about page",
      pageTitle: {
        name: "ghislain",
        value: "girardeau",
      },
    };
  },
  methods: {
    doThis(payload) {
      console.log(payload);
    },
    send() {
      console.log(this.pageTitle);
    },
  },
  computed: {
    title() {
      return this.about.charAt(0).toUpperCase() + this.about.slice(1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
