<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card-text class="p-0">Cadastro de Pet</v-card-text>
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
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="data.birthDay"
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
          <v-btn small slot="append">
            <v-icon
              color="green"
              :disabled="data.address.code.length < 9 ? true : false"
              dense
            >
              fas fa-search
            </v-icon></v-btn
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
      <v-col cols="12" sm="6" md="4">
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
      <v-col cols="12" sm="4" md="2">
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
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
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
    // ageIsValid: true,
    // cpfIsValid: false,
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
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    formatDate() {
      this.date.birthDay = moment(this.data.birthDay).format("DD/MM/YYYY");
    },
    ageValid() {
      const today = moment();
      const birthYear = moment(this.data.birthDay);

      console.log(today.diff(birthYear, "years"));
    },
    checkCPF() {
      const result = isValidCPF(this.data.cpf);
      return result;
    },
    // checkCEP() {
    //   const obj = /^\d{5}-\d{3}$/;
    //   // const obj = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;
    //   return this.data.address.code.length > 0 && obj.test(this.dada.address.code)
    //     ? true
    //     : false;
    // },
  },
  watch: {
    ["data.birthDay"]: function () {
      this.ageValid();
    },
    ["data.cpf"]: function () {
      this.checkCPF();
    },
    // ["data.code"]: function () {
    //   this.checkCEP();
    // },
  },
  computed: {
    computedDateFormatted() {
      return moment(this.data.birthDay).format("DD/MM/YYYY");
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
  background-color: #fff;
}

.invalid {
  border: 1px solid red;
}
</style>