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

    <v-divider></v-divider>
    <v-row class="d-flex justify-content-end animationMoveRight">
      <v-col cols="12" xs="12" sm="12" md="3" lg="3" class="search">
        <v-card class="pa-0 search-input" flat>
          <v-toolbar dense floating class="w-100">
            <v-text-field
              hide-details
              single-line
              label="Busca por nome"
              v-model="searchName"
            ></v-text-field>
            <v-btn :disabled="searchName == '' ? true : false" icon>
              <v-icon @click="getSearchName">mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="4" lg="4" class="d-flex filter">
        <v-select
          label="Escolha o bloco"
          solo
          v-model="selectedBloc"
          :items="listRegionalBloc"
          item-text="name"
          item-value="value"
          @change="chooseBloc"
        ></v-select>
      </v-col>
    </v-row>
    <button @click="getBrazilData" class="btn animationMoveLeft">Brasil</button>

    <v-row>
      <TableViewer
        class="animationMoveUp"
        v-if="showTable"
        :data="dataReceived"
        :headers="headers"
        :loading="loadingTable"
        @clicked="rowClicked"
      />
    </v-row>
  </div>
</template>

<script>
import {
  searchByRegionalBloc,
  searchByLanguage,
  searchByName,
} from "../../services/restCountriesApiServices";
import Modal from "../../components/Modal.vue";
import FormBrazil from "./FormBrazil.vue";
import TableViewer from "../../components/TableViewer.vue";
export default {
  name: "region-bloc",
  components: { Modal, FormBrazil, TableViewer },
  data() {
    return {
      dataReceived: [],
      brazilData: "",
      showTable: false,
      selectedBloc: "",
      searchName: "",
      loadingTable: false,
      headers: [],
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
    async getByName(name) {
      const { data } = await searchByName(name);
      return data;
    },
    async getByLanguage(language) {
      const { data } = await searchByLanguage(language);
      return data;
    },
    async getByBloc(bloc) {
      const { data } = await searchByRegionalBloc(bloc);
      return data;
    },
    async getBrazilData() {
      const data = await this.getByName("brazil");
      this.brazilData = data;
      this.showModal = !this.showModal;
    },
    async chooseBloc() {
      this.searchName = "";
      this.showTable = true;
      this.headers = [
        { text: "Name", value: "name" },
        { text: "coordenadas", value: "latlng" },
      ];

      this.dataReceived = [];
      this.loadingTable = true;
      const data = await this.getByBloc(this.selectedBloc);

      const dataDTO = data.map((element) => {
        return {
          name: element.name,
          latlng: element.latlng,
        };
      });

      setTimeout(() => {
        this.dataReceived = dataDTO;
        this.loadingTable = false;
      }, 3000);
    },
    async getSearchName() {
      this.dataReceived = [];
      this.loadingTable = true;
      this.showTable = true;
      const result = await this.getByName(this.searchName);

      this.headers = [
        { text: "Nome", value: "name" },
        { text: "Idioma", value: "languages[0].name" },
      ];

      setTimeout(() => {
        this.selectedBloc = "";
        this.searchName = "";
        this.dataReceived = result;
        this.loadingTable = false;
      }, 3000);
    },
    async rowClicked({ languages }) {
      this.dataReceived = [];
      this.loadingTable = true;
      const data = await this.getByLanguage(languages[0].iso639_1);
      setTimeout(() => {
        this.selectedBloc = "";
        this.searchName = "";
        this.dataReceived = data;
        this.loadingTable = false;
      }, 3000);
    },
    cancel() {
      this.showModal = false;
    },
  },
};
</script>

<style >
.btn {
  background-color: var(--second-color);
  color: #fff;
  width: 10rem;
  margin-top: -15px;
  margin-bottom: 10px;
}
.filter,
.search-input {
  margin-top: -135px;
  background-color: transparent;
}
.v-toolbar--dense .v-toolbar__content,
.v-toolbar--dense .v-toolbar__extension {
  width: 100%;
}

@media (max-width: 769px) {
  .filter,
  .search-input {
    margin-top: 0;
    background-color: transparent;
    transition: all 0.5s ease;
  }

  .filter,
  .search {
    padding: 0 12px;
  }

  .btn {
    float: right;
    margin-top: -182px;
    width: 80px;
    transition: all 0.5s ease;
  }
}
</style>