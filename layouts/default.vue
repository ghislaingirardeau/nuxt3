<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container">
        <Icon name="mdi:menu" size="34px" color="white" @click="showMenu" />
        <span class="text-large font-800 ml-5"> Nuxt 3 tutorial </span>
      </el-header>
      <el-container>
        <ClientOnly>
          <el-aside :width="asideWidth" class="aside-container">
            <el-menu default-active="0" :collapse="drawer" class="aside-menu">
              <el-menu-item
                v-for="(item, i) in items"
                :key="i"
                :index="i.toString()"
                @click="$router.push(item.to)"
              >
                <Icon :name="item.icon" size="24px" color="black" />
                <template #title
                  ><NuxtLink :to="item.to" class="ml-3">
                    {{ item.title }}
                  </NuxtLink></template
                >
              </el-menu-item>
            </el-menu>
          </el-aside>
        </ClientOnly>
        <el-main><slot /></el-main>
      </el-container>
    </el-container>
    <!-- <v-layout>
      <v-app-bar color="primary">
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
    </v-layout> -->
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    asideWidth: "170px",
    items: [
      {
        title: "home",
        to: "/",
        icon: "mdi:house",
      },
      {
        title: "about",
        to: "about",
        icon: "mdi:plus",
      },
      {
        title: "vue Use",
        to: "vueUse",
        icon: "mdi:circle",
      },
      {
        title: "ThreeJS",
        to: "ThreeJs",
        icon: "mdi:house",
      },
      {
        title: "Composable",
        to: "composable",
        icon: "mdi:house",
      },
    ],
  }),
  methods: {
    showMenu() {
      this.drawer = !this.drawer;
    },
  },
  beforeMount() {
    if (window.innerWidth < 700) {
      this.drawer = true;
      this.asideWidth = "70px";
    }
  },
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.header-container {
  background-color: $btnColor;
  padding-top: 10px;
}
.aside-container {
  background-color: $asidebg;
  border-right: 2px solid rgb(156, 153, 153);
  border-top: 2px solid rgb(156, 153, 153);
}
.aside-menu {
  background-color: $asidebg;
  width: 100%;
}
</style>
