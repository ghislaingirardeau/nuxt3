<template>
  <div>
    <div class="container">
      <h1>{{ myComputedTtile }}</h1>
      <h2>{{ products }}</h2>
      <PassProps title="Title from parent" @custom-event-name="doThis" />
      <NuxtLink to="/">home</NuxtLink>
    </div>

    <div class="container">
      <h2>Pass v-model parent / children</h2>
      <h3>With Options API</h3>
      <p>
        name from parent: {{ pageTitle.name }} / value from parent:
        {{ pageTitle.value }}
      </p>
      <ChildComponent v-model="pageTitle" />
      <h3>With Compostion API</h3>
      <p>
        name from parent: {{ modelpageTitle.name }} / value from parent:
        {{ modelpageTitle.value }}
      </p>
      <ChildComponent v-model="modelpageTitle" />
      <button @click="send">send new data</button>
    </div>
    <button @click="$router.back()">Go back</button>

    <div class="container">
      <p>
        my store <br />
        {{ countStore.count }} and my name {{ countStore.name }} <br />
        getter: {{ countStore.doubleCount }}
      </p>
    </div>

    <section class="container">
      <form class="ui form">
        <div class="ui segment">
          <div class="field">
            <div class="ui left icon input big">
              <i class="mail icon"></i>
              <input
                ref="inputRef"
                type="email"
                placeholder="Email"
                v-model="user.email"
              />
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input big">
              <i class="lock icon"></i>
              <input
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </div>
          </div>
          <button
            :disabled="isSignupButtonDisabled"
            class="ui button big pink fluid"
            @click="addUser"
          >
            LOG IN
          </button>
          <p>{{ user }}</p>
          <p v-if="user.id">{{ Object.keys(user).length }}</p>
          <button @click="notReactive++">Not reactive</button>
          <p>{{ notReactive }}</p>
          <button @click="variableReactive++">reactive</button>
          <p>{{ variableReactive }}</p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import useModulesTest from "@/modules/modulesTest"; // LIKE MIXING
import { hydrate } from "nuxt/dist/app/compat/capi";
import { useHydration } from "nuxt/dist/app/composables";
export default {
  setup() {
    useHead({
      titleTemplate: "%s - Site Title", // %s GET THE TITLE AND ADD THIS
    });
    // ANIMATE THE PAGE TRANSITION = ANIATION CSS IN INDEX
    definePageMeta({
      /* pageTransition: {
              name: "rotate",
            }, */
      middleware: "authentification", // add middleware to this specific page
    });
    const titleRaw = ref("title computed");
    const countStore = useCounterStore();
    // USE COMPUTED
    const myComputedTtile = computed(() => {
      console.log("computed", titleRaw);
      return titleRaw.value.charAt(0).toUpperCase() + titleRaw.value.slice(1);
    });
    // USE EXTERNAL JS MODULES SCRIPT
    const { products, loadProducts } = useModulesTest();
    // FORM EXAMPLE OF VALIDATION
    const user = reactive({ email: "", password: "" });
    const isSignupButtonDisabled = computed(() => {
      let disabled = true;
      for (let prop in user) {
        if (!user[prop]) {
          disabled = true;
          break;
        }
        disabled = false;
      }
      return disabled;
    });
    const addUser = () => {
      user.id = 5;
    };
    const inputRef = ref(null);
    onBeforeMount(() => {
      loadProducts();
    });

    onMounted(() => {
      document.querySelector("input")?.focus();
    });
    // DIFFERENCE BETWEEN REACTIVE AND NOT
    let notReactive = 0;
    const variableReactive = ref(0);
    const modelpageTitle = reactive({
      name: "ghislain",
      value: "girardeau",
    });
    return {
      inputRef,
      notReactive,
      variableReactive,
      user,
      addUser,
      isSignupButtonDisabled,
      products,
      titleRaw,
      countStore,
      myComputedTtile,
      modelpageTitle,
    };
  },
  data() {
    return {
      pageTitle: {
        name: "ghislain",
        value: "girardeau",
      },
    };
  },
  methods: {
    doThis(payload) {
      console.log(payload);
    },
    send() {
      console.log(this.pageTitle);
    },
  },
  components: { hydrate },
};
</script>

<style lang="scss" scoped>
.container {
  border: 2px solid rgb(7, 191, 212);
  margin-block: 20px;
  padding: 10px;
}
</style>
