<template>
  <div class="container mx-auto mt-5 p-10 bg-green-200">
    <h1>{{ title }}</h1>
    <!-- <ClientOnly>
      <h2>{{ today }}</h2>
    </ClientOnly> -->
    <h2>{{ today }}</h2>

    <button @click="load = !load">Track</button> {{ load }}
    <p>Mouse position is at: {{ x }}, {{ y }}</p>
    <button @click="object.name = 'gis'">Update object</button>
    {{ object }} {{ afterEffect }}
    <input type="text" ref="myCoolDiv" />
  </div>
</template>
<script setup>
import { useMouse } from "../composables/mouse";

// TO GET THE $vuetify element
/* import { useDisplay } from "vuetify";
const { width } = useDisplay(); */
/* import { useDate } from "../composables/date"; */

const load = ref(true);
const { x, y } = useMouse(); // you can also pass parameters

import moment from "moment";
/* const { today } = useDate("dddd"); */ // send the format of date we want as params
const test = moment().locale("fr").format("dddd");
console.log(test);
const today = ref();
today.value = moment().locale("fr").format("dddd");

const title = ref("Composable playground");

const object = reactive({ name: "toto" });
const afterEffect = ref("");

//REF IS LIKE QUERY ELEMENT IN THE DOM = ACCESSIBLE TO ALL COMPONENTS
const myCoolDiv = ref(null);

onMounted(() => {
  myCoolDiv.value.focus();
  /* console.log(width.value, test); */
});

/* watch(load, (newVal, oldVal) => {
  console.log(newVal, oldVal);
}); */

watchEffect(() => {
  // whenever one of this data change : object or load change
  // watchEffect will be call with the following function
  afterEffect.value = `the name is change to ${object.name} ${load.value}`;
});
</script>

<style lang="scss" scoped></style>
