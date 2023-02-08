<template>
  <div>
    <h1>Home page</h1>

    <Icon name="mdi:account-circle" size="34px" color="red" /><Icon name="🚀" />
    <Icon name="mdi:account-box" size="34px" color="blue" />

    <div class="container">
      <p>Define state: {{ stateData }}</p>
      <HeaderMenu />
    </div>
    <div class="container">
      <DynamicHeading level="1">Render component function</DynamicHeading>
      <DynamicHeading level="3">title smaller</DynamicHeading>
    </div>

    <div class="container">
      <h1>Pinia store</h1>
      <p>
        my store <br />
        {{ countStore.count }} and my name {{ countStore.name }} <br />
        getter: {{ countStore.doubleCount }}
      </p>
      <v-btn @click="countStore.$patch({ count: 24 })">change state</v-btn>
      <v-btn @click="countStore.$reset()">reset store</v-btn>
      <v-btn @click="countStore.increment">use action</v-btn>
      <v-btn @click="name">update name</v-btn>
    </div>
    <div class="container">
      <h2>Use reactive instead of ref for array or object</h2>
      <v-btn @click="reactiveObject.id++">Change ID</v-btn>
      {{ reactiveObject }}
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    const countStore = useCounterStore();

    // to share a data in all the app
    // if more complex = use pinia
    const stateData = useState("stateData", () =>
      Math.round(Math.random() * 1000)
    );

    definePageMeta({
      title: "Home Page",
    });

    // Use reactive to build object being reactive instead of array
    let reactiveObject = reactive({ name: "toto", id: 0 });

    return {
      reactiveObject,
      countStore,
      stateData,
    };
  },
  mounted() {
    const objTest = {
      name: "gg",
      date: "now",
    };
    class User {
      constructor(name, date) {
        (this._name = name), (this._date = date);
        this.add = (a, b) => {
          return a + b;
        };
      }

      full() {
        return this._name + this._date;
      }
    }

    const checkAge = (user, age) => {
      user.age = age;
      if (age < 18) {
        console.log(`This user is not allowed below ${age}`);
      } else {
        return user;
      }
    };

    const user1 = new User("toto", "tomorow");
    const user2 = new User("alex", "yesterday");
    const user3 = checkAge(new User("pierre", "before"), 16);
    const user4 = checkAge(new User("mathieu", "before"), 24);

    user2._name = "alexia";

    console.log(objTest);
    console.log(user1);
    console.log(user2);
    console.log(user2.full());
    console.log(user1.add(5, 10));
    console.log(user3);
    console.log(user4);
  },
  methods: {
    name() {
      this.countStore.updateName("ghsilain");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  border: 2px solid rgb(7, 191, 212);
  margin-block: 20px;
  padding: 10px;
}
</style>
