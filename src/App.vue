<template>
  <v-app>
    <header>
      <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

      <v-app-bar fixed color="grey lighten-5 accent-4" dark>
        <v-app-bar-nav-icon
          color="green darken-2"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title
          ><img src="./assets/logo.png" alt="suthub"
        /></v-toolbar-title>

        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group
            v-model="group"
            active-class="light-green--text lighten-1"
          >
            <router-link to="/" exact>
              <v-list-item> Home </v-list-item>
            </router-link>

            <router-link to="/pets">
              <v-list-item> Pets </v-list-item>
            </router-link>

            <router-link to="/regions">
              <v-list-item> Regions Bloc </v-list-item>
            </router-link>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style scoped>
.v-item-group a {
  text-decoration: none;
}

.v-app-bar {
  box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.2) !important;
}

img {
  width: 50%;
}
</style>
