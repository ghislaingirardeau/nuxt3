<template>
  <div>
    <h1>SSR (default)</h1>
    <h2>{{ new Date() }}</h2>
    <button @click="show = !show">Plugin Component</button>
    <input type="text" v-model="textPlugin" />
    <div>
      <pluginCompo v-if="show" :text="textPlugin" />
    </div>
  </div>
</template>

<script setup>
const show = ref(false);
const textPlugin = ref("hello from plugin");
// alternatively, you can also use it here
</script>
