<template>
  <div>
    <h1>Vue use page</h1>
    <p>my mouse : {{ x }} and {{ y }}</p>
    <p>my batterie: {{ battery }}</p>
    <div>
      <v-text-field label="write the text to copy" v-model="source">
      </v-text-field>
      <button @click="copy()">
        <span v-if="!copied">Copy</span>
        <span v-else>Copied!</span>
      </button>
    </div>
    <div>
      <p>{{ count }}</p>
      <v-btn color="secondary" @click="count++">increment</v-btn>
      <v-btn color="secondary" @click="undo">undo</v-btn>
      <v-btn color="secondary" @click="redo">redo</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const { x, y } = useMouse();
    const battery = useBattery();
    const source = ref();
    const { text, copy, copied, isSupported } = useClipboard({ source });
    const count = ref(0);
    const { history, undo, redo } = useRefHistory(count);

    return {
      x,
      y,
      battery,
      text,
      copy,
      copied,
      isSupported,
      source,
      count,
      history,
      undo,
      redo,
    };
  },
};
</script>

<style lang="scss" scoped></style>
