<template>
  <form @submit.prevent="save" class="form">
    <div class="header">Novo Cadastro</div>
    <v-divider></v-divider>
    <!-- FULL NAME -->
    <div class="row">
      <div class="col-7 py-1">
        <div class="mb-3">
          <label for="inputName" class="input-label">Nome completo</label>
          <input
            v-model="data.name"
            type="text"
            class="form-control"
            id="inputName"
            placeholder="Nome completo"
            minlength="8"
            maxlength="20"
            required
            :class="nameValid"
          />
        </div>
      </div>

      <div class="col-5 py-1">
        <div class="mb-3">
          <label for="inputBirthDate" class="input-label"
            >Data Nascimento</label
          >
          <input
            v-model="data.birthDate"
            type="date"
            class="form-control"
            id="inputBirthDate"
            minlength="18"
            maxlength="65"
            required
          />
        </div>
      </div>
    </div>
    <!-- BIRTHDATE AND CPF -->
    <div class="row">
      <div class="col-7 py-1">
        <div class="mb-1">
          <label for="inputCPF" class="input-label">CPF</label>
          <input
            v-model="data.cpf"
            type="text"
            class="form-control"
            id="inputCPF"
            v-mask="'###.###.###-##'"
            placeholder="999.999.999-99"
            minlength="14"
            maxlength="14"
            required
          />
        </div>
      </div>
      <div class="col-5 py-1">
        <label for="inputIncome" class="input-label">Renda Mensal</label>
        <div class="mb-1 input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">R$:</span>
          </div>
          <input
            v-model="data.income"
            type="text"
            class="form-control"
            id="inputIncome"
            v-mask="'#####.##'"
            minlength="6"
            maxlength="10"
            required
          />
        </div>
      </div>
    </div>
    <!-- ADDRESS -->
    <div class="row">
      <div class="col-5 py-1">
        <label for="inputCode" class="input-label">CEP</label>
        <div class="mb-3 input-group">
          <input
            v-model="data.address.code"
            type="text"
            v-mask="'XXXXX-XXX'"
            class="form-control"
            id="inputCode"
            placeholder="69000-000"
            minlength="9"
            maxlength="9"
            required
          />
          <div class="input-group-prepend">
            <button
              :disabled="codeValid"
              :class="codeValid ? 'btn-second' : 'btn-success'"
              class="input-group-text"
              @click="search"
            >
              <i class="fas fa-search text-white fa-1x"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-7 py-1">
        <div class="mb-3">
          <label for="inputStreet" class="input-label">Rua</label>
          <input
            v-model="data.address.address"
            type="text"
            class="form-control"
            id="inputStreet"
            placeholder="Nome da rua"
            required
            readonly
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4 py-1">
        <div class="mb-3">
          <label for="inputDistrict" class="input-label">Bairro</label>
          <input
            v-model="data.address.district"
            type="text"
            class="form-control"
            id="inputDistrict"
            placeholder="Bairro"
            required
            readonly
          />
        </div>
      </div>
      <div class="col-6 py-1">
        <div class="mb-3">
          <label for="inputCity" class="input-label">Cidade</label>
          <input
            v-model="data.address.city"
            type="text"
            class="form-control"
            id="inputCity"
            placeholder="Cidade"
            required
            readonly
          />
        </div>
      </div>
      <div class="col-2 py-1">
        <div class="mb-3">
          <label for="inputState" class="input-label">Estado</label>
          <input
            v-model="data.address.state"
            type="text"
            class="form-control"
            id="inputState"
            placeholder="UF"
            required
            readonly
          />
        </div>
      </div>
    </div>
    <!-- KIND OF PET -->
    <div class="row">
      <div class="col-3 py-1">
        <div class="mb-1">
          <label for="inputKindOf" class="input-label">Tipo de Pet</label>
          <v-select
            v-model="data.typeOf"
            :items="typeOf"
            label="Escolha"
            dense
            solo
          ></v-select>
        </div>
      </div>
      <div class="col-5 py-1">
        <div class="mb-1">
          <label for="inputTypeOf" class="input-label">Raça do Pet</label>
          <v-select
            :disabled="!data.typeOf"
            v-model="data.breed"
            :items="breeds"
            label="Escolha"
            dense
            solo
          ></v-select>
        </div>
      </div>
      <div class="col-4 py-1" v-if="data.breed === 'Outro'">
        <div class="mb-1">
          <label for="inputOtheBreed" class="input-label">Qual a Raça?</label>
          <input
            v-model="data.otherBreed"
            type="text"
            class="form-control"
            id="inputOtherBreed"
            placeholder="Digite a Raça"
            minlength="15"
            maxlength="25"
            required
          />
        </div>
      </div>
    </div>
    <v-divider></v-divider>
    <div class="footer">
      <button @click="cancel" class="btn btn-cancel">Cancel</button>
      <button type="submit" class="btn btn-save">Save</button>
    </div>
  </form>
</template>

<script>
import { mask } from "vue-the-mask";
import { isValidCPF } from "../../config/validatorCpf";
export default {
  directives: { mask },
  name: "form-pets",
  props: ["data", "typeOf", "breeds"],
  data() {
    return {
      nameIsValid: false,
    };
  },
  methods: {
    save() {
      this.$emit("save");
    },
    cancel() {
      this.$emit("cancel");
    },
    search() {
      this.$emit("search");
    },
    checkName() {
      return this.data.name.length > 8
        ? (this.nameIsValid = false)
        : (this.nameIsValid = true);
    },
    checkCPF() {
      isValidCPF(this.data.cpf);
    },
  },
  computed: {
    nameValid: function () {
      return this.checkName();
    },
    codeValid: function () {
      return this.data.address.code.length < 9 ? true : false;
    },
  },
};
</script>

<style scoped>
.form {
  height: 35rem;
  width: 30rem;
  min-width: 360px;
  background-color: #fff;
  padding: 15px;
}

.header {
  font-weight: bold;
}
.input-label {
  font-size: 0.7rem;
  color: var(--text-color);
}
.footer {
  display: flex;
  justify-content: space-between;
}

.footer .btn {
  width: 6.25rem;
}

.btn {
  color: #fff;
}
.btn-save {
  background-color: var(--second-color);
}
.btn-cancel {
  background-color: var(--text-color);
}
.btn:hover {
  opacity: 90%;
}

.fas {
  height: 24px;
  display: flex;
  align-items: center;
}

.alert {
  padding: 0;
  font-size: 0.6rem;
  color: red;
}
</style>