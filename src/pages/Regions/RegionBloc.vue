<template>
  <div class="container">
    <Modal v-if="showModal">
      <FormBrazil @cancel="cancel" :data="brazilData" />
    </Modal>

    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">
          Bloco Regional
        </li>
      </ol>
    </nav>

    <v-row class="d-flex justify-content-end">
      <v-col cols="12" xs="12" sm="12" md="3" lg="3" class="search">
        <v-text-field
          dense
          outlined
          label="Busque por nomes"
          append-icon="mdi-magnify"
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" class="d-flex filter">
        <!-- <span class="py-1 mr-1"><strong>Filtros:</strong></span> -->
        <v-select
          dense
          label="Escolha o bloco"
          solo
          v-model="selectedBloc"
          :items="listRegionalBloc"
          item-text="name"
          item-value="value"
          @change="getSelectedBloc"
        ></v-select>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <button @click="showModal = !showModal" class="btn">Brasil</button>

    <v-row>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Nome</th>
              <th class="text-left">Coordenadas</th>
            </tr>
          </thead>
          <tbody v-for="item in regionalBlocs" :key="item.name">
            <tr v-for="(name, latlng,index) in item" :key="index">
              <td>{{ name }}</td>
              <td>{{ item.latlng }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </div>
</template>

<script>
import {
  brazilInfo,
  getRegionalBloc,
} from "../../services/restCountriesApiServices";
import Modal from "../../components/Modal.vue";
import FormBrazil from "./FormBrazil.vue";
export default {
  name: "region-bloc",
  components: { Modal, FormBrazil },
  data() {
    return {
      brazilData: "",
      selectedBloc: "",
      regionalBlocs: [],
      showModal: false,
      listRegionalBloc: [
        { value: "EU", name: "European Union" },
        { value: "EFTA", name: "European Free Trade Association" },
        { value: "CARICOM", name: "Caribbean Community" },
        { value: "PA", name: "Pacific Alliance" },
        { value: "AU", name: "African Union" },
        { value: "USAN", name: "Union of South American Nations" },
        { value: "EEU", name: "Eurasian Economic Union" },
        { value: "AL", name: "Arab League" },
        { value: "ASENA", name: "Association of Southeast Asian Nations" },
        { value: "CAIS", name: "Central American Integration System" },
        { value: "CEFTA", name: "Central European Free Trade Agreement" },
        { value: "NAFTA", name: "North American Free Trade Agreement" },
        {
          value: "SAARC",
          name: "South Asian Association for Regional Cooperation",
        },
      ],
    };
  },
  methods: {
    async getBrazilInfo() {
      const { data } = await brazilInfo();
      this.brazilData = data;
    },
    async getSelectedBloc() {
      const { data } = await getRegionalBloc(this.selectedBloc);

      const dataDTO = data.map((element) => {
        return { name: element.name, latlng: element.latlng };
      });

      console.log(dataDTO);
      this.regionalBlocs = dataDTO;
    },
    cancel() {
      this.showModal = false;
    },
  },
  created() {
    this.getBrazilInfo();
  },
};
</script>

<style scoped>
.btn {
  background-color: var(--second-color);
  color: #fff;
  width: 10rem;
}
.filter,
.search {
  margin-top: -112px;
}
</style>