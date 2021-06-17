<template>
  <v-card class="mx-auto" max-width="300">
    <v-img class="white--text align-end image" height="200px" :src="data.img">
      <v-card-title>{{ data.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0"> {{ data.subTitle }}</v-card-subtitle>

    <v-card-actions>
      <v-btn :to="data.PathTo" color="white" text>
        {{ data.nameButton }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "card-home",
  props: ["data"],
};
</script>

<style scoped>
.v-card {
  height: 400px;
  display: flex;
  flex-direction: column;
}
.v-card__subtitle {
  font-size: 1.2rem;
}
.v-card__actions button {
  width: 100%;
}
.v-btn {
  width: 100%;
  background-color: var(--second-color);
}

image {
  max-width: 300px;
}

@media (max-width: 576px) {
  .v-card {
    height: 300px;
  }
}
</style>