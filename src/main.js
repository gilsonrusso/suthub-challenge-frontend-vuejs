import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import "./plugins/bootstrapPlugin";
import "./plugins/fontawesomePlugin";
import "./styles/global.css";
import "./plugins/momentPlugin";
import router from "./config/router";

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
