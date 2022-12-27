<template>
  <div>
    <h2>child component</h2>
    <v-text-field
      label="Change the props"
      v-model="modelValue.name"
    ></v-text-field>
    <v-text-field
      label="Change the props"
      v-model="modelValue.value"
    ></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Object,
  },
  emits: ["update:modelValue"],
  /* methods: {
    changePageTitle(title) {
      this.$emit("update:modelValue", title); // previously was `this.$emit('input', title)`
    },
  }, */
};
</script>

<style lang="scss" scoped></style>
