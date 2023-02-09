<template>
  <div>
    <v-layout>
      <v-app-bar color="primary">
        <!-- <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <Icon
          name="mdi:menu"
          size="34px"
          color="white"
          class="ml-4"
          @click.stop="drawer = !drawer"
        /> -->
        <Icon
          name="mdi:menu"
          size="34px"
          color="white"
          @click.stop="drawer = !drawer"
        />

        <v-toolbar-title>My files</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" bottom temporary>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <NuxtLink :to="item.to">
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </NuxtLink>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: "home",
        to: "/",
      },
      {
        title: "about",
        to: "about",
      },
      {
        title: "vue Use",
        to: "vueUse",
      },
      {
        title: "ThreeJS",
        to: "ThreeJs",
      },
      {
        title: "Composable",
        to: "composable",
      },
    ],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
