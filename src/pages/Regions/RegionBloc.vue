<template>
  <div class="container">
    <Modal v-if="showModal">
      <FormBrazil @cancel="cancel" :data="brazilData" />
    </Modal>
    <div class="row">
      <h3>Region Bloc</h3>
    </div>
    <div class="row">
      <div>
        <button @click="showModal = !showModal" class="btn">Brasil</button>
      </div>
    </div>
  </div>
</template>

<script>
import { brazilInfo } from "../../services/restCountriesApiServices";
import Modal from "../../components/Modal.vue";
import FormBrazil from "./FormBrazil.vue";
export default {
  name: "region-bloc",
  components: { Modal, FormBrazil },
  data() {
    return {
      brazilData: "",
      showModal: false,
    };
  },
  methods: {
    async getBrazilInfo() {
      const { data } = await brazilInfo();
      this.brazilData = data;
    },
    cancel() {
      this.showModal = false;
    },
  },
  created() {
    this.getBrazilInfo();
  },
};
</script>

<style scoped>
.btn {
  background-color: var(--second-color);
  color: #fff;
  width: 10rem;
}
</style>