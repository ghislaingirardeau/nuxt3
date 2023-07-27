<template>
  <div>
    <h1>Tutorial Machine à Etats link with Pinia</h1>
    <p>Etat machine: {{ machine.etat }}</p>
    <input
      v-model="title"
      type="text"
      :disabled="machine.etat === 'edit' ? false : true"
    />
    <button @click="doEdit">Edit</button>
    <button @click="doSubmit">Submit</button>
    <button @click="doReset">Reset</button>
    <p>
      {{
        machine.etat === "success"
          ? "title has been change"
          : machine.etat === "Idle"
          ? "Edit Title"
          : "Change the title"
      }}
    </p>
    <div>
      {{ product.price }} = {{ product.quantity }} * 10
      <input v-model="product.quantity" type="number" />
      {{ product.title }}
    </div>
  </div>
</template>

<script setup>
const title = ref("hello");
const machine = useMachine();

const doEdit = () => {
  machine.transitionEdit();
};
const doReset = () => {
  machine.transitionIdle();
};
const doSubmit = () => {
  machine.transitionSubmit(title.value, "hello");
};

const product = ref({
  price: 10,
  quantity: 1,
  title: "hello",
});

/* watch(
  product.value,
  (newVal, oldVal) => {
    product.value.price = newVal.quantity * 10;
  },
  { immediate: true }
); */
watchEffect(() => {
  console.log("watch effect");
  product.value.price = product.value.quantity * 10;
  product.value.title = title.value;
});
</script>

<style lang="scss" scoped></style>
