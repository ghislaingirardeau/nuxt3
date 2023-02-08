//USE TO ADD JAVASCRIPT CODE MODULES WITHOUT OVER-CHARGE THE SCRIPT INSIDE THE PAGE
// LIKE MIXING

/* import { reactive, toRefs } from "vue"; */

export default function useProduct() {
  const state = reactive({
    products: [],
  });

  const loadProducts = () => {
    state.products.push("my new product");
  };
  return { ...toRefs(state), loadProducts }; //convert the reactive object into a plain JavaScript object so that I can destructure it when needed.
}
