<template>
  <div class="container">
    <Modal v-if="showModal">
      <Card>
        <Form
          @save="create"
          @cancel="cancel"
          :data="pet"
          @search="searchCode"
        />
      </Card>
    </Modal>

    <button @click="showModal = !showModal" class="btn btnAddPet">Novo Pet</button>
  </div>
</template>

<script>
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Form from "./Form.vue";
import { searchCEP } from "../../services/cepServices";
import moment from "moment";
export default {
  name: "pets-page",
  components: { Modal, Form, Card },
  data() {
    return {
      showModal: false,
      pet: {
        name: "",
        birthDay: null,
        cpf: "",
        income: null,
        typeOfPet: "",
        breed: "",
        address: {
          code: "",
          address: "",
          district: "",
          city: "",
          state: "",
        },
      },
    };
  },
  methods: {
    create() {
      const objModify = {
        ...this.pet,
        birthDay: moment(this.pet.birthDay).format("DD/MM/YYYY"),
      };
      console.log(JSON.stringify(objModify));
      this.showModal = false;
      this.resetPet();
    },
    cancel() {
      this.resetPet(), (this.showModal = false);
    },
    resetPet() {
      this.pet = {
        name: "",
        birthDay: null,
        cpf: "",
        income: null,
        address: {
          code: "",
          address: "",
          district: "",
          city: "",
          state: "",
        },
      };
    },
    async searchCode() {
      const { code, state, city, district, address, status } = await searchCEP(
        this.pet.address.code
      );
      if (status == 200) {
        this.pet.address = { code, state, city, district, address };
      }
    },
  },
};
</script>

<style scoped>

.btnAddPet {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.19);
  background-color: var(--second-color);
  color: #ffffff;
  transition: all 0.1s ease;
  margin-top: 70px;
  height: 48px;
  width: 10rem;
}

.btnAddPet:hover {
  opacity: 90%;
}
</style>