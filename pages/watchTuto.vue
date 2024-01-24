<template>
  <div>
    <h2>Différence Watch & watchEffect</h2>
    <input v-model="title" type="text" />
    {{ product.price }} = {{ product.quantity }} * 10
    <input v-model="product.quantity" type="number" />
    <p>{{ product.title }}</p>
  </div>
</template>

<script setup>
const title = ref("hello");
const product = ref({
  price: 10,
  quantity: 1,
  title: "hello",
});

// DIFFERENCE WATCH AND WATCH EFFECT
// WATCH A PARTICULAR DATA
/* watch(
  product.value,
  (newVal, oldVal) => {
    product.value.price = newVal.quantity * 10;
  },
  { immediate: true }
); */

// WATCH EVERY CHANGE DATA ON CHANGE, NOT A SPECIFIC ONE
watchEffect(() => {
  console.log("watch effect");
  product.value.price = product.value.quantity * 10;
  product.value.title = title.value;
});
</script>

<style lang="scss" scoped></style>
