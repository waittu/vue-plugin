import Vue from 'vue'
import App from './App.vue'
import "../utils/rem"
import router from "./router"

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
