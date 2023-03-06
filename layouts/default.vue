<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-container">
        <Icon name="mdi:menu" size="34px" color="white" @click="showMenu" />
        <span class="text-large font-800 ml-5"> Nuxt 3 tutorial </span>
      </el-header>
      <el-container>
        <ClientOnly>
          <el-aside
            :width="asideWidth"
            class="aside-container"
            :style="{ opacity: drawer ? 0 : 1 }"
          >
            <el-menu class="aside-menu">
              <NuxtLink
                v-for="(item, i) in items"
                :key="i"
                :to="item.to"
                @click="isActive = i"
              >
                <el-menu-item>
                  <Icon :name="item.icon" size="24px" color="black" />
                  <span
                    class="nav-link-text"
                    :style="{ color: isActive === i ? 'red' : 'black' }"
                    >{{ item.title }}</span
                  >
                </el-menu-item>
              </NuxtLink>
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
    isActive: 0,
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
      {
        title: "language",
        to: "language",
        icon: "mdi:house",
      },
    ],
  }),
  methods: {
    showMenu() {
      this.drawer = !this.drawer;
      if (!this.drawer) {
        this.asideWidth = "170px";
      } else {
        this.asideWidth = "0px";
      }
    },
  },
  beforeMount() {
    if (window.innerWidth < 700) {
      this.drawer = true;
      this.asideWidth = "0px";
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
  -webkit-transition: width 1s ease-in-out;
  -moz-transition: width 1s ease-in-out;
  -o-transition: width 1s ease-in-out;
  opacity: 0;
  transition: all 1s ease-in-out;
}
.aside-menu {
  background-color: $asidebg;
  width: 100%;
}
.nav-link-text {
  margin-left: 15px;
  font-weight: bold;
}
.common-layout {
  width: 375px;
}
</style>
