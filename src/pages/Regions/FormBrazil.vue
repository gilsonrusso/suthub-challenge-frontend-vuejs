<template>
  <div class="container card">
    <v-card-title> Brasil </v-card-title>
    <v-divider></v-divider>
    <div class="row">
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Informações</th>
            </tr>
          </thead>
          <tbody v-for="item in data" :key="item.name">
            <tr v-for="(value, name) in item" :key="value.numericCode">
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-divider></v-divider>
    <button @click="cancel" class="btn">Close</button>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
export default {
  directives: { mask },
  name: "form-brazil",
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped>
.card {
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
  background-color: var(--second-color);
  color: #fff;
}

.btn:hover {
  opacity: 90%;
}
</style>