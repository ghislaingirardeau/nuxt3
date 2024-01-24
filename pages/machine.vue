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
    <p>{{ title }}</p>
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
</script>

<style lang="scss" scoped></style>
