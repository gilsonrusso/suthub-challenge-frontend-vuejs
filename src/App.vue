<template>
  <v-app>
    <header>
      <nav>
        <a href="#"><img src="./assets/logo.png" alt="suthub" /></a>
      </nav>
    </header>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
header nav {
  height: 80px;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid rgba(44, 44, 44, 0.2);
}

img {
  width: 70%;
}
</style>
