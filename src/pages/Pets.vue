<template>
  <div>
    <div class="menu">
      <button @click="showModal = !showModal" class="btn">
        Novo Cadastro Pet
      </button>
    </div>
    <Modal
      v-if="showModal"
      :data="pet"
      @save="create"
      @cancel="cancel"
      @search="searchCode"
      :typeOf="typeOfPet"
      :breeds="pet.typeOf === 'Gato' ? catBreeds : dogBreeds"
    />
  </div>
</template>

<script>
import Modal from "../components/Modal";
// import axios from "axios";
import { search } from "../services/cepServices";
export default {
  name: "pets-page",
  components: { Modal },
  data() {
    return {
      showModal: false,
      pet: {
        name: "",
        birthDate: "",
        cpf: "",
        income: "1000,00",
        address: {
          code: "",
          address: "",
          district: "",
          city: "",
          state: "",
        },
      },
      listPets: [],
      typeOfPet: ["Cão", "Gato"],
      dogBreeds: [
        "Pastor-alemão",
        "Buldogue",
        "Labrador",
        "Poodle",
        "Maltês",
        "Outro",
      ],
      catBreeds: ["Siamês", "Ragdoll", "Persa", "Bombaim", "Angorá", "Outro"],
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
        birthDate: "",
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