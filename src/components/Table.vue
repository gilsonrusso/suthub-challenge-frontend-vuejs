<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Busque na tabela Aqui"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      :headers="headers"
      :items="data"
      item-key="name"
      :loading="loading"
      loading-text="Carregando... Por favor aguarde!"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "table",
  props: ["data", "headers", "loading"],
  data() {
    return {
      search: "",
    };
  },
};
</script>

<style>
</style>