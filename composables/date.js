export function useDate(params) {
  const { $moment } = useNuxtApp();

  const today = ref();

  if ($moment) {
    $moment().locale("fr");
    console.log($moment().locale("fr").format(params));
    today.value = $moment().locale("fr").format(params);
  }

  return { today };
}
