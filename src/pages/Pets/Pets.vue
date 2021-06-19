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
      Novo Cadastro Pet
    </button>
  </div>
</template>

<script>
import Modal from "../../components/Modal";
import Card from "../../components/Card";
import Form from "./Form.vue";
import { search } from "../../services/cepServices";
export default {
  name: "pets-page",
  components: { Modal, Form, Card },
  data() {
    return {
      showModal: false,
      pet: {
        name: "",
        birthDay: new Date().toISOString().substr(0, 10),
        cpf: "",
        income: "1000,00",
        typeOfPet: "",
        breed:"",
        otherBreed:"",
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
        birthDay: "",
        cpf: "",
        income: "1000,00",
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
      const result = await search(this.pet.address.code);
      if (result.status == 200) {
        this.pet.address = { ...result };
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