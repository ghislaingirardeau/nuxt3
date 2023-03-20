<template>
  <div ref="el">{{ props.text }}</div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const el = ref(null);

onMounted(() => {
  console.log("component mounted", el.value.parentNode);
  el.value.parentNode.style.backgroundColor = "red"; // get the parent element
});
onUpdated(() => {
  console.log("component updated"); // when update the parent, avoid to create multiple component
});
onUnmounted(() => {
  console.log("component unmounted"); //avoid to create multiple component, and to overcharge the script
});
</script>

<style lang="scss" scoped></style>
