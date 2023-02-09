<template>
  <div>
    <h1>{{ title }}</h1>
    <v-btn @click="load = !load">Track</v-btn> {{ load }}
    <p>Mouse position is at: {{ x }}, {{ y }}</p>
    <v-btn @click="object.name = 'gis'">Update object</v-btn>
    {{ object }} {{ afterEffect }}
    <input type="text" ref="myCoolDiv" />
  </div>
</template>

<script setup>
import { useMouse } from "../composables/mouse";
const load = ref(true);
const { x, y } = useMouse(); // you can also pass parameters
const title = ref("Composable playground");

const object = reactive({ name: "toto" });
const afterEffect = ref("");

//REF IS LIKE QUERY ELEMENT IN THE DOM = ACCESSIBLE TO ALL COMPONENTS
const myCoolDiv = ref(null);
onMounted(() => {
  myCoolDiv.value.focus();
});

/* watch(load, (newVal, oldVal) => {
  console.log(newVal, oldVal);
}); */

watchEffect(() => {
  // whenever one of this data change : object or load change
  // watchEffect will be call with the following function
  afterEffect.value = `the name is change to ${object.name} ${load.value}`;
  console.log("apply effect watch");
});
</script>

<style lang="scss" scoped></style>
