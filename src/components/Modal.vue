<template>
  <div class="overlay">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "modal",
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  font-size: 1rem;
}
</style>