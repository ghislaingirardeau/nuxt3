<template>
  <div>
    <h1>Home page</h1>
    <HeaderMenu />
    <NuxtLink to="about">About </NuxtLink>
    <DynamicHeading level="1">titre</DynamicHeading>
    <DynamicHeading level="2">titre</DynamicHeading>
    <div>
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
  </div>
</template>

<script>
export default {
  setup() {
    const countStore = useCounterStore();

    definePageMeta({
      title: "Home Page",
    });
    return {
      countStore,
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

<style lang="scss" scoped></style>
