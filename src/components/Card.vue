<template>
  <v-card v-scroll.self="onScroll" class="mx-auto overflow-y-auto px-5 py-5 animationMoveRight">
    <slot></slot>
  </v-card>
</template>

<script>
export default {
  name: "card",
  data: () => ({
    scrollInvoked: 0,
  }),

  methods: {
    onScroll() {
      this.scrollInvoked++;
    },
  },
};
</script>

<style scoped>
.v-card {
  min-height: 300px;
  width: 500px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 576px) {
  .v-card {
    /* min-width: 360px; */
    height: 100%;
    width: 100%;
  }
}
</style>