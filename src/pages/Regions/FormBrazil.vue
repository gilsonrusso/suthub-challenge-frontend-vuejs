<template>
  <div class="container d-flex flex-column justify-content-between">
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
            <tr v-for="(value, name, index) in item" :key="index">
              <td>{{ name }}</td>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <v-divider></v-divider>
    <button @click="cancel" class="btn btnClose">Close</button>
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
.input-label {
  font-size: 0.7rem;
  color: var(--text-color);
}

.btnClose {
  background-color: var(--second-color);
  color: #fff;
}

</style>