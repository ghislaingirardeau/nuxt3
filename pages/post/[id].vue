<template>
  <div>
    {{ route.params.id }}
    {{ data }}
    <button color="info" @click="$router.back()">Go back</button>
  </div>
</template>

<script setup>
const route = useRoute();

/* const { data } = useAsyncData(`/post/${route.params.id}`, () => {
  return $fetch(`http://www.omdbapi.com/?apikey=8e3f600b&i=${route.params.id}`);
}); */

const { data } = await useFetch(
  `http://www.omdbapi.com/?apikey=8e3f600b&i=${route.params.id}`,
  {
    pick: ["Title", "Plot"], // pick only this value to add inside data
    key: `/post/${route.params.id}`,
    onResponse({ request, response }) {
      if (response._data.Error === "Incorrect IMDb ID.") {
        showError({ statusCode: 404, statusMessage: "id not found" });
      }
    },
  }
);
useHead({
  title: data.value.Title,
});
</script>

<style lang="scss" scoped></style>
