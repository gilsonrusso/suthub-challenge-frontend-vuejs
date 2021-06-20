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
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Pets</li>
      </ol>
    </nav>
    <v-divider></v-divider>
    <button @click="showModal = !showModal" class="btn">
      Novo Pet
    </button>
  </div>
</template>

<script>
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Form from "./Form.vue";
import { searchCEP } from "../../services/cepServices";
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
      listPets: [],
    };
  },
  methods: {
    create() {
      console.log(JSON.stringify(this.pet));
      this.listPets.push(this.pet);
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
.menu {
  margin-top: 15px;
  margin-left: 15px;
}
.btn {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 5px 0 rgba(0, 0, 0, 0.19);
  background-color: var(--second-color);
  color: #ffffff;
  transition: all 0.1s ease;
}

.btn:hover {
  opacity: 90%;
}
</style>