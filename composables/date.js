export function useDate(params) {
  const { $moment } = useNuxtApp();

  const today = ref();

  if ($moment) {
    console.log("from plugins", $moment().locale("es").format(params));
    today.value = $moment().locale("es").format(params);
  }

  return { today };
}
