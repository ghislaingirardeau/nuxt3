export function useDate(params) {
  const { $moment } = useNuxtApp();

  const today = ref();

  if ($moment) {
    console.log("from plugins", $moment().format(params));
    today.value = $moment().format(params);
  }

  return { today };
}
