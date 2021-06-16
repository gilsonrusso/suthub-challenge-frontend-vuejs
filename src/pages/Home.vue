<template>
  <v-container class="home">
    <v-row>
      <v-col class="d-flex flex-wrap gap-5 justify-content-around">
        <div v-for="card in cards" :key="card.id">
          <CardHome :data="card" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardHome from "../components/CardHome.vue";
export default {
  name: "home",
  components: { CardHome },
  data() {
    return {
      cards: [
        {
          id: 0,
          img: require("@/assets/pets.jpg"),
          title: "Cuidando com carinho!",
          subTitle: "PET",
          nameButton: "Cadastre Aqui",
        },
        {
          id: 1,
          img: require("@/assets/globalization.jpg"),
          title: "Globalização.",
          subTitle: "REGION BLOCK",
          nameButton: "Veja Aqui",
        },
      ],
    };
  },
};
</script>

<style scoped>
.home {
  max-width: 1100px;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>