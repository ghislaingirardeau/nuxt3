<template>
  <div>
    <h2>child component</h2>
    <input type="text" v-model="modelValue.name" />
    <input type="text" v-model="modelValue.value" />
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
