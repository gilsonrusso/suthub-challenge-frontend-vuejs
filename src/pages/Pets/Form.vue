<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card-title class="p-0">Cadastro de Pet</v-card-title>
    <v-divider></v-divider>
    <v-row>
      <v-col>
        <v-text-field
          dense
          label="Name"
          v-model="data.name"
          type="text"
          required
          :counter="30"
          minlength="8"
          maxlength="30"
          :rules="nameRules"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              dense
              label="Nascimento"
              v-model="computedDateFormatted"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
              :rules="[
                (dateRules && computedAgeValid) ||
                  'Permitido entre 18 e 65 anos.',
              ]"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data.birthDay"
            required
            no-title
            @input="menu2 = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          dense
          label="CPF"
          v-model="data.cpf"
          required
          :counter="14"
          minlength="14"
          maxlength="14"
          v-mask="'###.###.###-##'"
          :rules="[(cpfRules && computedCpf) || 'Número de CPF Inválido!']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          prepend-icon="mdi-currency-brl"
          dense
          v-model="data.income"
          v-mask="'######,##'"
          :counter="9"
          minlength="4"
          maxlength="9"
          label="Renda Mensal"
          required
          :rules="incomeRules"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          dense
          label="CEP"
          v-model="data.address.code"
          :counter="9"
          required
          minlength="9"
          maxlength="9"
          v-mask="'XXXXX-XXX'"
          :rules="codeRules"
        >
          <v-btn
            small
            slot="append"
            :disabled="data.address.code.length < 9 ? true : false"
            @click="searchCEP"
          >
            <v-icon dense color="green"> fas fa-search </v-icon></v-btn
          >
        </v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          dense
          label="Rua"
          type="text"
          v-model="data.address.address"
          required
          :counter="30"
          minlength="11"
          maxlength="30"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          dense
          label="Bairro"
          type="text"
          v-model="data.address.district"
          required
          :counter="20"
          minlength="5"
          maxlength="20"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="5">
        <v-text-field
          dense
          label="Cidade"
          type="text"
          v-model="data.address.city"
          required
          :counter="20"
          minlength="5"
          maxlength="20"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4" md="3">
        <v-text-field
          dense
          label="UF"
          v-model="data.address.state"
          required
          :counter="2"
          minlength="2"
          maxlength="2"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-select
          dense
          label="Tipo de Animal"
          required
          v-model="data.typeOfPet"
          :items="typeOfPet"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-select
          dense
          label="Raça"
          v-model="data.breed"
          required
          :items="data.typeOfPet == 'Gato' ? catBreeds : dogBreeds"
          :disabled="data.typeOfPet == ''"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-if="data.breed == 'Outras'"
          dense
          label="Outra Raça"
          v-model="data.otherBreed"
          required
          :counter="11"
          minlength="5"
          maxlength="11"
          :rules="[(v) => !!v || 'Campo Requerido!']"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col class="d-flex justify-content-center" cols="12" sm="6" md="6">
        <v-btn class="cancel" color="lighten-2" @click="cancel"> Cancelar </v-btn>
      </v-col>
      <v-col class="d-flex justify-content-center" cols="12" sm="6" md="6">
        <v-btn class="save" @click="save"> Salvar </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import moment from "moment";
import { mask } from "vue-the-mask";
import { isValidCPF } from "../../config/validatorCpf";
export default {
  directives: { mask },
  props: ["data"],
  data: () => ({
    menu2: false,
    valid: true,
    typeOfPet: ["Cão", "Gato"],
    dogBreeds: [
      "Pastor-alemão",
      "Buldogue",
      "Labrador",
      "Poodle",
      "Maltês",
      "Outras",
    ],
    catBreeds: ["Siamês", "Ragdoll", "Persa", "Bombaim", "Angorá", "Outras"],
    nameRules: [
      (v) => !!v || "Nome é Obrigatório!",
      (v) => (v && v.length >= 8) || "Nome tem que ser maior que 8 caracteres!",
    ],
    cpfRules: [
      (v) => !!v || "CPF é Obrigatório!",
      (v) => (v && v.length == 14) || "CPF tem que ter 14 caracteres!",
    ],
    incomeRules: [
      (v) => !!v || "Renda Mensal Obrigatória!",
      (v) => (v && v.length >= 4) || "No mínimo 1000 reais!",
    ],
    codeRules: [
      (v) => !!v || "CEP é Obrigatório!",
      (v) => (v && v.length >= 9) || "CEP tem que ter 9 caracteres!",
    ],
    dateRules: [
      (v) => !!v || "Data é Obrigatório!",
      (v) => (v && v.length == 10) || "Data tem que ter 10 caracteres!",
    ],
  }),

  methods: {
    save() {
      this.$refs.form.validate();
      if (this.valid) {
        this.$emit("save");
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.$emit("cancel");
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    formatDate() {
      this.date.birthDay = moment(this.data.birthDay).format("DD/MM/YYYY");
    },
    ageIsValid() {
      const today = moment();
      const birthYear = moment(this.data.birthDay);
      const value = today.diff(birthYear, "years");

      if (value >= 18 && value <= 65) {
        return true;
      }
      return false;
    },
    checkCPF() {
      const result = isValidCPF(this.data.cpf);
      return result;
    },
    searchCEP() {
      this.$emit("search");
    },
  },
  watch: {
    ["data.birthDay"]: function () {
      this.ageIsValid();
    },
    ["data.cpf"]: function () {
      this.checkCPF();
    },
  },
  computed: {
    computedDateFormatted() {
      return moment(this.data.birthDay).format("DD/MM/YYYY") || "0000-00-00";
    },
    computedAgeValid() {
      return this.ageIsValid();
    },
    computedCpf() {
      return this.checkCPF();
    },
    computedCEP() {
      return this.checkCEP();
    },
  },
};
</script>

<style scoped>
.v-form {
  width: 100%;
}
.v-btn {
  color: #fff;
  width: 50%;
}
.save {
  background-color: var(--second-color) !important;
}
.cancel {
  background-color: var(--main-color) !important;
}
</style>