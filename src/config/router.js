import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home/Home";
import Pets from "../pages/Pets/Pets";
import Region from "../pages/Regions/RegionBloc";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/pets",
    name: "Pets",
    component: Pets,
  },
  {
    path: "/regions",
    name: "Regions",
    component: Region,
  },

]

export default new VueRouter({
  mode: "history",
  routes: routes,
})