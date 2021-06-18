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
      item-key="index"
      :loading="loading"
      loading-text="Carregando... Por favor aguarde!"
      class="elevation-1"
      :search="search"
      @click:row="clickedItem"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "table-viewer",
  props: ["data", "headers", "loading"],
  data() {
    return {
      search: "",
    };
  },
  methods: {
    clickedItem(item) {
      let exists = Object.values(this.headers[1]).includes("Idioma");
      if (exists) {
        this.$emit("clicked", item);
      }
    },
  },
};
</script>

<style>
</style>