import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../pages/Home";
import Pets from "../pages/Pets";
import Region from "../pages/RegionBloc";

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